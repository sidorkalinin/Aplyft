var INITAL_STATE = {
  requesting_free_daily_workout: false,
  fetchingData: false
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case "load_free_daily_workouts_start":
      return { ...state, requesting_free_daily_workout: true };

    case "load_free_daily_workouts_success":
      return { ...state, requesting_free_daily_workout: false };

    case "load_workouts_from_server_status":
      return { ...state, fetchingData: action.payload };

    default:
      return state;
  }
};
