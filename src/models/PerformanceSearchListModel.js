import Realm from "realm";

class PerformanceSearchListModel extends Realm.Object {}
PerformanceSearchListModel.schema = {
  name: "PerformanceSearchListModel",
  properties: {
    type: { type: "string", default: null },
    value_type: { type: "string", default: null }
  }
};

export default PerformanceSearchListModel;
