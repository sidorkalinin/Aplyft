import axios from "axios";
import { GET_WORKOUTS, GET_DAILY_WORKOUT } from "../../../../variables";
import realm from "../../../../models";
import { DeviceEventEmitter, Alert, Platform } from "react-native";
import { Server_loadDailyWorkouts_Realm } from "../Training/DailyView/DailyTrainingScreen/actions";
import moment from "moment";
import Mixpanel from "react-native-mixpanel";
import firebase from "react-native-firebase";

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

export const requestFreeDailyWorkout = category_id => {
  return (dispatch, getState) => {
    // telling the user about the app activity
    dispatch({
      type: "load_free_daily_workouts_start"
    });

    // formatting the data
    let currentDate = new Date();
    let formatedDate =
      currentDate.getFullYear() +
      "-" +
      ("0" + (currentDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + currentDate.getDate()).slice(-2);

    // get the latest goal model for the user
    var success = false;
    var bodyFormData = new FormData();
    //bodyFormData.append("id", getState().user.user.id);
    bodyFormData.append("start_date", formatedDate);
    bodyFormData.append("category_id", category_id);
    bodyFormData.append("is_ipf", "true");
    axios
      .post(
        GET_DAILY_WORKOUT(getState().user.user.id, category_id),
        bodyFormData
      )
      .then(results => {
        if (Platform.OS != "android")
          firebase.analytics().logEvent("TrainningSuccessfullFreeDailyWorkout");
        Mixpanel.trackWithProperties(
          "TrainningTabScreen_SuccessFully recieved free daily workout",
          { category: getState().user.user.goal[0].category_id }
        );
        //console.log("success free daily", results);
        realm.write(() => {
          getState().user.user.goal[0].freedailyWorkout = true;
        });
        success = true;

        // dispatch(loadWorkoutFromServer());
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("Error in FreeDailyWorkout: > : ", error);
          console.log(
            "Error.Response in FreeDailyWorkout: > : ",
            error.response.data.detail
          );

          // just so we can hide the fade thing
          dispatch({
            type: "load_free_daily_workouts_success"
          });

          setTimeout(() => {
            Alert.alert(
              "Could not proceed",
              error.response.data.detail,
              [{ text: "ok", onPress: () => console.log("hi") }],
              { cancelable: true }
            );
          }, 200);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("ERRORRRRRRR.REQUEST", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error.message", error.message);
        }
        //console.log("ERROR.CONFIG", error.config);
      })
      .then(() => {
        if (success) {
          // console.log("calling the workouts from server");
          dispatch(loadWorkoutFromServer());
          // dispatch(loadSearchListItems());
          // dispatch(switchToWorkout());
        }
      });
  };
};

export const loadWorkoutFromServer = (getDetails = false) => {
  return (dispatch, getState) => {
    dispatch({
      type: "load_workouts_from_server_status",
      payload: false
    });

    var Daily_Date = moment().format("YYYY-MM-DD");
    // console.log(
    //   "NEW DATE in GET_WORKOUTS is : ",
    //   new Date(moment.utc().format("YYYY-MM-DD HH:mm:ss"))
    // );

    axios
      .get(GET_WORKOUTS(getState().user.user.id, Daily_Date))
      .then(function(response) {
        var response_data = response.data;
        var data = response_data;
        var server_workoutID_Array = [];
        let workouts_dummy_array = [];

        // Getting all the workouts from realm inorder to save the ids , and compare them with the ids recieved from the server, and to delete the removed ones
        let realm_Workouts = realm.objects("WorkoutModel");
        var realm_workoutID_Array = [];
        for (var i in realm_Workouts) {
          let realm_workout_row = realm_Workouts[i];

          let r_w_id = realm_workout_row.id;
          realm_workoutID_Array.push(r_w_id);
        }

        // console.log(
        //   "------realm_workoutID_Array is realm: ",
        //   realm_workoutID_Array
        // );
        //looping first through th workout
        for (var data_index in data) {
          var workout_to_insert = {}; // will fillit it along the way

          var row = data[data_index];

          var d = row.pushed_date.split(" "); // splitting the date string got from the server

          var date_test = new Date(d[0]);
          var userTimezoneOffset = date_test.getTimezoneOffset() * 60000;

          console.log("d in GET_WORKOUTS is : ", d);
          console.log(
            "userTimezoneOffset in GET_WORKOUTS is : ",
            userTimezoneOffset
          );
          console.log(
            "moment in GET_WORKOUTS is : ",
            moment("2018-11-06T00:00:00.000Z")
          );
          console.log(
            "moment.ytc in GET_WORKOUTS is : ",
            moment.utc("2018-11-06T00:00:00.000Z")
          );

          if (row.description == null) {
            var workout_title = "";
          } else {
            var workout_title = row.description;
          }

          server_workoutID_Array.push(String(row.id));

          // filling
          workout_to_insert.id = String(row.id);
          workout_to_insert.title = workout_title;
          workout_to_insert.removed = String(row.removed);
          workout_to_insert.date = row.pushed_date;
          //new Date(
          //date_test.getTime() - userTimezoneOffset
          //);
          workout_to_insert.category = "workout"; //in-order to identify that its type is workout
          workout_to_insert.loged =
            row.user_feedback_date != null ? true : false;
          workouts_dummy_array.push(workout_to_insert);
        }
        //
        // console.log(
        //   "------server_workoutID_Array is server: ",
        //   server_workoutID_Array
        // );
        // console.log(
        //   "------workouts_dummy_array is $$$$: ",
        //   workouts_dummy_array
        // );

        //getting the difference between realm_workoutID_Array and server_workoutID_Array

        var difference = realm_workoutID_Array.filter(
          x => !server_workoutID_Array.includes(x)
        );
        console.log("------difference is: ", difference);
        // remove the modal
        dispatch({
          type: "load_free_daily_workouts_success"
        });
        return { difference, workouts_dummy_array };
      })
      .then(obj => {
        console.log("I am Removin from REALM !!!!!!!!!!!!!");
        // console.log("obj.difference is:  ", obj.difference);
        // console.log(
        //   "------obj.workouts_dummy_array is: ",
        //   obj.workouts_dummy_array
        // );

        if (obj.difference.length > 0) {
          for (var j in obj.difference) {
            var difference_row = obj.difference[j];

            let removed_workouts = realm
              .objects("WorkoutModel")
              .filtered("id = $0", difference_row);
            try {
              realm.write(() => {
                // check if there are workouts
                if (removed_workouts.length > 0) {
                  for (var index in removed_workouts) {
                    let _workout = removed_workouts[index];
                    // we need to check if these workouts have nested objects

                    if (_workout.moves.length > 0) {
                      for (var _move_index in _workout.moves) {
                        let _moves = _workout.moves[_move_index];

                        // we need to check if the moves have exercises
                        if (_moves.exercises.length > 0) {
                          for (var _exercise_index in _moves.exercises) {
                            let _exercise = _moves.exercises[_exercise_index];

                            if (_exercise.sets.length > 0) {
                              for (var _sets_index in _exercise.sets) {
                                let _set = _exercise.sets[_sets_index];

                                if (_set.rounds.length > 0)
                                  realm.delete(_set.rounds);
                              }
                              realm.delete(_exercise.sets);
                            }
                          }
                          realm.delete(_moves.exercises);
                        }
                      }
                      realm.delete(_workout.moves);
                    }
                  }
                  realm.delete(removed_workouts);
                }
              });
            } catch (e) {
              console.log("Error on Deleting from Realm : ", e);
            }
          }
        }

        console.log("---- Now Adding to the Realm the newly onse ----");
        for (var k in obj.workouts_dummy_array) {
          workout_dummy_row = obj.workouts_dummy_array[k];

          realm.write(() => {
            // update first and then link
            let current_workout = realm.create(
              "WorkoutModel",
              workout_dummy_row,
              true
            );

            // update user realm
            var user_workouts = getState().user.user.workouts;
            var workout_exists = false;
            for (var workout_realm_index in user_workouts) {
              var realm_workout = user_workouts[workout_realm_index];
              if (realm_workout.id == workout_dummy_row.id)
                workout_exists = true;
            }

            if (!workout_exists)
              getState().user.user.workouts.push(current_workout);
            // getState().user.user.workouts.push(workout_dummy_row);
          });
        }
      })

      .catch(function(error) {
        console.log("error getting the worouts", error);
        console.log("error.response getting the worouts", error.response);
      })
      .then(() => {
        dispatch(Server_loadDailyWorkouts_Realm());
        dispatch({
          type: "load_workouts_from_realm"
        });
        dispatch({
          type: "reload_user_from_realm"
        });
        // from realm
        dispatch({
          type: "load_daily_training"
        });

        dispatch({
          type: "load_workouts_from_server_status",
          payload: false
        });

        // workaround to to refresh the monthly view after update
        DeviceEventEmitter.emit("refreshMonthlyView", {});
      });
  };
};

export const loadWorkoutDetailFromServer = workout_id => {
  // code to fetch the workout detail
  // after finish
  return {};
};

// DEPRECATED
export const refreshDailyWorkoutView = () => {
  return {
    type: "load_daily_training"
  };
};
