import { Alert } from "react-native";
import axios from "axios";
import realm from "../../../../models";
import moment from "moment";
import { performance_Server_Relam } from "./components/actions";
import {
  DELETE_PERFORMANCE_TYPE,
  ADD_PERFORMANCE_VALUE
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
  return (dispatch, getState) => {
    let duration_id = payload.duration_id;
    if (payload.inputVal != "") {
      dispatch({
        type: "add_performance_value_start"
      });

      console.log(
        "USER ID in The submitVal action is: ",
        getState().user.user.id
      );
      console.log("PAYLOAD in The submitVal action is: ", payload);
      // console.log("PAYLOAD in The submitVal action is: ", payload);
      // console.log("TYPE in The submitVal action is: ", payload.type);
      // console.log("TYPE in The submitVal action is: ", payload.inputVal);

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
        axios
          .post(ADD_PERFORMANCE_VALUE(getState().user.user.id), bodyFormData)
          .then(results => {
            console.log("success");
          })
          .then(() => {
            console.log(
              "weight to be saved in realm is : ",
              payload.inputVal.toString()
            );
            var today_weight_date = moment().format("YYYY-MM-DD");
            try {
              realm.write(() => {
                // Update th UserModel object
                realm.create(
                  "UserModel",
                  {
                    id: getState().user.user.id,
                    weight: payload.inputVal.toString()
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
            } catch (error) {
              console.log(
                "Cannot Update  The New Weight in User Model !!!!!!!!",
                error
              );
            }
            let itemType = payload.type;
            dispatch(performance_Server_Relam({ itemType, duration_id }));
            dispatch({
              type: "add_performance_value_finish"
            });
            dispatch({
              type: "go-back"
            });
          })

          .catch(error => {
            console.log(
              "Error adding  a new performance value and the error is : ",
              error
            );
            setTimeout(() => {
              alert("Connection problem. PLease try again later");
            }, 400);

            dispatch({
              type: "go-back"
            });
            dispatch({
              type: "add_performance_value_finish"
            });
          })
          .then(() => {
            // setTimeout(() => {
            //        dispatch({
            //        type: "go-back"
            //      });
            // }, 400);

            dispatch({
              type: "add_performance_value_finish"
            });
          });
      } else {
        if (payload.inputVal < 100) {
          var bodyFormData = new FormData();
          bodyFormData.append("type", payload.type);
          bodyFormData.append("value", payload.inputVal);
          bodyFormData.append("value_type", "percentage");
          bodyFormData.append("date", today);

          axios
            .post(ADD_PERFORMANCE_VALUE(getState().user.user.id), bodyFormData)
            .then(results => {
              console.log("success");
            })
            .then(() => {
              try {
                realm.write(() => {
                  // Update th UserModel object
                  realm.create(
                    "UserModel",
                    {
                      id: getState().user.user.id,
                      bodyfat: payload.inputVal.toString()
                    },
                    true // check if it its laready inserted otherwise update
                  );
                });
              } catch (error) {
                console.log(
                  "Cannot Update  The New Weight in User Model !!!!!!!!",
                  error
                );
              }
              let itemType = payload.type;
              dispatch(performance_Server_Relam({ itemType, duration_id }));

              dispatch({
                type: "add_performance_value_finish"
              });
            })
            .then(() => {
              dispatch({
                type: "go-back"
              });
            })
            .catch(error => {
              console.log("Error resetting performance type");
              setTimeout(() => {
                alert("Connection problem. PLease try again later");
              }, 400);
              dispatch({
                type: "go-back"
              });
              dispatch({
                type: "add_performance_value_finish"
              });
            })
            .then(() => {
              dispatch({
                type: "add_performance_value_finish"
              });
            });
        } else {
          alert("The value should be less than 100");
          dispatch({
            type: "add_performance_value_failed"
          });
        }
      }
    } else {
      alert("Please Enter a New Value");
      dispatch({
        type: "add_performance_value_failed"
      });
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
        });
        dispatch({
          type: "go-back"
        });
      });
  };
};
