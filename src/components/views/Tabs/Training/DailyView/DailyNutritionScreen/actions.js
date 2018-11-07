import axios from "axios";
import realm from "../../../../../../models";
import moment from "moment";
import { GET_NUTRITION, SUBMIT_NUTRITION } from "../../../../../../variables";
import { Alert } from "react-native";

export const goto_AddMeal = payload => {
  return {
    type: "goto_AddMeal",
    payload: payload
  };
};
export const loadDailyNutritionRealm = payload => {
  return {
    type: "fetch_user_nutrition_success",
    payload: payload
  };
};

export const loadDailyNutrition = (payload, url = GET_NUTRITION) => {
  // console.log('nutrition results', payload);

  return (dispatch, getState) => {
    // notifying the page for the start event
    dispatch({ type: "fetch_user_nutrition_start" });

    var success = false;
    axios
      .get(url(getState().user.user.id))
      .then(result => {
        let nutrition_to_delete = realm.objects("NutritionModel");
        try {
          realm.write(() => {
            realm.delete(nutrition_to_delete);
          });
        } catch (e) {
          console.log("Error on deleting old data in nutrition model", e);
        }

        let data = result.data.results;
        var next_url = result.data.next;

        for (var index in data) {
          var row = data[index];

          function getTotal_Calories(protein, fat, carbs) {
            var totalCalories = 4 * protein + 4 * carbs + 9 * fat;

            return totalCalories;
          }

          var protein = row.protein;
          var fat = row.fats;
          var carbs = row.carbs;
          var total_calories = getTotal_Calories(
            protein,
            fat,
            carbs
          ).toString();
          try {
            var obj = {
              id: String(row.id),
              user_goal: String(row.user_goal),
              name: String(row.name) == "null" ? "" : String(row.name),
              date: String(row.date) == "null" ? "" : String(row.date),
              user_feedback:
                String(row.user_feedback) == "null"
                  ? ""
                  : String(row.user_feedback),
              user_feedback_date:
                String(row.user_feedback_date) == "null"
                  ? ""
                  : String(row.user_feedback_date),
              total_calories: total_calories == "null" ? "" : total_calories,
              protein: String(row.protein) == "null" ? "" : String(row.protein),

              carbs: String(row.carbs) == "null" ? "" : String(row.carbs),

              fats: String(row.fats) == "null" ? "" : String(row.fats),

              fiber: String(row.fiber) == "null" ? "" : String(row.fiber),

              sugar: String(row.sugar) == "null" ? "" : String(row.sugar),

              cholesterol:
                String(row.cholesterol) == "null"
                  ? ""
                  : String(row.cholesterol),

              sodium: String(row.sodium) == "null" ? "" : String(row.sodium),

              water: String(row.water) == "null" ? "" : String(row.water)
            };

            if (String(row.protein_intake) != "null") {
              obj.protein_intake = String(row.protein_intake);
            }
            if (String(row.carbs_intake) != "null") {
              obj.carbs_intake = String(row.carbs_intake);
            }
            if (String(row.fats_intake) != "null") {
              obj.fats_intake = String(row.fats_intake);
            }
            if (String(row.fiber_intake) != "null") {
              obj.fiber_intake = String(row.fiber_intake);
            }
            if (String(row.sugar_intake) != "null") {
              obj.sugar_intake = String(row.sugar_intake);
            }
            if (String(row.cholesterol_intake) != "null") {
              obj.cholesterol_intake = String(row.cholesterol_intake);
            }
            if (String(row.sodium_intake) != "null") {
              obj.sodium_intake = String(row.sodium_intake);
            }
            if (String(row.water_intake) != "null") {
              obj.water_intake = String(row.water_intake);
            }

            realm.write(() => {
              const nutrition = realm.create("NutritionModel", obj, true);

              // update user realm
              var user_nutrition = getState().user.user.nutritions;
              var nutrition_exists = false;
              for (var nutrition_realm_index in user_nutrition) {
                var realm_nutrition = user_nutrition[nutrition_realm_index];
                if (realm_nutrition.id == obj.id) nutrition_exists = true;
              }

              if (!nutrition_exists)
                getState().user.user.nutritions.push(nutrition);
            });
          } catch (e) {
            console.log("Error in Saving the Nutrition Data in Realm: ", e);
          }
        }

        if (next_url != null) {
          url = next_url;

          dispatch(loadDailyNutrition(url));
        } else {
          dispatch({
            type: "fetch_user_nutrition_success",
            payload: payload
          });
          success = true;
        }
      })
      .catch(error => {
        console.log("error, nutrition ", error);
        console.log("error.RESPONSE, nutrition ", error.response);
      })
      .then(() => {
        if (success) {
          dispatch({
            type: "fetch_user_nutrition_success",
            payload: payload
          });
        }
      });

    //type: 'load_daily_nutrition'
  };
};

// export const lognutrition = payload => {
//   return (dispatch, getState) => {
//     var today_date = moment().format("YYYY-MM-DD");
//
//     let user_daily_nutrition_data = realm
//       .objects("DailyNutritionModel")
//       .filtered("date = $0", today_date);
//     console.log(
//       "DailyNutritionModel >>> ",
//       Array.from(user_daily_nutrition_data)
//     );
//     if (user_daily_nutrition_data.length > 0) {
//       var final_obj = {};
//       final_obj.date = today_date;
//       final_obj.user_goal_id = getState().user.user.goal[0].id;
//       final_obj.data = [];
//       for (var i in user_daily_nutrition_data) {
//         var nutrition_row = user_daily_nutrition_data[i];
//         if (nutrition_row.title != null && nutrition_row.title != "") {
//           var constructed_nutrition = {
//             type: nutrition_row.title.toLowerCase(),
//             value: nutrition_row.value
//           };
//         } else if (nutrition_row.title == "") {
//           var constructed_nutrition = {
//             type: "snack",
//             value: nutrition_row.value
//           };
//         } else {
//           var constructed_nutrition = {
//             type: nutrition_row.title,
//             value: nutrition_row.value
//           };
//         }
//
//         // adding the sets to the exercise
//         // constructed_exercise.sets.push(constructed_set);
//         final_obj.data.push(constructed_nutrition);
//       }
//       console.log(">>^^^<<<final_obj is : ", final_obj);
//
//       //notifying the page for the start event
//       dispatch({ type: "log_user_nutrition_start" });
//       var success = false;
//       axios
//         .post(SUBMIT_NUTRITION(getState().user.user.id), final_obj, {
//           headers: {
//             "Content-Type": "application/json"
//           }
//         })
//         .then(result => {
//           let data = result.data.data;
//           let included = result.data.included;
//
//           success = true;
//           dispatch({ type: "log_user_nutrition_success" });
//         })
//         .catch(error => {
//           console.log("error, nutrition ", error);
//           dispatch({
//             type: "log_user_nutrition_fail",
//             payload: payload
//           });
//         })
//         .then(() => {
//           if (success) {
//             dispatch({
//               type: "log_user_nutrition_success",
//               payload: payload
//             });
//           }
//         });
//     } else {
//       Alert.alert(
//         "Empty Data",
//         "Please Fill Your Daily Nutrition",
//         [
//           {
//             text: "OK",
//             onPress: () =>
//               console.log("OK Pressed For All Data are already Synced!")
//           }
//         ],
//         { cancelable: true }
//       );
//     }
//   };
// };
