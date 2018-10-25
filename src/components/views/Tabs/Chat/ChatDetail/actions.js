import realm from "../../../../../models";
import moment from "moment";

export const updateNotificationIcon = payload => {
  // we will return a function so that redux-thuk will know that its an asynchronice request
  return dispatch => {
    dispatch({
      type: "chat_notification_update",
      payload: 0
    });
  };
};

export const updateUploadingToSendBird = payload => {
  return {
    type: "chat_details_upload_sendbird",
    payload: payload
  };
};

export const updateisRecording = payload => {
  return {
    type: "chat_details_recording",
    payload: payload
  };
};

// this is where we will update realm
export const storeMessage = payload => {
  return (dispatch, getState) => {
    const roomId = getState().chatDetail.roomId;
    const createdAt = moment(payload.createdAt).toDate();
    // this is a heavy operation because we are opening realm and closing it on each loop msg
    realm.write(() => {
      realm.create(
        "ChatMessageModel",
        {
          _id: payload._id,
          roomId: roomId,
          text: payload.text || null,
          audio: payload.audio || null,
          image: payload.image || null,
          video: payload.video || null,
          user_id: String(payload.user._id),
          user_name: payload.user.name,
          user_avatar: payload.user.avatar,
          type: payload.type || null,
          created_at: createdAt
        },
        true
      );
    });

    dispatch({
      type: "chat_details_msg",
      payload: payload
    });
  };
};
