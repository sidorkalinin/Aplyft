import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { Alert } from "react-native";
import { connect } from "react-redux";
import LeftUpperFrontSVG from "./components/LeftUpperFrontSVG";
import LeftUpperBackSVG from "./components/LeftUpperBackSVG";
import LeftLowerFrontSVG from "./components/LeftLowerFrontSVG";
import LeftLowerBackSVG from "./components/LeftLowerBackSVG";
import RightUpperFrontSVG from "./components/RightUpperFrontSVG";
import RightUpperBackSVG from "./components/RightUpperBackSVG";
import RightLowerFrontSVG from "./components/RightLowerFrontSVG";
import RightLowerBackSVG from "./components/RightLowerBackSVG";

import Styles from "./styles";
import Svg, { Circle, Rect, Path, Line, G } from "react-native-svg";
import {
  saveInfo,
  changeInjury,
  changeDOB,
  changePhone,
  onBodyWeight,
  onBodyHeight,
  onInuryTextChange,
  Continue_Profile_Loaded,
  skipProfileCompletion,
  dataArrayAddition
} from "./actions";
import Header from "./components/Header";
import { DatePicker, Button } from "../../../common";
import RadioButton from "../../../radioButton";
import ValueInput from "./components/ValueInput";
import RowValue from "./components/RowValue";
import Ruler from "../../GoalStack/components/ruler";
import Select from "./components/Select";

class ContinueUserProfileScreenStack extends Component {
  componentWillMount() {
    this.props.Continue_Profile_Loaded();
  }
  state = {
    dataArray: [],
    upperSelected: true,
    lowerSelected: false,
    backselected: false,
    frontselected: true,
    leftselected: true,
    rightselected: false
  };

  _onSubmit = () => {
    this.props.saveInfo(
      {
        dob: this.props.dob,
        country: this.props.country,
        phone: this.props.phone,
        activity_level: this.props.activity_level,
        preferred_workout_days: this.props.preferred_workout_days,
        body_weight: this.props.body_weight,
        body_fat: this.props.body_fat,
        height: this.props.height,
        injury: this.props.injury,
        injuryText: this.props.injury_text
      },
      this.props.navigation
    );
  };

  _onSkip = () => {
    console.log("this.props.navigation :::::::::: > : ", this.props.navigation);
    // this.props.navigation.goBack();
    this.props.skipProfileCompletion();
  };

  _onChangeInjury = value => {
    this.props.changeInjury(value);
  };

  _onChangeDateOfBirth = value => {
    //format the date to YYYY-mm-dd
    var date = value.split("T");
    this.props.changeDOB(date[0]);
  };

  _onPhoneChange = text => {
    this.props.changePhone(text);
  };

  _onBodyWeight = value => {
    this.props.onBodyWeight(value);
  };

  _onBodyHeight = value => {
    this.props.onBodyHeight(value);
  };

  _onInuryTextChange = text => {
    this.props.onInuryTextChange(text);
  };

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
    let currentDate = new Date();
    let formatedDate =
      currentDate.getFullYear() +
      "-" +
      ("0" + (currentDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + currentDate.getDate()).slice(-2);

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

    var fullname = this.props.fullname;
    var imageURL = this.props.imageurl;
    return (
      <View style={mainContainer}>
        <ScrollView
          style={ScrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Header
            FullName={fullname}
            ImageURL={imageURL}
            LeftButtonComponent={() => <Text>left</Text>}
            RightButtonComponent={() => <Text>right</Text>}
          />

          <View style={seperatorStyle} />

          <DatePicker
            label="Date Of Birth"
            value={this.props.dob}
            minimumDate="1920-01-01"
            maximumDate={formatedDate}
            onDateChange={this._onChangeDateOfBirth.bind(this)}
          />

          <View style={seperatorStyle} />

          <ValueInput
            label="Phone Number"
            value={this.props.phone}
            onChangeText={this._onPhoneChange.bind(this)}
          />

          <View style={seperatorStyle} />

          <RowValue label="Activity Level" infoIcon value="">
            <Select
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

          <View style={seperatorStyle} />

          <RowValue label="Preferred Workout Days" value="">
            <Select
              multiple
              dataSource={[
                {
                  id: 1,
                  text: "Monday"
                },
                {
                  id: 2,
                  text: "Tuesday"
                },
                {
                  id: 3,
                  text: "Wednesday"
                },
                {
                  id: 4,
                  text: "Thursday"
                },
                {
                  id: 5,
                  text: "Friday"
                },
                {
                  id: 6,
                  text: "Saturday"
                },
                {
                  id: 7,
                  text: "Sunday"
                }
              ]}
            />
          </RowValue>

          <View style={seperatorStyle} />

          <RowValue label="Body Weight" value={this.props.body_weight}>
            <Ruler
              label="Kilograms"
              From={20}
              To={200}
              onChange={this._onBodyWeight.bind(this)}
            />
          </RowValue>

          <View style={seperatorStyle} />

          <RowValue label="Height" value={this.props.height}>
            <Ruler
              label="Centimeters"
              From={130}
              To={260}
              onChange={this._onBodyHeight.bind(this)}
            />
          </RowValue>

          <View style={seperatorStyle} />

          <View style={injuryContainer}>
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

          <View style={submitContainer}>
            <Button
              onPress={this.props.saveInfo.bind(
                this,
                this.props,
                this.props.navigation
              )}
            >
              <Text>Submit</Text>
            </Button>
          </View>

          <TouchableOpacity
            style={skipBottomContainer}
            onPress={this._onSkip.bind(this)}
          >
            <Text style={skipBottomStyle}>Skip</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ continueProfile }) => {
  return {
    fullname: continueProfile.fullname,
    imageurl: continueProfile.imageurl,
    dob: continueProfile.dob,
    country: continueProfile.country,
    phone: continueProfile.phone,
    activity_level: continueProfile.activity_level,
    preferedWorkoutDaysBitwise: continueProfile.preferedWorkoutDaysBitwise,
    body_weight: continueProfile.body_weight,
    body_fat: continueProfile.body_fat,
    height: continueProfile.height,
    injury: continueProfile.injury,
    injury_text: continueProfile.injury_text,
    first_name: continueProfile.first_name,
    last_name: continueProfile.last_name,
    gender: continueProfile.gender,
    dataArray: continueProfile.dataArray
  };
};

export default connect(
  mapStateToProps,
  {
    saveInfo,
    skipProfileCompletion,
    changeInjury,
    changeDOB,
    changePhone,
    onBodyWeight,
    onBodyHeight,
    onInuryTextChange,
    Continue_Profile_Loaded,
    dataArrayAddition
  }
)(ContinueUserProfileScreenStack);
