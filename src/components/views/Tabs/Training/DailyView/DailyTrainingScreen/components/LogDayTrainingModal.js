import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { connect } from "react-redux";
import { colors } from "../../../../../../styles/theme";

class LogDayTrainingModal extends Component {
  componentDidMount() {
    // console.log("did load");

    this.setState({
      text: this.props.text,
      nut_text: this.props.nut_text,
      date: this.props.date
    });
  }

  state = {
    text: "",
    nut_text: ""
  };

  _onPressSubmit = () => {
    if (this.props.onPressSubmit)
      this.props.onPressSubmit({
        text: this.state.text,
        nut_text: this.state.nut_text
      });
  };

  _onPressCancel = () => {
    if (this.props.onPressCancel) this.props.onPressCancel();
  };

  render() {
    return (
      <View style={Styles.mainContainer}>
        <View style={Styles.titleContainer}>
          <Text style={Styles.title}>LOG WORKOUT</Text>
          <Text style={Styles.descriptionText}>
            {new Date(this.props.date).toDateString()}
          </Text>
        </View>
        <View style={Styles.descriptionTextcontainer}>
          <Text style={Styles.descriptionText}>
            How did you feel? Leave APLYFT a message
          </Text>
        </View>
        <View style={Styles.textInputContainer}>
          <TextInput
            style={Styles.textInputStyle}
            placeholder={"Today's training was..."}
            multiline={true}
            numberOfLines={4}
            underlineColorAndroid="transparent"
            onChangeText={text => this.setState({ text: text })}
            value={this.state.text}
          />
        </View>
        <View style={Styles.textInputContainer}>
          <TextInput
            style={Styles.textInputStyle}
            placeholder={"Notes about your nutrition..."}
            multiline={true}
            numberOfLines={4}
            underlineColorAndroid="transparent"
            onChangeText={text => this.setState({ nut_text: text })}
            value={this.state.nut_text}
          />
        </View>
        <View style={Styles.buttonContainer}>
          <TouchableOpacity onPress={this._onPressCancel.bind(this)}>
            <Text style={Styles.buttons}>Cancel</Text>
          </TouchableOpacity>
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

  titleContainer: {
    alignItems: "center",
    padding: 5
  },
  title: {
    fontWeight: "bold",
    fontSize: 25
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

export default connect(
  mapStateToProps,
  {}
)(LogDayTrainingModal);
