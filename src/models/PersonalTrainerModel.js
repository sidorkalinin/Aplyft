import Realm from "realm";

class PersonalTrainerModel extends Realm.Object {}
PersonalTrainerModel.schema = {
  name: "PersonalTrainerModel",
  primaryKey: "id",
  properties: {
    id: { type: "string" },
    user_id: { type: "int", optional: true },
    firstName: { type: "string" },
    lastName: { type: "string" },
    picURL: { type: "string", default: "", optional: true },
    category: { type: "string", default: null, optional: true },
    location: { type: "string", default: null, optional: true },
    chosen: { type: "string", default: null, optional: true },
    country_code: { type: "string", default: null, optional: true },
    stars: { type: "int", default: 0, optional: true },
    price: { type: "string", default: null, optional: true },
    price_range: { type: "string", default: null, optional: true },
    duration: { type: "string", default: null, optional: true },
    status: { type: "string", default: "", optional: true },
    activeUsers: { type: "string", default: "0", optional: true },
    bio: { type: "string", default: "", optional: true },
    certifications: { type: "string", default: "", optional: true },
    languages: { type: "string", default: "", optional: true },
    description: { type: "string", default: "", optional: true },
    areaOfExpertise: { type: "string?[]", optional: true },
    pricingplans: { type: "list", objectType: "PricingPlanModel", default: [] },
    video_url: { type: "string", default: null, optional: true },
    free_trail: { type: "string", default: null, optional: true },
    ratingId: { type: "string", default: null, optional: true },
    ratingStars: { type: "string", default: null, optional: true },
    ratingText: { type: "string", default: null, optional: true },

    suggested_trainer: {
      type: "linkingObjects",
      objectType: "SuggestTrainerModel",
      property: "personal_trainer"
    }
  }
};

export default PersonalTrainerModel;
