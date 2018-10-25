import Realm from "realm";

class SetModelRound extends Realm.Object {}
SetModelRound.schema = {
  name: "SetModelRound",
  primaryKey: "compounded_primary_key",
  properties: {
    // this is used as a workouaround to concat the 'id' & 'round' to have uniquness
    compounded_primary_key: { type: "string", default: "" },

    id: { type: "string" },
    round: { type: "int", default: 0 },

    accomplished_repetitions: { type: "string", default: "" },
    accomplished_time: { type: "string", default: "" },
    accomplished_rest_time: { type: "string", default: "" },
    accomplished_distance: { type: "string", default: "" },
    accomplished_weight: { type: "string", default: "" },
    accomplished_height: { type: "string", default: "" },
    accomplished_reps_left: { type: "string", default: "" },

    //linked
    set: { type: "linkingObjects", objectType: "SetModel", property: "rounds" }
  }
};

export default SetModelRound;
