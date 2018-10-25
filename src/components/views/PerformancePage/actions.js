import { GET_PERFORMANCE_LIST } from "../../../variables";
import axios from "axios";
import Realm from "../../../models";

export const searchPerformance = payload => {
  return {
    type: "performance_type_search_changed",
    payload: payload
  };
};

export const selectPerformance = payload => {
  return {
    type: "country_list_select",
    payload: payload
  };
};

export const performance_Realm = payload => {
  return {
    type: "performance_Realm",
    payload: payload
  };
};

export const performance_Type_Pressed = payload => {
  console.log(
    "performance_Type_Pressed has a PAYLOAD of ????????????????????????????? : ",
    payload
  );
  return {
    type: "performance_type_pressed",
    payload: payload
  };
};

var ParseSingleObjectFromArray = (obj, ar) => {
  var fomatted_object = {};

  for (var index in ar) {
    var ar_obj = ar[index];

    if (ar_obj.type == obj.type && ar_obj.id == obj.id) {
      // concatinate into a one level object
      return {
        ...ar_obj.attributes,
        id: ar_obj.id,
        relationships: ar_obj.relationships
      };
    }
  }
};

export const performance_Server_Relam = payload => {
  return (dispatch, getState) => {
    axios
      .get(GET_PERFORMANCE_LIST(getState().user.user.id))
      .then(function(response) {
        var response_data = response.data;
        var data = response_data;
        console.log("DATA in AXIOS ", data);

        try {
          Realm.write(() => {
            let allperformance = Realm.objects("PerformanceModel");
            Realm.delete(allperformance);
          });
        } catch (error) {
          console.log(
            "Cannot Delete Records From PerformanceModel !!!!!!!!",
            error
          );
        }

        //looping first through the performanceList data
        for (var data_index in data) {
          var performanceList_to_insert = {}; // will fillit it along the way

          var row = data[data_index];

          performanceList_to_insert.type = row.type.toLowerCase();
          performanceList_to_insert.value = row.value.toString();
          performanceList_to_insert.value_type = row.value_type.toLowerCase();
          performanceList_to_insert.week_number = parseInt(row.week_number);
          performanceList_to_insert.date = row.date_string;

          try {
            Realm.write(() => {
              //update first and then link
              Realm.create(
                "PerformanceModel",
                performanceList_to_insert,
                true // check if it its laready inserted otherwise update
              );
            });
          } catch (error) {
            console.log("Cannot Create a New PerformanceModel !!!!!!!!", error);
          }
        }
      })
      .catch(() => {
        dispatch({
          type: "add_performance_value_finish"
        });
      })
      .then(() => {
        dispatch({
          // inorder to reload the data from Realm that contains the newly added ones
          type: "performance_Realm",
          payload: payload
        });
      });
  };
};
