import realm from "../../../../../models";
import { DeviceEventEmitter } from "react-native";
import { getTodayWorkout } from "../DailyView/DailyTrainingScreen/reducer";
import moment from "moment";

var INITAL_STATE = {
  refreshing: false,
  items: [],
  minDate: "",
  maxDate: "",
  today_workout_id: ""
};

const timeToString = date => {
  console.log("DATE in timeToString() is : ", date);
  //const date = new Date(time);
  let formatedDate =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);
  console.log("formatedDate in timeToString() is : ", formatedDate);
  console.log(
    "moment in timeToString() is : ",
    moment(date).format("YYYY-MM-DD")
  );
  console.log(
    "moment.utc in timeToString() is : ",
    moment.utc(date).format("YYYY-MM-DD")
  );
  // return formatedDate;
  return moment.utc(date).format("YYYY-MM-DD");
};

const refreshCalendarView = (from, to, un_loged_data, loged_data) => {
  /*
          looping through the days by adding one day causes the date to roll over to the next month
          if necessary, and without messing around with milliseconds.
          Daylight savings aren't an issue either.
      */
  var from = new Date(from);
  var to = new Date(to);

  var _items = [];
  var drawbleDates = [];
  // this in to only fill the calendar with dates
  var filledArray = [];
  for (from; from <= to; from.setDate(from.getDate() + 1)) {
    // tranforming the dates to strings
    // let formatedDate = from.getFullYear() +"-"+ ('0' + (from.getMonth()+1)).slice(-2) +"-"+ ('0' + from.getDate()).slice(-2);
    filledArray.push(timeToString(from)); //--------------- TO CHANGE -------------
    // console.log("FROM IS : ", from);
  }

  // we will change the state but without re-rendering the view
  drawbleDates = filledArray;
  drawbleDates.forEach(item => {
    _items[item] = [];
  });

  // this is were the logic behind the actual calendar items

  // get the first workout not loged
  var date = new Date();
  for (var index in un_loged_data) {
    // console.log("entered fro", index);
    var item = un_loged_data[index];
    if (!item.loged) {
      //date = new Date(timeToString(item.date));
      date = moment.utc(item.date)._i;
      // console.log("DATE in the reducer of the monthly calendar is : ", date);

      break;
    }
  }
  // after getting the first not loged workout date we need to calculate the date difference from now

  // populating the redux store elements into a readbale verison for the agenda
  // adding the loged data only
  loged_data.forEach((item, index) => {
    // console.log("looping in items for agenda", index, item);

    if (_items[timeToString(item.date)].indexOf(item) < 0) {
      //--------------- TO CHANGE -------------
      _items[timeToString(item.date)].push(item);
    }
    //console.log("ITEM.DATE IN THE 1st one is:  ", moment.utc(item.date)._i);
    // if (_items[moment.utc(item.date)._i].indexOf(item) < 0) {
    //   _items[moment.utc(item.date)._i].push(item);
    // }
  });
  //adding the unloged data and pushing their dates
  var startDate = new Date();
  // var startDate = moment.utc();

  var timeDiff = startDate - date;
  var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  daysDiff = daysDiff < 0 ? 0 : daysDiff;
  // console.log("ITEM.DATE IN THE 2nd one is:  ", item.date);
  un_loged_data.forEach((item, index) => {
    if (_items[timeToString(item.date)].indexOf(item) < 0) {
      //--------------- TO CHANGE -------------
      _items[timeToString(item.date)].push(item);
    }
  });
  // un_loged_data.forEach((item, index) => {
  //   if (_items[moment.utc(item.date)._i].indexOf(item) < 0) {
  //     _items[moment.utc(item.date)._i].push(item);
  //   }
  // });

  return _items;
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case "optout_pressed":
    case "user_logout":
      return { ...state, refreshing: false, items: [], today_workout_id: null };

    case "MonthlyView_Detailed_Removing":
      return { ...state, refreshing: false, items: [], today_workout_id: null };

    case "load_workouts_success":
      // DeviceEventEmitter.emit('refreshMonthlyView',  {});
      return { ...state, refreshing: false };
    case "workout_date_pressed":
      console.log("getTodayWorkout: is : sssssss : ", getTodayWorkout()[0]);
      // DeviceEventEmitter.emit('refreshMonthlyView',  {});
      return { ...state, today_workout_id: getTodayWorkout()[0].workout_id };

    case "load_workouts_from_realm":
      // get all the workouts in order to get the last and first date
      let workouts = realm.objects("WorkoutModel").sorted("date");

      let first_date = workouts[0].date;
      var first_date_String = moment(first_date).format("YYYY-MM-DD");
      var min_date_String = moment(first_date)
        .subtract(30, "d")
        .format("YYYY-MM-DD");

      let last_date = workouts[workouts.length - 1].date;
      var last_date_String = moment(last_date).format("YYYY-MM-DD");
      var max_date_String = moment(last_date)
        .add(30, "d")
        .format("YYYY-MM-DD");

      let un_loged_data = realm
        .objects("WorkoutModel")
        .filtered("loged = false")
        .sorted("date", false);
      let loged_data = realm
        .objects("WorkoutModel")
        .filtered("loged = true")
        .sorted("date", false);

      return {
        ...state,
        items: refreshCalendarView(
          min_date_String,
          max_date_String,
          un_loged_data,
          loged_data
        ),
        minDate: min_date_String,
        maxDate: max_date_String,
        refreshing: false
      };

    default:
      return state;
  }
};
