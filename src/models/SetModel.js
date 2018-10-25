import Realm from "realm";

class SetModel extends Realm.Object {}
SetModel.schema = {
  name: "SetModel",
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
    variations: { type: "string?[]", default: "" },

    accomplished_repetitions: { type: "string", default: "" },
    accomplished_time: { type: "string", default: "" },
    accomplished_rest_time: { type: "string", default: "" },
    accomplished_distance: { type: "string", default: "" },
    accomplished_height: { type: "string", default: "" },
    accomplished_weight: { type: "string", default: "" },
    accomplished_reps_left: { type: "string", default: "" },

    // relationship
    rounds: { type: "list", objectType: "SetModelRound", default: [] },

    //linked
    exercise: {
      type: "linkingObjects",
      objectType: "ExerciseModel",
      property: "sets"
    }
  }
};

export default SetModel;
