const INITIAL_STATE = {
  isSubmitting: false,
  category: null,
  nutrition_plan: false,
  fields: []
};

// we will use this auth function with the state and action
// use this auth reducer to handle the login state page and data
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "user_set_goal_start":
      return { ...state, isSubmitting: true };

    // case 'user_set_goal_success':
    // 	return { ...state, isSubmitting: false};
    case "user_set_goal_model_off":
      return { ...state, isSubmitting: false };

    default:
      return state;
  }
};
