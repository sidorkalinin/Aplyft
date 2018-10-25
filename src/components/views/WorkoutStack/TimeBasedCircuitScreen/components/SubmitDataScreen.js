import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { connect } from "react-redux";
import { colors } from "../../../../styles/theme";

class SubmitDataScreen extends Component {
  componentDidMount() {
    // console.log("did load");
    this.setState({
      text: this.props.text,
      number: this.props.number
    });
  }

  state = {
    text: "",
    number: 0
  };

  _onPressPlus = () => {
    this.setState({ number: ++this.state.number });
    if (this.props.onPressPlus) this.props.onPressPlus();
  };

  _onPressMinus = () => {
    this.setState({ number: --this.state.number < 0 ? 0 : this.state.number });
    if (this.props.onPressMinus) this.props.onPressMinus();
  };

  _onPressSubmit = () => {
    if (this.props.onPressSubmit)
      this.props.onPressSubmit({
        text: this.state.text,
        number: this.state.number
      });
  };

  _onPressCancel = () => {
    if (this.props.onPressCancel) this.props.onPressCancel();
  };

  render() {
    return (
      <View style={Styles.mainContainer}>
        <View style={Styles.titleContainer}>
          <Text style={Styles.title}>TIME'S UP!</Text>
        </View>
        <View style={Styles.subTitleContainer}>
          <Text style={Styles.subTitle}>How many times?</Text>
        </View>
        <View style={Styles.buttonsContainer}>
          <TouchableOpacity
            onPress={this._onPressMinus.bind(this)}
            style={Styles.roundedButton}
          >
            <Text style={Styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={Styles.acheivedText}>{this.state.number}</Text>
          <TouchableOpacity
            onPress={this._onPressPlus.bind(this)}
            style={Styles.roundedButton}
          >
            <Text style={Styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.descriptionTextcontainer}>
          <Text style={Styles.descriptionText}>
            Leave a message for your fitness expert
          </Text>
        </View>
        <View style={Styles.textInputContainer}>
          <TextInput
            style={Styles.textInputStyle}
            placeholder={"Today's training was..."}
            multiline={true}
            numberOfLines={4}
            underlineColorAndroid="transparent"
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
        </View>
        <View style={Styles.buttonContainer}>
          <TouchableOpacity onPress={this._onPressSubmit.bind(this)}>
            <Text style={Styles.buttons}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const Styles = {
  mainContainer: {
    width: "100%",
    height: "100%",
    padding: 30,
    borderRadius: 20,
    backgroundColor: "white"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  },
  titleContainer: {
    alignItems: "center",
    padding: 5
  },
  title: {
    fontWeight: "bold",
    fontSize: 25
  },
  subTitleContainer: {
    alignItems: "center",
    padding: 5
  },
  subTitle: {
    // fontWeight:'bold',
    fontSize: 18
  },
  roundedButton: {
    borderWidth: 3,
    borderColor: colors.darkBlueColor,
    backgroundColor: "transparent",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 30,
    marginTop: -6
  },
  acheivedText: {
    fontSize: 60
  },
  descriptionTextcontainer: {
    padding: 5,
    alignItems: "center"
  },
  descriptionText: {
    fontWeight: "bold"
  },
  textInputStyle: {
    borderWidth: 1,
    height: "100%",
    borderColor: "#eeeeee",
    borderRadius: 5,
    padding: 5,
    fontSize: 18
  },
  textInputContainer: {
    padding: 5,
    flex: 1
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  buttons: {
    color: "red",
    fontWeight: "bold"
  }
};

export default connect(mapStateToProps, {})(SubmitDataScreen);
