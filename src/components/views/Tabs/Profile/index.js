import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Linking,
  DeviceEventEmitter,
  ImageBackground,
  Alert,
  Platform
} from "react-native";
import { connect } from "react-redux";
import {
  Card,
  CardSection,
  Input,
  Button,
  Spinner
} from "../../../../components/common";
import Rating from "./../Training/DailyView/DailyTrainingScreen/components/rating";
import ProgressBar from "./components/progressbar";
import styles from "./styles";
import BarStyles from "../../../styles/tabBarStyle";
import {
  settingpress,
  viewmorepress,
  optoutpress,
  gotoPersonalTrainer,
  gotoSetGoal,
  onAgreementPress,
  gotoProgressGallery,
  uploadImage,
  check_Last_Weight_Inptut,
  check_mobile_version,
  gotoEditReview,
  gotoAddReview,
  submitRating,
  closeRatingModal
} from "./actions";
import { healthiOSSync } from "../../ProfileSettings/actions";
import FastImage from "react-native-fast-image";
import ActionSheet from "react-native-actionsheet";
import ImagePicker from "react-native-image-crop-picker";
import Mixpanel from "react-native-mixpanel";
import firebase from "react-native-firebase";
import { MIXPANEL_TOKEN } from "../../../../variables";

class profileScreen extends Component {
  static navigationOptions = {
    title: "Profile",
    headerTintColor: "white",

    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../../../../assets/images/profile-icon.png")}
        style={[BarStyles.iconSize, { tintColor: tintColor }]}
      />
    )
  };

  constructor(props) {
    super(props);

    state = {};
    // console.log("constring profile tab");
    // loading the payments from the server

    // DeviceEventEmitter.addListener("refreshProfile", e => {
    //   this.setState({ h: Math.random() });
    // });

    this.initiateMixpanel();
    this.props.healthiOSSync();
    // if(Platform.OS != "android")
    //   firebase.analytics().setUserId("user_" + this.props.user.id);
  }

  initiateMixpanel = async () => {
    try {
      const mpInstance = await Mixpanel.sharedInstanceWithToken(MIXPANEL_TOKEN);

      Mixpanel.identify("user_" + this.props.user.id);
      Mixpanel.set({
        $first_name: this.props.user.firstName,
        $last_name: this.props.user.lastName,
        $email: this.props.user.email
      });
    } catch (err) {
      console.log(`Error initiating Mixpanel:`, err);
    }
  };

  onSettingPress() {
    this.props.settingpress();
  }

  onViewMorePress() {
    this.props.viewmorepress();
  }
  componentDidMount() {
    // this.props.check_mobile_version();
    // if (this.props.user.goal.length > 0)
    // this.props.check_Last_Weight_Inptut();
  }

  onOptOutPress() {
    Alert.alert(
      "Opt out?",
      "Are you sure you want to cancel your current engagement?",
      [
        { text: "Cancel", onPress: () => console.log("OK Pressed") },
        { text: "Yes", onPress: () => this.props.optoutpress() }
      ],
      { cancelable: true }
    );
  }

  onViewProfilePress(trainerID, status, chosen) {
    // NEED TO CHANGE
    this.props.gotoPersonalTrainer({ trainerID, status, chosen });
  }

  onEditReviewPress(trainerID, status, chosen, ratingStars, ratingText) {
    this.props.gotoEditReview({ trainerID, status, chosen });
  }

  onAddReviewPress(trainerID, status, chosen) {
    this.props.gotoAddReview({ trainerID, status, chosen });
  }

  onSetNewGoalPress() {
    this.props.gotoSetGoal();
  }

  onAgreementPress() {
    this.props.onAgreementPress();
  }

  onProgressGalleryPress() {
    // code here
    this.props.gotoProgressGallery();
  }

  _renderGoalText = () => {
    switch (this.props.user.goal[0].category_id) {
      case "1":
        return "Athletic Performance";
      case "27": // Track & Field
        return "Athletic Performance (Track & Field)";

      case "2":
      case "22":
      case "23":
        return "Powerlifting";

      case "25":
      case "26":
        return "Bodybuilding";

      case "3":
        return "CrossLift";

      case "4":
        return "Bodybuilding";

      case "5": // basket ball
      case "28": // basketball guard
      case "29": // basketball forward
        return "Atheltic Performance (Basketball)";
    }
  };

  _renderPayment = () => {
    if (this.props.payments)
      if (this.props.payments.length > 0)
        for (var index in this.props.payments) {
          var row = this.props.payments[index];

          dateObject = new Date(Date.parse(row.due_date));
          dateReadable = dateObject.toDateString();

          return (
            <View style={styles.mainPaymentContainer}>
              <Text>Next Payment is Due Date: {dateReadable}</Text>
              <Text style={styles.paymentAmountStyle}>Amount</Text>
              <Text>
                {row.amount} {row.currency}
              </Text>
              <Text style={styles.paymentDescriptionStyle}>
                {row.description}
              </Text>
              <View style={styles.paymentButton}>
                <Button onPress={() => console.log("pay")}>
                  <Text>Process Payment</Text>
                </Button>
              </View>
            </View>
          );
        }
  };

  _renderFields = () => {
    let data = this.props.user.goal[0].fields;
    return data.map((res, key) => {
      return (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View
            style={{
              alignSelf: "center",
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#181f31"
            }}
          />
          <Text style={{ color: "grey", fontSize: 16 }}>{res.title}</Text>
          <Text style={{ color: "grey", fontSize: 16 }}>
            {" "}
            {res.value == 0 ? "" : res.value}
          </Text>
        </View>
      );
    });
    // var tmp = "";
    // for (var index in this.props.user.goal[0].fields) {
    //   var field_model = this.props.user.goal[0].fields[index];
    //   tmp +=
    //     "⬤ " +
    //     field_model.title +
    //     " " +
    //     (field_model.value == 0 ? "" : field_model.value) +
    //     "\n";
    // }
    //
    // return tmp;
  };

  _renderFitnessExpert = () => {
    if (this.props.user.goal[0].personlTrainer != null) {
      let pt = this.props.user.goal[0].personlTrainer;
      var chosen = this.props.user.goal[0].personlTrainer.chosen;
      var ratingStars = this.props.user.goal[0].personlTrainer.ratingStars;
      var ratingText = this.props.user.goal[0].personlTrainer.ratingText;
      var status = "active";

      // check the picture of the trainer profile
      let trainer_picture =
        "https://images-aplyft.s3.amazonaws.com/aplyft/logo-gray-bg.png";
      if (pt.picURL)
        switch (pt.picURL) {
          case "":
          case "null":
          case null:
            break;

          default:
            trainer_picture = pt.picURL;
            break;
        }

      return (
        <CardSection>
          <View style={styles.expertcontainerStyle}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between"
              }}
            >
              <View>
                <Text style={styles.headertextStyle}>My Fitness Expert</Text>
              </View>
            </View>

            <View style={styles.fitnessexpertStyle}>
              <View style={{ overflow: "hidden", borderRadius: 35 }}>
                <FastImage
                  style={styles.experticonStyle}
                  source={{
                    uri: trainer_picture,
                    priority: FastImage.priority.normal
                  }}
                />
              </View>

              <View style={styles.expertdetail}>
                <Text style={styles.expertNameStyle}>
                  {pt.firstName} {pt.lastName}
                </Text>

                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={this.onViewProfilePress.bind(
                      this,
                      pt.id,
                      status,
                      chosen
                    )}
                  >
                    <Text style={styles.textStyle}>VIEW PROFILE</Text>
                  </TouchableOpacity>
                </View>
                {ratingStars != null ? (
                  <View style={styles.ReviewbuttonWrapper}>
                    <TouchableOpacity
                      style={styles.ReviewbuttonStyle}
                      onPress={this.onEditReviewPress.bind(
                        this,
                        pt.id,
                        status,
                        chosen,
                        ratingStars,
                        ratingText
                      )}
                    >
                      <Text style={styles.textStyle}>EDIT REVIEW</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.ReviewbuttonWrapper}>
                    <TouchableOpacity
                      style={styles.ReviewbuttonStyle}
                      onPress={this.onAddReviewPress.bind(
                        this,
                        pt.id,
                        status,
                        chosen
                      )}
                    >
                      <Text style={styles.textStyle}>ADD REVIEW</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </CardSection>
      );
    }
  };

  _renderProgress = () => {
    if (this.props.user.workouts.length > 0)
      return (
        <View>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <ProgressBar percentage={this.props.percentage} />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text style={{ color: "red", fontSize: 16, fontWeight: "bold" }}>
                {this.props.percentage} %
              </Text>
            </View>

            <View>
              <Text style={{ color: "#bababa", fontSize: 16 }}>
                Remaining {this.props.remaining_workouts} Workout(s)
              </Text>
            </View>
          </View>
        </View>
      );
  };

  _renderFreeProgram = () => {
    return (
      <CardSection>
        <View style={styles.expertcontainerStyle}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text style={styles.headertextStyle}>Free Workout Enabled</Text>
            </View>
          </View>
        </View>
      </CardSection>
    );
  };

  _renderProgressGalleryComponent = () => {
    return (
      <TouchableOpacity onPress={this.onProgressGalleryPress.bind(this)}>
        <CardSection>
          <View style={{ flex: 1 }}>
            <View
              style={{
                marginTop: 5,
                marginBottom: 5,
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between"
              }}
            >
              <View>
                <Text style={styles.headertextStyle}>Progress Gallery</Text>
              </View>
              <View style={{ alignSelf: "center" }}>
                <Image
                  style={styles.forwardicon}
                  source={require("./../../../../assets/images/chevron.jpg")}
                />
              </View>
            </View>
          </View>
        </CardSection>
      </TouchableOpacity>
    );
  };

  openActionSheet = () => {
    this.ActionSheet.show();
  };

  _openSettings = () => {
    // this is only for iOS
    Linking.openURL("app-settings:");
  };

  _onActionSheetPress = index => {
    switch (index) {
      case 0: // take photo
        ImagePicker.openCamera({
          // multiple: true
          compressImageQuality: 0.5
        })
          .then(image => {
            console.log("choosing from camera", image);
            this.props.uploadImage(image);
          })
          .catch(err => {
            if (err.code == "E_PICKER_NO_CAMERA_PERMISSION")
              Alert.alert(
                "Camera Access",
                "Please allow APLYFT to access your camera",
                [
                  {
                    text: "Settings",
                    onPress: () => {
                      // this is only for iOS
                      this._openSettings();
                    }
                  },
                  { text: "Cancel" }
                ],
                { cancelable: true }
              );
          });
        break;

      case 1: // choose 1 photo
        ImagePicker.openPicker({
          mediaType: "photo",
          compressImageQuality: 0.5
        }).then(images => {
          console.log("choosing from gallery", images);
          this.props.uploadImage(images);
        });
        break;

      case 1: // choose 1 photo
        ImagePicker.openPicker({
          mediaType: "photo",
          compressImageQuality: 0.5
        })
          .then(images => {
            console.log("choosing from gallery", images);
            this.props.uploadImage(image);
          })
          .catch(err => {
            console.log(">>>>>>>>>>>", err);

            if (err.code == "E_PERMISSION_MISSING")
              Alert.alert(
                "Gallery Access",
                "Please allow APLYFT to access your gallery",
                [
                  {
                    text: "Settings",
                    onPress: () => {
                      // this is only for iOS
                      this._openSettings();
                    }
                  },
                  { text: "Cancel" }
                ],
                { cancelable: true }
              );
          });
        break;
    }
  };

  _renderGoalComponent = () => {
    if (this.props.user.goal.length < 1)
      return (
        <View>
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 6,
              borderColor: "#eeeeee",
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            <Button onPress={this.onSetNewGoalPress.bind(this)}>
              <Text>SET YOUR NEW GOAL</Text>
            </Button>

            <Text style={{ color: "#bbbbbb", padding: 20 }}>
              Set your goal to find and train with fitness experts
            </Text>
          </View>
        </View>
      );

    return (
      <Card>
        <CardSection>
          <View style={{ flex: 1, marginBottom: 5, flexDirection: "column" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.headertextStyle, { flex: 1 }]}>My Goal</Text>
              <View style={{ marginBottom: 10 }}>
                <TouchableOpacity onPress={this.onOptOutPress.bind(this)}>
                  <Text style={styles.optoutStyle}>Opt-Out</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={{ color: "#767676", fontSize: 16, fontWeight: "bold" }}
            >
              {this._renderGoalText()}
            </Text>
            <View style={{ color: "#777777", fontSize: 14 }}>
              {this._renderFields()}
            </View>

            {this._renderProgress()}
          </View>
        </CardSection>

        {this._renderProgressGalleryComponent()}
        {this.props.user.goal[0].freedailyWorkout
          ? this._renderFreeProgram()
          : this._renderFitnessExpert()}
      </Card>
    );
  };

  _renderUserAvatar = () => {
    var uri = require("./../../../../assets/images/logo-gray-bg.png");
    switch (this.props.user.imageURL) {
      case "":
      case null:
      case "null":
        break;

      default:
        uri = {
          uri: this.props.user.imageURL,
          priority: FastImage.priority.normal
        };
        break;
    }

    return (
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        style={styles.HeaderprofileStyle}
        source={uri}
      />
    );
  };

  ratingSubmit = data => {
    let user_rating_comment = data.text;
    let user_rating = data.stars;
    let user_goal_id = this.props.user.goal[0].id;
    let user_id = this.props.user.id;
    let pt_id = this.props.user.goal[0].personlTrainer.id;

    this.props.submitRating({
      user_rating_comment,
      user_rating,
      user_id,
      user_goal_id,
      pt_id
    });
    this.props.closeRatingModal();
  };
  RatingCancel = () => {
    this.props.closeRatingModal();
  };

  render() {
    return (
      <ScrollView style={styles.contentContainer}>
        {this.props.isLoading ? (
          <Modal transparent animationType="fade">
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.8)",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white", paddingBottom: 10 }}>
                {this.props.userLoadingMsg}
              </Text>
              <ActivityIndicator />
            </View>
          </Modal>
        ) : null}
        {this.props.user.goal.length > 0 &&
        this.props.user.goal[0].personlTrainer ? (
          <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.props.reviewModel}
            onRequestClose={() => {
              //console.log("Modal has been closed.");
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.8)",
                justifyContent: "center",
                alignItems: "center",
                padding: 20
              }}
            >
              <Rating
                review_txt_title={
                  this.props.user.goal[0].personlTrainer.ratingStars != null
                    ? "Edit Review"
                    : "Add Review"
                }
                review_btn_title={
                  this.props.user.goal[0].personlTrainer.ratingStars != null
                    ? "Edit Review"
                    : "Add Review"
                }
                text={
                  this.props.user.goal.length > 0
                    ? this.props.user.goal[0].personlTrainer.ratingText
                    : ""
                }
                ratingStars={
                  this.props.user.goal.length > 0
                    ? this.props.user.goal[0].personlTrainer.ratingStars
                    : "0"
                }
                date={new Date()}
                onPressSubmit={this.ratingSubmit.bind(this)}
                onPressCancel={this.RatingCancel.bind(this)}
              />
            </View>
          </Modal>
        ) : null}

        <View style={styles.HeaderStyle}>
          <View style={styles.headerinfoStyle}>
            <TouchableOpacity onPress={this.openActionSheet.bind(this)}>
              <View style={styles.mainContainerImage}>
                {this._renderUserAvatar()}
              </View>
              <View style={styles.plusIconStyle}>
                <Text style={styles.plusTextStyle}>+</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.usernameStyle}>{this.props.user.fullname}</Text>
          </View>
        </View>

        <View style={{ position: "absolute", right: 30, top: 30 }}>
          <TouchableOpacity onPress={this.onSettingPress.bind(this)}>
            <Image
              resizeMode="cover"
              style={styles.settingsStyle}
              source={require("./images/settings.png")}
            />
          </TouchableOpacity>
        </View>

        {this._renderGoalComponent()}

        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          title={"Upload your photo"}
          options={["Take Photo", "Choose Photo", "Cancel"]}
          cancelButtonIndex={2}
          onPress={this._onActionSheetPress.bind(this)}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ user, profile }) => {
  // need to calculate the number of workouts available
  let total = user.user.workouts.length;
  var finished = 0;
  for (var index in user.user.workouts) {
    var row = user.user.workouts[index];
    if (row.loged) ++finished;
  }

  let percentage = Math.ceil((finished * 100) / total);

  // total    -> 100
  // finished -> x

  return {
    user: user.user,
    payments: user.payments,
    percentage: percentage,
    remaining_workouts: total - finished,
    isLoading: profile.loading,
    userLoadingMsg: profile.userLoadingMsg,
    reviewModel: profile.reviewModel
  };
};

export default connect(
  mapStateToProps,
  {
    check_Last_Weight_Inptut,
    settingpress,
    viewmorepress,
    optoutpress,
    gotoPersonalTrainer,
    gotoSetGoal,
    uploadImage,
    onAgreementPress,
    gotoProgressGallery,
    healthiOSSync,
    check_mobile_version,
    gotoEditReview,
    gotoAddReview,
    submitRating,
    closeRatingModal
  }
)(profileScreen);
