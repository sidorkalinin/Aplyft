
// load the data form realm
const INITIAL_STATE = { 
	uploading: false,
	upload_percentage: 0,
	percentage: 0,
};

// use this auth reducer to handle the profile edit page and data
export default (state = INITIAL_STATE, action) => {
  	switch (action.type) {

  		case "progress_gallery_uploading":
  			return { ...state, uploading: action.payload };

  		case "progress_gallery_uploading_percentage":
  			return { ...state, percentage: action.payload}

		default:
	  		return state;
  	}
};