import Realm from "realm";

class UserModel extends Realm.Object {}
UserModel.schema = {
  name: "UserModel",
  primaryKey: "id",
  properties: {
    id: { type: "string" },
    fatsecretAuthSecret: { type: "string", default: null, optional: true },
    fatsecretAuthToken: { type: "string", default: null, optional: true },
    fullname: { type: "string", default: null },
    firstName: { type: "string", default: null },
    lastName: { type: "string", default: null },
    gender: { type: "string", default: null },
    email: { type: "string", default: null },
    imageURL: { type: "string", default: null, optional: true },
    dateOfBirth: { type: "date", default: null, optional: true },
    phone: { type: "string", default: null, optional: true },
    activityLevel: { type: "string", default: null, optional: true },
    preferedWorkoutDays: { type: "string", default: null, optional: true },
    height: { type: "string", default: null, optional: true },
    weight: { type: "string", default: null, optional: true },
    bodyfat: { type: "string", default: null, optional: true },
    location: { type: "string", default: null, optional: true },
    injury: { type: "bool", default: null, optional: true },
    injurySVG: { type: "string", default: null, optional: true },
    injuryText: { type: "string", default: null, optional: true },
    pushWorkouts: { type: "bool", default: true },
    updateWeight: { type: "bool", default: true },
    healthKit: { type: "bool", default: true },
    push_notification_token: { type: "string", default: null, optional: true },
    // removed in 1.2.2
    // freedailyWorkout: { type:'bool', default: false },
    country: { type: "string", default: null, optional: true },
    token: { type: "string", default: null, optional: true },
    // added in verssion 1.0.12 // db schema 2
    units: { type: "string", default: "metric" },
    stripeAccountId: { type: "string", default: null, optional: true },

    goal: { type: "list", objectType: "GoalModel", default: [] },
    workouts: { type: "list", objectType: "WorkoutModel", default: [] },
    nutritions: { type: "list", objectType: "NutritionModel", default: [] }
  }
};

export default UserModel;
