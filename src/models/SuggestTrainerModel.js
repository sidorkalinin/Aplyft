import Realm from "realm";

class SuggestTrainerModel extends Realm.Object {}
SuggestTrainerModel.schema = {
  name: "SuggestTrainerModel",
  primaryKey: "id",
  properties: {
    id: { type: "string" },
    status: { type: "string", default: "", optional: true },
    selected: { type: "bool", default: false },
    declined: { type: "bool", default: false },
    active: { type: "bool", default: false },
    program_duration: { type: "string", default: "" },
    chosen: { type: "string", default: "" },
    program_price: { type: "string", default: "" },
    program_currency: { type: "string", default: "" },
    show_price: { type: "bool", default: true },
    show_stars: { type: "bool", default: true },
    reviews: { type: "list", objectType: "TrainersReviewModel", default: [] }, // this will holds the exercise

    // relation
    personal_trainer: { type: "PersonalTrainerModel" }
  }
};

export default SuggestTrainerModel;
