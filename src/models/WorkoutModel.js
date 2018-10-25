import Realm from "realm";

class WorkoutModel extends Realm.Object {}
WorkoutModel.schema = {
  name: "WorkoutModel",
  primaryKey: "id",
  properties: {
    id: { type: "string" },
    date: { type: "date" },
    title: { type: "string", default: null },
    category: { type: "string", default: "workout" },
    loged: { type: "bool", default: false },
    synced: { type: "bool", default: false },
    uesrMessage: { type: "string", default: "" },
    removed: { type: "string", default: "" },
    logedDate: { type: "date", optional: true },

    // relationship
    moves: { type: "list", objectType: "MoveModel", default: [] }, // this will holds the exercise
    warmup: { type: "list", objectType: "WarmUpModel", default: [] }, // this will holds the Warmupexercise

    //linked
    users: {
      type: "linkingObjects",
      objectType: "UserModel",
      property: "workouts"
    }
  }
};

export default WorkoutModel;
