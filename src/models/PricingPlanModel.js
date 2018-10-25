import Realm from "realm";

class PricingPlanModel extends Realm.Object {}
PricingPlanModel.schema = {
  name: "PricingPlanModel",
  primaryKey: "id",
  properties: {
    id: { type: "string" },
    currency: { type: "string", default: "" },
    price: { type: "string", default: "" },
    description: { type: "string", default: "" },
    trial_period: { type: "string", default: "" },
    chosen: { type: "string", default: "" },
    interval: { type: "string", default: "" },
    interval_count: { type: "string", default: "" },
    stripe_pricing_plan_id: { type: "string", default: "" },
    personal_trainer_category_id: { type: "string", default: "" },
    name: { type: "string", default: "" }
  }
};

export default PricingPlanModel;
