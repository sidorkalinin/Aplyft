const INITIAL_AUTH_STATE = { 
	isLoggedIn: false,
	email : '',
	password: '',
	loading : false,
	error : '',
};

// we will use this auth function with the state and action
// use this auth reducer to handle the login state page and data
export default (state = INITIAL_AUTH_STATE, action) => {
  	switch (action.type) {
		case 'email_change':
	  		return { ...state, email: action.payload, error : '', loading : false };
	  	case 'password_change':
	  		return { ...state, password: action.payload, error : '', loading : false };
	  	case 'user_login_start' :
	  		return { ...state, loading : true, error : '' };
	  	case 'user_login_fail':
	  		return { ...state, error: 'Wrong user/pass' ,loading : false, password: '' };
	  	case 'user_login_loading_change':
	  		return { ...state, loading: action.payload };
	  	case 'user_login_success':
	  		// console.log("the user has loged in successfully", action);
	  		
	  		return { ...state,
	  			error: '', 
	  			loading : false, 
	  			email : '',
	  			password : '',
	  			isLoggedIn : true
	  		};

		default:
	  		return state;
  	}
};