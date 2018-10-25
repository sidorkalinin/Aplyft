import Realm from '../../../../../models';

const INIT_STATE = {
	connectedToSendBird: false,
	data : [],
};

export default (state = INIT_STATE, action) => {
	switch(action.type) {
		
		case "user_logout":
			return { ...state, data: []};

		case 'load_chat_list_items':
			return { ...state};

		case 'ChatList_load_Realm':
			let chatcontact = Realm.objects('ChatContactsModel').sorted('fullname');
			return { ...state, data: chatcontact };
		
		case 'Chat_search_changed':
		  	let searchedname = Realm.objects('ChatContactsModel',).filtered('fullname CONTAINS[c] $0',action.payload).sorted('fullname');
			return { ...state, data: searchedname };

		case "ChatList_connect_to_sendbird":
			return { ...state, connectedToSendBird: action.payload };

		default:
			return state;
	}

};