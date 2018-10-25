import Realm from "../../../../../models";
import moment from "moment";

const INIT_STATE = {
  channel: null,
  roomId: null,
  uploadingToSendBird: false,
  isRecording: false,
  opponent_id: null,
  messages: [],
  isActive: true,
  pic: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // unloading
    case "user_logout":
      return { ...state, msgs: null };

    // initializing
    case "goto_chatview":
      // loading records form realm
      let msgs = Realm.objects("ChatMessageModel")
        .filtered("roomId = $0", action.payload.roomId)
        .sorted("created_at", true);

      // convert from realm structure to gifted msg
      var messages = [];
      for (var index in msgs) {
        const row = msgs[index];
        var obj_to_insert = {
          _id: row._id,
          text: row.text,
          user: {
            _id: row.user_id,
            name: row.user_name,
            avatar: row.user_avatar
          },
          createdAt: moment(row.created_at).toDate()
        };

        // adding the audio and photos, from realm its always null
        if (row.audio != null) obj_to_insert.audio = row.audio;
        if (row.image != null) obj_to_insert.image = row.image;
        if (row.video != null) obj_to_insert.video = row.video;

        messages.push(obj_to_insert);
      }

      return {
        ...state,
        messages: messages,
        roomId: action.payload.roomId,
        opponent_id: action.payload.opponentId
      };

    case "chat_details_msg":
      // double check if the message already exists in the gifted Chat
      var isFound = false;
      for (var index in state.messages) {
        const obj = state.messages[index];
        if (obj._id == action.payload._id) {
          isFound = true;
          break;
        }
      }
      if (isFound) return state;

      // the order of the msg is important, we want to prepand not append
      return { ...state, messages: [action.payload, ...state.messages] };

    case "chat_details_upload_sendbird":
      return { ...state, uploadingToSendBird: action.payload };

    case "chat_details_recording":
      return { ...state, isRecording: action.payload };

    case "chat_detail_update_channel":
      return { ...state, channel: action.payload };

    default:
      return state;
  }
};
