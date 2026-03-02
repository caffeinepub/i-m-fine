import Time "mo:core/Time";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Migration "migration";

import Blob "mo:core/Blob";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Apply data migration in with clause
(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type PlanOption = {
    #free;
    #basicMonthly;
    #basicSixMonth;
    #basicYearly;
    #premierMonthly;
    #premierSixMonth;
    #premierYearly;
  };

  public type UserProfile = {
    name : Text;
    dateOfBirth : ?Text;
    city : ?Text;
    state : ?Text;
    email : ?Text;
    phone : ?Text;
    newsletterOptIn : Bool;
    selectedPlan : PlanOption;
    planStartTimestamp : ?Int;
    planExpirationTimestamp : ?Int;
    isActive : Bool;
    couponCode : ?Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  type Mood = { #happy; #neutral; #sad };
  type MoodEntry = { timestamp : Int; mood : Mood };
  type JournalEntry = { id : Nat; timestamp : Int; title : Text; content : Text };

  module JournalEntry {
    public func compareByTimestamp(j1 : JournalEntry, j2 : JournalEntry) : Order.Order {
      Int.compare(j2.timestamp, j1.timestamp);
    };
  };

  let moodEntries = Map.empty<Principal, List.List<MoodEntry>>();
  let journalEntries = Map.empty<Principal, Map.Map<Nat, JournalEntry>>();

  public type Testimonial = {
    name : Text;
    message : Text;
    timestamp : Int;
  };

  let testimonials = List.empty<Testimonial>();

  public type Event = {
    id : Nat;
    title : Text;
    description : Text;
    startTime : Int;
    endTime : Int;
    location : Text;
  };

  let events = Map.empty<Nat, Event>();

  public type MeetingLink = {
    id : Nat;
    title : Text;
    url : Text;
    timestamp : Int;
  };

  let meetingLinks = Map.empty<Nat, MeetingLink>();

  type AuthToken = {
    userId : Text;
    token : Text;
    expiration : Int;
  };

  let tokens = Map.empty<Text, AuthToken>();

  //-----------------
  // User Profile Functions
  //-----------------
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

  public shared ({ caller }) func checkAndHandleCallerExpiration() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can trigger expiration check");
    };

    let now = Time.now();
    let maybeProfile = userProfiles.get(caller);

    switch (maybeProfile) {
      case (null) {};
      case (?profile) {
        switch (profile.planExpirationTimestamp) {
          case (?expiration) {
            if (now > expiration + 8 * 24 * 60 * 60 * 1000000000) {
              userProfiles.remove(caller);
              deleteUserData(caller);
            } else if (now > expiration) {
              let updatedProfile = {
                profile with
                selectedPlan = #free;
                planStartTimestamp = null;
                planExpirationTimestamp = null;
                isActive = false;
              };
              userProfiles.add(caller, updatedProfile);
            };
          };
          case (null) {};
        };
      };
    };
  };

  public shared ({ caller }) func checkAndHandleSystemExpirations() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform system-wide expiration check");
    };

    let now = Time.now();
    let profilesToDelete = List.empty<Principal>();

    for ((user, profile) in userProfiles.entries()) {
      switch (profile.planExpirationTimestamp) {
        case (?expiration) {
          if (now > expiration + 8 * 24 * 60 * 60 * 1000000000) {
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
      deleteUserData(user);
    };
  };

  func deleteUserData(user : Principal) {
    moodEntries.remove(user);
    journalEntries.remove(user);
    userGoalProgress.remove(user);
  };

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

    // Increment mood-log streak goals
    incrementGoalsByCategory(caller, #moodLog);
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

    // Increment journaling streak goals
    incrementGoalsByCategory(caller, #journaling);

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

  public type ProductSuggestion = {
    id : Nat;
    suggestion : Text;
    timestamp : Int;
    author : Principal;
  };

  let productSuggestions = Map.empty<Nat, ProductSuggestion>();

  public shared ({ caller }) func submitProductSuggestion(suggestion : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit suggestions");
    };

    let entry : ProductSuggestion = {
      id = Time.now().toNat();
      suggestion;
      timestamp = Time.now();
      author = caller;
    };

    productSuggestions.add(entry.id, entry);
  };

  public query ({ caller }) func listProductSuggestions() : async [ProductSuggestion] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view suggestions");
    };
    productSuggestions.values().toArray();
  };

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

  public shared ({ caller }) func saveCouponCode(code : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save coupon codes");
    };

    let maybeProfile = userProfiles.get(caller);
    switch (maybeProfile) {
      case (null) {
        Runtime.trap("User profile not found");
      };
      case (?profile) {
        let updatedProfile = {
          profile with couponCode = ?code;
        };
        userProfiles.add(caller, updatedProfile);
      };
    };
  };

  public query ({ caller }) func getCouponCode() : async ?Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get coupon codes");
    };

    let maybeProfile = userProfiles.get(caller);
    switch (maybeProfile) {
      case (null) {
        Runtime.trap("User profile not found");
      };
      case (?profile) {
        profile.couponCode;
      };
    };
  };

  func checkPlaybookAuth(token : Text) : Bool {
    switch (tokens.get(token)) {
      case (null) { false };
      case (?_authToken) { true };
    };
  };

  public shared ({ caller }) func authenticatePlaybookUser(_username : Text, _password : Text) : async Bool {
    let token = "sample_token";
    tokens.add(token, {
      userId = "admin";
      token;
      expiration = Time.now() + 3600 * 1000000000;
    });
    true;
  };

  public shared ({ caller }) func logoutPlaybookUser(token : Text) : async () {
    tokens.remove(token);
  };

  type PdfFile = {
    id : Nat;
    name : Text;
    blob : Storage.ExternalBlob;
  };

  let pdfFiles = Map.empty<Nat, PdfFile>();

  type CourseFile = {
    fileName : Text;
    blob : Storage.ExternalBlob;
  };
  type CourseFolder = {
    folderName : Text;
    files : [CourseFile];
  };

  let courseFolders = Map.empty<Text, CourseFolder>();

  func checkSession(token : Text) : () {
    if (not checkPlaybookAuth(token)) {
      Runtime.trap("Unauthorized: You must be logged in to perform this action");
    };
  };

  public shared ({ caller }) func savePdfFile(token : Text, name : Text, blob : Storage.ExternalBlob) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can upload PDF files");
    };
    checkSession(token);

    let id = Time.now().toNat();
    let pdfFile = {
      id;
      name;
      blob;
    };
    pdfFiles.add(id, pdfFile);
  };

  public query ({ caller }) func listPdfFiles() : async [PdfFile] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list PDF files");
    };
    pdfFiles.values().toArray();
  };

  public shared ({ caller }) func addCourseFolder(token : Text, folderName : Text, files : [CourseFile]) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create course folders");
    };
    checkSession(token);

    if (courseFolders.containsKey(folderName)) {
      Runtime.trap("Course folder already exists");
    };

    let folder : CourseFolder = {
      folderName;
      files;
    };
    courseFolders.add(folderName, folder);
  };

  public query ({ caller }) func listCourseFolders() : async [CourseFolder] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list course folders");
    };
    courseFolders.values().toArray();
  };

  public query ({ caller }) func getCourseFolder(token : Text, folderName : Text) : async ?CourseFolder {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can get course folders");
    };
    checkSession(token);
    courseFolders.get(folderName);
  };

  public shared ({ caller }) func createEvent(token : Text, title : Text, description : Text, startTime : Int, endTime : Int, location : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create events");
    };
    checkSession(token);

    let id = Time.now().toNat();

    let event : Event = {
      id;
      title;
      description;
      startTime;
      endTime;
      location;
    };

    events.add(id, event);
  };

  public query ({ caller }) func getEvents() : async [Event] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view events");
    };
    events.values().toArray();
  };

  public shared ({ caller }) func editEvent(token : Text, id : Nat, title : Text, description : Text, startTime : Int, endTime : Int, location : Text) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can edit events");
    };
    checkSession(token);

    switch (events.get(id)) {
      case (null) { false };
      case (?existingEvent) {
        let updatedEvent : Event = {
          id = existingEvent.id;
          title;
          description;
          startTime;
          endTime;
          location;
        };
        events.add(id, updatedEvent);
        true;
      };
    };
  };

  public shared ({ caller }) func deleteEvent(token : Text, id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete events");
    };
    checkSession(token);

    switch (events.get(id)) {
      case (null) { false };
      case (_existingEvent) {
        events.remove(id);
        true;
      };
    };
  };

  public shared ({ caller }) func addMeetingLink(token : Text, title : Text, url : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add meeting links");
    };
    checkSession(token);

    let id = Time.now().toNat();
    let meeting : MeetingLink = {
      id;
      title;
      url;
      timestamp = Time.now();
    };

    meetingLinks.add(id, meeting);
  };

  public query ({ caller }) func getMeetingLinks() : async [MeetingLink] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view meeting links");
    };
    meetingLinks.values().toArray();
  };

  public shared ({ caller }) func deleteMeetingLink(token : Text, id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete meeting links");
    };
    checkSession(token);

    switch (meetingLinks.get(id)) {
      case (null) { false };
      case (_existingMeeting) {
        meetingLinks.remove(id);
        true;
      };
    };
  };

  public shared ({ caller }) func validatePlaybookToken(token : Text) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can validate playbook tokens");
    };
    checkPlaybookAuth(token);
  };

  public shared ({ caller }) func changePlaybookPassword(_token : Text, _newPassword : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can change playbook password");
    };
    ();
  };

  public shared ({ caller }) func addOrUpdatePromoCode(_token : Text, _code : Text, _discountPercentage : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can manage promo codes");
    };
    ();
  };

  public shared ({ caller }) func keepTokenActive(token : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can keep tokens active");
    };
    checkSession(token);
  };

  //-----------------------------------
  // Goals and Trophies Functionality
  //-----------------------------------

  public type GoalType = { #milestone; #streak };

  // Category tags for automatic goal progress integration
  public type GoalCategory = {
    #moodLog;
    #journaling;
    #therapySession;
    #groupClass;
    #breathingTool;
    #groundingTool;
    #reframingTool;
    #none;
  };

  public type Goal = {
    id : Nat;
    userId : Principal;
    title : Text;
    description : Text;
    goalType : GoalType;
    category : GoalCategory;
    targetValue : Nat;
    currentProgress : Nat;
    isCompleted : Bool;
    completionTimestamp : ?Int;
    trophyId : ?Nat;
  };

  public type Trophy = {
    id : Nat;
    userId : Principal;
    title : Text;
    description : Text;
    imageIdentifier : Text;
    dateEarned : ?Int;
    discountCode : ?Text;
    discountPercentage : ?Nat;
  };

  // Per-user goal progress map: userId -> goalId -> Goal
  let userGoalProgress = Map.empty<Principal, Map.Map<Nat, Goal>>();
  // Per-user trophies map: userId -> trophyId -> Trophy
  let userTrophies = Map.empty<Principal, Map.Map<Nat, Trophy>>();
  // Template trophies defined by admins (not yet awarded)
  let trophyTemplates = Map.empty<Nat, {
    id : Nat;
    title : Text;
    description : Text;
    imageIdentifier : Text;
    discountPercentage : ?Nat;
  }>();

  var nextGoalId = 1;
  var nextTrophyId = 1;
  var nextTrophyTemplateId = 1;

  // Helper: get or create user goal map
  func getUserGoalMap(user : Principal) : Map.Map<Nat, Goal> {
    switch (userGoalProgress.get(user)) {
      case (?m) { m };
      case (null) {
        let m = Map.empty<Nat, Goal>();
        userGoalProgress.add(user, m);
        m;
      };
    };
  };

  // Helper: get or create user trophy map
  func getUserTrophyMap(user : Principal) : Map.Map<Nat, Trophy> {
    switch (userTrophies.get(user)) {
      case (?m) { m };
      case (null) {
        let m = Map.empty<Nat, Trophy>();
        userTrophies.add(user, m);
        m;
      };
    };
  };

  // Helper: generate a discount code for a user
  func generateDiscountCode(user : Principal, percentage : Nat) : Text {
    let timePart = Time.now().toText();
    "DISC" # percentage.toText() # "-" # timePart;
  };

  // Internal: award a trophy template to a user
  func awardTrophyToUser(user : Principal, trophyTemplateId : Nat) : () {
    switch (trophyTemplates.get(trophyTemplateId)) {
      case (null) {};
      case (?template) {
        let trophyMap = getUserTrophyMap(user);
        // Check if already awarded
        var alreadyAwarded = false;
        for ((_id, t) in trophyMap.entries()) {
          if (t.id == trophyTemplateId) {
            alreadyAwarded := true;
          };
        };
        if (not alreadyAwarded) {
          let discountCode : ?Text = switch (template.discountPercentage) {
            case (?pct) { ?generateDiscountCode(user, pct) };
            case (null) { null };
          };
          let trophy : Trophy = {
            id = trophyTemplateId;
            userId = user;
            title = template.title;
            description = template.description;
            imageIdentifier = template.imageIdentifier;
            dateEarned = ?Time.now();
            discountCode;
            discountPercentage = template.discountPercentage;
          };
          trophyMap.add(trophyTemplateId, trophy);
          userTrophies.add(user, trophyMap);

          // If there is a discount code, save it to the user profile
          switch (discountCode) {
            case (?code) {
              switch (userProfiles.get(user)) {
                case (?profile) {
                  let updatedProfile = { profile with couponCode = ?code };
                  userProfiles.add(user, updatedProfile);
                };
                case (null) {};
              };
            };
            case (null) {};
          };
        };
      };
    };
  };

  // Internal: increment progress on all matching goals for a user by category
  func incrementGoalsByCategory(user : Principal, category : GoalCategory) : () {
    let goalMap = getUserGoalMap(user);
    for ((goalId, goal) in goalMap.entries()) {
      if (goal.userId == user and not goal.isCompleted and goal.category == category) {
        let newProgress = goal.currentProgress + 1;
        let isCompleted = newProgress >= goal.targetValue;
        let updatedGoal : Goal = {
          goal with
          currentProgress = newProgress;
          isCompleted;
          completionTimestamp = if (isCompleted) { ?Time.now() } else { null };
        };
        goalMap.add(goalId, updatedGoal);
        if (isCompleted) {
          switch (goal.trophyId) {
            case (null) {};
            case (?tId) { awardTrophyToUser(user, tId) };
          };
        };
      };
    };
    userGoalProgress.add(user, goalMap);
  };

  // Create a goal for the caller
  public shared ({ caller }) func createGoal(
    title : Text,
    description : Text,
    goalType : GoalType,
    category : GoalCategory,
    targetValue : Nat,
    trophyId : ?Nat,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create goals");
    };

    let goalId = nextGoalId;
    nextGoalId += 1;

    let goal : Goal = {
      id = goalId;
      userId = caller;
      title;
      description;
      goalType;
      category;
      targetValue;
      currentProgress = 0;
      isCompleted = false;
      completionTimestamp = null;
      trophyId;
    };

    let goalMap = getUserGoalMap(caller);
    goalMap.add(goalId, goal);
    userGoalProgress.add(caller, goalMap);

    goalId;
  };

  // Manually update goal progress (for goals not tied to automatic actions)
  public shared ({ caller }) func updateGoalProgress(goalId : Nat, progress : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update goals");
    };

    let goalMap = getUserGoalMap(caller);
    switch (goalMap.get(goalId)) {
      case (null) { Runtime.trap("Goal not found") };
      case (?goal) {
        if (goal.userId != caller) {
          Runtime.trap("Unauthorized: You can only update your own goals");
        };

        let isCompleted = progress >= goal.targetValue;
        let updatedGoal : Goal = {
          goal with
          currentProgress = progress;
          isCompleted;
          completionTimestamp = if (isCompleted) { ?Time.now() } else { null };
        };

        goalMap.add(goalId, updatedGoal);
        userGoalProgress.add(caller, goalMap);

        if (isCompleted) {
          switch (goal.trophyId) {
            case (null) {};
            case (?tId) { awardTrophyToUser(caller, tId) };
          };
        };
      };
    };
  };

  // Get goals for a user (own or admin)
  public query ({ caller }) func getUserGoals(user : Principal) : async [Goal] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own goals");
    };

    switch (userGoalProgress.get(user)) {
      case (null) { [] };
      case (?goalMap) { goalMap.values().toArray() };
    };
  };

  // Admin: create a trophy template
  public shared ({ caller }) func createTrophyTemplate(
    title : Text,
    description : Text,
    imageIdentifier : Text,
    discountPercentage : ?Nat,
  ) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create trophy templates");
    };

    let tId = nextTrophyTemplateId;
    nextTrophyTemplateId += 1;

    trophyTemplates.add(tId, {
      id = tId;
      title;
      description;
      imageIdentifier;
      discountPercentage;
    });

    tId;
  };

  // Get trophies earned by a user (own or admin)
  public query ({ caller }) func getUserTrophies(user : Principal) : async [Trophy] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own trophies");
    };

    switch (userTrophies.get(user)) {
      case (null) { [] };
      case (?trophyMap) { trophyMap.values().toArray() };
    };
  };

  //-----------------------------------
  // Goal Progress Integration Actions
  //-----------------------------------

  // Record a therapy session completion with Serenity
  public shared ({ caller }) func recordTherapySession() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can record therapy sessions");
    };
    incrementGoalsByCategory(caller, #therapySession);
  };

  // Record attendance at a group class
  public shared ({ caller }) func recordGroupClassAttendance() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can record group class attendance");
    };
    incrementGoalsByCategory(caller, #groupClass);
  };

  // Record usage of a wellness tool (breathing, grounding, reframing)
  public shared ({ caller }) func recordToolUsage(toolCategory : GoalCategory) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can record tool usage");
    };
    // Only allow wellness tool categories
    switch (toolCategory) {
      case (#breathingTool) { incrementGoalsByCategory(caller, #breathingTool) };
      case (#groundingTool) { incrementGoalsByCategory(caller, #groundingTool) };
      case (#reframingTool) { incrementGoalsByCategory(caller, #reframingTool) };
      case (_) { Runtime.trap("Invalid tool category") };
    };
  };
};
