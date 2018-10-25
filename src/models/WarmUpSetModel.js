import Realm from "realm";

class WarmUpSetModel extends Realm.Object {}
WarmUpSetModel.schema = {
  name: "WarmUpSetModel",
  primaryKey: "id",
  properties: {
    id: { type: "string" },
    repetitions: { type: "string", default: "" },
    time: { type: "string", default: "" },
    distance: { type: "string", default: "number" },
    height: { type: "string", default: "number" },
    weight: { type: "string", default: "" },
    restTime: { type: "string", default: "" },
    comment: { type: "string", default: "" },
    order: { type: "string", default: "0" },
    reps_left: { type: "string", default: "" },

    //linked
    exercise: {
      type: "linkingObjects",
      objectType: "WarmUpExerciseModel",
      property: "sets"
    }
  }
};

export default WarmUpSetModel;
