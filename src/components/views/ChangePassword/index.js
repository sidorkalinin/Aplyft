import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import Styles from "./styles";
import { save, passwordChange, passwordRetypeChange } from "./actions";
import { Button } from "../../common";

class changePassword extends Component {
  static navigationOptions = {
    // title: 'Profile',
    headerTintColor: "white"
  };
  state = {
    pass: "",
    retype: "",
    old: ""
  };

  _save = () => {
    this.props.save(this.state);
  };

  _passwordRetypeChange = value => {
    this.setState({
      retype: value
    });
  };

  _passwordChange = value => {
    this.setState({
      pass: value
    });
  };

  _passwordOldChange = value => {
    this.setState({
      old: value
    });
  };

  render() {
    const { mainContainer, inputStyle, rowStyle } = Styles;

    return (
      <View style={mainContainer}>
        {this.props.isUpdating ? (
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
                Updating Password
              </Text>
              <ActivityIndicator />
            </View>
          </Modal>
        ) : null}

        <View style={[rowStyle, { borderBottomWidth: 5 }]}>
          <TextInput
            autoCorrect={false}
            style={inputStyle}
            onChangeText={this._passwordOldChange.bind(this)}
            placeholder={"Old Password"}
            secureTextEntry
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={rowStyle}>
          <TextInput
            autoCorrect={false}
            style={inputStyle}
            onChangeText={this._passwordChange.bind(this)}
            placeholder={"Password"}
            secureTextEntry
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={rowStyle}>
          <TextInput
            autoCorrect={false}
            style={inputStyle}
            onChangeText={this._passwordRetypeChange.bind(this)}
            placeholder={"Retype Password"}
            secureTextEntry
            underlineColorAndroid="transparent"
          />
        </View>

        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 6,
            borderColor: "#eeeeee",
            paddingLeft: 10,
            paddingRight: 10,
            height: 95
          }}
        >
          <Button onPress={this._save.bind(this)}>
            <Text>Change Password</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapsStateToProps = ({ ChangePasswordView }) => {
  return ChangePasswordView;
};

export default connect(mapsStateToProps, {
  save,
  passwordChange,
  passwordRetypeChange
})(changePassword);
