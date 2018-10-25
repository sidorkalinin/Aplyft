import axios from "axios";
import realm from "../../../../../../../../models";
import moment from "moment";
import {
  GET_NUTRITION,
  SUBMIT_NUTRITION
} from "../../../../../../../../variables";
import { Alert } from "react-native";

export const autofillPressed = payload => {
  var payload_2 = {
    meal_autofill_id: payload.meal_autofill_id,
    checked: !payload.checked //In order to change it from true to false and vice-versa for the Autofill Feature
  };
  return {
    type: "autofillPressed",
    payload: payload_2
  };
};
export const onProteinChange = payload => {
  return {
    type: "protein_change",
    payload: payload
  };
};

export const onMealTitleChange = payload => {
  return {
    type: "meal_title_change",
    payload: payload
  };
};
export const loadMealInfo = payload => {
  return {
    type: "load_Meal_Info",
    payload: payload
  };
};

export const onCarbsChange = payload => {
  return {
    type: "carbs_change",
    payload: payload
  };
};
export const onFatsChange = payload => {
  return {
    type: "fats_change",
    payload: payload
  };
};
export const onFiberChange = payload => {
  return {
    type: "fiber_change",
    payload: payload
  };
};
export const onSugarChange = payload => {
  return {
    type: "sugar_change",
    payload: payload
  };
};
export const onCholesterolChange = payload => {
  return {
    type: "cholesterol_change",
    payload: payload
  };
};
export const onSodiumChange = payload => {
  return {
    type: "sodium_change",
    payload: payload
  };
};
export const onWaterChange = payload => {
  return {
    type: "water_change",
    payload: payload
  };
};

export const onSaveMeal = payload => {
  return dispatch => {
    Alert.alert(
      "Adding a Meal",
      "Are you sure you want to add this meal ?",
      [
        {
          text: "Yes I am Sure",
          onPress: () => dispatch(addMeal(payload, dispatch))
        },
        {
          text: "No",
          onPress: () => console.log("OK Pressed"),
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };
};

export const addMeal = (payload, dispatch) => {
  return dispatch => {
    var primary_key_date = moment().format("YYYY-MM-DD, h:mm:ss");
    var todaye_date = moment(payload.workout_date).format("YYYY-MM-DD");
    console.log("todaye_date is: ", todaye_date);
    console.log("primary_key_date is: ", primary_key_date);
    console.log("workoutDate is: ", payload.workout_date);
    console.log("proteinValue is: ", payload.proteinValue);

    if (payload.id == "" || payload.id == undefined) {
      console.log(
        "I am in the action where the payload.id is emptyString or undefined"
      );
      var meal_to_be_inserted = {
        id: primary_key_date + "NOTLOGGED",
        name: payload.mealtitle,
        date: todaye_date,
        acc_calories: String(payload.totalCalories || ""),
        protein_intake: String(payload.proteinValue || ""),
        carbs_intake: String(payload.carbsValue || ""),
        fats_intake: String(payload.fatsValue || ""),
        fiber_intake: String(payload.fiberValue || ""),
        sugar_intake: String(payload.sugarValue || ""),
        cholesterol_intake: String(payload.cholesterolValue || ""),
        sodium_intake: String(payload.sodiumValue || ""),
        water_intake: String(payload.waterValue || "")
      };
    } else {
      console.log(
        "I am in the action where the payload.id is NOT emptyString or undefined"
      );
      var meal_to_be_inserted = {
        id: payload.id,
        name: payload.mealtitle,
        date: todaye_date,
        acc_calories: String(payload.totalCalories || ""),
        protein_intake: String(payload.proteinValue || ""),
        carbs_intake: String(payload.carbsValue || ""),
        fats_intake: String(payload.fatsValue || ""),
        fiber_intake: String(payload.fiberValue || ""),
        sugar_intake: String(payload.sugarValue || ""),
        cholesterol_intake: String(payload.cholesterolValue || ""),
        sodium_intake: String(payload.sodiumValue || ""),
        water_intake: String(payload.waterValue || "")
      };
    }

    try {
      realm.write(() => {
        realm.create(
          "NutritionModel",
          meal_to_be_inserted,
          true // check if it its laready inserted otherwise update
        );
      });
    } catch (error) {
      console.log("Cannot Create  Nutrition Data !!!!!!!!", error);
    }

    dispatch({
      type: "fetch_user_nutrition_success",
      payload: new Date(todaye_date)
    });
    dispatch({
      type: "go-back"
    });
  };
};
export const canceladdition = payload => {
  return dispatch => {
    dispatch({
      type: "go-back"
    });
  };
};
