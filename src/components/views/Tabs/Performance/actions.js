import { Alert } from "react-native";
import axios from "axios";
import realm from "../../../../models";
import moment from "moment";
import { performance_Server_Relam } from "./components/actions";

import {
  DELETE_PERFORMANCE_TYPE,
  ADD_PERFORMANCE_VALUE,
  DELETE_PERFORMANCE_RECORD
} from "../../../../variables";
export const change_option_Pressed = payload => {
  console.log(
    "change_option_Pressed has a PAYLOAD of ????????????????????????????? : ",
    payload
  );
  return {
    type: "change_option_Pressed",
    payload: payload
  };
};
export const inputChange = text => {
  return {
    type: "input_change",
    payload: text
  };
};
export const onSetPerformanceDate = payload => {
  return {
    type: "set_performance_date",
    payload: payload
  };
};
export const addNewInput = payload => {
  return {
    type: "add_new_input",
    payload: payload
  };
};

export const getValues = payload => {
  return {
    type: "get_Values",
    payload: payload
  };
};

export const submitVal = payload => {
  return async (dispatch, getState) => {
    let duration_id = payload.duration_id;
    let perfomance_date = payload.perfomance_date;
    let selectOption = payload.selectOption;
    let inputVal = payload.inputVal;
    let itemType1 = payload.itemType;
    if (payload.inputVal != "") {
      dispatch({
        type: "add_performance_value_start"
      });

      console.log(
        "USER ID in The submitVal action is: ",
        getState().user.user.id
      );

      // console.log("PAYLOAD in The submitVal action is: ", payload);
      // console.log("TYPE in The submitVal action is: ", payload.type);
      // console.log("TYPE in The submitVal action is: ", payload.inputVal);

      // var today = new Date();
      // var dd = today.getDate();
      // var mm = today.getMonth() + 1; //January is 0!
      // var yyyy = today.getFullYear();
      //
      // if (dd < 10) {
      //   dd = "0" + dd;
      // }
      //
      // if (mm < 10) {
      //   mm = "0" + mm;
      // }

      today = moment(perfomance_date).format("YYYY-MM-DD");

      console.log("TODAY DATE is: ", today);

      let userUnit = realm.objects("UserModel")[0].units;

      if (payload.type == "weight" || payload.type == "Weight") {
        if (userUnit != "metric") {
          var newvalue = payload.inputVal / 2.2;
        } else {
          var newvalue = payload.inputVal;
        }

        var bodyFormData = new FormData();
        bodyFormData.append("type", payload.type);
        bodyFormData.append("value", newvalue);
        bodyFormData.append("value_unit", "kg");
        bodyFormData.append("value_type", "weight");
        bodyFormData.append("date", today);
        try {
          const response = await axios.post(
            ADD_PERFORMANCE_VALUE(getState().user.user.id),
            bodyFormData
          );
          console.log("PAYLOAD IN THE AXOIS ASYNC is L ", inputVal);

          var today_weight_date = moment().format("YYYY-MM-DD");
          dispatch({
            type: "add_performance_value_finish"
          });

          realm.write(() => {
            // Update th UserModel object
            realm.create(
              "UserModel",
              {
                id: getState().user.user.id,
                weight: inputVal.toString()
              },
              true // check if it its laready inserted otherwise update
            );
            realm.create(
              "UserSettings",
              {
                key: "weight_value_date",
                date: today_weight_date,
                value: today_weight_date
              },
              true // check if it its laready inserted otherwise update
            );
          });

          let itemType = itemType1;

          let payload = {
            duration_id: duration_id,
            itemType: itemType,
            selectOption: selectOption
          };
          dispatch(performance_Server_Relam(payload));
          dispatch({
            type: "add_performance_value_finish"
          });
        } catch (e) {
          console.log("Error resetting performance type", e);
          setTimeout(() => {
            alert("Connection problem. PLease try again later");
          }, 400);
          // dispatch({
          //   type: "go-back"
          // });
          dispatch({
            type: "add_performance_value_finish"
          });
        }
      } else {
        if (payload.inputVal < 100) {
          var bodyFormData = new FormData();
          bodyFormData.append("type", payload.type);
          bodyFormData.append("value", payload.inputVal);
          bodyFormData.append("value_type", "percentage");
          bodyFormData.append("date", today);
          try {
            const response = await axios.post(
              ADD_PERFORMANCE_VALUE(getState().user.user.id),
              bodyFormData
            );
            dispatch({
              type: "add_performance_value_finish"
            });
            realm.write(() => {
              // Update th UserModel object
              realm.create(
                "UserModel",
                {
                  id: getState().user.user.id,
                  bodyfat: inputVal.toString()
                },
                true // check if it its laready inserted otherwise update
              );
            });
            let itemType = itemType1;

            let payload = {
              duration_id: duration_id,
              itemType: itemType,
              selectOption: selectOption
            };
            dispatch(performance_Server_Relam(payload));

            dispatch({
              type: "add_performance_value_finish"
            });
          } catch (e) {
            console.log("Error resetting performance type", e);
            setTimeout(() => {
              alert("Connection problem. PLease try again later");
            }, 400);
            // dispatch({
            //   type: "go-back"
            // });
            dispatch({
              type: "add_performance_value_finish"
            });
          }
        } else {
          alert("The value should be less than 100");
          dispatch({
            type: "add_performance_value_finish"
          });
        }
      }
    } else {
      dispatch({
        type: "add_performance_value_finish"
      });
      setTimeout(() => {
        alert("Please Enter a New Value");
      }, 400);
    }
  };
};

export const updateIsResetting = payload => {
  return {
    type: "performance_page_update_is_resetting",
    payload: payload
  };
};

export const resetRecord = payload => {
  return async (dispatch, getState) => {
    let item_id = payload.item_id;
    let item_value = payload.item_value;
    let duration_id = payload.duration_id;
    let itemType = payload.itemType;
    let selectOption = payload.selectOption;
    dispatch({
      type: "performance_page_update_reset_start"
    });
    try {
      const response = await axios.delete(
        DELETE_PERFORMANCE_RECORD(getState().user.user.id, item_id)
      );

      try {
        realm.write(() => {
          let deleted_performance_record = realm
            .objects("PerformanceDataModel")
            .filtered("id == $0", item_id);
          realm.delete(deleted_performance_record);
        });
      } catch (error) {
        console.log(
          "Cannot Delete Records From PerformanceDataModel !!!!!!!!",
          error
        );
      }
      let payload = {
        duration_id: duration_id,
        itemType: itemType,
        selectOption: selectOption
      };
      dispatch(performance_Server_Relam(payload));

      dispatch({
        type: "performance_page_update_reset_finish"
      });
    } catch (e) {
      dispatch({
        type: "performance_page_update_reset_finish"
      });
      console.log("ERROR IN DELETING RECORD IS : ", e);
      setTimeout(() => {
        Alert.alert(
          "Error",
          "Connection problem. PLease try Deleting this Record again later",
          [{ text: "ok", onPress: () => console.log("OK Pressed") }],
          { cancelable: true }
        );
      }, 500);
    }
  };
};
