import Realm from 'realm';

class VideoModel extends Realm.Object {}
VideoModel.schema = {
    name: 'VideoModel',
    primaryKey: 'id',
    properties: {
        id:{ type:'string' },
		video_picture_url: {type: 'string', default: ''},
		video_url: {type: 'string', default: ''},
		title: {type: 'string', default: ''},
		description: {type: 'string', default: ''},
		timer: {type: 'string', default: ''},
		tags: {type: 'string', default: ''},
    },
};

export default VideoModel;
