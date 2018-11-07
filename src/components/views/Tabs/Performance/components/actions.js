import {
  GET_PERFORMANCE_LIST,
  GET_PERFORMANCE_SEARCH_LIST,
  GET_PERFORMANCE_DETAIL_LIST
} from "../../../../../variables";
import axios from "axios";
import Realm from "../../../../../models";

export const setValues = payload => {
  console.log("PAYLOAD FOR setValues() is : ", payload);
  console.log(
    "PAYLOAD.selectOption FOR setValues() is : ",
    payload.selectOption
  );
  return (dispatch, getState) => {
    // dispatch({
    //   type: "set_Values",
    //   payload: payload.selectOption
    // });
    if (payload.chosen == "type") {
      let duration_id = payload.duration_id;
      let itemType = payload.selectOption.type.value;
      let selectOption = payload.selectOption;

      // let payload = {
      //   duration_id: duration_value,
      //   itemType: itemType
      // };
      dispatch(
        performance_Server_Relam({ selectOption, itemType, duration_id })
      );
    } else {
      let duration_id = payload.selectOption.duration.value;
      let itemType = payload.itemType;
      let selectOption = payload.selectOption;

      // let payload = {
      //   duration_id: duration_value,
      //   itemType: itemType
      // };
      dispatch(
        performance_Server_Relam({ selectOption, itemType, duration_id })
      );
    }
  };
};

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

export const performance_SearchList_Realm = payload => {
  return {
    type: "performance_SearchList_Realm",
    payload: payload
  };
};

export const goBack = () => {
  return {
    type: "go-back"
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
  // inorder to get all the data from the server as an average to display them in the graph
  return (dispatch, getState) => {
    let itemType = payload.itemType;
    let duration_id = payload.duration_id;
    let selectOption = payload.selectOption;

    axios
      .get(GET_PERFORMANCE_LIST(getState().user.user.id, itemType, duration_id))
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
          type: "add_performance_value_finish"
        });
        dispatch(performanceData_server_realm(payload));
      });
  };
};
export const performanceData_server_realm = payload => {
  //in order to get all the data of the performance and not the average , to display them in the flatList
  return (dispatch, getState) => {
    let itemType = payload.itemType;
    let duration_id = payload.duration_id;
    let selectOption = payload.selectOption;
    axios
      .get(
        GET_PERFORMANCE_DETAIL_LIST(
          getState().user.user.id,
          itemType,
          duration_id
        )
      )
      .then(function(response) {
        let response_data = response.data;
        let data = response_data;

        try {
          Realm.write(() => {
            let alldataperformance = Realm.objects("PerformanceDataModel");
            Realm.delete(alldataperformance);
          });
        } catch (error) {
          console.log(
            "Cannot Delete Records From PerformanceDataModel !!!!!!!!",
            error
          );
        }

        //looping first through the performanceList data
        for (var data_index in data) {
          var performanceListData_to_insert = {}; // will fillit it along the way

          var row = data[data_index];

          performanceListData_to_insert.id = String(row.id);
          performanceListData_to_insert.type = row.type.toLowerCase();
          performanceListData_to_insert.value = row.value.toString();
          performanceListData_to_insert.value_type = row.value_type.toLowerCase();
          performanceListData_to_insert.date = row.date;

          try {
            Realm.write(() => {
              //update first and then link
              Realm.create(
                "PerformanceDataModel",
                performanceListData_to_insert,
                true // check if it its laready inserted otherwise update
              );
            });
          } catch (error) {
            console.log(
              "Cannot Create a New PerformanceDataModel !!!!!!!!",
              error
            );
          }
        }
      })
      .catch(() => {
        dispatch({
          type: "add_performance_value_finish"
        });
      })
      .then(() => {
        // dispatch({
        //   // inorder to reload the data from Realm that contains the newly added ones
        //   type: "performance_Realm",
        //   payload: payload
        // });
        // dispatch({
        //   // inorder to reload the data from Realm that contains the newly added ones
        //   type: "performanceData_Realm",
        //   payload: payload
        // });
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        dispatch({
          // inorder to reload the data from realm that contains the newly added ones
          type: "get_Values",
          payload: selectOption
        });
      })
      .then(() => {
        dispatch({
          type: "add_performance_value_finish"
        });
        dispatch({
          // inorder to reload the data and force a refresh for the page
          type: "refreshData"
        });
      });
  };
};
export const performance_SearchList_Server_Relam = payload => {
  return (dispatch, getState) => {
    axios
      .get(GET_PERFORMANCE_SEARCH_LIST(getState().user.user.id))
      .then(function(response) {
        var response_data = response.data;
        var data = response_data;
        console.log("DATA in AXIOS ", data);

        try {
          Realm.write(() => {
            let allSearchperformance = Realm.objects(
              "PerformanceSearchListModel"
            );
            Realm.delete(allSearchperformance);
          });
        } catch (error) {
          console.log(
            "Cannot Delete Records From PerformanceSearchListModel !!!!!!!!",
            error
          );
        }

        //looping first through the performanceList data
        for (var data_index in data) {
          var performanceSearchList_to_insert = {}; // will fillit it along the way

          var row = data[data_index];

          performanceSearchList_to_insert.type = row.type.toLowerCase();
          performanceSearchList_to_insert.value_type = row.value_type.toLowerCase();

          try {
            Realm.write(() => {
              //update first and then link
              Realm.create(
                "PerformanceSearchListModel",
                performanceSearchList_to_insert,
                true // check if it its laready inserted otherwise update
              );
            });
          } catch (error) {
            console.log(
              "Cannot Create a New PerformanceSearchListModel !!!!!!!!",
              error
            );
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
          type: "performance_SearchList_Realm",
          payload: payload
        });
      });
  };
};
