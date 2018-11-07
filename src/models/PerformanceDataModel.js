import Realm from "realm";

class PerformanceDataModel extends Realm.Object {}
PerformanceDataModel.schema = {
  name: "PerformanceDataModel",
  primaryKey: "id",
  properties: {
    id: { type: "string", default: null },
    type: { type: "string", default: null },
    value: { type: "string", default: null },
    value_type: { type: "string", default: null },
    date: { type: "string", default: null }
  }
};

export default PerformanceDataModel;
