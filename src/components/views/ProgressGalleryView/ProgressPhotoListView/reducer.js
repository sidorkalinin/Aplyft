import data from './data.json';
import realm from '../../../../models';
import moment from "moment";

// will parse the data from the server to the section list
export const mapDataToSectionList = (dataSource) => {
	var finalArray = [];

	// check first if its an array
	for (var index in dataSource) {
		let row = dataSource[index];
		var section_exists = false;
		let date_as_string = moment(row.date).format("YYYY-MM-DD");

		var section = {
			title : date_as_string,
			data: []
		};
		
		// check if the section exists
		for (var _index in finalArray) 
			if(finalArray[_index].title == date_as_string){
				section_exists = true;
				section = finalArray[_index];
				break;
			}

		var section_data = {
			id: row.id,
			url: row.url,
			token: row.token,
			type: row.type
		};


		// adding the section data to its section
		section['data'].push(section_data);

		// need to add the section_data to the section array
		if (!section_exists)
			finalArray.push(section);
	}

	return finalArray;
};

export const mapDataToGalleryList = (dataSource) => {
	var finalArray = [];
	for (var index in dataSource) {
		let row = dataSource[index];
		finalArray.push({ source: { uri: row.url } });
	}
	return finalArray;
};

// load the data form realm
var dataSource = realm.objects('ProgressGalleryModel').filtered('type = $0', "image/jpeg");
const INITIAL_STATE = { 
	data: mapDataToSectionList(dataSource),
	Images: [],
	refreshing: false,
	isGalleryVisible: false,
	galleryIndex: 0
};

// use this auth reducer to handle the profile edit page and data
export default (state = INITIAL_STATE, action) => {
  	switch (action.type) {

  		case "progress_gallery_photo_modal":
  			var dataSource = realm.objects('ProgressGalleryModel').filtered('type = $0', "image/jpeg");
        	return { ...state, isGalleryVisible: action.payload.isVisible, galleryIndex: action.payload.index, Images: mapDataToGalleryList(dataSource) }

  		case "progress_gallery_reload_from_realm":
  			var dataSource = realm.objects('ProgressGalleryModel').filtered('type = $0', "image/jpeg");
  			return { ...state, data: mapDataToSectionList(dataSource)};

		default:
	  		return state;
  	}
};