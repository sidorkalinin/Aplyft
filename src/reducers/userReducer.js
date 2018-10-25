import { DeviceEventEmitter } from 'react-native';
import Realm from '../models';

// everytime this reducer file will get called it will reload the user obejct from realm
var userObject = Realm.objects('UserModel')[0]; // getting one user only

const INITIAL_STATE = {
	user : userObject,
	payments: [],
	notifications : 0, // using this for the notification for the caht system
};

export default (state = INITIAL_STATE, action) => {

	switch(action.type) {
		
		case 'chat_notification_update':
			return { ...state, notifications: action.payload };

		case 'refresh_user_goal_payment':
			let payments = Realm.objects('PaymentModel');
			return { ...state, payments: payments};

		case 'reload_user_from_realm':
			DeviceEventEmitter.emit('refreshProfile',  {});
			// realod the data implicitely
			userObject = Realm.objects('UserModel')[0];
			return { ...state, user: userObject };

		default:
			return state;
	}

};