import Realm from "realm";

class WarmUpExerciseModel extends Realm.Object {}
WarmUpExerciseModel.schema = {
  name: "WarmUpExerciseModel",
  primaryKey: "id",
  properties: {
    id: { type: "string" },
    warmup_id: { type: "string", default: null },
    title: { type: "string", default: null },
    warm_up_title: { type: "string", default: null },
    date: { type: "string", default: null },
    type: { type: "string", default: "normal" },
    description: { type: "string", default: null },
    edited: { type: "bool", default: false },
    video_id: { type: "string", default: "" },
    category: { type: "string", default: "warmup" },
    thumbnail_url: { type: "string", default: "" },
    bitwise_logic: { type: "int", default: 0 },
    sets: { type: "list", objectType: "WarmUpSetModel", default: [] },
    // linked
    warmup: {
      type: "linkingObjects",
      objectType: "WarmUpModel",
      property: "exercises"
    }
  }
};

export default WarmUpExerciseModel;
