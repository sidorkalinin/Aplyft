import Realm from '../../../../models';

// loading from realm
let data = Realm.objects('SuggestTrainerModel');
// calculating the number of selected trainers
var selected_trainers = 0;
var all_lock = false;
for (var index in data){
	var row = data[index];
	if (row.status != "default")
		selected_trainers += 1;

	// lock the trainer selection if one trainer is chosen
	if(row.status == "active")
		all_lock = true;
}
var INITAL_STATE = {
	data : data,
	refreshing: false,
	isChoosing : false,
	selected_trainers : selected_trainers,
	all_lock : all_lock,
};

export default (state = INITAL_STATE, action) => {

	switch (action.type) {

		case "user_logout":
			return { ...state, data:[], selected_trainers:0 , all_lock: false };

		case "choose_trainer_success":
			return { ...state, isChoosing: false, selected_trainers: action.payload};

		case "choose_trainer_start":
			return { ...state, isChoosing : true };

		case "choose_trainer_change":
			return { ...state, isChoosing: action.payload };

		case "load_search_list_items_success":
			let data = Realm.objects('SuggestTrainerModel');
			var selected_trainers = 0;
			var all_lock = false;
			for (var index in data){
				var row = data[index];
				if (row.status != "default")
					selected_trainers += 1;
				
				// lock the trainer selection if one trainer is chosen
				if(row.status == "active")
					all_lock = true;
			}
			return { ...state, data: [...data], refreshing : false, selected_trainers: selected_trainers, all_lock: all_lock };

		default:
			return state;
	}

};