import axios from "axios";
import realm from "../../../../../../models";
import {
  SUBMIT_WORKOUT,
  SUBMIT_USER_FEEDBACK,
  GET_DailyView_WORKOUT,
  SUBMIT_USER_REVIEW,
  SUBMIT_USER_REVIEW_PUT,
  GET_USER_REVIEW
} from "../../../../../../variables";
import moment from "moment";
import { Alert, Platform } from "react-native";

import { loadWorkoutFromServer } from "../../actions";
import { loadDailyNutrition } from "./../DailyNutritionScreen/actions";

import Mixpanel from "react-native-mixpanel";
import firebase from "react-native-firebase";

export const loadDailyTrainings = () => {
  return {
    type: "load_daily_training"
  };
};
export const RefreshingTab_0 = payload => {
  return {
    type: "Refreshing_Tab_0",
    payload: payload
  };
};

export const RefreshingTab_1 = () => {
  return {
    type: "Refreshing_Tab_1"
  };
};

export const gotoExerciseView = payload => {
  // we will return a function so that redux-thuk will know that its an asynchronice request
  return {
    type: "goto_exercise_view",
    payload: payload
  };
};
export const gotoWarmupView = payload => {
  // we will return a function so that redux-thuk will know that its an asynchronice request
  return {
    type: "goto_warmup_view",
    payload: payload
  };
};

export const gotoCircuitView = payload => {
  //logic behind going to the time based circuit or set based circuit
  if (payload.type == "set") {
    return {
      type: "goto_set_circuit_view",
      payload: payload
    };
  } else {
    return {
      type: "goto_time_circuit_view",
      payload: payload
    };
  }
};

export const Realm_loadDailyWorkouts = payload => {
  return {
    type: "dailyWorkoutlist_load",
    payload: payload
  };
};

export const Server_loadDailyWorkouts_Realm = payload => {
  return (dispatch, getState) => {
    // telling the user about the app activity
    // dispatch({
    //   type: "load_free_daily_workouts_start"
    // });
    var Daily_Date = moment().format("YYYY-MM-DD");

    console.log("Date in daily view Workout is :  : : : : : : >> ", Daily_Date);
    // get the latest goal model for the use
    axios
      .get(GET_DailyView_WORKOUT(getState().user.user.id, Daily_Date))
      .then(results => {
        let data = results.data;

        var workout_to_insert = {}; // will fillit it along the way
        var server_movesID_Array = [];
        var server_move_exerciseID_Array = [];
        var server_setID_Array = [];
        var server_warmupID_Array = [];
        var server_warmup_exerciseID = [];
        var server_warmup_setID_Array = [];
        var workouts_dummy_array = [];

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        var realm_moveID_Array = [];
        var realm_move_exerciseID_Array = [];
        var realm_setID_Array = [];
        var realm_warmupID_Array = [];
        var realm_warmup_exerciseID_Array = [];
        var realm_warmup_setID_Array = [];
        fetching_date = Daily_Date + "T00:00:00.000Z";
        console.log(
          "fetching_date is ™™™™™™™™™™™™™™™™™™ ™™™™™ £££££ ∞∞∞ : ",
          fetching_date
        );
        let realm_Workout = realm
          .objects("WorkoutModel")
          .filtered("date == $0", fetching_date);

        console.log(
          "Todays workout is : ##### #### : ",
          Array.from(realm_Workout)
        );

        for (var a in realm_Workout) {
          let realm_workout_row = realm_Workout[a];
          let realm_moves = realm_workout_row.moves;
          let realm_warmup = realm_workout_row.warmup;
          for (var b in realm_moves) {
            let moves_row = realm_moves[b];
            let r_m_id = moves_row.id; //move id
            realm_moveID_Array.push(r_m_id); //pushing the id's to the array
            let m_exercises = moves_row.exercises; //getting moves -> exersices
            for (var c in m_exercises) {
              let m_exercise_row = m_exercises[c];
              let r_m_e_id = m_exercise_row.id; //exercise id
              realm_move_exerciseID_Array.push(r_m_e_id); //pushing the id's to the array
              let m_e_sets = m_exercise_row.sets; //getting exersices -> sets
              for (var e in m_e_sets) {
                let m_e_sets_row = m_e_sets[e];
                let r_m_e_s_id = m_e_sets_row.id; //set id
                realm_setID_Array.push(r_m_e_s_id); //pushing the id's to the array
              }
            }
          }
          for (var f in realm_warmup) {
            let warmup_row = realm_warmup[f];
            let r_w_id = warmup_row.id; //warmup id
            realm_warmupID_Array.push(r_w_id); //pushing the id's to the array
            let w_exercises = warmup_row.exercises; //getting moves -> exersices
            for (var g in w_exercises) {
              let w_exercise_row = w_exercises[g];
              let r_w_e_id = w_exercise_row.id; //exercise id
              realm_warmup_exerciseID_Array.push(r_w_e_id); //pushing the id's to the array
              let w_e_sets = w_exercise_row.sets; //getting exersices -> sets
              for (var h in w_e_sets) {
                let w_e_sets_row = w_e_sets[h];
                let r_w_e_s_id = w_e_sets_row.id; //exercise id
                realm_warmup_setID_Array.push(r_w_e_s_id); //pushing the id's to the array
              }
            }
          }
        }

        console.log("------realm_moveID_Array is realm: ", realm_moveID_Array);
        console.log(
          "------realm_moves_exerciseID_Array is realm: ",
          realm_move_exerciseID_Array
        );
        console.log("------realm_setID_Array is realm: ", realm_setID_Array);
        console.log(
          "------realm_warmupID_Array is realm: ",
          realm_warmupID_Array
        );
        console.log(
          "------realm_warmup_exerciseID_Array is realm: ",
          realm_warmup_exerciseID_Array
        );
        console.log(
          "------realm_warmup_setID_Array is realm: ",
          realm_warmup_setID_Array
        );

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        for (var i in data) {
          var row = data[i];
          var d = row.pushed_date.split("T"); // splitting the date string got from the server
          //console.log("ROW.DESCRIPTION is >>>>>> ", row.description);
          if (row.description == null) {
            var workout_title = "";
          } else {
            var workout_title = row.description;
          }
          // filling
          workout_to_insert.id = String(row.id);
          workout_to_insert.title = workout_title;
          workout_to_insert.removed = String(row.removed);
          workout_to_insert.category = "workout"; //in-order to identify that its type is workout
          workout_to_insert.date = new Date(d[0]); //new Date(attributes.date);
          workout_to_insert.moves = [];
          workout_to_insert.warmup = [];
          var user_feedback = row.user_feedback;
          // getting the moves from the workouts and loop in them
          var moves = row.moves;
          var warmup = row.warm_up;
          for (var moves_index in moves) {
            var move_row = moves[moves_index];
            var exercises_row = move_row.exercises;

            server_movesID_Array.push(String(move_row.id));

            //filling
            move_to_insert = {
              id: String(move_row.id),
              type:
                move_row.type == 1 || move_row.type == null
                  ? "normal"
                  : "circuit",
              timer: parseInt(move_row.timer) || 0,
              category: "moves", //in-order to identify that its type is moves
              repetitions: parseInt(move_row.repetitions) || 0,
              exercises: []
            };

            // fetching the exerices from the moves
            for (var exercises_index in exercises_row) {
              var exercise_row = exercises_row[exercises_index];
              var video_id = "";
              var thumbnail_url = "";
              sets_row = exercise_row.exercise_sets;

              if (exercise_row.exercise.video == null) {
                video_id = "";
                thumbnail_url = "";
              } else {
                video_id = exercise_row.exercise.video.id;
                thumbnail_url = exercise_row.exercise.video.thumbnail_url;
              }

              server_move_exerciseID_Array.push(String(exercise_row.id));

              var exercise_to_insert = {
                id: String(exercise_row.id),
                title: exercise_row.exercise.name || "",
                description: exercise_row.exercise.description || "",
                video_id: String(video_id) || "",
                thumbnail_url: String(thumbnail_url) || "",
                bitwise_logic: exercise_row.exercise.bitwise_logic || 0,
                sets: []
              };
              if (exercise_row.exercise.video != null) {
                var video_tags_array = [];
                for (tag_index in exercise_row.exercise.video.tag_name) {
                  var tagRow = exercise_row.exercise.video.tag_name[tagRow];
                  video_tags_array.push(tagRow);
                }
                var video_tags = video_tags_array.toString();

                var video_to_insert = {
                  id: String(exercise_row.exercise.video.id) || "",
                  video_picture_url:
                    exercise_row.exercise.video.thumbnail_url || "",
                  video_url: exercise_row.exercise.video.url || "",
                  title: exercise_row.exercise.video.title || "",
                  description: exercise_row.exercise.video.description || "",
                  timer: exercise_row.exercise.video.timer || "",
                  tags: video_tags
                };
                try {
                  realm.write(() => {
                    realm.create("VideoModel", video_to_insert, true);
                  });
                } catch (error) {
                  console.log(
                    "Workout_detail Action : Error in Creating a Video Model the error is : ",
                    error
                  );
                }
              }
              for (var sets_index in sets_row) {
                var set_row = sets_row[sets_index];

                if (set_row.exercise_set_round.length > 0) {
                  console.log("I am where there is accomplished Values");
                  for (var set_round_index in set_row.exercise_set_round) {
                    var set_round = set_row.exercise_set_round[set_round_index];

                    var accomplished_distance = set_round.accomplished_distance;
                    var accomplished_height = set_round.accomplished_height;
                    var accomplished_repetitions =
                      set_round.accomplished_repetitions;
                    var accomplished_reps_left =
                      set_round.accomplished_reps_left;
                    var accomplished_rest_time =
                      set_round.accomplished_rest_time;
                    var accomplished_time = set_round.accomplished_time;
                    var accomplished_weight = set_round.accomplished_weight;
                  }
                } else {
                  var accomplished_distance = "";
                  var accomplished_height = "";
                  var accomplished_repetitions = "";
                  var accomplished_reps_left = "";
                  var accomplished_rest_time = "";
                  var accomplished_time = "";
                  var accomplished_weight = "";
                }
                var varaitions_array = [];
                for (var var_index in set_row.variations) {
                  var variation_row = set_row.variations[var_index];
                  varaitions_array.push(variation_row);
                }

                server_setID_Array.push(String(set_row.id));

                set_to_insert = {
                  id: String(set_row.id),
                  repetitions: String(set_row.repetitions) || "0",
                  weight: String(set_row.weight) || "0",
                  height: String(set_row.height) || "0",
                  time: String(set_row.time) || "0",
                  distance: String(set_row.distance) || "0",
                  order: String(set_row.order) || "0",
                  restTime: String(set_row.rest_time) || "0",
                  reps_left: String(set_row.reps_left) || "0",
                  variations: varaitions_array || []

                  // we need to add the max of the exercise
                  // max:
                  // reps left
                };
                console.log("user_feedback >>>> > >> > >: ", user_feedback);

                if (user_feedback != "" && user_feedback != null) {
                  set_to_insert.accomplished_repetitions =
                    String(accomplished_repetitions) || "";
                  set_to_insert.accomplished_time =
                    String(accomplished_time) || "";
                  set_to_insert.accomplished_rest_time =
                    String(accomplished_rest_time) || "";
                  set_to_insert.accomplished_distance =
                    String(accomplished_distance) || "";
                  set_to_insert.accomplished_height =
                    String(accomplished_height) || "";
                  set_to_insert.accomplished_weight =
                    String(accomplished_weight) || "";
                  set_to_insert.accomplished_reps_left =
                    String(accomplished_reps_left) || "";
                }

                // fill the sets
                exercise_to_insert.sets.push(set_to_insert);
              }

              // adding the exercise and its sets
              move_to_insert.exercises.push(exercise_to_insert);
            }

            // adding the exercise after filling it
            workout_to_insert.moves.push(move_to_insert);
          }
          //=========================================================================

          for (var warmup_index in warmup) {
            var warmup_row = warmup[warmup_index];
            var warmup_exercises_row = warmup_row.exercises;

            server_warmupID_Array.push(String(warmup_row.id));
            //filling
            warmup_to_insert = {
              id: String(warmup_row.id),
              date: warmup_row.workout_date,
              category: "warmup", //in-order to identify that its type is warmup
              title: warmup_row.name || "",
              exercises: []
            };

            // fetching the exerices from the warmup
            for (var warmup_exercises_index in warmup_exercises_row) {
              var warmup_exercise_row =
                warmup_exercises_row[warmup_exercises_index];
              var warmup_video_id = "";
              var warmup_thumbnail_url = "";
              warmup_sets_row = warmup_exercise_row.exercise_sets;

              if (warmup_exercise_row.exercise.video == null) {
                warmup_video_id = "";
                warmup_thumbnail_url = "";
              } else {
                warmup_video_id = warmup_exercise_row.exercise.video.id;
                warmup_thumbnail_url =
                  warmup_exercise_row.exercise.video.thumbnail_url;
              }

              server_warmup_exerciseID.push(String(warmup_exercise_row.id));

              var warmup_exercise_to_insert = {
                id: String(warmup_exercise_row.id),
                warmup_id: String(warmup_row.id),
                title: warmup_exercise_row.exercise.name || "",
                date: warmup_row.workout_date || "",
                warm_up_title: warmup_row.name || "",
                category: "warmup", //in-order to identify that its type is warmup
                description: warmup_exercise_row.exercise.description || "",
                video_id: String(warmup_video_id) || "",
                thumbnail_url: String(warmup_thumbnail_url) || "",
                bitwise_logic: warmup_exercise_row.exercise.bitwise_logic || 0,
                sets: []
              };

              if (warmup_exercise_row.exercise.video != null) {
                var warmup_video_tags_array = [];
                for (warmup_tag_index in warmup_exercise_row.exercise.video
                  .tag_name) {
                  var warmup_tagRow =
                    warmup_exercise_row.exercise.video.tag_name[warmup_tagRow];
                  warmup_video_tags_array.push(warmup_tagRow);
                }
                var warmup_video_tags = warmup_video_tags_array.toString();

                var warmup_video_to_insert = {
                  id: String(warmup_exercise_row.exercise.video.id) || "",
                  video_picture_url:
                    warmup_exercise_row.exercise.video.thumbnail_url || "",
                  video_url: warmup_exercise_row.exercise.video.url || "",
                  title: warmup_exercise_row.exercise.video.title || "",
                  description:
                    warmup_exercise_row.exercise.video.description || "",
                  timer: warmup_exercise_row.exercise.video.timer || "",
                  tags: warmup_video_tags
                };
                try {
                  realm.write(() => {
                    realm.create("VideoModel", warmup_video_to_insert, true);
                  });
                } catch (error) {
                  console.log(
                    "Workout_detail Action : Error in Creating a WarmUp Video Model the error is : ",
                    error
                  );
                }
              }
              for (var warmup_sets_index in warmup_sets_row) {
                var warmup_set_row = warmup_sets_row[warmup_sets_index];

                server_warmup_setID_Array.push(String(warmup_set_row.id));

                warmup_set_to_insert = {
                  id: String(warmup_set_row.id),
                  repetitions: String(warmup_set_row.repetitions) || "0",
                  weight: String(warmup_set_row.weight) || "0",
                  height: String(warmup_set_row.height) || "0",
                  time: String(warmup_set_row.time) || "0",
                  distance: String(warmup_set_row.distance) || "0",
                  order: String(warmup_set_row.order) || "0",
                  restTime: String(warmup_set_row.rest_time) || "0",
                  reps_left: String(warmup_set_row.reps_left) || "0"
                  // we need to add the max of the exercise
                  // max:
                  // reps left
                };
                // fill the sets
                warmup_exercise_to_insert.sets.push(warmup_set_to_insert);
              }

              // adding the exercise and its sets
              warmup_to_insert.exercises.push(warmup_exercise_to_insert);
            }

            // adding the exercise after filling it
            workout_to_insert.warmup.push(warmup_to_insert);
          }

          //========================================================================
          workouts_dummy_array.push(workout_to_insert);
        }
        //========================================================================
        var difference_moves = realm_moveID_Array.filter(
          x => !server_movesID_Array.includes(x)
        );
        var difference_moves_exercise = realm_move_exerciseID_Array.filter(
          x => !server_move_exerciseID_Array.includes(x)
        );
        var difference_moves_sets = realm_setID_Array.filter(
          x => !server_setID_Array.includes(x)
        );
        var difference_warmup = realm_warmupID_Array.filter(
          x => !server_warmupID_Array.includes(x)
        );
        var difference_warmup_exercise = realm_warmup_exerciseID_Array.filter(
          x => !server_warmup_exerciseID.includes(x)
        );
        var difference_warmup_sets = realm_warmup_setID_Array.filter(
          x => !server_warmup_setID_Array.includes(x)
        );

        console.log(" The Difference_moves is : ", difference_moves);
        console.log(
          " The Difference_moves_exercises is : ",
          difference_moves_exercise
        );
        console.log(" The Difference_moves_sets is : ", difference_moves_sets);
        console.log(" The Difference_warmup is : ", difference_warmup);
        console.log(
          " The Difference_warmup_exercises is : ",
          difference_warmup_exercise
        );
        console.log(
          " The Difference_warmup_sets is : ",
          difference_warmup_sets
        );

        //========================================================================

        return {
          difference_moves,
          difference_moves_exercise,
          difference_moves_sets,
          difference_warmup,
          difference_warmup_exercise,
          difference_warmup_sets,
          workouts_dummy_array
        };
      })
      // realm.write(() => {
      //   getState().user.user.goal.freedailyWorkout = true;
      // });
      // success = true;

      // dispatch(loadWorkoutFromServer());

      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

          // just so we can hide the fade thing
          dispatch({
            type: "load_free_daily_workouts_success"
          });

          setTimeout(() => {
            Alert.alert(
              "Could not proceed",
              error.response.data.errors, //[0].detail,
              [{ text: "ok", onPress: () => console.log("hi") }],
              { cancelable: true }
            );
          }, 200);
        } else if (error.request) {
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      })
      .then(obj => {
        console.log("I am Removin from REALM !!!!!!!!!!!!!");
        // console.log("obj.difference is:  ", obj.difference);

        console.log(
          "------obj.workouts_dummy_array is: ",
          obj.workouts_dummy_array
        );

        //========================================================================
        //==================Moves diffrence deletion=============================
        //========================================================================
        dispatch({
          type: "dailyView_Removing"
        });
        if (obj.difference_moves.length > 0) {
          for (var j in obj.difference_moves) {
            var difference_moves_row = obj.difference_moves[j];

            let removed_moves = realm
              .objects("MoveModel")
              .filtered("id = $0", difference_moves_row);
            try {
              realm.write(() => {
                // check if there are workouts

                if (removed_moves.length > 0) {
                  for (var index_1 in removed_moves) {
                    let _moves = removed_moves[index_1];

                    if (_moves.exercises.length > 0) {
                      for (var index_2 in _moves.exercises) {
                        let _exercise = _moves.exercises[index_2];

                        if (_exercise.sets.length > 0) {
                          for (var index_3 in _exercise.sets) {
                            let _set = _exercise.sets[index_3];

                            if (_set.rounds.length > 0)
                              realm.delete(_set.rounds);
                          }
                          realm.delete(_exercise.sets);
                        }
                      }
                      realm.delete(_moves.exercises);
                    }
                  }
                  realm.delete(removed_moves);
                }
              });
            } catch (e) {
              console.log("Error on Deleting from Realm : ", e);
            }
          }
        } else if (obj.difference_moves_exercise.length > 0) {
          for (var j in obj.difference_moves_exercise) {
            var difference_moves_exercise_row =
              obj.difference_moves_exercise[j];

            let removed_moves_exercises = realm
              .objects("ExerciseModel")
              .filtered("id = $0", difference_moves_exercise_row);
            try {
              realm.write(() => {
                // check if there are workouts
                if (removed_moves_exercises.length > 0) {
                  for (var index in removed_moves_exercises) {
                    let _exercise = removed_moves_exercises[index]; //moves
                    // we need to check if the moves have exercises
                    if (_exercise.sets.length > 0) {
                      for (var _sets_index in _exercise.sets) {
                        let _set = _exercise.sets[_sets_index];

                        if (_set.rounds.length > 0) realm.delete(_set.rounds);
                      }
                      realm.delete(_exercise.sets);
                    }
                  }
                  realm.delete(removed_moves_exercises);
                }
              });
            } catch (e) {
              console.log("Error on Deleting from Realm : ", e);
            }
          }
        } else if (obj.difference_moves_sets.length > 0) {
          for (var j in obj.difference_moves_sets) {
            var difference_moves_exercise_sets_row =
              obj.difference_moves_sets[j];

            let removed_moves_exercises_sets = realm
              .objects("SetModel")
              .filtered("id = $0", difference_moves_exercise_sets_row);
            try {
              realm.write(() => {
                // check if there are workouts
                if (removed_moves_exercises_sets.length > 0) {
                  for (var index in removed_moves_exercises_sets) {
                    let _set = removed_moves_exercises_sets[index]; //moves
                    // we need to check if the moves have exercises
                    if (_set.rounds.length > 0) realm.delete(_set.rounds);
                  }
                  realm.delete(removed_moves_exercises_sets);
                }
              });
            } catch (e) {
              console.log("Error on Deleting from Realm : ", e);
            }
          }
        }
        //========================================================================
        //==================Warmup diffrence deletion=============================
        //========================================================================

        if (obj.difference_warmup.length > 0) {
          for (var j in obj.difference_warmup) {
            var difference_warmup_row = obj.difference_warmup[j];

            let removed_warmup = realm
              .objects("WarmUpModel")
              .filtered("id = $0", difference_warmup_row);
            try {
              realm.write(() => {
                // check if there are workouts

                if (removed_warmup.length > 0) {
                  for (var index_1 in removed_warmup) {
                    let _warmup = removed_warmup[index_1];

                    if (_warmup.exercises.length > 0) {
                      for (var index_2 in _warmup.exercises) {
                        let _exercise = _warmup.exercises[index_2];

                        if (_exercise.sets.length > 0)
                          realm.delete(_exercise.sets);
                      }
                      realm.delete(_warmup.exercises);
                    }
                  }
                  realm.delete(removed_warmup);
                }
              });
            } catch (e) {
              console.log("Error on Deleting from Realm : ", e);
            }
          }
        } else if (obj.difference_warmup_exercise.length > 0) {
          for (var j in obj.difference_warmup_exercise) {
            var difference_warmup_exercise_row =
              obj.difference_warmup_exercise[j];

            let removed_warmup_exercises = realm
              .objects("WarmUpExerciseModel")
              .filtered("id = $0", difference_warmup_exercise_row);
            try {
              realm.write(() => {
                // check if there are workouts
                if (removed_warmup_exercises.length > 0) {
                  for (var index in removed_warmup_exercises) {
                    let _exercise = removed_warmup_exercises[index]; //warmup exercises
                    // we need to check if the exercises have sets_row
                    if (_exercise.sets.length > 0) realm.delete(_exercise.sets);
                  }
                  realm.delete(removed_warmup_exercises);
                }
              });
            } catch (e) {
              console.log(
                "Error on Deleting from Realm, WarmUpExerciseModel : ",
                e
              );
            }
          }
        } else if (obj.difference_warmup_sets.length > 0) {
          for (var j in obj.difference_warmup_sets) {
            var difference_warmup_exercise_row = obj.difference_warmup_sets[j];

            let removed_warmup_exercises_sets = realm
              .objects("WarmUpSetModel")
              .filtered("id = $0", difference_warmup_exercise_row);
            try {
              realm.write(() => {
                // check if there are workouts
                if (removed_warmup_exercises_sets.length > 0)
                  realm.delete(removed_warmup_exercises_sets);
              });
            } catch (e) {
              console.log("Error on Deleting from Realm, WarmUpSetModel : ", e);
            }
          }
        }

        console.log("---- Now Adding to the Realm the newly onse ----");
        for (var k in obj.workouts_dummy_array) {
          workout_dummy_row = obj.workouts_dummy_array[k];
          try {
            realm.write(() => {
              // update first and then link
              let current_workout = realm.create(
                "WorkoutModel",
                workout_dummy_row,
                true
              );
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
            // success = true;
          } catch (error) {
            console.log(
              "Cannot Add All Workout Models Corresponding Models in Daily workout !!!!!!!!",
              error
            );
          }
        }
      })

      .then(() => {
        // console.log("calling the workouts from server");
        // dispatch(loadWorkoutFromServer());
        dispatch({
          type: "load_daily_training"
        });

        // in both cases we need to refresh the monthyl view
        dispatch({
          type: "load_workouts_from_realm"
        });
      });
  };
};

//=================== ====================== =============== ================= = = = = = = =

export const logDaySubmit = payload => {
  return (dispatch, getState) => {
    dispatch({
      type: "log_workout_submit_start"
    });

    if (Platform.OS != "android")
      firebase.analytics().logEvent("WorkoutLogged");
    Mixpanel.track("Workout Logged");

    // hydrate all the current workout into a proper submit data
    try {
      var final_obj = {};
      var workoutNeededToBeLoged = realm.objectForPrimaryKey(
        "WorkoutModel",
        payload.workoutId
      );
      var date = moment(payload.date).format("YYYY-MM-DD");
      var nutritionNeededToBeLoged = realm
        .objects("NutritionModel")
        .filtered("date CONTAINS[c] $0", date);

      //building the model
      final_obj.user_feedback = payload.text || "";
      final_obj.user_nutrition_feedback = payload.nut_text || "";
      final_obj.user_workout_id = payload.workoutId;
      final_obj.user_goal_id = getState().user.user.goal[0].id;

      // final_obj.moves = [];
      // final_obj.exercses = [];
      final_obj.sets = [];
      final_obj.nutritions = [];

      for (var move_index in workoutNeededToBeLoged.moves) {
        var move = workoutNeededToBeLoged.moves[move_index];
        // var constructed_move = {
        //   id: move.id,
        //   accomplished_timer: "123",
        //   accomplished_repetitions: String(move.accomplished_repetitions),
        //   exercises: []
        // };

        for (var exercise_index in move.exercises) {
          var exercise = move.exercises[exercise_index];

          // var constructed_exercise = {
          //   id: exercise.id,
          //   accomplished_repetitions: "123",
          //   sets: []
          // };

          for (var set_index in exercise.sets) {
            var set = exercise.sets[set_index];

            // check for the set based circuit
            if (move.repetitions != 0) {
              // tha means its a set based circuit
              for (var round_index in set.rounds) {
                var round_row = set.rounds[round_index];

                var constructed_set = {
                  id: set.id,
                  accomplished_repetitions:
                    round_row.accomplished_repetitions || "0",
                  accomplished_time: round_row.accomplished_time || "0",
                  accomplished_weight: round_row.accomplished_weight || "0",
                  accomplished_weight_unit: "kg",
                  accomplished_distance: round_row.accomplished_distance || "0",
                  accomplished_height: round_row.accomplished_height || "0",
                  accomplished_reps_left:
                    round_row.accomplished_reps_left || "0",
                  accomplished_rest_time:
                    round_row.accomplished_rest_time || "0",
                  round_number: round_row.round || "0"
                };

                // adding the sets to the exercise

                final_obj.sets.push(constructed_set);
              }
            } else {
              // its a normal set that does not require round number
              var constructed_set = {
                id: set.id,
                accomplished_repetitions: set.accomplished_repetitions,
                accomplished_time: set.accomplished_time,
                accomplished_weight: set.accomplished_weight,
                accomplished_weight_unit: "kg",
                accomplished_distance: set.accomplished_distance,
                accomplished_height: set.accomplished_height,
                accomplished_reps_left: set.accomplished_reps_left,
                accomplished_rest_time: set.accomplished_rest_time,
                round_number: "0"
              };

              final_obj.sets.push(constructed_set);
            }
          }
        }
      }

      for (var nut_index in nutritionNeededToBeLoged) {
        var nut_row = nutritionNeededToBeLoged[nut_index];

        var notlogString = "NOTLOGGED";
        if (nut_row.id.includes("NOTLOGGED") == true) {
          //differentiating between the logged meals in nutrition model and the not logged ones
          var meal_id = "";
          var added_by_user = "1";
        } else {
          var meal_id = nut_row.id;
          var added_by_user = "0";
        }

        if (nut_row.protein_intake == null || nut_row.protein_intake == "") {
          var protein_intake = "0";
        } else {
          var protein_intake = nut_row.protein_intake;
        }
        if (nut_row.carbs_intake == null || nut_row.carbs_intake == "") {
          var carbs_intake = "0";
        } else {
          var carbs_intake = nut_row.carbs_intake;
        }
        if (nut_row.fiber_intake == null || nut_row.fiber_intake == "") {
          var fiber_intake = "0";
        } else {
          var fiber_intake = nut_row.fiber_intake;
        }
        if (nut_row.fats_intake == null || nut_row.fats_intake == "") {
          var fats_intake = "0";
        } else {
          var fats_intake = nut_row.fats_intake;
        }
        if (nut_row.sugar_intake == null || nut_row.sugar_intake == "") {
          var sugar_intake = "0";
        } else {
          var sugar_intake = nut_row.sugar_intake;
        }
        if (nut_row.sodium_intake == null || nut_row.sodium_intake == "") {
          var sodium_intake = "0";
        } else {
          var sodium_intake = nut_row.sodium_intake;
        }
        if (
          nut_row.cholesterol_intake == null ||
          nut_row.cholesterol_intake == ""
        ) {
          var cholesterol_intake = "0";
        } else {
          var cholesterol_intake = nut_row.cholesterol_intake;
        }
        if (nut_row.water_intake == null || nut_row.water_intake == "") {
          var water_intake = "0";
        } else {
          var water_intake = nut_row.water_intake;
        }
        nutrition_Obj = {
          id: meal_id,
          name: nut_row.name,
          date: nut_row.date,
          added_by_user: added_by_user,
          protein_intake: protein_intake,
          carbs_intake: carbs_intake,
          fiber_intake: fiber_intake,
          fats_intake: fats_intake,
          sugar_intake: sugar_intake,
          sodium_intake: sodium_intake,
          cholesterol_intake: cholesterol_intake,
          water_intake: water_intake
        };
        final_obj.nutritions.push(nutrition_Obj);
      }
    } catch (err) {
      console.log("Error occured while filling final_obj: ", err);
      Alert.alert(
        "Oops!",
        "Something went wrong when trying to save your workout, we are trying hard to fix this issue.",
        [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
        { cancelable: true }
      );

      return;
    }

    // this variable will hold wether the data is synced or not to the server
    var synced = false;

    // submitting the data to the server
    axios
      .post(
        SUBMIT_WORKOUT(getState().user.user.id, payload.workoutId),
        { data: final_obj },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(function(response) {
        console.log("Response in The SubmitWOrkout is :  ", response);

        synced = true;

        if (Platform.OS != "android")
          firebase.analytics().logEvent("WorkoutLoggedSuccessfull");
        Mixpanel.trackWithProperties("Workout Logged", { succesful: true });
        Mixpanel.increment("Logged workouts", 1);

        var notLoggedMeal = realm
          .objects("NutritionModel")
          .filtered('id CONTAINS "NOTLOGGED" AND date CONTAINS[c] $0 ', date);
        // only update realm database if it was successfully sent to the server
        realm.write(() => {
          workoutNeededToBeLoged.loged = true;
          workoutNeededToBeLoged.uesrMessage = payload.text || "";
          workoutNeededToBeLoged.synced = synced;

          realm.delete(notLoggedMeal); //inorder to delete the nologged Meal after its succesfully logged
        });
        dispatch({
          type: "notlogged_arelogged" //inorder to empty the reducer from the deleted stuff
        });
        // dispatch(Submit_User_Feedback(payload));
      })
      .catch(function(error) {
        console.log(
          "ERROR.RESPONSE IN AXIOS on SUBMIT_USER_FEEDBACK!!!!",
          error.response
        );

        if (Platform.OS != "android")
          firebase.analytics().logEvent("WorkoutLoggedNotSuccessfull");
        Mixpanel.trackWithProperties("Workout Logged", { succesful: false });

        if (Object.keys(error).length == 0) {
          console.log("no internet");

          setTimeout(() => {
            Alert.alert("Failed", "No Network Found", [
              {
                text: "ok",
                onPress: () => dispatch({ type: "log_workout_submit_fail" })
              }
            ]);
          }, 400);
        } else {
          const response = error.response;

          setTimeout(() => {
            Alert.alert("Failed", response.data.detail, [
              {
                text: "ok",
                onPress: () => dispatch({ type: "log_workout_submit_fail" })
              }
            ]);
          }, 400);
          dispatch({ type: "log_workout_submit_fail" });
        }
      })
      .then(() => {
        dispatch(LoggedWorkoutCheck());
        dispatch({
          type: "log_workout_submit_success"
        });
        dispatch({
          type: "load_daily_training"
        });
        dispatch(loadWorkoutFromServer());
        dispatch(loadDailyNutrition());
      });
  };
};

const LoggedWorkoutCheck = () => {
  try {
    // realm.write(() => {
    let unloggedWorkouts = realm
      .objects("WorkoutModel")
      .filtered("loged = $0", false);

    if (unloggedWorkouts.length == 0) {
      return {
        type: "ALLWORKOUTS_LOGGED",
        payload: true
      };
    }
  } catch (e) {}
  return {
    type: ""
  };
};

export const closeRatingModal = () => {
  return {
    type: "ALLWORKOUTS_LOGGED",
    payload: false
  };
};

// export const submitRating = payload => {
//   return dispatch => {
//     let pt_id = payload.pt_id;
//     let user_id = payload.user_id;
//     let user_rating = payload.user_rating;
//     let user_rating_comment = payload.user_rating_comment;
//
//     var bodyFormData = new FormData();
//     bodyFormData.append("review", user_rating_comment);
//     bodyFormData.append("rating", user_rating);
//     bodyFormData.append("personal_trainer", pt_id);
//     bodyFormData.append("user", user_id);
//
//     axios
//       .post(SUBMIT_USER_REVIEW(), bodyFormData)
//       .then(res => {
//         console.log(res);
//       })
//       .catch(err => {
//         console.log(err);
//         console.log(err.response);
//       })
//       .finally(() => {});
//   };
// };

export const submitRating = payload => {
  return async dispatch => {
    let pt_id = payload.pt_id;
    let user_id = payload.user_id;
    let user_rating = payload.user_rating;
    let user_rating_comment = payload.user_rating_comment;

    var bodyFormData = new FormData();
    bodyFormData.append("review", user_rating_comment);
    bodyFormData.append("rating", user_rating);
    bodyFormData.append("personal_trainer", pt_id);
    bodyFormData.append("user", user_id);
    let personal_trainer = realm
      .objects("PersonalTrainerModel")
      .filtered("id == $0", pt_id);
    let personal_trainer_rating_id = personal_trainer[0].ratingId;
    let personal_trainer_rating = personal_trainer[0].ratingStars;
    let personal_trainer_review = personal_trainer[0].ratingText;

    try {
      console.log("personal_trainer_rating:  ", personal_trainer_rating);
      if (
        personal_trainer_rating == null ||
        personal_trainer_rating == "null"
      ) {
        console.log("I am here  in POST ");
        response = await axios.post(SUBMIT_USER_REVIEW(), bodyFormData);
      } else {
        console.log("I am here  in PUT ");
        response = await axios.put(
          SUBMIT_USER_REVIEW_PUT(personal_trainer_rating_id),
          bodyFormData
        );
      }
      console.log("response is", response);
      dispatch(get_user_review(payload));
    } catch (err) {
      console.log("error is", err);
    }
  };
};

export const get_user_review = payload => {
  return async dispatch => {
    let pt_id = payload.pt_id;
    let user_id = payload.user_id;
    let user_rating = payload.user_rating;
    let user_rating_comment = payload.user_rating_comment;
    try {
      response = await axios.get(GET_USER_REVIEW(pt_id));

      console.log("response is", response);
      let results = response.data.results[0];

      let ratingId = results.id;
      let user_rating = results.rating;
      let user_rating_comment = results.review;

      try {
        realm.write(() => {
          // Update th UserModel object
          realm.create(
            "PersonalTrainerModel",
            {
              id: String(pt_id),
              ratingId: String(ratingId),
              ratingStars: String(user_rating),
              ratingText: String(user_rating_comment)
            },
            true // check if it its laready inserted otherwise update
          );
        });
      } catch (error) {
        console.log(
          "Cannot Update  The New user_rating and the user_rating_comment  in PersonalTrainerModel Model !!!!!!!!",
          error
        );
      }
    } catch (err) {
      console.log("error is", err);
    }
  };
};
