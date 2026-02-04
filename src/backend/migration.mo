import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import List "mo:core/List";

module {
  type OldUserProfile = {
    name : Text;
  };

  type OldActor = {
    userProfiles : Map.Map<Principal, OldUserProfile>;
    // Other state types from the old actor can be added here
  };

  type PlanOption = {
    #free;
    #basicMonthly;
    #basicSixMonth;
    #basicYearly;
    #premierMonthly;
    #premierSixMonth;
    #premierYearly;
  };

  type NewUserProfile = {
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

  type NewActor = {
    userProfiles : Map.Map<Principal, NewUserProfile>;
    // Other state types from the new actor can be added here
  };

  public func run(old : OldActor) : NewActor {
    let newProfiles = old.userProfiles.map<Principal, OldUserProfile, NewUserProfile>(
      func(_id, oldProfile) {
        {
          oldProfile with
          dateOfBirth = null;
          city = null;
          state = null;
          email = null;
          phone = null;
          newsletterOptIn = false;
          selectedPlan = #free;
          planStartTimestamp = null;
          planExpirationTimestamp = null;
          isActive = false;
        };
      }
    );
    { userProfiles = newProfiles };
  };
};
