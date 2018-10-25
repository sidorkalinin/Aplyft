import { Alert } from "react-native";
import axios from "axios";
import realm from "../../../../models";
import moment from "moment";
import { performance_Server_Relam } from "./../actions";
import {
  DELETE_PERFORMANCE_TYPE,
  ADD_PERFORMANCE_VALUE
} from "../../../../variables";
export const inputChange = text => {
  return {
    type: "input_change",
    payload: text
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
    if (payload.inputVal.trim() != "" ) {
      
      // dispatch({
      //   type: "add_performance_value_start"
      // });

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();

      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }

      today = yyyy + "-" + mm + "-" + dd;
      let userUnit = realm.objects("UserModel")[0].units;

      if (payload.type.toLowerCase() == "weight") {
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
          let response  = await axios.post(ADD_PERFORMANCE_VALUE(getState().user.user.id), bodyFormData);
          var today_weight_date = moment().format("YYYY-MM-DD");
          realm.write(() => {
            // Update th UserModel object
            realm.create("UserModel",
              {
                id: getState().user.user.id,
                weight: payload.inputVal.toString()
              },true);

            realm.create("UserSettings",
              {
                key: "weight_value_date",
                date: today_weight_date,
                value: today_weight_date
              },true);

            });
            await dispatch(performance_Server_Relam());

        }catch (error) {
          console.log("error in performance", error);
        }

        // await dispatch({type: "add_performance_value_finish"});
        // await new Promise(resolve => setTimeout(resolve, 3000));
        dispatch({type: "go-back"});
      
      } else {
        // else the value must be the bofy fat percentage and it should be less than 100
        if (payload.inputVal < 100) {
          var bodyFormData = new FormData();
          bodyFormData.append("type", payload.type);
          bodyFormData.append("value", payload.inputVal);
          bodyFormData.append("value_type", "percentage");
          bodyFormData.append("date", today);

          try {
            let response = await axios.post(ADD_PERFORMANCE_VALUE(getState().user.user.id), bodyFormData);
            realm.write(() => {
              // Update th UserModel object
              realm.create("UserModel",
                {
                  id: getState().user.user.id,
                  bodyfat: payload.inputVal.toString()
                },true);

            });

            await dispatch(performance_Server_Relam());

          } catch (error) {
            console.log(
              "Cannot Update  The New Weight in User Model !!!!!!!!",
              error
            );
            setTimeout(() => {
              alert("Connection problem. PLease try again later.");
            }, 400);
          }

          // dispatch({type: "add_performance_value_finish"});
          // await new Promise(resolve => setTimeout(resolve, 3000));
          await dispatch({type: "go-back"});

        } else {
          await alert("The value should be less than 100");
          dispatch({
            type: "add_performance_value_failed"
          });
        }
      }

    } else {
      alert("Please Enter a New Value");
      // dispatch({
      //   type: "add_performance_value_failed"
      // });
    }
  };
};

export const updateIsResetting = payload => {
  return {
    type: "performance_page_update_is_resetting",
    payload: payload
  };
};

export const onResetPress = payload => {
  return (dispatch, getState) => {
    dispatch({
      type: "performance_page_update_reset_start"
    });

    axios
      .delete(DELETE_PERFORMANCE_TYPE(getState().user.user.id, payload))
      .then(results => {
        console.log("success");
      })
      .catch(error => {
        console.log("error resetting performance type");
        alert("Connection problem. PLease try again later");
      })
      .then(() => {
        dispatch({
          type: "performance_page_update_reset_finish"
        }).then(()=>{
          dispatch({
            type: "go-back"
          });
        });
      });
  };
};
