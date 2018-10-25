import realm from '../../../models';

// load the data form realm
let data = realm.objects('PaymentModel');
const INITIAL_STATE = { 
	data : data,
	refreshing : false,
};


// use this auth reducer to handle the profile edit page and data
export default (state = INITIAL_STATE, action) => {
  	switch (action.type) {

  		case "user_logout":
  			return { ...state, data: [] };

		case "payment_history_reload":
			let data = realm.objects('PaymentModel');
			return { ...state, data: data, refreshing : false};

		default:
	  		return state;
  	}
};