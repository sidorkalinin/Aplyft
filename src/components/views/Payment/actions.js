import realm from "../../../models";
import {
  UPDATE_CARD_INFO_USER,
  STRIPE_PAYMENT,
  PAYMENT_DETAIL_USER,
  PAYMENT_CONFIRMATION,
  VALIDATE_PROMO_CODE
} from "../../../variables";
import { Alert, Platform } from "react-native";
import axios from "axios";
import Mixpanel from "react-native-mixpanel";
import firebase from "react-native-firebase";
// import PayPal from 'react-native-paypal-wrapper';
import sha1 from "sha1";
import { loadSearchListItems } from "./../Tabs/Search/actions";

export const stripeFuturePayments = (tokenId, pt_id, coupon_code, personal_trainer_full_name) => {
  //console.log("<> <> <> <> <> I am in the stripeFuturePayments()");
  return (dispatch, getState) => {
    //console.log("I am before the dispatch()");
    dispatch({
      type: "payment_view_update_refresh",
      payload: true
    });
    //console.log("I am after the dispatch()");
    var fomrData = new FormData();
    fomrData.append("token", tokenId);
    fomrData.append("email", getState().user.user.email);
    fomrData.append("gateway", "stripe");
    fomrData.append("personal_trainer_id", pt_id);
    fomrData.append("coupon_code", coupon_code);

    //console.log("fomrData is :", fomrData);

    //get user category goal id
    let category_id = 0;
    if (getState().user.user.goal.length > 0)
      if (getState().user.user.goal[0].category_id)
        category_id = getState().user.user.goal[0].category_id;

    axios
      .post(STRIPE_PAYMENT(getState().user.user.id), fomrData)
      .then(response => {
/*        if (coupon_code != "") {
          if(Platform.OS != "android")
          firebase
            .analytics()
            .logEvent("PaymentScreenSuccessfullWithPromoCode");
          Mixpanel.trackWithProperties("PaymentScreen_Successfull Payment with PromoCode", {
            promocode: coupon_code,
            personalTrainerID: pt_id,
            trainer_full_name: personal_trainer_full_name,
            initial_price: getState().paymentReducer.amountToPay,
            discount: getState().paymentReducer.discount,
            final_amount_paid: getState().paymentReducer.total_amount,
            category_id : category_id
          });
        } else {
          if(Platform.OS != "android")
          firebase
            .analytics()
            .logEvent("PaymentScreenSuccessfullWithoutPromoCode");
          Mixpanel.trackWithProperties("PaymentScreen_Successfull Payment without PromoCode", {
            personalTrainerID: pt_id,
            trainer_full_name: personal_trainer_full_name,
            initial_price: getState().paymentReducer.amountToPay,
            discount: getState().paymentReducer.discount,
            final_amount_paid: getState().paymentReducer.total_amount,
            category_id : category_id
          });
        }*/

        // increment property
        // Mixpanel.increment("Number of successful payments through mobile app", 1);
        
        // let mixpanel track each user charges along with properties
        // Mixpanel.trackChargeWithProperties(getState().paymentReducer.total_amount, {
        //   trainer_full_name: personal_trainer_full_name,
        //   personalTrainerID: pt_id,
        //   category_id : category_id
        // });
        Mixpanel.registerSuperProperties({"Account type": "Paid"});


        let data = response.data;
        // update in realm the token for the user
        try {
          realm.write(() => {
            user = realm.objectForPrimaryKey(
              "UserModel",
              getState().user.user.id
            );
            // user.stripeAccountId = data.customer_id;
            personal_trainer = realm.objectForPrimaryKey(
              "PersonalTrainerModel",
              pt_id
            );

            user.goal[0].isOnPaidPlan = true;
            user.goal[0].freedailyWorkout = false;
            user.goal[0].personlTrainer = personal_trainer;

            let allWorkouts = realm.objects("WorkoutModel");
            let allExercise = realm.objects("ExerciseModel");
            let allMove = realm.objects("MoveModel");
            let allSets = realm.objects("SetModel");
            realm.delete(allWorkouts);
            realm.delete(allExercise);
            realm.delete(allMove);
            realm.delete(allSets);
          });
        } catch (error) {
          // here
          console.log("error updating local database", error);
        }

        dispatch({
          type: "payment_view_update_isStripeAuthorized",
          payload: true
        });

        setTimeout(() => {
          Alert.alert(
            "Success",
            "Amount successfully paid. You are now subscribed to the chosen plan. Thank you for using APLYFT",
            [{ text: "ok", onPress: () => dispatch({ type: "go-back" }) }]
          );
        }, 400);
      })
      .then(() => {
        dispatch({
          type: "payment_view_update_refresh",
          payload: false
        });
        dispatch(loadSearchListItems());
        dispatch({
          type: "empty_the_fields"
        });
      })
      .catch(function(error) {
        //console.log("error _/ -/ +/ ", { ...error });
        // console.log("SJON error _/ -/ +/ ", JSON.stringify(error));
        console.log("error.response _/ -/ +/ ", error.response);

        // we need to check if the internet cnx is present otherwise axios wil return an empty object
        if (Object.keys(error).length == 0) {
          console.log("no internet");

          setTimeout(() => {
            Alert.alert("Failed", "No Network Found", [
              { text: "ok", onPress: () => dispatch({ type: "go-back" }) }
            ]);
          }, 400);
          dispatch({
            type: "payment_view_update_refresh",
            payload: false
          });
          dispatch(loadSearchListItems());
        } else {
          const response = error.response;

          setTimeout(() => {
            Alert.alert("Failed", response.data.detail, [
              { text: "ok", onPress: () => dispatch({ type: "go-back" }) }
            ]);
          }, 400);
          dispatch({
            type: "payment_view_update_refresh",
            payload: false
          });
          dispatch(loadSearchListItems());
        }
        dispatch({
          type: "empty_the_fields"
        });
      });
  };
};

export const goBack = () => {
  if (Platform.OS != "android")
    firebase.analytics().logEvent("PaymentScreenGoBackPressed");
  Mixpanel.track("PaymentScreen_GoBack Pressed");
  return (dispatch, getState) => {
    dispatch({
      type: "go-back"
    });
    dispatch({
      type: "empty_the_fields"
    });
  };
};
export const promoCodeChange = payload => {
  return {
    type: "promo_code_change",
    payload: payload
  };
};

export const applyPromo = payload => {
  return (dispatch, getState) => {
    let user_id = getState().user.user.id;
    var codeValue = payload.codeValue;
    var stripe_plan_id = payload.stripe_plan_id;
    var pt_id = payload.pt_id;
    dispatch({
      type: "promoCode_validation_start"
    });
    axios
      .get(VALIDATE_PROMO_CODE(codeValue, stripe_plan_id, pt_id))
      .then(results => {
        if(Platform.OS != "android")
        firebase
          .analytics()
          .logEvent("PaymentScreenSuccessfullAppliedPromoCode");

        Mixpanel.trackWithProperties("Applied PromoCode", {successful: true, personalTrainerID: pt_id, promocode: codeValue, stripe_plan_id: stripe_plan_id});
        // console.log(">>>>>", results);
        let data = results.data;

        let obj = {
          discount: data.discount,
          total: data.total,
          coupon_code: data.coupon_code
        };
        dispatch({
          type: "promoCode_validation_finish"
        });

        dispatch({
          type: "promoCode_Succces",
          payload: obj
        });
      })
      .catch(error => {
        dispatch({
          type: "promoCode_validation_finish"
        });
        console.log("error payments", error);
        console.log("error.response payments", error.response);
        dispatch({
          type: "promoCode_Fail"
        });
        Mixpanel.trackWithProperties("Applied PromoCode", {successful: false, personalTrainerID: pt_id, promocode: codeValue, stripe_plan_id: stripe_plan_id});

      });
  };
};
export const getPaymentDetails = payload => {
  // console.log("payload is >> ", payload);
  return (dispatch, getState) => {
    let user_id = getState().user.user.id;
    var pt_id = payload.pt_id;
    // generate hash so we can send it to the server and concatinate the results and send it back
    // var hash = "";
    // for(var i=0; i<10; i++ )
    // 	hash += Math.random().toString(36).substring(2);

    axios
      .get(PAYMENT_DETAIL_USER(user_id, pt_id))
      .then(results => {
        // got the required payment from the server according to the user and user goal
        let data = results.data;
        console.log(">>>>>", results);

        let row = data;

        let payload = {
          payment_id: row.id,
          name: row.name,
          amount: row.price,
          currency: row.currency,
          description: row.description,
          dueDate: row.interval_count + " " + row.interval,
          stripe_pricing_plan_id: row.stripe_pricing_plan_id
        };

        dispatch({
          type: "payment_view_update_getting_payment_details",
          payload: payload
        });
      })
      .catch(error => {
        console.log("error payments", error);
        console.log("error.response payments", error.response);
        dispatch({
          type: "payment_view_update_getting_payment_details",
          payload: payload
        });
      });
  };
};

// depricated
export const updateCardInfo = (token, callback, displayRefresh = false) => {
  return (dispatch, getState) => {
    if (displayRefresh)
      dispatch({
        type: "payment_view_update_refresh",
        payload: true
      });

    var user = getState().user.user;

    var formData = new FormData();
    formData.append("token", token.tokenId);
    formData.append("email", user.email);

    axios
      .post(UPDATE_CARD_INFO_USER(user.id), formData)
      .then(results => {
        let data = results.data;
        realm.write(() => {
          user.stripeAccountId = data.stripe_customer_id;
        });
      })
      .catch(error => {
        console.log("error updating card info", error);
        console.log("error.response updating card info", error.response);
      })
      .then(() => {
        callback();
        console.log("after the callback");
      });
  };
};
