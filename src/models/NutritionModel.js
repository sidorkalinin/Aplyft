import Realm from "realm";

class NutritionModel extends Realm.Object {}
NutritionModel.schema = {
  name: "NutritionModel",
  primaryKey: "id",
  properties: {
    id: { type: "string" },
    user_goal: { type: "string", default: null, optional: true },
    name: { type: "string", default: null, optional: true },
    date: { type: "string", default: null, optional: true },
    user_feedback: { type: "string", default: null, optional: true },
    user_feedback_date: { type: "string", default: null, optional: true },

    total_calories: { type: "string", default: null, optional: true },
    acc_calories: { type: "string", default: null, optional: true },

    protein: { type: "string", default: null, optional: true },
    protein_intake: { type: "string", default: null, optional: true },
    carbs: { type: "string", default: null, optional: true },
    carbs_intake: { type: "string", default: null, optional: true },
    fats: { type: "string", default: null, optional: true },
    fats_intake: { type: "string", default: null, optional: true },
    fiber: { type: "string", default: null, optional: true },
    fiber_intake: { type: "string", default: null, optional: true },
    sugar: { type: "string", default: null, optional: true },
    sugar_intake: { type: "string", default: null, optional: true },
    cholesterol: { type: "string", default: null, optional: true },
    cholesterol_intake: { type: "string", default: null, optional: true },
    sodium: { type: "string", default: null, optional: true },
    sodium_intake: { type: "string", default: null, optional: true },
    water: { type: "string", default: null, optional: true },
    water_intake: { type: "string", default: null, optional: true }
  }
};

export default NutritionModel;
