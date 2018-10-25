import Realm from 'realm';

class ProgressGalleryModel extends Realm.Object {}
ProgressGalleryModel.schema = {
    name: 'ProgressGalleryModel',
    primaryKey: 'id',
    properties: {
        id: {type:'string'},
		url: {type: 'string'},
		token: {type: 'string'},
		type: {type: 'string', default: ''},
		date: {type: 'date'}
    },
};

export default ProgressGalleryModel;
