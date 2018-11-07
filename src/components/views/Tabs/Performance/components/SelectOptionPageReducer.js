import Realm from "../../../../../models";

const INIT_STATE = {
  data: "",
  type: "",
  searchList_data: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case "performance_Realm":
      //   let performance_data = Realm.objects("PerformanceModel").sorted("type");
      //
      //   var tmp_array = [];
      //   for (var index in performance_data) {
      //     var row = performance_data[index];
      //
      //     //base case
      //     if (tmp_array.indexOf(row.type) > -1) continue;
      //     tmp_array.push(row.type);
      //   }
      //
      //   return { ...state, data: tmp_array };

      // case "performanceData_Realm":
      //   let performance_data = Realm.objects("PerformanceDataModel").sorted("type");
      //
      //   var tmp_array = [];
      //   for (var index in performance_data) {
      //     var row = performance_data[index];
      //
      //     //base case
      //     if (tmp_array.indexOf(row.type) > -1) continue;
      //     tmp_array.push(row.type);
      //   }
      //
      return { ...state };

    case "performance_SearchList_Realm":
      let performance_searchList_data = Realm.objects(
        "PerformanceSearchListModel"
      ).sorted("type");

      var tmp_searchList_array = [];
      for (var index in performance_searchList_data) {
        var row_list = performance_searchList_data[index];

        //base case
        if (tmp_searchList_array.indexOf(row_list.type) > -1) continue;
        tmp_searchList_array.push(row_list.type);
      }

      return { ...state, searchList_data: tmp_searchList_array };

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

    case "user_logout":
      return {
        ...state,
        data: "",
        type: "",
        searchList_data: []
      };
    case "optout_pressed":
      return {
        ...state,
        data: "",
        type: "",
        searchList_data: []
      };

    default:
      return state;
  }
};
