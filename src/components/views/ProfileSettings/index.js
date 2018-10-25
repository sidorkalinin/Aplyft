import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Switch,
  Platform
} from "react-native";
import { connect } from "react-redux";
import Styles from "./styles";
import {
  pushWorkoutDates,
  weightUpdate,
  logOut,
  gotoProfileEdit,
  gotoSupport,
  gotoTutorial,
  gotoUnits,
  gotoPaymentsHistory,
  calendarSync,
  viewCard,
  healthKitUpdate,
  healthiOSSync
} from "./actions";
import { uploadImage } from "../Tabs/Profile/actions";
import SettingsRow from "./components/settingsRow";
import ImagePicker from "react-native-image-crop-picker";
import FastImage from "react-native-fast-image";
import ActionSheet from "react-native-actionsheet";
import { updateCardInfo } from "../Payment/actions";
import stripe from "tipsi-stripe";
import { STRIPE_KEY, STRIPE_MERCHANT_KEY } from "../../../variables";

stripe.setOptions({
  publishableKey: STRIPE_KEY,
  merchantId: STRIPE_MERCHANT_KEY // Optional
  // androidPayMode: 'test', // Android only
});

class settingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTintColor: "white",
      headerRight: (
        <TouchableOpacity
          style={{ padding: 15 }}
          onPress={() => params.handleEditPress()}
        >
          <Text style={{ color: "white", fontSize: 16 }}>edit</Text>
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    props.navigation.setParams({ handleEditPress: this.props.gotoProfileEdit });
    this.state = {
      ids: [],
      switch: this.props.pushWorkouts == true ? 1 : 0
    };
  }

  _onTutorialPress = () => {
    this.props.gotoTutorial();
  };
  _onCalendarSyncPress = () => {
    this.props.calendarSync();
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
            console("error", err);
            alert(JSON.stringify(err));
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
    }
  };

  _onStripeActionSheetPress = index => {
    switch (index) {
      case 0: // View Card
        this.props.viewCard();
        break;

      case 1: // Update Card
        this._openStripeAndUpdateCard();
        break;
    }

  };

  openActionSheet = () => {
    this.ActionSheet.show();
  };

  _updateCardPayment = () => {
    // this._openStripeAndUpdateCard();
    // this.CardActionSheet.show();
    this.props.viewCard();
  };

  _openStripeAndUpdateCard = async () => {
     const token = await stripe.paymentRequestWithCardForm({
      // Only iOS support this options
      smsAutofillDisabled: true,
      requiredBillingAddressFields: "full",
      prefilledInformation: {
        billingAddress: {
          name: this.props.fullname,
          email: this.props.email
        }
      }
    });

    this.props.updateCardInfo(token, () => {
      console.log("done");
    });
  };

  _onSwitchChange = switchvalue => {
    this.props.pushWorkoutDates();
  };
  _onSwitch_WeightUpdate_Change = switchvalue => {
    this.props.weightUpdate();
  };
  _onSwitchHealKit_Change = switchvalue => {
    this.props.healthKitUpdate();
  };
  renderCheckBox() {
    var switchVal = this.props.pushWorkouts;
    const { rightButtonImage } = Styles;
    return (
      <Switch
        onTintColor={"#181f31"}
        onValueChange={this._onSwitchChange.bind(this)}
        tintColor={"#cccccc"}
        value={switchVal}
      />
    );
  }
  render_WeightUpdate_CheckBox() {
    var switchVal = this.props.updateWeight;
    const { rightButtonImage } = Styles;
    return (
      <Switch
        onTintColor={"#181f31"}
        onValueChange={this._onSwitch_WeightUpdate_Change.bind(this)}
        tintColor={"#cccccc"}
        value={switchVal}
      />
    );
  }
  renderHealthKitCheckBox() {
    var switchVal = this.props.healthKit;
    const { rightButtonImage } = Styles;
    return (
      <Switch
        onTintColor={"#181f31"}
        onValueChange={this._onSwitchHealKit_Change.bind(this)}
        tintColor={"#cccccc"}
        value={switchVal}
      />
    );
  }
  onPushDates() {
    this.props.pushWorkoutDates();
  }

  _renderUserAvatar  = () => {

    var uri = require("assets/images/logo-gray-bg.png");
    switch (this.props.imageURL) {
      case "":
      case null:
      case "null":
      break;
      
      default:
        uri = {
          uri: this.props.imageURL,
          priority: FastImage.priority.normal
        };
        break;
    }

    return (
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        style={Styles.imageStyle}
        source={uri}
      />
    );
  };
  render() {
    const {
      headConatiner,
      mainContainer,
      ScrollContainer,
      imageStyle,
      plusIconStyle,
      plusTextStyle,
      nameContainer,
      nameStyle,
      imageContainer
    } = Styles;

    return (
      <View style={mainContainer}>
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          title={"Upload your photo"}
          options={["Take Photo", "Choose Photo", "Cancel"]}
          cancelButtonIndex={2}
          onPress={this._onActionSheetPress.bind(this)}
        />
        <ActionSheet
          ref={o => (this.CardActionSheet = o)}
          title={"Card Actions"}
          options={["View Card", "Update Card", "Cancel"]}
          cancelButtonIndex={2}
          onPress={this._onStripeActionSheetPress.bind(this)}
        />
        <View style={headConatiner}>
          <View>
          <TouchableOpacity style={imageContainer} onPress={this.openActionSheet.bind(this)}>
            {this._renderUserAvatar()}
            {/*<FastImage
              resizeMode={FastImage.resizeMode.cover}
              style={imageStyle}
              source={{
                uri: this.props.imageURL || "",
                priority: FastImage.priority.normal
              }}
            />*/}
          </TouchableOpacity>
            <View style={plusIconStyle}>
              <Text style={plusTextStyle}>+</Text>
            </View>
          </View>
          <View style={nameContainer}>
            <Text style={nameStyle}>{this.props.fullname}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={this.props.gotoProfileEdit}>
              <Text>Edit Account</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={ScrollContainer}>
          <View
            //onPress={this.onPushDates.bind(this)}
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 20
            }}
          >
            <Text>Push workout's dates</Text>
            {this.renderCheckBox()}
          </View>
          <View
            style={{
              flex: 1,
              width: "100%",
              height: 1,
              backgroundColor: "#eeeeee"
            }}
          />
          <View
            //onPress={this.onPushDates.bind(this)}
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 20
            }}
          >
            <Text>Daily Weight Update</Text>
            {this.render_WeightUpdate_CheckBox()}
          </View>
          {Platform.OS == "ios"?<View
            style={{
              flex: 1,
              width: "100%",
              height: 1,
              backgroundColor: "#eeeeee"
            }}
          />:null}
          { Platform.OS == "ios" ?
            <View
              //onPress={this.onPushDates.bind(this)}
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 20
              }}
            >
              <Text>Health Data Update</Text>
              {this.renderHealthKitCheckBox()}
            </View>
            : null 
          }
          <SettingsRow
            onPress={this._onCalendarSyncPress.bind(this)}
            title={"Sync Calendar"}
          />
          <SettingsRow
            onPress={this._onTutorialPress.bind(this)}
            title={"Tutorial"}
          />

          <SettingsRow
            onPress={this.props.gotoSupport.bind(this)}
            title={"Support"}
          />

          <SettingsRow
            onPress={this.props.gotoUnits.bind(this)}
            title={"Units"}
          />

          <SettingsRow
            onPress={this.props.gotoPaymentsHistory.bind(this)}
            title={"Payment History"}
          />

          <SettingsRow
            onPress={this._updateCardPayment.bind(this)}
            title={"Payment Details"}
          />

          <SettingsRow
            onPress={() => Linking.openURL("https://app.aplyft.com/terms")}
            title={"Terms & Conditions"}
          />

          <SettingsRow
            onPress={() => Linking.openURL("https://app.aplyft.com/privacy")}
            title={"Privacy Policy"}
          />

          <SettingsRow title={"Log Out"} onPress={this.props.logOut} />
        </ScrollView>
      </View>
    );
  }
}

const mapsToProps = ({ user, profileSettingsred }) => {
  console.log(
    "updateWeight in profile  settings",
    String(profileSettingsred.updateWeight)
  );
  return {
    imageURL: user.user.imageURL,
    fullname: user.user.firstName + " " + user.user.lastName,
    email: user.user.email,
    pushWorkouts: profileSettingsred.pushWorkouts,
    updateWeight: profileSettingsred.updateWeight,
    healthKit: profileSettingsred.healthKit
  };
};

export default connect(
  mapsToProps,
  {
    pushWorkoutDates,
    weightUpdate,
    logOut,
    gotoProfileEdit,
    gotoSupport,
    gotoTutorial,
    gotoUnits,
    gotoPaymentsHistory,
    calendarSync,
    uploadImage,
    updateCardInfo,
    viewCard,
    healthiOSSync,
    healthKitUpdate
  }
)(settingsScreen);
