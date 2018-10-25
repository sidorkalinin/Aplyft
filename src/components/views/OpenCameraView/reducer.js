const INITIAL_STATE = { 
	uploading : false
};


// use this auth reducer to handle the profile edit page and data
export default (state = INITIAL_STATE, action) => {
  	switch (action.type) {
  	
		case "upload_photo_start":
			return { ...state, uploading: true};

		case "upload_photo_success":
			return { ...state, uploading: false};

		default:
	  		return state;
  	}
};