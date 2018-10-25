import realm from "../../../../models";

const INITIAL_STATE = {
  isResetting: false,
  isAdding: false,
  inputvalue: "",
  addnewInput: false,
  datavalue: [],
  flatListData: [],
  data: "",
  type: {
    name: "Weight",
    value: "weight"
  },
  duration: {
    name: "6 months",
    value: "6m"
  }
};

export default (state = INITIAL_STATE, action) => {
  var filter_type = "";
  switch (action.type) {
    // case "change_option_Pressed":
    //   console.log('&&&&&&&&&&&&&&&', action.payload)
    //   return { ...state, isType: action.payload.pop_up };
    case "input_change":
      return { ...state, inputvalue: action.payload };

    case "get_Values":
      console.log("action.payload: ", action.payload);
      var type = action.payload.type ? action.payload.type : state.type;
      var duration = action.payload.duration
        ? action.payload.duration
        : state.duration;
      var typevalue = realm
        .objects("PerformanceModel")
        .filtered("type == $0", type.value)
        .sorted("date");
      var type2value = realm
        .objects("PerformanceModel")
        .filtered("type == $0", type.value)
        .sorted("date");
      console.log(
        "type2value type2value type2value : : : ",
        Array.from(type2value)
      );

      var type2_value = Array.from(type2value);

      type2_value.splice(0, 1);
      type2_value.splice(type2_value.length - 1, 1);

      console.log("type2_value is : ", type2_value);
      if (typevalue.length == 0) {
        if (type.value == "weight") {
          filter_type = "weight";
        } else if (type.value == "body fat") {
          filter_type = "percentage";
        }
      } else {
        filter_type = typevalue[0].value_type;
      }
      console.log(
        "Type Value in reducer in is >>>>> >  > > > . . . . >>>>  ",
        Array.from(typevalue)
      );
      var userUnit = realm.objects("UserModel");

      switch (filter_type) {
        case "weight":
          if (userUnit[0].units != "metric") {
            console.log(
              "<< I am where the weight is NOT metric: ",
              userUnit[0].units
            );
            var value_array = [];
            for (var index in typevalue) {
              var row = typevalue[index];
              value_array.push(parseInt(row.value / 0.4535));
            }

            break;
          } else {
            console.log(
              ">> I am where the weight IS metric: ",
              userUnit[0].units
            );
            var value_array = [];
            for (var index in typevalue) {
              var row = typevalue[index];
              value_array.push(parseInt(row.value));
            }
            break;
          }

        case "distance":
          if (userUnit[0].units == "metric") {
            console.log(
              ">> I am where the distance IS metric: ",
              userUnit[0].units
            );
            var value_array = [];
            for (var index in typevalue) {
              var row = typevalue[index];
              value_array.push(parseInt(row.value));
            }
            break;
          } else {
            var value_array = [];
            for (var index in typevalue) {
              var row = typevalue[index];
              value_array.push(parseInt(row.value / 0.3048));
            }
            break;
          }

        case "time":
          var value_array = [];
          for (var index in typevalue) {
            var row = typevalue[index];
            value_array.push(parseInt(row.value));
          }
          break;

        case "percentage":
          var value_array = [];
          for (var index in typevalue) {
            var row = typevalue[index];
            value_array.push(parseInt(row.value));
          }
          break;

        default:
          return state;
      }

      return {
        ...state,
        datavalue: value_array,
        data: typevalue,
        type: type,
        duration: duration,
        flatListData: type2_value
      };

    case "set_Values":
      var type = action.payload.type ? action.payload.type : state.type;
      var duration = action.payload.duration
        ? action.payload.duration
        : state.duration;
      console.log("ACTION>PAYLOD>ITEMTYPE is : <<<<<<< : ", type, duration);

      var typevalue = realm
        .objects("PerformanceModel")
        .filtered("type == $0", type.value)
        .sorted("date");

      var type2value = realm
        .objects("PerformanceModel")
        .filtered("type == $0", type.value)
        .sorted("date");
      console.log(
        "type2value type2value type2value : : : ",
        Array.from(type2value)
      );

      var type2_value = Array.from(type2value);

      type2_value.splice(0, 1);
      type2_value.splice(type2_value.length - 1, 1);

      console.log("type2_value is : ", type2_value);
      // console.log("======= realm data======", Array.from(typevalue));
      if (typevalue.length == 0) {
        if (type.value == "weight") {
          filter_type = "weight";
        } else if (type.value == "body fat") {
          // console.log(
          //   "I am in the reducer line 143 where type.value is body fat"
          // );
          filter_type = "percentage";
        }
      } else {
        filter_type = typevalue[0].value_type;
      }
      // console.log(
      //   "Type Value in reducer in is >>>>> >  > > > . . . . >>>>  ",
      //   Array.from(typevalue)
      // );
      var userUnit = realm.objects("UserModel");

      switch (filter_type) {
        case "weight":
          if (userUnit[0].units != "metric") {
            // console.log(
            //   "<< I am where the weight is NOT metric: ",
            //   userUnit[0].units
            // );
            var value_array = [];
            for (var index in typevalue) {
              var row = typevalue[index];
              value_array.push(parseInt(row.value / 0.4535));
            }

            break;
          } else {
            // console.log(
            //   ">> I am where the weight IS metric: ",
            //   userUnit[0].units
            // );
            var value_array = [];
            for (var index in typevalue) {
              var row = typevalue[index];
              value_array.push(parseInt(row.value));
            }
            break;
          }

        case "distance":
          if (userUnit[0].units == "metric") {
            // console.log(
            //   ">> I am where the distance IS metric: ",
            //   userUnit[0].units
            // );
            var value_array = [];
            for (var index in typevalue) {
              var row = typevalue[index];
              value_array.push(parseInt(row.value));
            }
            break;
          } else {
            var value_array = [];
            for (var index in typevalue) {
              var row = typevalue[index];
              value_array.push(parseInt(row.value / 0.3048));
            }
            break;
          }

        case "time":
          var value_array = [];
          for (var index in typevalue) {
            var row = typevalue[index];
            value_array.push(parseInt(row.value));
          }
          break;

        case "percentage":
          var value_array = [];
          for (var index in typevalue) {
            var row = typevalue[index];
            value_array.push(parseInt(row.value));
          }
          break;

        default:
          return state;
      }

      return {
        ...state,
        datavalue: value_array,
        data: typevalue,
        type: type,
        duration: duration,
        flatListData: type2_value
      };

    case "submit_val":
      return { ...state };

    case "add_performance_value_is_adding":
      return { ...state, isAdding: action.payload };

    case "add_new_input":
      return { ...state, addnewInput: action.payload };

    case "add_performance_value_start":
      return { ...state, isAdding: true };

    case "add_performance_value_finish":
      return { ...state, isAdding: false, inputvalue: "", addnewInput: false };

    case "add_performance_value_failed":
      return { ...state, isAdding: false, inputvalue: "", addnewInput: false };

    case "performance_page_update_is_resetting":
      return { ...state, isResetting: action.payload };

    case "performance_page_update_reset_start":
      return { ...state, isResetting: true };

    case "performance_page_update_reset_finish":
      return { ...state, isResetting: false };

    case "performance_type_pressed":
      return { ...state, addnewInput: action.payload.pop_up };

    case "user_logout":
      return {
        ...state,
        isResetting: false,
        isAdding: false,
        inputvalue: "",
        addnewInput: false,
        datavalue: [],
        flatListData: [],
        data: "",
        type: {
          name: "Weight",
          value: "weight"
        },
        duration: {
          name: "6 months",
          value: "6m"
        }
      };

    case "optout_pressed":
      return {
        ...state,
        isResetting: false,
        isAdding: false,
        inputvalue: "",
        addnewInput: false,
        datavalue: [],
        flatListData: [],
        data: "",
        type: {
          name: "Weight",
          value: "weight"
        },
        duration: {
          name: "6 months",
          value: "6m"
        }
      };

    default:
      return state;
  }
};
