import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Picker,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import Styles from "./styles";
import { onSetGoal } from "../actions";
import { Button } from "../../../../components/common";
import BodyFatPercentageScreen from "../components/bodyFatPercentageScreen";
import Ruler from "../components/ruler";
import RowValue from "./components/RowValue";
import data from "./data.json";
import Select from "../../Register/ContinueUserProfileScreenStack/components/Select";

//dynamic image loading workaround
const IMAGES = {
  getLean: require("../../../../assets/images/goal_icons/get-lean.png"), // statically analyzed
  getLeanActive: require("../../../../assets/images/goal_icons/get-lean-active.png"),
  getMassive: require("../../../../assets/images/goal_icons/get-massive.png"), // statically analyzed
  getMassiveActive: require("../../../../assets/images/goal_icons/get-massive-active.png") // statically analyzed
};

class BodybuildingScreen extends Component {
  state = {
    categoryID: 26, // from db
    modalVisible: false,

    typeModalOpen: null,

    isGetMassive: false,

    currentWeight: 0,
    currentFat: 0,

    targetWeight: 0,
    targetFat: 0,
    targetTime: 0,

    currentFatIndex: -1,
    targetFatIndex: -1,
    currentIndex: -1, // used for common

    showTargetWeightRuler: true
  };

  _onRulerChange = value => {
    // console.log('changed with value', value)
  };

  _onSetGoal = () => {
    // condition
    if (
      this.state.currentWeight == 0 ||
      this.state.currentFat == 0 ||
      this.state.targetFat == 0
    ) {
      return Alert.alert("", "Please fill the required info", [{text:'Ok'}], {
        cancelable: true
      });
    }

    var parsed_ids = [];
    // insert the radio buttons first
    parsed_ids.push({
      id: this.state.isGetMassive ? 102 : 103,
      title: "Goal",
      value: this.state.isGetMassive ? "Gain Muscle" : "Get Lean"
    });

    // we need to convert the body weight to metric
    var currentWeight = this.state.currentWeight;
    if (!this.props.isMetric) {
      currentWeight = this.state.currentWeight; //(this.state.currentWeight * 2.2).toFixed(0);
    }

    // second enter the current target values
    parsed_ids.push({
      id: 104,
      title: "Current Body Weight",
      value: currentWeight,
      value_unit: this.props.isMetric ? "kg" : "lb",
      value_type: "weight"
    });
    parsed_ids.push({
      id: 105,
      title: "Current Body fat",
      value: this.state.currentFat
      // value_unit: "perc"
    });

    // we need to convert the body weight to metric
    var targetWeight = this.state.targetWeight;
    if (!this.props.isMetric) {
      targetWeight = this.state.targetWeight; //(this.state.targetWeight * 2.2).toFixed(0);
    }
    if (!this.state.showTargetWeightRuler) {
      targetWeight = "NA";
    }

    var tmp = {
      id: 106,
      title: "Target Body Weight",
      value: targetWeight
    };

    if (targetWeight != "NA") {
      tmp.value_unit = this.props.isMetric ? "kg" : "lb";
      tmp.value_type = "weight";
    }

    // next the target value
    parsed_ids.push(tmp);
    parsed_ids.push({
      id: 107,
      title: "Target Body Fat",
      value: this.state.targetFat
      // value_unit: "%"
    });

    this.props.onSetGoal(this.state.categoryID, { fields: parsed_ids });
  };

  _renderFooterComponent = () => {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 6,
          borderColor: "#eeeeee",
          paddingLeft: 10,
          paddingRight: 10,
          height: 90
        }}
      >
        <Button onPress={this._onSetGoal.bind(this)}>
          <Text>SET GOAL</Text>
        </Button>
      </View>
    );
  };

  _onCurrentBodyWeight = value => {
    this.setState({
      currentWeight: value,
      currentText: String(value)
    });
  };

  _onTargetBodyWeight = value => {
    this.setState({
      targetWeight: value,
      targetText: String(value)
    });
  };

  _isSelected = type => {
    return this.state.isGetMassive;
  };

  _onToggleModal = type => {
    this.setState({
      modalVisible: true,
      typeModalOpen: type,
      currentIndex:
        type == "current"
          ? this.state.currentFatIndex
          : this.state.targetFatIndex
    });
  };

  _onModalOKPress = value => {
    console.log(value);
    if (this.state.typeModalOpen == "current")
      this.setState({
        currentFatIndex: value.selected_index,
        currentFat: value.percentage,
        modalVisible: false
      });
    else
      this.setState({
        targetFatIndex: value.selected_index,
        targetFat: value.percentage,
        modalVisible: false
      });
  };

  _onModalCancelPress = () => {
    this.setState({
      modalVisible: false
    });
  };

  _renderValueCurrentBodyWeight = () => {
    if (this.props.isMetric) {
      return this.state.currentWeight + " kg  " + this.state.currentFat + "%";
    } else {
      return this.state.currentWeight + " lb  " + this.state.currentFat + "%";
    }
  };

  _renderValueTargetBodyWeight = () => {
    // manipulation for showing or hiding the target body weight
    if (this.props.isMetric) {
      if (this.state.showTargetWeightRuler)
        return this.state.targetWeight + " kg  " + this.state.targetFat + "%";
      else return this.state.targetFat + "%";
    } else {
      if (this.state.showTargetWeightRuler)
        return this.state.targetWeight + " lb  " + this.state.targetFat + "%";
      else return this.state.targetFat + "%";
    }
  };

  _renderRulerCurrentBodyWeight = () => {
    if (this.props.isMetric) {
      // by default the weight is in metric
      return (
        <Ruler
          label="kg"
          From={35}
          To={250}
          onChange={this._onCurrentBodyWeight.bind(this)}
        />
      );
    } else {
      return (
        <Ruler
          label="lb"
          From={77}
          To={700}
          onChange={this._onCurrentBodyWeight.bind(this)}
        />
      );
    }
  };

  _renderRulerTargetBodyWeight = () => {
    if (this.state.showTargetWeightRuler)
      if (this.props.isMetric) {
        // by default the weight is in metric
        return (
          <Ruler
            label="kg"
            From={35}
            To={250}
            onChange={this._onTargetBodyWeight.bind(this)}
          />
        );
      } else {
        return (
          <Ruler
            label="lb"
            From={77}
            To={700}
            onChange={this._onTargetBodyWeight.bind(this)}
          />
        );
      }
  };

  _toggleTargetedWeight = () => {
    this.setState({
      showTargetWeightRuler: !this.state.showTargetWeightRuler,
      targetWeight: this.state.showTargetWeightRuler
        ? 0
        : this.state.targetWeight
    });
  };

  render() {
    const {
      mainContainer,
      descriptionStyle,
      modal,
      ItemContainer,
      itemIconStyle,
      itemRadioTitleStyle,
      seperatorStyle,
      percentageStyle,
      infoText,
      detailContainer,
      scrollviewStyle,
      inputStyle
    } = Styles;

    return (
      <View style={mainContainer}>
        {this.props.isSubmitting ? (
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
                Submitting your goal
              </Text>
              <ActivityIndicator />
            </View>
          </Modal>
        ) : null}

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <ImageBackground
            style={modal}
            resizeMode="cover"
            source={require("../../../../assets/images/background-transparent.png")}
          >
            <BodyFatPercentageScreen
              isMale={this.props.isMale}
              initIndex={this.state.currentIndex}
              onCancelPress={this._onModalCancelPress.bind(this)}
              onOkPress={this._onModalOKPress.bind(this)}
            />
          </ImageBackground>
        </Modal>
        <View style={{ paddingLeft: 10, paddingTop: 25, borderWidth: 0 }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
              source={require("../../../../assets/images/back.png")}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={scrollviewStyle}>
          <Text style={descriptionStyle}>Bodybuilding</Text>

          <TouchableOpacity
            style={ItemContainer}
            onPress={() => {
              this.setState({ categoryID:25, isGetMassive: true });
            }}
          >
            <View>
              <Image
                resizeMode="contain"
                style={itemIconStyle}
                source={
                  this.state.isGetMassive
                    ? IMAGES.getMassiveActive
                    : IMAGES.getMassive
                }
              />
            </View>
            <Text style={itemRadioTitleStyle}>
              Gain Muscle
            </Text>
          </TouchableOpacity>

          <View style={seperatorStyle} />

          <TouchableOpacity
            style={ItemContainer}
            onPress={() => this.setState({ categoryID:26, isGetMassive: false })}
          >
            <View>
              <Image
                resizeMode="contain"
                style={itemIconStyle}
                source={
                  !this.state.isGetMassive
                    ? IMAGES.getLeanActive
                    : IMAGES.getLean
                }
              />
            </View>
            <Text style={itemRadioTitleStyle}>Get Lean</Text>
          </TouchableOpacity>

          <View style={seperatorStyle} />
          <KeyboardAvoidingView behavior="padding">
            <RowValue
              label="Specify current body weight and fat %"
              value={this._renderValueCurrentBodyWeight()}
            >
              <View style={detailContainer}>
                <View style={percentageStyle}>
                  <TextInput
                    style={inputStyle}
                    value={this.state.currentFat}
                    returnKeyType="done"
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.setState({ currentFat: text })}
                  />
                  <Text>%</Text>
                </View>
                <TouchableOpacity
                  onPress={this._onToggleModal.bind(this, "current")}
                >
                  <Text style={infoText}>
                    Don't know your body fat percentage?
                  </Text>
                </TouchableOpacity>
              </View>
              {this._renderRulerCurrentBodyWeight()}
            </RowValue>

            <View style={seperatorStyle} />
            <RowValue
              label="Specify target body weight and fat % in period"
              value={this._renderValueTargetBodyWeight()}
            >
              <View style={detailContainer}>
                <View style={percentageStyle}>
                  <TextInput
                    style={inputStyle}
                    value={this.state.targetFat}
                    returnKeyType="done"
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.setState({ targetFat: text })}
                  />
                  <Text>%</Text>
                </View>
                <TouchableOpacity
                  onPress={this._onToggleModal.bind(this, "target")}
                >
                  <Text style={infoText}>
                    Don't know your body fat percentage?
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Select
                  onChange={this._toggleTargetedWeight.bind(this)}
                  multiple
                  dataSource={[
                    {
                      id: 1,
                      text: "I don't know my targeted weight"
                    }
                  ]}
                />
              </View>
              {this._renderRulerTargetBodyWeight()}
            </RowValue>

            {this._renderFooterComponent()}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ user, setGoal }) => {
  return {
    isMetric: user.user.units == "metric" ? true : false,
    dataSource: data,
    isSubmitting: setGoal.isSubmitting,
    isMale: user.user.gender == "male" ? true : false
  };
};

export default connect(mapStateToProps, {
  onSetGoal
})(BodybuildingScreen);
