// import data from './data.json';
import realm from '../../../../models';
import moment from "moment";
import { mapDataToSectionList } from '../ProgressPhotoListView/reducer';

// load the data form realm
var dataSource = realm.objects('ProgressGalleryModel').filtered('type = $0', "video/mp4");
const INITIAL_STATE = { 
	data: mapDataToSectionList(dataSource),
	refreshing: false,
	isGalleryVisible: false,
	currentVideo: null
};

// use this auth reducer to handle the profile edit page and data
export default (state = INITIAL_STATE, action) => {
  	switch (action.type) {

  		case "progress_gallery_video_modal":
  		
        return { ...state, isGalleryVisible: action.payload.isVisible, currentVideo: action.payload.item }

  		case "progress_gallery_reload_from_realm":
  			var dataSource = realm.objects('ProgressGalleryModel').filtered('type = $0', "video/mp4");
  			return { ...state, data: mapDataToSectionList(dataSource)};

		default:
	  		return state;
  	}
};