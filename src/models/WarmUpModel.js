import Realm from "realm";

class WarmUpModel extends Realm.Object {}
WarmUpModel.schema = {
  name: "WarmUpModel",
  primaryKey: "id",
  properties: {
    id: { type: "string" },
    type: { type: "string", default: "normal" },
    title: { type: "string", default: "" },
    category: { type: "string", default: "warmup" },
    date: { type: "string", default: "" },
    exercises: {
      type: "list",
      objectType: "WarmUpExerciseModel",
      default: []
    }, // this will holds the exercise

    //linked
    workouts: {
      type: "linkingObjects",
      objectType: "WorkoutModel",
      property: "warmup"
    }
  }
};

export default WarmUpModel;
