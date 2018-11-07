import { Dimensions, Platform } from "react-native";
import moment from "moment";

export const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export const APP_VERSION = "2.3.2";

export const APP_IOS_ID = "1236424793";
export const IOS_SYMLINK =
  "itms://itunes.apple.com/us/app/aplyft/id1236424793?ls=1&mt=8";
export const GOOGLE_PLAY_SYMLINK = "market://details?id=com.brightlab.aplyft";

// endpoint API

export const PROTOCOL = "https://";
export const URI = PROTOCOL + "appx.aplyft.com"; //"appx.aplyft.com";
export const API = URI + "/api";

// user session related enpoints
export const LOGIN_URI = API + "/login/"; //Changed TO the NEW Endpoint
export const SIGNUP_URI = API + "/user/"; //Changed TO the NEW Endpoint
export const VIDEO_URI = API + "/videos/?approved=1&public=1"; //Changed To the New Endpoint
export const SIGNUP_URI_FB = TOKEN => {
  return API + "/rest-auth/facebook/?access_token=" + TOKEN;
};

export const RESET_PASS = EMAIL => {
  return API + "/user/reset_password/?email=" + EMAIL; //Changed To the New Endpoint
};

// Push notification endpoints
export const REGISTER_PN = USERID => {
  return API + "/users/" + USERID + "/tokens/"; //Skipped for now
};
export const CARDS_VIEW_INFO = USERID => {
  return API + "/users/get_credit_card_info/?user_id=" + USERID; //Skipped for now
};

export const ALL_CARDS_INFO = USERID => {
  return API + "/users/" + USERID + "/payments/get_all_cards_info/"; //Skipped for now
};

export const DELETE_CREDIT_CARD = (USERID, CARDID) => {
  return API + "/users/" + USERID + "/payments/delete_card/?card_id=" + CARDID; //Skipped for now
};

export const SET_CREDIT_CARD_AS_DEFAULT = (USERID, CARDID) => {
  return (
    API + "/users/" + USERID + "/payments/set_default_card/?card_id=" + CARDID
  ); //Skipped for now
};

export const SYNC_CALENDAR = USERID => {
  return API + "/users/" + USERID + "/user_personal_calendar/"; //Skipped for now
};

export const SYNC_HEALTHKIT_VALUES = USERID => {
  return API + "/users/" + USERID + "/user_health_kit/";
};

// goal related enpoints
export const SET_GOAL_URI = API + "/user_goal/"; //Changed To the New Endpoint
export const OPT_OUT_GOAL_URI = (USERID, GOALID) => {
  return (
    API + "/user_goal/opt_out/?user_id=" + USERID + "&user_goal_id=" + GOALID //Changed To the New Endpoint
  );
};

export const AVAILABLE_TRAINERS_URI = USERID => {
  return (
    API +
    "/personal_trainer_category/check_available_trainers/?user_id=" + //Changed To the New Endpoint
    USERID
  );
};

export const CHOOSE_TRAINER_URI =
  API + "/user_goal_personal_trainer/set_personal_trainer/"; //Changed To the New Endpoint

export const CANCEL_TRAINER_URI =
  API + "/user_goal_personal_trainer/cancel_personal_trainer/"; //Changed To the New Endpoint

export const GET_WORKOUTS = (USERID, USERDATE) => {
  return (
    API +
    "/users/" +
    USERID +
    "/workouts/get_workouts_by_uid/?start_date=" +
    USERDATE +
    "&deleted_workouts=true"
  ); //Changed To the New Endpoint
};

export const UPDATE_USER_SETTINGS =
  API + "/user_settings/update_user_settings/"; //Changed To the New Endpoint

export const GET_NUTRITION = USERID => {
  return API + "/users/" + USERID + "/user_goal_nutritions/"; //Changed To the New Endpoint
};
export const SUBMIT_WORKOUT = (USERID, WORKOUTID) => {
  return (
    API +
    "/users/" +
    USERID +
    "/workouts/" +
    WORKOUTID +
    "/log_workouts/?user_date=" +
    moment().format("YYYY-MM-DD")
  ); //Changed To the New Endpoint
};
export const SUBMIT_NUTRITION = USERID => {
  return API + "/users/" + USERID + "/user_goal_nutritions/"; //Changed To the New Endpoint
};

export const SUBMIT_USER_FEEDBACK = API + "/workouts/update_user_feedback/"; //Changed To the New Endpoint

export const UPDATE_USER = USERID => {
  return API + "/users/" + USERID + "/"; //Changed To the New Endpoint
};
export const PAYMENT_USER = (USERID, GOALID) => {
  return API + "/users/" + USERID + "/goal/" + GOALID + "/payments"; //
};
export const PAYMENT_HISTORY = USERID => {
  return API + "/users/" + USERID + "/payment_history/"; //Changed To the New Endpoint
};

export const PAYMENT_DETAIL_USER = (USERID, PT_ID) => {
  return (
    API +
    "/users/" +
    USERID +
    "/payments/get_next_payment/?personal_trainer_id=" +
    PT_ID
  );
};
export const VALIDATE_PROMO_CODE = (
  PROMO_CODE,
  PAYMENT_PRICING_PLAN_ID,
  PT_ID
) => {
  return (
    API +
    "/payment_coupon/check_validity/?coupon_code=" +
    PROMO_CODE +
    "&payment_pricing_plan_id=" +
    PAYMENT_PRICING_PLAN_ID +
    "&personal_trainer_id=" +
    PT_ID
  );
};

export const STRIPE_PAYMENT = USERID => {
  return API + "/users/" + USERID + "/payments/stripe_payment/";
};
export const PAYMENT_CONFIRMATION = (USERID, GOALID, PAYMENT_ID, PAYPAL_ID) => {
  return (
    API +
    "/users/" +
    USERID +
    "/goal/" +
    GOALID +
    "/payments-confirmation/" +
    PAYMENT_ID +
    "/" +
    PAYPAL_ID
  );
};
export const UPDATE_CARD_INFO_USER = (USERID, GOALID) => {
  return API + "/users/" + USERID + "/payments/update_payment_info/";
};

export const GET_DailyView_WORKOUT = (USERID, USERDATE) => {
  return (
    API +
    "/users/" +
    USERID +
    "/workouts/get_daily_workouts/?user_date=" +
    USERDATE +
    "&deleted_workouts=true"
  ); //Changed To the New Endpoint
};
export const GET_WORKOUT_DETAIL = WORKOUT_ID => {
  return (
    API +
    "/workouts/get_workout_details_by_id/?workout_id=" +
    WORKOUT_ID +
    "&deleted_workouts=true"
  ); //Changed To the New Endpoint
};

export const CHANGE_PASS_USER = USERID => {
  return API + "/users/" + USERID + "/change_password/"; //Changed To the New Endpoint
};
export const CHANGE_PHOTO_USER = USERID => {
  return API + "/users/" + USERID + "/upload_image/";
};
export const GET_DAILY_WORKOUT = (USERID, CATEGORY_ID) => {
  var str =
    API +
    "/users/" +
    USERID +
    "/program_templates/populate_free_program_template/?start_date=" +
    moment().format("YYYY-MM-DD");

  if (CATEGORY_ID) str = str + "&category_id=" + CATEGORY_ID + "&is_ipf=true";

  return str;
};

export const GET_CHAT_LIST = USERID => {
  return API + "/users/" + USERID + "/user_trainer_chats/";
};

export const GET_PERFORMANCE_LIST = (USERID, TYPE, DURATION) => {
  return (
    API +
    "/users/" +
    USERID +
    "/user_performance_trackings/get_performance/?type=" +
    TYPE +
    "&duration=" +
    DURATION
  );
};
export const GET_PERFORMANCE_DETAIL_LIST = (USERID, TYPE, DURATION) => {
  return (
    API +
    "/users/" +
    USERID +
    "/user_performance_trackings/?user=" +
    USERID +
    "&type=" +
    TYPE +
    "&duration=" +
    DURATION
  );
};
export const DELETE_PERFORMANCE_RECORD = (USERID, RECORD_ID) => {
  return (
    API + "/users/" + USERID + "/user_performance_trackings/" + RECORD_ID + "/"
  );
};

export const GET_PERFORMANCE_SEARCH_LIST = USERID => {
  return (
    API + "/users/" + USERID + "/user_performance_trackings/get_performance/"
  );
};
export const DELETE_PERFORMANCE_TYPE = (USERID, TYPE) => {
  return API + "/users/" + USERID + "/performance/" + TYPE; // !! NOT BEING USED FOR NOW
};
export const ADD_PERFORMANCE_VALUE = USERID => {
  return API + "/users/" + USERID + "/user_performance_trackings/"; //Changed To the New Endpoint
};
export const GET_PROGRESS_DATA = USERID => {
  return API + "/users/" + USERID + "/user_files/"; //Changed To the New Endpoint
};
export const SUBMIT_REVIEW = () => {
  return API + "/user_goal_personal_trainer/submit_review/"; //Changed To the New Endpoint
};

export const SUBMIT_USER_REVIEW = () => {
  return API + "/personal_trainer_user_review/"; //Changed To the New Endpoint
};
export const GET_USER_REVIEW = PT_ID => {
  return API + "/personal_trainer_user_review/?personal_trainer=" + PT_ID; //Changed To the New Endpoint
};
export const SUBMIT_USER_REVIEW_PUT = RATING_ID => {
  return API + "/personal_trainer_user_review/" + RATING_ID + "/"; //Changed To the New Endpoint
};
export const VERSION_CHECK = () => {
  return (
    API +
    "/mobile_user_version/?platform=" +
    Platform.OS +
    "&version=" +
    APP_VERSION
  ); //Changed To the New Endpoint
};

// chat enppoint
// export const CHAT_SOCKET_IP = "http://ec2-34-242-64-213.eu-west-1.compute.amazonaws.com";
// export const CHAT_SOCKET_IP = "https://app.aplyft.com";
// export const CHAT_SOCKET_PORT = "3000";
// export const CHAT_SOCKET_ADDRESS = CHAT_SOCKET_IP + ":" + CHAT_SOCKET_PORT;

// sendBird Chat system
export const SENDBIRD_APP_ID = "0A5305E8-B2E0-4D5C-BAE3-3A0266949293";

// suggested trainers
export const ALLOWED_NUMBER_OF_TRAINER_TO_BE_SELECTED = 3;
export const STRIPE_KEY = "pk_test_Tx9RAfQEdgKedT5CJoft5Jlw"; //"pk_live_74IsaSRnjRRrBOAg3h1RBnq6"; // "pk_test_Tx9RAfQEdgKedT5CJoft5Jlw";
export const STRIPE_MERCHANT_KEY = "merchant.brightlab.aplyft.com";
export const MIXPANEL_TOKEN = "4d622dd185a87ae377606d1aeb10d5b8";
