import Realm from "realm";

class PerformanceModel extends Realm.Object {}
PerformanceModel.schema = {
  name: "PerformanceModel",
  properties: {
    type: { type: "string", default: null },
    value: { type: "string", default: null },
    value_type: { type: "string", default: null },
    date: { type: "string", default: null },
    week_number: { type: "int", default: null }
  }
};

export default PerformanceModel;
