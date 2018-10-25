import Realm from "realm";

class MoveModel extends Realm.Object {}
MoveModel.schema = {
  name: "MoveModel",
  primaryKey: "id",
  properties: {
    id: { type: "string" },
    type: { type: "string", default: "" },
    category: { type: "string", default: "moves" },
    exercises: { type: "list", objectType: "ExerciseModel", default: [] }, // this will holds the exercise
    timer: { type: "int", default: 0 },
    repetitions: { type: "int", default: 0 },
    accomplished_repetitions: { type: "int", default: 0 },

    //linked
    workouts: {
      type: "linkingObjects",
      objectType: "WorkoutModel",
      property: "moves"
    }
  }
};

export default MoveModel;
