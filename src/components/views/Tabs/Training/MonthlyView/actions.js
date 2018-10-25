import { loadWorkoutDetailFromServer } from "../actions";
import axios from "axios";
import realm from "../../../../../models";
import { GET_WORKOUT_DETAIL } from "../../../../../variables";

export const gotoWorkout = payload => {
  // we will return a function so that redux-thuk will know that its an asynchronice request
  return (dispatch, getState) => {
    //================================To Be EDITED================================
    dispatch({
      type: "daily_training_update_fetching",
      payload: true
    });
    axios
      .get(GET_WORKOUT_DETAIL(payload.workout_id))
      .then(results => {
        //console.log("success monthly WORKOUTS CONTAINS !! ->: ", results);
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

        let realm_Workout = realm
          .objects("WorkoutModel")
          .filtered("id == $0", payload.workout_id);

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

        var d = data.pushed_date.split("T"); // splitting the date string got from the server
        console.log("I am here in the Monthly workouts");
        if (data.description == null) {
          var workout_title = "";
        } else {
          var workout_title = data.description;
        }

        // filling
        workout_to_insert.id = String(data.id);
        workout_to_insert.title = workout_title;
        workout_to_insert.category = "workout"; //in-order to identify that its type is workout
        workout_to_insert.date = new Date(d[0]); //new Date(attributes.date);
        workout_to_insert.moves = [];
        workout_to_insert.warmup = [];

        // getting the moves from the workouts and loop in them
        var user_feedback = data.user_feedback;
        var moves = data.moves;
        var warmup = data.warm_up;
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
                var tagRow = exercise_row.exercise.video.tag_name[tag_index];
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
                for (var set_round_index in set_row.exercise_set_round) {
                  var set_round = set_row.exercise_set_round[set_round_index];

                  var accomplished_distance = set_round.accomplished_distance;
                  var accomplished_height = set_round.accomplished_height;
                  var accomplished_repetitions =
                    set_round.accomplished_repetitions;
                  var accomplished_reps_left = set_round.accomplished_reps_left;
                  var accomplished_rest_time = set_round.accomplished_rest_time;
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

              console.log("user_feedback : is ::::: : :: : : ", user_feedback);

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
              category: "warmup", //in-order to identify that its type is warmup
              warm_up_title: warmup_row.name || "",
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

        let workout_detailed_id = payload.workout_id;

        return {
          difference_moves,
          difference_moves_exercise,
          difference_moves_sets,
          difference_warmup,
          difference_warmup_exercise,
          difference_warmup_sets,
          workouts_dummy_array,
          workout_detailed_id
        };
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("Error in Monthly View Workout: > ", error);
          console.log(
            "ERROR.RESPONSE in Monthly View Workout: >>> ",
            error.response
          );

          // just so we can hide the fade thing
          dispatch({
            type: "load_free_daily_workouts_success"
          });

          setTimeout(() => {
            // Alert.alert(
            //   "Could not proceed",
            //   [{ text: "ok", onPress: () => console.log("hi") }],
            //   { cancelable: true }
            // );
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
          type: "MonthlyView_Detailed_Removing"
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
              "Cannot Add All Workout Models Corresponding Models in detailed workout !!!!!!!!",
              error
            );
          }
        }
      })
      .then(() => {
        dispatch({
          type: "load_workouts_success"
        });

        dispatch({
          type: "daily_training_update_fetching",
          payload: false
        });
        dispatch({
          type: "load_daily_training"
        });

        dispatch({
          type: "load_workouts_from_realm"
        });

        // workaround to to refresh the monthly view after update
        DeviceEventEmitter.emit("refreshMonthlyView", {});
      });
    //================================To Be EDITED================================

    if (payload.openStack) {
      dispatch({
        type: "goto_workout_listview",
        payload: payload
      });
    }

    dispatch({
      type: "load_workouts_from_realm"
    });
  };
};

export const loadDataFromRealm = () => {
  return {
    type: "load_workouts_from_realm"
  };
};
export const onItemDayPressed = () => {
  return {
    type: "workout_date_pressed"
  };
};
