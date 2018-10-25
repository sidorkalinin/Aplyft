import realm from "../../../../../../models";
import moment from "moment";

const INIT_STATE = {
  loading: false,
  data: [],
  inputValue: "",
  snackType: "",
  snackValue: "",
  count: 0,
  total_calories_per_day: 0,
  nut_loading: false
};

var formatDate = d => {
  var month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
var getParsedCalories = date => {
  console.log("DATE.GETtime() is : ", date.getTime());
  var total = 0;
  let nutrition_data = realm
    .objects("NutritionModel")
    .filtered("date_from_int <= $0 AND date_to_int > $0", date.getTime());
  // console.log(
  //   "The nutrition_data in action is #$##$%#$%$#$#$#$#$$##$$##$#$#$#$ : ",
  //   Array.from(nutrition_data)
  // );
  var all_array = [];
  for (var index in nutrition_data) {
    var row = nutrition_data[index];
    var incr = parseInt(row.calories) || 0;
    total += incr;
  }
  return total;
};
var getParsedData = date => {
  // we need to parse the nutrition data from bulk to everyday on his own
  // first we will fetch with realm based on the supplied date
  // the returned rows will be filtered by type, so each row wil contain a snack
  // we will then concatinat them into one big array that the Flat List will display

  // parse the payload date to actual date object
  console.log("DATE in NutritionReducer is : ");
  let nutrition_data = realm
    .objects("NutritionModel")
    .filtered("date_from_int <= $0 AND date_to_int > $0", date.getTime());

  var all_array = [];
  for (var index in nutrition_data) {
    var row = nutrition_data[index];
    var description = "";

    // check the actual day number to insert its proper meal
    switch (date.getDay()) {
      // sunday
      case 0:
        description = row.sunday;
        break;

      // monday
      case 1:
        description = row.monday;
        break;

      // tuesday
      case 2:
        description = row.tuesday;
        break;

      // wednesday
      case 3:
        description = row.wednesday;
        break;

      //thursday
      case 4:
        description = row.thursday;
        break;

      // friday
      case 5:
        description = row.friday;
        break;

      //saturday
      case 6:
        description = row.saturday;
        break;
    }

    all_array.push({
      title: row.type,
      description: description,
      date: date
    });
  }

  return all_array;
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case "user_logout":
      return { ...state, data: [] };

    case "input_change":
      var tmp = [...state.inputValue];
      tmp[action.payload.item] = action.payload.text;
      return { ...state, inputValue: tmp };

    case "end_editing":
      var todaye_date = moment().format(" YYYY-MM-D");
      var primary_key_date = moment().format(" YYYY-MM-D, h:mm:ss");
      console.log("todaye_date is: ", todaye_date);
      console.log("primary_id_date is: ", primary_key_date);
      var tmp = [...state.inputValue];
      tmp[action.payload.item] = action.payload.text;
      var workout_date_nutrition = moment(action.payload.workout_date).format(
        "YYYY-MM-D"
      );
      let obj_to_be_inserted = {
        title: action.payload.item,
        value: action.payload.text,
        date: workout_date_nutrition,
        title_date: action.payload.item + todaye_date,
        primary_id_date: action.payload.item + workout_date_nutrition
      };
      try {
        realm.write(() => {
          realm.create(
            "DailyNutritionModel",
            obj_to_be_inserted,
            true // check if it its laready inserted otherwise update
          );

          //console.log("Done From Realm");
        });
      } catch (error) {
        console.log("Cannot Create Daily Nutrition Data !!!!!!!!", error);
      }

      return { ...state, inputValue: tmp };

    case "add_snack_item":
      return { ...state, snackType: "", snackValue: "" };

    case "add_snack_item_failed":
      return { ...state, snackType: "", snackValue: "" };

    case "snack_type_change":
      return { ...state, snackType: action.payload };

    case "snack_value_change":
      return { ...state, snackValue: action.payload };

    case "fetch_user_nutrition_start":
      return { ...state, loading: true, count: 0 };
    case "log_user_nutrition_start":
      return { ...state, nut_loading: true, count: 0 };
    case "log_user_nutrition_success":
      return { ...state, nut_loading: false, count: 0 };
    case "log_user_nutrition_fail":
      return { ...state, nut_loading: false, count: 0 };

    case "notlogged_arelogged":
      return {
        ...state,
        loading: false,
        data: [],
        nut_loading: false
      };

    case "fetch_user_nutrition_success":
      var choosed_date = moment(action.payload).format("YYYY-MM-DD");
      //var today_date = moment().format("YYYY-MM-D");
      //var primary_id_date = moment().format(" YYYY-MM-D, h:mm:ss");
      let daily_nutrition_data = realm
        .objects("NutritionModel")
        .filtered("date CONTAINS[c] $0 ", choosed_date);
      return {
        ...state,
        loading: false,
        count: 0,
        total_calories_per_day: "",
        data: Array.from(daily_nutrition_data)
      };

    default:
      return state;
  }
};
