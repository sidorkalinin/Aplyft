import Realm from 'realm';

class ChatMessageModel extends Realm.Object {}
ChatMessageModel.schema = {
    name: 'ChatMessageModel',
    primaryKey: '_id',
    properties: {
        _id: { type: 'int' },
        roomId : { type: 'string', default: null, optional: true },
        text: { type: 'string', default: null, optional: true },
        audio: { type: 'string', default: null, optional: true },
        image: { type: 'string', default: null, optional: true },
        video: { type: 'string', default: null, optional: true },
        user_id: { type: 'string', default: null, optional: true },
        user_name: { type: 'string', default: null, optional: true },
        user_avatar: { type: 'string', default: null, optional: true },
        type: { type: 'string', default: null, optional: true },
        favorite : { type: 'bool', default: false }, // will be used later on
        created_at: { type: 'date' },
    },
};

export default ChatMessageModel;