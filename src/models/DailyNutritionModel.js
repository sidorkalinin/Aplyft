import Realm from "realm";

class DailyNutritionModel extends Realm.Object {}
DailyNutritionModel.schema = {
  name: "DailyNutritionModel",
  primaryKey: "primary_id_date",
  properties: {
    title: { type: "string", default: null, optional: true },
    value: { type: "string", default: null, optional: true },
    date: { type: "string", default: null, optional: true },
    title_date: { type: "string", default: null, optional: true },
    primary_id_date: { type: "string", default: null, optional: true }
  }
};

export default DailyNutritionModel;
