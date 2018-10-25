const INITIAL_STATE = {
  loading: false,
  userLoadingMsg: "",
  reviewModel: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "profile_show_loading":
      return { ...state, loading: true, userLoadingMsg: action.payload };

    case "profile_hide_loading":
      return { ...state, loading: false, userLoadingMsg: "" };
    case "gotoReview":
      console.log("I am here in gotoReview");
      return { ...state, reviewModel: true };
    case "close_reviewModel":
      console.log("I am here in close_reviewModel");
      return { ...state, reviewModel: false };

    default:
      return state;
  }
};
