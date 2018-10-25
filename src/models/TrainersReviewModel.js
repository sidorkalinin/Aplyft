import Realm from "realm";

class TrainersReviewModel extends Realm.Object {}
TrainersReviewModel.schema = {
  name: "TrainersReviewModel",
  primaryKey: "id",
  properties: {
    id: { type: "string" },
    client_review: { type: "string", default: "", optional: true },
    client_rating: { type: "string", default: "", optional: true },
    client_name: { type: "string", default: "", optional: true },

    suggested_trainers: {
      type: "linkingObjects",
      objectType: "SuggestTrainerModel",
      property: "reviews"
    }
  }
};

export default TrainersReviewModel;
