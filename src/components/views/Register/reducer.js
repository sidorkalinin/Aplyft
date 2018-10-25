const INITIAL_AUTH_STATE = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  retype_password: "",
  error: "",
  loading: false,
  male: true
};

// we will use this auth function with the state and action
// use this auth reducer to handle the login state page and data
export default (state = INITIAL_AUTH_STATE, action) => {
  switch (action.type) {
    case "register_first_change":
      return {
        ...state,
        first_name: action.payload,
        error: "",
        loading: false
      };

    case "register_last_change":
      return { ...state, last_name: action.payload, error: "", loading: false };

    case "register_email_change":
      return { ...state, email: action.payload, error: "", loading: false };

    case "register_password_change":
      return { ...state, password: action.payload, error: "", loading: false };

    case "register_retype_password_change":
      return {
        ...state,
        retype_password: action.payload,
        error: "",
        loading: false
      };

    case "register_gender_change":
      return {
        ...state,
        error: "",
        loading: false,
        male: action.payload == "male" ? true : false
      };

    case "user_register_start":
      return { ...state, loading: true, error: "" };
    case "user_register_fail":
      return {
        ...state,
        error: "Wrong user/pass",
        loading: false,
        password: ""
      };
    case "user_register_success":
      // console.log("the user has register in successfully");

      return {
        ...state,
        error: "",
        // first_name: "",
        // last_name: "",
        loading: false,
        email: "",
        password: "",
        retype_password: ""
      };

    default:
      return state;
  }
};
