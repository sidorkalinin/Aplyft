import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Modal,
  ImageBackground,
  Platform
} from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import Styles from "./styles";
import {
  save,
  onChangeFirstName,
  onChangeLastName,
  changeGender,
  changeHeight,
  changeWeight,
  passwordChange,
  gotoChangePassword,
  ToggleBodyFatModal,
  changeInjuryText,
  changeInjury,
  changeDateOfBirth,
  changeBodyFat,
  changePreferedDaysWorkout,
  changeActivityLevel,
  gotoCountryList,
  ModalBodyFatToggle,
  ReloadStateValue,
  dataArrayAddition
} from "./actions";
import RadioButton from "../../radioButton";
import { Button, DatePicker, BLDatePickerAndroid } from "../../common";

import RowValue from "../Register/ContinueUserProfileScreenStack/components/RowValue";
import Ruler from "../GoalStack/components/ruler";
import Select from "../Register/ContinueUserProfileScreenStack/components/Select";
import BodyFatPercentageScreen from "../GoalStack/components/bodyFatPercentageScreen";

import LeftUpperFrontSVG from "./../Register/ContinueUserProfileScreenStack/components/LeftUpperFrontSVG";
import LeftUpperBackSVG from "./../Register/ContinueUserProfileScreenStack/components/LeftUpperBackSVG";
import LeftLowerFrontSVG from "./../Register/ContinueUserProfileScreenStack/components/LeftLowerFrontSVG";
import LeftLowerBackSVG from "./../Register/ContinueUserProfileScreenStack/components/LeftLowerBackSVG";
import RightUpperFrontSVG from "./../Register/ContinueUserProfileScreenStack/components/RightUpperFrontSVG";
import RightUpperBackSVG from "./../Register/ContinueUserProfileScreenStack/components/RightUpperBackSVG";
import RightLowerFrontSVG from "./../Register/ContinueUserProfileScreenStack/components/RightLowerFrontSVG";
import RightLowerBackSVG from "./../Register/ContinueUserProfileScreenStack/components/RightLowerBackSVG";

class profileEdit extends Component {
  constructor(props) {
    super(props);

    this.props.ReloadStateValue();
  }

  static navigationOptions = {
    // title: 'Profile',
    headerTintColor: "white"
  };

  state = {
    isUpdating: false,
    dataArray: [],
    upperSelected: true,
    lowerSelected: false,
    backselected: false,
    frontselected: true,
    leftselected: true,
    rightselected: false
  };

  _onFirstNameChange = text => {
    this.props.onChangeFirstName(text);
  };

  _onLastNameChange = text => {
    this.props.onChangeLastName(text);
  };

  _changeGender = value => {
    this.props.changeGender(value);
  };

  _onBodyWeight = value => {
    if (this.props.units == "metric") {
      this.props.changeWeight(value);
    } else {
      value = (value * 0.45359237).toFixed(0);
      this.props.changeWeight(value);
    }
  };

  _onBodyHeight = value => {
    if (this.props.units == "metric") {
      // we need to chqange the height to to cm
      this.props.changeHeight(value);
    } else {
      value = (value * 2.54).toFixed(0);
      this.props.changeHeight(value);
    }
  };

  _passwordChange = value => {
    this.props.gotoChangePassword();
  };

  _bodyFatPress = ({ percentage }) => {
    this.props.changeBodyFat(percentage);
  };

  _bodyFatTogglePress = () => {
    this.props.ToggleBodyFatModal();
  };

  _onChangeDateOfBirth = value => {
    // console.log(value.getDay());
    // remove the GMT
    date = moment(value).format("MMMM DD YYYY");
    // var date = [
    //   value.getFullYear(),
    //   ("0" + (value.getMonth() + 1)).slice(-2),
    //   ("0" + value.getDate()).slice(-2)
    // ].join("-");
    this.props.changeDateOfBirth(date);
  };

  _onChangeInjury = value => {
    this.props.changeInjury(value);
  };

  _onInuryTextChange = value => {
    this.props.changeInjuryText(value);
  };

  _onbodyFatInputChange = value => {
    this.props.changeBodyFat(value);
  };

  _onChangePreferredDays = array => {
    console.log(array);
    this.props.changePreferedDaysWorkout(array);
  };

  _onChangeActivityLevel = value => {
    this.props.changeActivityLevel(value);
  };

  _displayConvertedHeight = () => {
    // console.log(this.props.units);
    if (this.props.units == "metric")
      return String(this.props.height || 0) + " cm";
    else {
      // converting to Inch and feet
      var inches = (this.props.height / 2.54).toFixed(0);
      var feet = Math.floor(inches / 12);
      inches %= 12;
      return feet + " ft " + inches + " in";
    }
  };

  _renderWeightRuler = () => {
    // the weight is stored by defautl as metric in the database
    var renderRuler = this.props.renderRuler;
    if (this.props.units == "metric") {
      return (
        <Ruler
          label="kg"
          From={35}
          To={250}
          InitValue={this.props.weight}
          onChange={this._onBodyWeight.bind(this)}
        />
      );
    } else {
      return (
        <Ruler
          label="lb"
          From={77}
          To={700}
          InitValue={(this.props.weight * 2.20462).toFixed(0)}
          onChange={this._onBodyWeight.bind(this)}
        />
      );
    }
  };

  _renderHeightRuler = () => {
    if (this.props.units == "metric") {
      return (
        <Ruler
          label="Centimeters"
          From={35}
          To={280}
          InitValue={this.props.height}
          onChange={this._onBodyHeight.bind(this)}
        />
      );
    } else {
      return (
        <Ruler
          smallLineDivision={6}
          bigLineDivision={12}
          label="Inches"
          From={36}
          To={96}
          InitValue={this.props.height}
          onChange={this._onBodyHeight.bind(this)}
        />
      );
    }
  };

  _displayConvertedWeight = () => {
    // console.log(this.props.units);
    if (this.props.units == "metric") return String(this.props.weight) + " kg";
    else return String((this.props.weight / 0.45).toFixed(0)) + " lb";
  };

  // using the bitwise in order to calculate the dates
  _bitwiseToArray = () => {
    var tmp = [];

    if ((this.props.preferedWorkoutDaysBitwise & 1) > 0) tmp.push(1);

    if ((this.props.preferedWorkoutDaysBitwise & 2) > 0) tmp.push(2);

    if ((this.props.preferedWorkoutDaysBitwise & 4) > 0) tmp.push(3);

    if ((this.props.preferedWorkoutDaysBitwise & 8) > 0) tmp.push(4);

    if ((this.props.preferedWorkoutDaysBitwise & 16) > 0) tmp.push(5);

    if ((this.props.preferedWorkoutDaysBitwise & 32) > 0) tmp.push(6);

    if ((this.props.preferedWorkoutDaysBitwise & 64) > 0) tmp.push(7);

    return tmp;
  };

  renderDate() {
    if (Platform.OS === "android") {
      let currentDate = new Date();
      let formatedDate = moment(currentDate).format("MMMM DD, YYYY");
      var data_value = moment(this.props.dob).format("MMMM DD, YYYY");
      return (
        <BLDatePickerAndroid
          field_description="Date Of Birth"
          value={data_value}
          minDate="1920-01-01"
          maxDate={formatedDate}
          onDateChange={this._onChangeDateOfBirth.bind(this)}
        />
      );
    } else {
      let currentDate = new Date();
      let formatedDate = moment(currentDate).format("YYYY-MM-DD");
      var data_value = moment(this.props.dob).format("YYYY-MM-DD");
      return (
        <DatePicker
          label="Date Of Birth"
          value={data_value}
          minimumDate="1920-01-01"
          maximumDate={formatedDate}
          onDateChange={this._onChangeDateOfBirth.bind(this)}
        />
      );
    }
  }

  LeftTabSelected() {
    this.setState({ rightselected: false, leftselected: true });
  }
  RightTabSelected() {
    this.setState({ rightselected: true, leftselected: false });
  }
  UpperTabSelected() {
    this.setState({ lowerSelected: false, upperSelected: true });
  }
  LowerTabSelected() {
    this.setState({ lowerSelected: true, upperSelected: false });
  }
  BackTabSelected() {
    this.setState({ backselected: true, frontselected: false });
  }
  FrontTabSelected() {
    this.setState({ backselected: false, frontselected: true });
  }
  renderLeftRightTabs() {
    if (this.state.leftselected == true) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginLeft: 20,
            alignItems: "center",
            height: "100%",
            width: "100%",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            onPress={this.LeftTabSelected.bind(this)}
            style={{
              borderWidth: 1,
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "#181f31",
              borderTopLeftRadius: 2,
              height: "85%",
              width: 65,
              borderBottomLeftRadius: 2,
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "white", alignSelf: "center" }}>Left</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.RightTabSelected.bind(this)}
            style={{
              borderWidth: 1,
              paddingLeft: 10,
              paddingRight: 10,
              height: "85%",
              width: 65,
              backgroundColor: "white",
              borderTopRightRadius: 2,
              borderBottomRightRadius: 2,
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "#181f31", alignSelf: "center" }}>Right</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginLeft: 20,
            alignItems: "center",
            height: "100%",
            width: "100%",
            justifyContent: "center"
            // justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            onPress={this.LeftTabSelected.bind(this)}
            style={{
              borderWidth: 1,
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "white",
              borderTopLeftRadius: 2,
              height: "85%",
              width: 65,
              borderBottomLeftRadius: 2,
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "#181f31" }}>Left</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.RightTabSelected.bind(this)}
            style={{
              borderWidth: 1,
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "#181f31",
              borderTopRightRadius: 2,
              borderBottomRightRadius: 2,
              height: "85%",
              width: 65,
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "white" }}>Right</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  renderBackFrontTabs() {
    if (this.state.backselected == true) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginLeft: 20,
            alignItems: "center",
            height: "100%",
            width: "100%",
            justifyContent: "center"
            //justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            onPress={this.BackTabSelected.bind(this)}
            style={{
              backgroundColor: "#181f31",
              borderWidth: 1,
              paddingLeft: 10,
              paddingRight: 10,
              borderTopLeftRadius: 2,
              height: "85%",
              width: 65,
              borderBottomLeftRadius: 2,
              justifyContent: "center"

              // borderColor: "red"
            }}
          >
            <Text style={{ color: "white" }}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.FrontTabSelected.bind(this)}
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              paddingRight: 10,
              paddingLeft: 10,
              width: 65,
              borderTopRightRadius: 2,
              borderBottomRightRadius: 2,
              height: "85%",
              justifyContent: "center"
              // borderColor: "blue"
            }}
          >
            <Text style={{ color: "#181f31" }}>Front</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginLeft: 20,
            alignItems: "center",
            height: "100%",
            width: "100%",
            justifyContent: "center"
            //justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            onPress={this.BackTabSelected.bind(this)}
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              paddingLeft: 10,
              paddingRight: 10,
              borderTopLeftRadius: 2,
              height: "85%",
              width: 65,
              borderBottomLeftRadius: 2,
              justifyContent: "center"
              // borderColor: "red"
            }}
          >
            <Text style={{ color: "#181f31" }}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.FrontTabSelected.bind(this)}
            style={{
              backgroundColor: "#181f31",
              borderWidth: 1,
              paddingRight: 10,
              paddingLeft: 10,
              borderTopRightRadius: 2,
              borderBottomRightRadius: 2,
              height: "85%",
              width: 65,
              justifyContent: "center"
              // borderColor: "blue"
            }}
          >
            <Text style={{ color: "white" }}>Front</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  renderUpperLowerTabs() {
    if (this.state.lowerSelected == true) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginLeft: 20,
            alignItems: "center",
            height: "100%",
            width: "100%",
            justifyContent: "center"
            // justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            onPress={this.UpperTabSelected.bind(this)}
            style={{
              borderWidth: 1,
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "white",
              borderTopLeftRadius: 2,
              height: "85%",
              width: 65,
              borderBottomLeftRadius: 2,
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "#181f31" }}>Upper</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.LowerTabSelected.bind(this)}
            style={{
              borderWidth: 1,
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "#181f31",
              borderTopRightRadius: 2,
              borderBottomRightRadius: 2,
              height: "85%",
              width: 65,
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "white" }}>Lower</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginLeft: 20,
            alignItems: "center",
            height: "100%",
            width: "100%",
            justifyContent: "center"
            // justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            onPress={this.UpperTabSelected.bind(this)}
            style={{
              borderWidth: 1,
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "#181f31",
              borderTopLeftRadius: 2,
              height: "85%",
              width: 65,
              borderBottomLeftRadius: 2,
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "white" }}>Upper</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.LowerTabSelected.bind(this)}
            style={{
              borderWidth: 1,
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "white",
              borderTopRightRadius: 2,
              borderBottomRightRadius: 2,
              height: "85%",
              width: 65,
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "#181f31" }}>Lower</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderSVG() {
    if (this.state.leftselected == true) {
      return <View style={{ flex: 1 }}>{this.renderLeftSection()}</View>;
    } else {
      return <View style={{ flex: 1 }}>{this.renderRightSection()}</View>;
    }
  }
  renderLeftSection() {
    if (this.state.upperSelected == true) {
      return this.renderLeftUpperSection();
    } else {
      return this.renderLeftLowerSection();
    }
  }
  renderRightSection() {
    if (this.state.upperSelected == true) {
      return this.renderRightUpperSection();
    } else {
      return this.renderRightLowerSection();
    }
  }

  renderLeftUpperSection() {
    if (this.state.frontselected == true) {
      return (
        <LeftUpperFrontSVG
          name="LUF"
          dataArray={this.props.dataArray}
          onSelect={this.onSelect.bind(this)}
        />
      );
    } else {
      return (
        <LeftUpperBackSVG
          name="LUB"
          dataArray={this.props.dataArray}
          onSelect={this.onSelect.bind(this)}
        />
      );
    }
  }
  renderLeftLowerSection() {
    if (this.state.frontselected == true) {
      return (
        <LeftLowerFrontSVG
          name="LLF"
          dataArray={this.props.dataArray}
          onSelect={this.onSelect.bind(this)}
        />
      );
    } else {
      return (
        <LeftLowerBackSVG
          name="LLB"
          dataArray={this.props.dataArray}
          onSelect={this.onSelect.bind(this)}
        />
      );
    }
  }
  renderRightUpperSection() {
    if (this.state.frontselected == true) {
      return (
        <RightUpperFrontSVG
          name="RUF"
          dataArray={this.props.dataArray}
          onSelect={this.onSelect.bind(this)}
        />
      );
    } else {
      return (
        <RightUpperBackSVG
          name="RUB"
          dataArray={this.props.dataArray}
          onSelect={this.onSelect.bind(this)}
        />
      );
    }
  }
  renderRightLowerSection() {
    if (this.state.frontselected == true) {
      return (
        <RightLowerFrontSVG
          name="RLF"
          dataArray={this.props.dataArray}
          onSelect={this.onSelect.bind(this)}
        />
      );
    } else {
      return (
        <RightLowerBackSVG
          name="RLB"
          dataArray={this.props.dataArray}
          onSelect={this.onSelect.bind(this)}
        />
      );
    }
  }

  onSelect(key, name) {
    console.log(key, "<<<<<<<< key is the following");
    //console.log(name, "<<<<<<<< NAME is the following");
    this.props.dataArrayAddition(key);
    console.log(this.props.dataArray, "DATA ARRAY I I I S S S : ");
  }

  renderInjurySection() {
    const {
      seperatorStyle,
      mainContainer,
      ScrollContainer,
      imageStyle,
      radioButtonContainer,
      submitContainer,
      skipBottomContainer,
      skipBottomStyle,
      radioButtonLeftContainer,
      radioButtonRightContainer,
      injuryContainer,
      injuryTextInputStyle
    } = Styles;
    return (
      <View style={{ flexDirection: "column", flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",

            height: 35
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <Text>The Sagittal Plane</Text>
          </View>
          <View style={{ alignSelf: "flex-end", width: 150 }}>
            {this.renderLeftRightTabs()}
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            height: 35
          }}
        >
          <View style={{ flex: 2, justifyContent: "center" }}>
            <Text>The Frontal Plane</Text>
          </View>
          <View style={{ alignSelf: "flex-end", width: 150 }}>
            {this.renderBackFrontTabs()}
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            height: 35
          }}
        >
          <View style={{ flex: 2, justifyContent: "center" }}>
            <Text>The Transverse Plane</Text>
          </View>
          <View style={{ alignSelf: "flex-end", width: 150 }}>
            {this.renderUpperLowerTabs()}
          </View>
        </View>
        <View
          style={{
            flex: 1,
            // justifyContent: "center",
            // alignItems: "center",
            width: "100%"
          }}
        >
          {this.renderSVG()}
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TextInput
            multiline={true}
            placeholder="explain more"
            style={injuryTextInputStyle}
            underlineColorAndroid="transparent"
            onChangeText={this._onInuryTextChange.bind(this)}
          />
        </View>
      </View>
    );
  }

  render() {
    const {
      mainContainer,
      ScrollContainer,
      inputStyle,
      rowStyle,
      radioButtonLeftContainer,
      radioButtonRightContainer,
      radioButtonContainer,
      modal,
      injuryContainer,
      injuryTextInputStyle
    } = Styles;

    let currentDate = new Date();
    let formatedDate =
      currentDate.getFullYear() +
      "-" +
      ("0" + (currentDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + currentDate.getDate()).slice(-2);

    let bitwise = this._bitwiseToArray();

    return (
      <View style={mainContainer}>
        {this.props.isUpdating ? (
          <Modal transparent animationType="fade">
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white", paddingBottom: 10 }}>
                Updating Your Info
              </Text>
              <ActivityIndicator />
            </View>
          </Modal>
        ) : null}

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.props.isBodyFatVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <ImageBackground
            style={modal}
            resizeMode="cover"
            source={require("../../../assets/images/background-transparent.png")}
          >
            <BodyFatPercentageScreen
              isMale={this.props.isMale}
              initIndex={0}
              onOkPress={this._bodyFatPress.bind(this)}
              onCancelPress={this.props.ModalBodyFatToggle.bind(this)}
            />
          </ImageBackground>
        </Modal>

        <ScrollView style={ScrollContainer}>
          <View style={rowStyle}>
            <TextInput
              style={inputStyle}
              onChangeText={this._onFirstNameChange.bind(this)}
              underlineColorAndroid="transparent"
              placeholder={"First Name"}
              value={this.props.first_name}
            />
          </View>

          <View style={rowStyle}>
            <TextInput
              style={inputStyle}
              onChangeText={this._onLastNameChange.bind(this)}
              underlineColorAndroid="transparent"
              placeholder={"Last Name"}
              value={this.props.last_name}
            />
          </View>

          <View style={rowStyle}>{this.renderDate()}</View>

          <View style={radioButtonContainer}>
            <TouchableOpacity
              onPress={this._changeGender.bind(this, "male")}
              style={radioButtonLeftContainer}
            >
              <RadioButton
                textStyle={{ color: "black" }}
                isSelected={this.props.isMale}
                label="Male"
                index={0}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this._changeGender.bind(this, "female")}
              style={radioButtonRightContainer}
            >
              <RadioButton
                textStyle={{ color: "black" }}
                isSelected={this.props.isFemale}
                label="Female"
                index={1}
              />
            </TouchableOpacity>
          </View>

          <View style={rowStyle}>
            <RowValue label="Height" value={this._displayConvertedHeight()}>
              {this._renderHeightRuler()}
            </RowValue>
          </View>

          <View style={rowStyle}>
            <RowValue label="Weight" value={this._displayConvertedWeight()}>
              {this._renderWeightRuler()}
            </RowValue>
          </View>

          <View style={rowStyle}>
            <RowValue label="Activity Level" value="">
              <Select
                onChange={this._onChangeActivityLevel.bind(this)}
                value={this.props.activityLevel}
                dataSource={[
                  {
                    id: 1,
                    text: "Sedentary"
                  },
                  {
                    id: 2,
                    text: "Lightly Active"
                  },
                  {
                    id: 3,
                    text: "Active"
                  },
                  {
                    id: 4,
                    text: "Very Active"
                  }
                ]}
              />
            </RowValue>
          </View>

          <View style={rowStyle}>
            <RowValue label="Preferred Workout Days" value="">
              <Select
                onChange={this._onChangePreferredDays.bind(this)}
                multiple
                values={bitwise}
                dataSource={[
                  {
                    id: 1,
                    bitwise: 1,
                    text: "Monday"
                  },
                  {
                    id: 2,
                    bitwise: 2,
                    text: "Tuesday"
                  },
                  {
                    id: 3,
                    bitwise: 4,
                    text: "Wednesday"
                  },
                  {
                    id: 4,
                    bitwise: 8,
                    text: "Thursday"
                  },
                  {
                    id: 5,
                    bitwise: 16,
                    text: "Friday"
                  },
                  {
                    id: 6,
                    bitwise: 32,
                    text: "Saturday"
                  },
                  {
                    id: 7,
                    bitwise: 64,
                    text: "Sunday"
                  }
                ]}
              />
            </RowValue>
          </View>

          <View style={rowStyle}>
            <View
              style={{ flexDirection: "row", padding: 20, paddingBottom: 5 }}
            >
              <Text style={{ flex: 1 }}>Body Fat</Text>
              <TextInput
                style={{ borderBottomWidth: 1, width: 50, textAlign: "right" }}
                onChangeText={this._onbodyFatInputChange.bind(this)}
                underlineColorAndroid="transparent"
                value={this.props.bodyfat}
                keyboardType="numeric"
              />
              <Text> %</Text>
            </View>
            <TouchableOpacity
              style={{ padding: 20, paddingTop: 0 }}
              onPress={this._bodyFatTogglePress.bind(this)}
            >
              <Text style={{ color: "red", paddingTop: 10 }}>
                Don't know your body fat percentage?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[injuryContainer, rowStyle]}>
            <Text>Injury & Special Conditions</Text>
            <View style={radioButtonContainer}>
              <TouchableOpacity
                onPress={this._onChangeInjury.bind(this, true)}
                style={radioButtonLeftContainer}
              >
                <RadioButton
                  isSelected={this.props.injury}
                  label="Yes"
                  index={0}
                  textStyle={{ color: "red" }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this._onChangeInjury.bind(this, false)}
                style={radioButtonRightContainer}
              >
                <RadioButton
                  isSelected={!this.props.injury}
                  label="No"
                  index={1}
                  textStyle={{ color: "red" }}
                />
              </TouchableOpacity>
            </View>
            {this.props.injury ? this.renderInjurySection() : null}
          </View>

          <View style={rowStyle}>
            <TouchableOpacity
              style={inputStyle}
              onPress={this.props.gotoCountryList.bind(this)}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={{ flex: 1 }}>Country of Residence</Text>
                <Text>{this.props.countryName}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={rowStyle}>
            <TouchableOpacity
              style={inputStyle}
              onPress={this._passwordChange.bind(this)}
            >
              <Text>Change Password</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 6,
              borderColor: "#eeeeee",
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            <Button onPress={this.props.save.bind(this, this.props)}>
              <Text>SAVE</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapsToProps = ({ user, profileEdit }) => {
  return profileEdit;
};

export default connect(
  mapsToProps,
  {
    save,
    onChangeFirstName,
    onChangeLastName,
    changeGender,
    changeHeight,
    changeWeight,
    passwordChange,
    gotoChangePassword,
    ToggleBodyFatModal,
    changeInjuryText,
    changeInjury,
    changeDateOfBirth,
    changeBodyFat,
    changePreferedDaysWorkout,
    changeActivityLevel,
    gotoCountryList,
    ModalBodyFatToggle,
    ReloadStateValue,
    dataArrayAddition
  }
)(profileEdit);
