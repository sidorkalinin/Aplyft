import realm from "../../../models";

const INITIAL_STATE = {
  init: false,
  personalTrainerId: 0,
  refreshing: false,
  isStripeAuthorized: false,
  codeValue: "",
  verification: 0,
  payment_id: 0,
  amountToPay: 0,
  currency: "USD",
  coupon_code: "",
  personalTrainerFirstName: "",
  personalTrainerLastName: "",
  personalTrainerPhoto: "",
  discount: "",
  total_amount: "",
  checking: false
};

// use this auth reducer to handle the profile edit page and data
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "goto_payment":
      let pt = realm.objectForPrimaryKey(
        "PersonalTrainerModel",
        action.payload.payload
      );
      return {
        ...state,
        personalTrainerId: action.payload.payload,
        init: false,
        personalTrainerFirstName: pt.firstName,
        personalTrainerLastName: pt.lastName,
        personalTrainerPhoto: pt.picURL
      };

    case "payment_view_update_refresh":
      return { ...state, refreshing: action.payload };

    case "promo_code_change":
      return {
        ...state,
        codeValue: action.payload,
        coupon_code: "",
        verification: 0
      };
    case "promoCode_Succces":
      return {
        ...state,
        verification: 1,
        total_amount: action.payload.total,
        discount: action.payload.discount,
        coupon_code: action.payload.coupon_code
      };
    case "promoCode_Fail":
      return { ...state, verification: 2 };

    case "promoCode_validation_start":
      return { ...state, checking: true };

    case "promoCode_validation_finish":
      return { ...state, checking: false };

    case "payment_view_update_isStripeAuthorized":
      return { ...state, isStripeAuthorized: action.payload };

    case "empty_the_fields":
      return {
        ...state,
        init: false,
        personalTrainerId: 0,
        refreshing: false,
        isStripeAuthorized: false,
        codeValue: "",
        verification: 0,
        payment_id: 0,
        amountToPay: 0,
        currency: "USD",
        personalTrainerFirstName: "",
        personalTrainerLastName: "",
        personalTrainerPhoto: "",
        discount: "",
        total_amount: "",
        amount: "",
        dueDate: ""
      };

    case "payment_view_update_getting_payment_details":
      return {
        ...state,
        init: true,
        ...action.payload
      };

    default:
      return state;
  }
};
