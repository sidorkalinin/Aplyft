const INITIAL_STATE = { 
	isUpdating : false
};


// use this auth reducer to handle the profile edit page and data
export default (state = INITIAL_STATE, action) => {
  	switch (action.type) {
  	
		case "user_update_password_start":
			return { ...state, isUpdating: true};

		case "user_update_password_success":
			return { ...state, isUpdating: false};

		default:
	  		return state;
  	}
};