import realm from "../../../../models";

const INITIAL_STATE = {
  isResetting: false,
  isAdding: false,
  inputvalue: "",
  addnewInput: false,
  datavalue: [],
  data: "",
  type: ""
};

export default (state = INITIAL_STATE, action) => {
  var filter_type = "";
  switch (action.type) {
    // case "input_change":
    //   return { ...state, inputvalue: action.payload };

    // case "get_Values":
    //   console.log(
    //     "ACTION>PAYLOD>ITEMTYPE is : <<<<<<< : ",
    //     action.payload.itemType
    //   );
    //   var typevalue = realm
    //     .objects("PerformanceModel")
    //     .filtered("type == $0", action.payload.itemType)
    //     .sorted("date");
    //   if (typevalue.length == 0) {
    //     if (action.payload.itemType == "weight") {
    //       filter_type = "weight";
    //     } else if (action.payload.itemType == "body fat") {
    //       filter_type = "percentage";
    //     }
    //   } else {
    //     filter_type = typevalue[0].value_type;
    //   }
    //   console.log(
    //     "Type Value in reducer in is >>>>> >  > > > . . . . >>>>  ",
    //     Array.from(typevalue)
    //   );
    //   let userUnit = realm.objects("UserModel");
    //
    //   switch (filter_type) {
    //     case "weight":
    //       if (userUnit[0].units != "metric") {
    //         console.log(
    //           "<< I am where the weight is NOT metric: ",
    //           userUnit[0].units
    //         );
    //         var value_array = [];
    //         for (var index in typevalue) {
    //           var row = typevalue[index];
    //           value_array.push(parseInt(row.value / 0.4535));
    //         }
    //
    //         break;
    //       } else {
    //         console.log(
    //           ">> I am where the weight IS metric: ",
    //           userUnit[0].units
    //         );
    //         var value_array = [];
    //         for (var index in typevalue) {
    //           var row = typevalue[index];
    //           value_array.push(parseInt(row.value));
    //         }
    //         break;
    //       }
    //
    //     case "distance":
    //       if (userUnit[0].units == "metric") {
    //         console.log(
    //           ">> I am where the distance IS metric: ",
    //           userUnit[0].units
    //         );
    //         var value_array = [];
    //         for (var index in typevalue) {
    //           var row = typevalue[index];
    //           value_array.push(parseInt(row.value));
    //         }
    //         break;
    //       } else {
    //         var value_array = [];
    //         for (var index in typevalue) {
    //           var row = typevalue[index];
    //           value_array.push(parseInt(row.value / 0.3048));
    //         }
    //         break;
    //       }
    //
    //     case "time":
    //       var value_array = [];
    //       for (var index in typevalue) {
    //         var row = typevalue[index];
    //         value_array.push(parseInt(row.value));
    //       }
    //       break;
    //
    //     case "percentage":
    //       var value_array = [];
    //       for (var index in typevalue) {
    //         var row = typevalue[index];
    //         value_array.push(parseInt(row.value));
    //       }
    //       break;
    //
    //     default:
    //       return state;
    //   }
    //
    //   return {
    //     ...state,
    //     datavalue: value_array,
    //     data: typevalue,
    //     type: action.payload.itemType
    //   };
    //
    // case "submit_val":
    //   return { ...state };
    //
    // case "add_performance_value_is_adding":
    //   return { ...state, isAdding: action.payload };
    //
    // case "add_new_input":
    //   return { ...state, addnewInput: action.payload };
    //
    // case "add_performance_value_start":
    //   return { ...state, isAdding: true };
    //
    // case "add_performance_value_finish":
    //   return { ...state, isAdding: false, inputvalue: "", addnewInput: false };
    //
    // case "add_performance_value_failed":
    //   return { ...state, isAdding: false, inputvalue: "", addnewInput: false };
    //
    // case "performance_page_update_is_resetting":
    //   return { ...state, isResetting: action.payload };
    //
    // case "performance_page_update_reset_start":
    //   return { ...state, isResetting: true };
    //
    // case "performance_page_update_reset_finish":
    //   return { ...state, isResetting: false };
    //
    // case "performance_type_pressed":
    //   return { ...state, addnewInput: action.payload.pop_up };

    default:
      return state;
  }
};
