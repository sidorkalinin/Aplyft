import realm from "../../../models";
import countryJSONList from "./CountryList/data.json";

let user = realm.objects("UserModel")[0] || {};
var findCountryNameFromID = id => {
  for (var i in countryJSONList) {
    var row = countryJSONList[i];

    if (row.id == id) return row.name;
  }
  return "";
};
// console.log("===CALLING===");

const INITIAL_STATE = {
  first_name: user.firstName || "",
  last_name: user.lastName || "",
  phone: user.phone || "",
  activityLevel: user.activityLevel,
  preferedWorkoutDays: [],
  preferedWorkoutDaysBitwise: user.preferedWorkoutDays || 0,
  height: user.height == "null" ? 0 : user.height || 0,
  weight: user.weight == "null" ? 0 : user.weight || 0,
  bodyfat: user.bodyfat == "null" ? "" : user.bodyfat || "",
  country: user.country || "",
  countryName: "", //findCountryNameFromID(user.country || 0),
  injury: user.injury || false,
  injuryText: user.injuryText || "",
  gender: user.gender || "",
  isMale: user.gender == "male" ? true : false,
  isFemale: user.gender == "female" ? true : false,
  isBodyFatVisible: false,
  dob: user.dateOfBirth,
  units: user.units,
  dataArray: []
};

// use this auth reducer to handle the profile edit page and data
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "change_profile_toggle_body_fat":
      return {
        ...state,
        isBodyFatVisible: !state.isBodyFatVisible,
        bodyfat: action.payload
      };

    case "change_profile_toggle_body_fat_hide":
      return { ...state, isBodyFatVisible: false };

    case "change_profile_toggle_body_fat_modal":
      return { ...state, isBodyFatVisible: !state.isBodyFatVisible };

    case "change_profile_edit_days_of_workouts":
      // calculate the bitwise operator
      var bitwise = 0;
      for (var i in action.payload) {
        var r = action.payload[i];
        bitwise += r.bitwise;
      }

      return {
        ...state,
        preferedWorkoutDays: action.payload,
        preferedWorkoutDaysBitwise: bitwise
      };

    case "change_profile_edit_body_fat_text":
      return { ...state, bodyfat: action.payload, isBodyFatVisible: false };

    case "change_profile_edit_request_start":
      return { ...state, isUpdating: true };

    case "change_profile_edit_request_success":
    case "change_profile_edit_request_fail":
      return { ...state, isUpdating: false };

    case "change_profile_edit_injury":
      return { ...state, injury: action.payload };

    case "change_profile_edit_injury_text":
      return { ...state, injuryText: action.payload };

    case "change_profile_edit_first_name":
      return { ...state, first_name: action.payload };

    case "change_profile_edit_last_name":
      return { ...state, last_name: action.payload };

    case "change_profile_edit_dob":
      return { ...state, dob: action.payload };

    case "change_profile_edit_gender":
      return {
        ...state,
        gender: action.payload,
        isMale: action.payload == "male" ? true : false,
        isFemale: action.payload == "female" ? true : false
      };

    case "change_profile_edit_height":
      return { ...state, height: action.payload };

    case "change_profile_edit_weight":
      return { ...state, weight: action.payload };

    case "change_profile_edit_activity_level":
      return { ...state, activityLevel: action.payload.id };

    case "profile_data_Array_Addition":
      return { ...state, dataArray: action.payload };

    case "country_list_select":
      return {
        ...state,
        country: action.payload.id,
        countryName: action.payload.name
      };

    case "change_profile_reload":
      let user = realm.objects("UserModel")[0] || {};

      var injurySVG = user.injurySVG;

      console.log(injurySVG, "INJURY<SVG");

      if (injurySVG == "" || injurySVG == null) {
        var injury_code_svg = [];
      } else {
        var injury_code_svg = injurySVG.split(",");
      }
      return {
        ...state,
        first_name: user.firstName || "",
        last_name: user.lastName || "",
        phone: user.phone || "",
        activityLevel: user.activityLevel,
        preferedWorkoutDays: [],
        preferedWorkoutDaysBitwise: user.preferedWorkoutDays || 0,
        height: user.height == "null" ? 0 : user.height || 0,
        weight: user.weight == "null" ? 0 : user.weight || 0,
        bodyfat: user.bodyfat == "null" ? "" : user.bodyfat || "",
        country: user.country || "",
        countryName: findCountryNameFromID(user.country || 0),
        injury: user.injury || false,
        injuryText: user.injuryText || "",
        gender: user.gender || "",
        isMale: user.gender == "male" ? true : false,
        isFemale: user.gender == "female" ? true : false,
        isBodyFatVisible: false,
        dob: user.dateOfBirth,
        units: user.units,
        dataArray: injury_code_svg
      };

    default:
      return state;
  }
};
