import realm from "../../../models";
import { CHANGE_PHOTO_USER } from "../../../variables";
import { Alert } from "react-native";
import axios from "axios";

export const onCancelPress = () => {
  return {
    type: "go-back"
  };
};

export const uploadImage = ({ base64 }, user_id) => {
  return (dispatch, getState) => {
    var success = false;

    // for user feedback
    dispatch({ type: "upload_photo_start" });
    var bodyFormData = new FormData();
    bodyFormData.append("user_id", user_id);
    bodyFormData.append("image", "data:image/jpeg;base64," + base64);

    axios
      .post(CHANGE_PHOTO_USER, bodyFormData)
      .then(result => {
        success = true;
        var data = result.data;
        realm.write(() => {
          getState().user.user.imageURL = data.photo_url;
        });

        dispatch({ type: "upload_photo_success" });
      })
      .catch(error => {
        console.log("error photo upload", error);
      })
      .then(() => {
        if (success) dispatch({ type: "reload_user_from_realm" });
      })
      .then(() => {
        if (success) dispatch({ type: "go-back" });
      });
  };
};
