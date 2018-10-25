// import data from './data.json';
import realm from '../../../../../models';

let videoList = realm.objects('VideoModel').sorted('title');

const INITIAL_STATE = {
	dataSource : videoList,
	currentVideo : null
};

export default (state = INITIAL_STATE, action) => {

	switch(action.type) {
		case 'search_video_list_items':
			var filtered = null;
			if(action.payload.trim() != "")
				filtered = videoList.filtered('title CONTAINS[c] $0 OR tags CONTAINS[c] $0', action.payload).sorted('title');

			return {...state, dataSource: filtered || videoList };

		case 'load_video_list_items':
			return {...state, dataSource: videoList };

		case 'goto_videodetail_view':
			let video_obj = realm.objectForPrimaryKey('VideoModel', action.payload.id);
			return { ...state, currentVideo : video_obj };

		default:
			return state;
	}

};