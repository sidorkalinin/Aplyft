

export const VideoInfoLoad_Realm = (id) => {
	
	// console.log('The id passed in the action is: ',id);
	
	return {
		type: 'video_info_load_realm',
		payload: id
	};
};