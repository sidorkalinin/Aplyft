import Realm from "../../../models";

const INIT_STATE = {
  data: "",
  type: ""
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case "performance_Realm":
      let performance_data = Realm.objects("PerformanceModel").sorted("type");

      var tmp_array = [];
      for (var index in performance_data) {
        var row = performance_data[index];

        //base case
        if (tmp_array.indexOf(row.type) > -1) continue;
        tmp_array.push(row.type);
      }

      return { ...state, data: tmp_array };

    case "performance_type_search_changed":
      let searchedperformancetype = Realm.objects("PerformanceModel")
        .filtered("type CONTAINS[c] $0", action.payload)
        .sorted("type");

      var tmp_array2 = [];
      for (var index in searchedperformancetype) {
        var row = searchedperformancetype[index];

        //base case
        if (tmp_array2.indexOf(row.type) > -1) continue;
        tmp_array2.push(row.type);
      }
      return { ...state, data: tmp_array2 };

    case "performance_type_pressed":
      return { ...state, type: action.payload };

    default:
      return state;
  }
};
