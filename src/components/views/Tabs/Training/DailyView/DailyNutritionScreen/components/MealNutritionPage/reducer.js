import realm from "../../../../../../../../models";
import moment from "moment";

const INIT_STATE = {
  loading: false,
  data: [],
  inputValue: "",
  snackType: "",
  snackValue: "",
  count: 0,
  total_calories_per_day: 0,
  nut_loading: false,
  proteinValue: "",
  carbsValue: "",
  fatsValue: "",
  fiberValue: "",
  sugarValue: "",
  cholesterolValue: "",
  sodiumValue: "",
  waterValue: "",
  protein: "",
  carbs: "",
  sugar: "",
  water: "",
  cholesterol: "",
  fiber: "",
  sodium: "",
  fats: "",
  mealtitle: "",
  total_calories: "",
  checked: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case "meal_title_change":
      return { ...state, mealtitle: action.payload };
    case "autofillPressed":
      console.log("C H E C K E D is : ", action.payload.checked);
      if (action.payload.checked == true) {
        let mealinformation = realm
          .objects("NutritionModel")
          .filtered("id CONTAINS[c] $0", action.payload.meal_autofill_id);
        return {
          ...state,
          checked: action.payload.checked,
          proteinValue: mealinformation[0].protein,
          carbsValue: mealinformation[0].carbs,
          fatsValue: mealinformation[0].fats,
          fiberValue: mealinformation[0].fiber,
          sugarValue: mealinformation[0].sugar,
          cholesterolValue: mealinformation[0].cholesterol,
          sodiumValue: mealinformation[0].sodium,
          waterValue: mealinformation[0].water
        };
      } else {
        return { ...state, checked: action.payload.checked };
      }
    case "notlogged_arelogged":
      return {
        ...state,
        loading: false,
        data: [],
        inputValue: "",
        snackType: "",
        snackValue: "",
        count: 0,
        total_calories_per_day: 0,
        nut_loading: false,
        proteinValue: "",
        carbsValue: "",
        fatsValue: "",
        fiberValue: "",
        sugarValue: "",
        cholesterolValue: "",
        sodiumValue: "",
        waterValue: "",
        protein: "",
        carbs: "",
        sugar: "",
        water: "",
        cholesterol: "",
        fiber: "",
        sodium: "",
        fats: "",
        mealtitle: "",
        total_calories: "",
        checked: false
      };
    case "protein_change":
      return { ...state, proteinValue: action.payload };
    case "carbs_change":
      return { ...state, carbsValue: action.payload };
    case "fats_change":
      return { ...state, fatsValue: action.payload };
    case "fiber_change":
      return { ...state, fiberValue: action.payload };
    case "sugar_change":
      return { ...state, sugarValue: action.payload };
    case "cholesterol_change":
      return { ...state, cholesterolValue: action.payload };
    case "sodium_change":
      return { ...state, sodiumValue: action.payload };
    case "water_change":
      return { ...state, waterValue: action.payload };

    case "user_logout":
      return { ...state, data: [] };

    case "load_Meal_Info":
      console.log("action.payload in load_Meal_Info", action.payload);
      if (action.payload != "") {
        let mealinfo = realm
          .objects("NutritionModel")
          .filtered("id CONTAINS[c] $0", action.payload);
        console.log(
          "mealinfo is :  : : : : : : :: : :MNBFD: ",
          Array.from(mealinfo)
        );
        return {
          ...state,
          protein: mealinfo[0].protein,
          carbs: mealinfo[0].carbs,
          sugar: mealinfo[0].sugar,
          water: mealinfo[0].water,
          cholesterol: mealinfo[0].cholesterol,
          fiber: mealinfo[0].fiber,
          sodium: mealinfo[0].sodium,
          fats: mealinfo[0].fats,
          proteinValue: mealinfo[0].protein_intake,
          carbsValue: mealinfo[0].carbs_intake,
          fatsValue: mealinfo[0].fats_intake,
          fiberValue: mealinfo[0].fiber_intake,
          sugarValue: mealinfo[0].sugar_intake,
          cholesterolValue: mealinfo[0].cholesterol_intake,
          sodiumValue: mealinfo[0].sodium_intake,
          waterValue: mealinfo[0].water_intake,
          mealtitle: mealinfo[0].name,
          total_calories: mealinfo[0].total_calories,
          checked: false
        };
      } else {
        return {
          ...state,
          protein: "",
          carbs: "",
          sugar: "",
          water: "",
          cholesterol: "",
          fiber: "",
          sodium: "",
          fats: "",
          proteinValue: "",
          carbsValue: "",
          fatsValue: "",
          fiberValue: "",
          sugarValue: "",
          cholesterolValue: "",
          sodiumValue: "",
          waterValue: "",
          mealtitle: "",
          total_calories: "",
          checked: false
        };
      }

    default:
      return state;
  }
};
