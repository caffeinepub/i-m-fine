import Time "mo:core/Time";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Int "mo:core/Int";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

import Migration "migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Plan Option Type
  public type PlanOption = {
    #free;
    #basicMonthly;
    #basicSixMonth;
    #basicYearly;
    #premierMonthly;
    #premierSixMonth;
    #premierYearly;
  };

  // User Profile Type
  public type UserProfile = {
    name : Text;
    dateOfBirth : ?Text;
    city : ?Text;
    state : ?Text;
    email : ?Text;
    phone : ?Text;
    newsletterOptIn : Bool;
    selectedPlan : PlanOption;
    planStartTimestamp : ?Time.Time;
    planExpirationTimestamp : ?Time.Time;
    isActive : Bool;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Plan Management Functions
  public shared ({ caller }) func selectPlan(plan : PlanOption) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can select plans");
    };

    let existingProfile = switch (userProfiles.get(caller)) {
      case (?profile) { profile };
      case (null) {
        Runtime.trap("Profile not found");
      };
    };

    let updatedProfile = {
      existingProfile with
      selectedPlan = plan;
      planStartTimestamp = null;
      planExpirationTimestamp = null;
      isActive = false;
    };

    userProfiles.add(caller, updatedProfile);
  };

  public shared ({ caller }) func recordPayment(plan : PlanOption) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can record payments");
    };

    let existingProfile = switch (userProfiles.get(caller)) {
      case (?profile) { profile };
      case (null) {
        Runtime.trap("Profile not found");
      };
    };

    let now = Time.now();
    let expiration = switch (plan) {
      case (#basicMonthly) { ?(now + 30 * 24 * 60 * 60 * 1000000000) };
      case (#basicSixMonth) { ?(now + 180 * 24 * 60 * 60 * 1000000000) };
      case (#basicYearly) { ?(now + 365 * 24 * 60 * 60 * 1000000000) };
      case (#premierMonthly) { ?(now + 30 * 24 * 60 * 60 * 1000000000) };
      case (#premierSixMonth) { ?(now + 180 * 24 * 60 * 60 * 1000000000) };
      case (#premierYearly) { ?(now + 365 * 24 * 60 * 60 * 1000000000) };
      case (_) { null };
    };

    let updatedProfile = {
      existingProfile with
      selectedPlan = plan;
      planStartTimestamp = ?now;
      planExpirationTimestamp = expiration;
      isActive = true;
    };

    userProfiles.add(caller, updatedProfile);
  };

  public shared ({ caller }) func toggleNewsletterOptIn(optIn : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update newsletter preferences");
    };

    let existingProfile = switch (userProfiles.get(caller)) {
      case (?profile) { profile };
      case (null) {
        Runtime.trap("Profile not found");
      };
    };

    let updatedProfile = {
      existingProfile with newsletterOptIn = optIn;
    };

    userProfiles.add(caller, updatedProfile);
  };

  // Automatic Expiration and Cleanup
  public shared ({ caller }) func checkAndHandleExpirations() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let now = Time.now();
    let profilesToDelete = List.empty<Principal>();

    for ((user, profile) in userProfiles.entries()) {
      switch (profile.planExpirationTimestamp) {
        case (?expiration) {
          if (now > expiration + 7 * 24 * 60 * 60 * 1000000000) {
            profilesToDelete.add(user);
          } else if (now > expiration) {
            let updatedProfile = {
              profile with
              selectedPlan = #free;
              planStartTimestamp = null;
              planExpirationTimestamp = null;
              isActive = false;
            };
            userProfiles.add(user, updatedProfile);
          };
        };
        case (null) {};
      };
    };

    for (user in profilesToDelete.values()) {
      userProfiles.remove(user);
    };
  };

  // Mood and Journal Types
  type Mood = { #happy; #neutral; #sad };
  type MoodEntry = { timestamp : Time.Time; mood : Mood };
  type JournalEntry = { id : Nat; timestamp : Time.Time; title : Text; content : Text };

  module JournalEntry {
    public func compareByTimestamp(j1 : JournalEntry, j2 : JournalEntry) : Order.Order {
      Int.compare(j2.timestamp, j1.timestamp);
    };
  };

  let moodEntries = Map.empty<Principal, List.List<MoodEntry>>();
  let journalEntries = Map.empty<Principal, Map.Map<Nat, JournalEntry>>();

  // Mood Functions
  public shared ({ caller }) func addMood(mood : Mood) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add mood entries");
    };

    let entry : MoodEntry = { timestamp = Time.now(); mood };
    let existingEntries = switch (moodEntries.get(caller)) {
      case (?entries) { entries };
      case (null) { List.empty<MoodEntry>() };
    };
    existingEntries.add(entry);
    moodEntries.add(caller, existingEntries);
  };

  public query ({ caller }) func getMoodHistory() : async [MoodEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view mood history");
    };
    let entries = switch (moodEntries.get(caller)) {
      case (?entries) { entries };
      case (null) { List.empty<MoodEntry>() };
    };
    entries.toArray();
  };

  // Journal Functions
  public shared ({ caller }) func addJournalEntry(title : Text, content : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add journal entries");
    };

    let id = Time.now().toNat();
    let entry : JournalEntry = {
      id;
      timestamp = Time.now();
      title;
      content;
    };

    let userEntries = journalEntries.get(caller);
    let updatedEntries = switch (userEntries) {
      case (null) {
        let newMap = Map.empty<Nat, JournalEntry>();
        newMap.add(id, entry);
        newMap;
      };
      case (?entries) {
        entries.add(id, entry);
        entries;
      };
    };
    journalEntries.add(caller, updatedEntries);
    id;
  };

  public shared ({ caller }) func updateJournalEntry(id : Nat, title : Text, content : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update journal entries");
    };

    switch (journalEntries.get(caller)) {
      case (null) { false };
      case (?userEntries) {
        switch (userEntries.get(id)) {
          case (null) { false };
          case (?existingEntry) {
            let updatedEntry : JournalEntry = {
              id = existingEntry.id;
              timestamp = existingEntry.timestamp;
              title;
              content;
            };
            userEntries.add(id, updatedEntry);
            true;
          };
        };
      };
    };
  };

  public query ({ caller }) func getJournalEntries() : async [JournalEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view journal entries");
    };

    let entries = switch (journalEntries.get(caller)) {
      case (null) { Map.empty<Nat, JournalEntry>() };
      case (?userEntries) { userEntries };
    };

    entries.values().toArray().sort(JournalEntry.compareByTimestamp);
  };

  public shared ({ caller }) func deleteJournalEntry(id : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete journal entries");
    };

    switch (journalEntries.get(caller)) {
      case (null) { false };
      case (?userEntries) {
        if (userEntries.containsKey(id)) {
          userEntries.remove(id);
          true;
        } else {
          false;
        };
      };
    };
  };

  //----------------
  // Testimonials
  //----------------
  public type Testimonial = {
    name : Text;
    message : Text;
    timestamp : Int;
  };

  let testimonials = List.empty<Testimonial>();

  public shared ({ caller }) func submitTestimonial(name : Text, message : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit testimonials");
    };

    let entry : Testimonial = {
      name;
      message;
      timestamp = Time.now();
    };

    testimonials.add(entry);
  };

  public query ({ caller }) func getTestimonials() : async [Testimonial] {
    testimonials.toArray().sort(
      func(t1, t2) {
        Int.compare(t2.timestamp, t1.timestamp);
      }
    );
  };
};
