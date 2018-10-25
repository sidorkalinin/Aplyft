import realm from "../../../models";
import axios from "axios";
import { ALL_CARDS_INFO, DELETE_CREDIT_CARD, SET_CREDIT_CARD_AS_DEFAULT } from "./../../../variables";
import { Alert } from "react-native";
import stripe from "tipsi-stripe";
import { STRIPE_KEY, STRIPE_MERCHANT_KEY, UPDATE_CARD_INFO_USER } from "../../../variables";

stripe.setOptions({
  publishableKey: STRIPE_KEY,
  merchantId: STRIPE_MERCHANT_KEY // Optional
  // androidPayMode: 'test', // Android only
});

export const loadAllCardsFromRealm = () => {
  return {
    type: "load_all_cards_realm"
  };
};

export const refreshCardDetails = () => {
  return async (dispatch, getState) => {
    dispatch({ type: "card_details_refresh", payload: true });
    try {
      const response = await axios.get(ALL_CARDS_INFO(getState().user.user.id));
      try {
        realm.write(() => {
          let Cards_to_deleted = realm.objects("CardInfoModel");

          realm.delete(Cards_to_deleted);
          console.log("Deleted Credit Card From CardInfoModel !!!!!!!!");
        });
      } catch (error) {
        console.log(
          "Cannot Delete Credit Card From CardInfoModel !!!!!!!!",
          error
        );
      }

      var data = response.data;

      for (var data_index in data) {
        var row = data[data_index];

        var obj_to_be_inserted = {
          card_id: String(row.id),
          card_last4: String(row.last4),
          card_brand: String(row.brand),
          card_exp_month: String(row.exp_month),
          card_exp_year: String(row.exp_year),
          card_holder: String(row.name),
          default: row.default
        };

        try {
          realm.write(() => {
            // console.log("creating"), obj_to_be_inserted);
            realm.create(
              "CardInfoModel",
              obj_to_be_inserted,
              true // check if it its laready inserted otherwise update
            );
          });
        } catch (e) {
          // success = false;
          console.log("error saving/fetching All Cards List", e);
        }
      }

      dispatch({ type: "card_details_refresh", payload: false });
      dispatch({ type: "load_all_cards_realm" });
    } catch (e) {
      dispatch({ type: "card_details_refresh", payload: false });
      console.log("card error", e);
    }
  };
};

export const removeCard = payload => {
  return async (dispatch, getState) => {
    Alert.alert(
      "Are you sure ?",
      "Removing your card details might affect your plan's subscription. Make sure to a have a valid card at each billing cycle.",
      [
        {
          text: "Remove",
          onPress: () => requestCardRemoval(dispatch, payload, getState),
          style: "destructive"
        },
        { text: "Cancel", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: true }
    );
  };
};

const requestCardRemoval = async (dispatch, payload, getState) => {
  dispatch({ type: "card_details_info_text", payload: "Removing Card" });
  dispatch({ type: "card_details_removing", payload: true });
  var card_id = payload.cardId;
  try {
    const response = await axios.get(
      DELETE_CREDIT_CARD(getState().user.user.id, card_id)
    );
    try {
      realm.write(() => {
        let Card_to_be_deleted = realm
          .objects("CardInfoModel")
          .filtered("card_id == $0", card_id);

        realm.delete(Card_to_be_deleted);
        console.log("Deleted Credit Card From CardInfoModel !!!!!!!!");
      });
    } catch (error) {
      console.log(
        "Cannot Delete Credit Card From CardInfoModel !!!!!!!!",
        error
      );
    }
    // setTimeout(() => {
    //   dispatch({ type: "go-back" });
    // }, 400);
  } catch (e) {
    console.log("error removal card", e);
  }
  dispatch(refreshCardDetails());
  dispatch({ type: "card_details_removing", payload: false });
};

export const setDefaultCard = payload => {
  return async (dispatch, getState) => {
    Alert.alert(
      "Are you sure ?",
      "Card ending with '"+payload.last4+"' will be set as your default card.",
      [
        {
          text: "Set as default",
          onPress: () => requestCardSetToDefault(dispatch, payload, getState),
        },
        { text: "Cancel", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: true }
    );
  };
};

export const openStripeAndAddCard = () => {
  return async (dispatch, getState) => {

    const token = await stripe.paymentRequestWithCardForm({
      // Only iOS support this options
      smsAutofillDisabled: true,
      requiredBillingAddressFields: "full"
    });
    
    dispatch({ type: "card_details_info_text", payload: "Adding New Card" });
    dispatch({ type: "card_details_removing", payload: true });

    var user = getState().user.user;
    var formData = new FormData();
    formData.append("token", token.tokenId);
    formData.append("email", user.email);

    const response = await axios
      .post(UPDATE_CARD_INFO_USER(user.id), formData);

    let data = response.data;
    realm.write(() => {
      user.stripeAccountId = data.stripe_customer_id;
    });
    dispatch({ type: "card_details_removing", payload: false });
    dispatch(refreshCardDetails());
  }
};

const requestCardSetToDefault = async (dispatch, payload, getState) => {
  dispatch({ type: "card_details_info_text", payload: "Setting Default Card" });
  dispatch({ type: "card_details_removing", payload: true });
  var card_id = payload.cardId;
  try {
    const response = await axios.get(
      SET_CREDIT_CARD_AS_DEFAULT(getState().user.user.id, card_id)
    );
    try {
      realm.write(() => {
        var Card_to_be_updated = realm
          .objects("CardInfoModel");
        for (var index in Card_to_be_updated){
          var row = Card_to_be_updated[index];
          row.default = false;
          if(String(row.card_id) == String(card_id))
            row.default = true;
        }

      });
    } catch (error) {
      console.log(
        "Cannot Update Credit Card From CardInfoModel",
        error
      );
    }
  } catch (e) {
    console.log("error update card", e);
  }
  dispatch({ type: "card_details_removing", payload: false });
  dispatch(refreshCardDetails());
};


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