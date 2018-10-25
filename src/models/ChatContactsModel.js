import Realm from "realm";

class ChatContactsModel extends Realm.Object {}
ChatContactsModel.schema = {
  name: "ChatContactsModel",
  primaryKey: "id",
  properties: {
    id: { type: "string" },
    fullname: { type: "string", default: null },
    roomid: { type: "string", default: null },
    active: { type: "string", default: null, optional: true },
    user_id: { type: "string", default: null },
    unread_message_count: { type: "int", default: 0, optional: true },
    last_message:{type: "string", default: null, optional:true},
    last_message_createdAt:{type: "int", default:0, optional:true},
    last_message_type:{type: "string", default: null, optional:true},
    last_message_senderID:{type: "string", default: null, optional:true},
    last_message_readStatus:{type:"int", default:0, optional:true},
    // relation
    trainer: { type: "PersonalTrainerModel" }
  }
};

export default ChatContactsModel;
