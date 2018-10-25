// import data from './data.json';
import realm from "../../../../../../models";
import moment from "moment";
// get only the current workouts for today only
var today = moment().format(" YYYY MM DD");
// reset the hours to 0 so the workout will be fetched

var tommorrow = new Date(today.valueOf() + 1000 * 3600 * 24);

// this is also used in the Monthly View reducer
export const getTodayWorkout = (workout_id = null) => {
  var today_workout = [];
  var array_type = [];
  var warm_up_array = [];
  if (workout_id != null) {
    // this is the case when the user clicks a workout form the monthly view
    let workout = realm.objectForPrimaryKey("WorkoutModel", workout_id);
    let warmups = realm
      .objects("WorkoutModel")
      .filtered("id == $0", workout_id);

    // console.log(
    //   "...warmups[0].warmup is : >>! , >>>! , >>! : ",
    //   ...warmups[0].warmup
    // );

    if (warmups[0].warmup.length > 0) {
      // console.log("I am here where warm_up_array.length is  > zero ");
      // console.log(
      //   "I am here where ...warmups[0].warmup is : @@@@!!!!@@@ @@@!!@@ @@!!@ @@@@ ",
      //   ...warmups[0].warmup
      // );
      //warm_up_array.push([...warmups[0].warmup]);
      array_type.push([...warmups[0].warmup]);
      //array_type.push(warm_up_array);
      array_type.push([workout]);
    } else {
      //array_type.push(warm_up_array);
      array_type.push([workout]);
    }
    return mapWorkoutArrayToSectionList(array_type);
  } else {
    var today_array_type = [];
    // this is the case where the user will load the daily workouts
    var today_date = new Date();
    var today = moment(today_date).format("YYYY-MM-DD");
    var today_warmups = realm
      .objects("WorkoutModel")
      .filtered("date == $0", today)
      .sorted("date");
    // console.log("WARMUP QUERY IS : !@#$!@#!@# : ", Array.from(today_warmups));
    try {
      var today_workout = realm
        .objects("WorkoutModel")
        .filtered("date = $0", today)
        .sorted("date");
      // console.log(" >>>>>> today in the reducer is ::::::::::: ", today);
      // console.log(
      //   " >>>>>> today_workout in the reducer is ::::::::::: >>>>>>>>> ::::::: ",
      //   Array.from(today_workout)
      // );

      var indexed_workouts = [];
      // get all the retreived workouts and store them into an array
      for (var index in today_workout) {
        var workout = today_workout[index];
        let w_date =
          workout.date.getFullYear() +
          "-" +
          ("0" + (workout.date.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + workout.date.getDate()).slice(-2);

        if (!indexed_workouts[w_date]) indexed_workouts[w_date] = [];

        indexed_workouts[w_date].push(workout);
      }

      // will always return an array
      if (today_workout.length > 0) {
        // indexed_workouts.reverse();
        for (var index in indexed_workouts) {
          var day = indexed_workouts[index];
          today_workout = day;
          break;
        }
        // console.log("Today Warmup |?|?|?|?|?|?|?|?|  is : ", [
        //   ...today_warmups[0].warmup
        // ]);
        today_array_type.push([...today_warmups[0].warmup]);
        today_array_type.push(today_workout);
        // console.log(
        //   " 1~~~~~1~~1~ ~~~ ~~ TODAY_ARRAY_TYPE is : ",
        //   today_array_type
        // );
        // return the array
        return mapWorkoutArrayToSectionList(today_array_type); //Changed today_workout to today_array_type
      } else {
        var today_workout = realm
          .objects("WorkoutModel")
          .filtered("loged = true AND date >= $0", today)
          .sorted("date", true);

        indexed_workouts.reverse();
        for (var index in indexed_workouts) {
          var day = indexed_workouts[index];
          today_workout = day;
          break;
        }
        //today_array_type.push([...today_warmups[0].warmup]);
        //today_array_type.push(today_workout);
        // console.log(
        //   "2~~~~2~~~2 ~~~ ~~ TODAY_ARRAY_TYPE is : ",
        //   Array.from(today_array_type)
        // );
        // return the array
        return mapWorkoutArrayToSectionList(today_array_type); //Changed today_workout to today_array_type
      }
    } catch (e) {
      console.log("ERROR IN WORKOUT FETCHING", e);
    }
  }

  return mapWorkoutArrayToSectionList(today_workout);
};

// this function will parse the workout array to the section list array
export const mapWorkoutArrayToSectionList = array_of_workouts => {
  var array = [];
  var data_array = [];
  // console.log(
  //   "array_of_workouts *********** **** *** ** * : ",
  //   Array.from(array_of_workouts)
  // );
  // array_of_workout .length will return tru if its an array, false, is one obejct
  if (array_of_workouts.length > 1) {
    for (var index in array_of_workouts) {
      var workout = array_of_workouts[index];
      // console.log(
      //   "Workout >> << > < > <> <> <> << <><> <> <> <>> <> >> > : ",
      //   workout
      // );
      if (workout.length > 0) {
        console.log(workout.length, "WORKOUT.LENGTH");
        if (workout[0].category == "workout") {
          var object_to_be_added = {
            title: workout[0].title,
            workout_id: workout[0].id,
            workout_date: workout[0].date,
            category: "workout",
            is_workout_loged: workout[0].loged,
            data: workout[0].moves || []
          };

          // addidng the object to the array
          array.push(object_to_be_added);
        } else {
          console.log(
            "WARMUP model that has 2 is  : ",
            Array.from(workout[0].workouts[0].warmup)
          );
          let warmup_exercises_array = [];
          for (var k in workout[0].workouts[0].warmup) {
            let row_warmup = workout[0].workouts[0].warmup[k];
            // let exer = row_warmup.exercises;
            warmup_exercises_array.push(row_warmup);
          }
          console.log("warmup_exercises_array: ", warmup_exercises_array);
          var object_to_be_added = {
            title: workout[0].workouts[0].title + " - Warm up",
            workout_id: workout[0].id,
            workout_date: workout[0].date,
            category: "warmup",
            is_workout_loged: workout[0].loged,
            data: warmup_exercises_array || []
          };

          array.push(object_to_be_added);

          // addidng the object to the array
        }
      } else {
        //console.log("I am hereeeeeee in CONTINUE OLAAAA ");
        continue;
      }
    }
  } else if (array_of_workouts.length != 0) {
    // console.log(
    //   "array_of_workout is : ±±±±±± ± ±±±± !!!!! : ",
    //   Array.from(array_of_workouts)
    // );
    // if( array_of_workouts[0].length > 0 )
    if (array_of_workouts[0][0].category == "workout") {
      var object_to_be_added = {
        title: array_of_workouts[0][0].title,
        workout_id: array_of_workouts[0][0].id,
        workout_date: array_of_workouts[0][0].date,
        is_workout_loged: array_of_workouts[0][0].loged,
        data: array_of_workouts[0][0].moves || []
      };

      // addidng the object to the array
      array.push(object_to_be_added);
    } else {
      for (var i in workout[0][0].exercises) {
        var warmup_exercises = workout[0][0].exercises[i];

        var object_to_be_added = {
          title: "Warm-up",
          workout_date: workout[0][0].date,
          workout_id: warmup_exercises.id,
          data: [warmup_exercises] || []
        };
        // console.log(
        //   "object_to_be_added pushed to the Array CATEGORY warmup ~~~~ :  ",
        //   object_to_be_added
        // );
        array.push(object_to_be_added);
      }
    }

    //data_array.push(...array_of_workouts[0].warmup);
  }
  return array;
};

const INITIAL_STATE = {
  workouts: [],
  id: null,
  submit: false,
  loading: false,
  refresh_corres_action: 0,
  isFetching: false,
  workoutRatingModal: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "user_logout":
    case "optout_pressed":
      return { ...state, workouts: [] };

    case "load_daily_training":
      return {
        ...state,
        workouts: getTodayWorkout(state.id)
      };
    case "dailyView_Removing":
      return {
        ...state,
        workouts: []
      };

    case "Refreshing_Tab_0":
      return { ...state, id: action.payload };

    case "log_workout_submit_start":
      return { ...state, loading: true };

    case "daily_training_update_fetching":
      return { ...state, isFetching: action.payload };

    case "log_workout_submit_fail":
      return { ...state, loading: false, submit: false };

    case "log_workout_submit_success":
      return { ...state, submit: true, loading: false };
    case "ALLWORKOUTS_LOGGED":
      return { ...state, workoutRatingModal: action.payload };

    case "goto_workout_listview":
      return {
        ...state,
        id: action.payload.workout_id,
        workouts: getTodayWorkout(action.payload.workout_id)
      };

    default:
      return state;
  }
};
