import axios from "axios";
import realm from "../../../models";
import { GET_PROGRESS_DATA } from "../../../variables";
import moment from "moment";
import ImagePicker from "react-native-image-crop-picker";

export const uploadData = (data, multiple = true) => {
  return (dispatch, getState) => {
    // let the user know that the user
    dispatch({
      type: "progress_gallery_uploading",
      payload: true
    });

    // uploading the files as form data
    // adding in a loop all the uploaded files as
    var to_be_sent = new FormData();
    if (multiple) {
      data.forEach((file, index) => {
        var ext = "JPG";
        if (file.filename == undefined) {
          let ar = file.path.split(".");
          ext = ar[ar.length - 1];
        }
        to_be_sent.append("files", {
          uri: file.path,
          type: file.mime,
          name: file.filename || "tmp." + ext
        });
      });
    } else {
      to_be_sent.append("files", {
        uri: data.path,
        type: data.mime,
        name: "tmp.JPG"
      });
    }
    to_be_sent.append("token", "fghf-fghrtyh6-hfe-dffaa");
    to_be_sent.append("date", moment().format("YYYY-MM-DD"));

    const axios_config = {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: progressEvent => {
        // calculating and showing the uploaded percentage to the user
        let percentCompleted = Math.round(
          progressEvent.loaded * 100 / progressEvent.total
        );
        dispatch({
          type: "progress_gallery_uploading_percentage",
          payload: percentCompleted
        });
      }
    };
    axios
      .post(
        GET_PROGRESS_DATA(getState().user.user.id),
        to_be_sent,
        axios_config
      )
      .then(results => {
        console.log("upload successfulle");
      })
      .catch(error => {
        console.log("upload error", error);
      })
      .then(() => {
        ImagePicker.clean()
          .then(() => {
            console.log("removed all tmp images from tmp directory");
          })
          .catch(e => {
            alert(e);
          });

        // in this dispatch the loading modal will disappear once its finished
        dispatch(fetchDataFromServer());
      });
  };
};

export const fetchDataFromServer = () => {
  return (dispatch, getState) => {
    axios
      .get(GET_PROGRESS_DATA(getState().user.user.id))
      .then(results => {
        var data = results.data.results;

        realm.write(() => {
          // delete all before re-inserting
          let allprogress = realm.objects("ProgressGalleryModel");
          realm.delete(allprogress);

          // need to fix that endpoint to loop and get all the data

          data.forEach((row, index) => {
            let galleryModel = realm.create(
              "ProgressGalleryModel",
              {
                id: String(row.id),
                url: row.url || "",
                token: row.token || "",
                type: row.type || "",
                date: new Date(row.date)
              },
              true
            ); // update if exists
          });
        });

        // after setting the realm database refresh the views
        dispatch({ type: "progress_gallery_reload_from_realm" });
      })
      .catch(error => {
        console.log("error loading progress data", error);
      })
      .then(() => {
        dispatch({
          type: "progress_gallery_uploading",
          payload: false
        });
      });
  };
};

export const showGallery = (isVisible, index) => {
  return {
    type: "progress_gallery_photo_modal",
    payload: {
      isVisible: isVisible,
      index: index
    }
  };
};

export const showVideo = (isVisible, item) => {
  return {
    type: "progress_gallery_video_modal",
    payload: {
      isVisible: isVisible,
      item: item
    }
  };
};
