import React, { PureComponent } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors } from "../../../../styles/theme";
import { viewportWidth } from "../../../../../variables";

class ValueInput extends PureComponent {
  _onEndEditing = text => {
    if (this.props.onEndEditing) this.props.onEndEditing(text);
  };

  _onChangeText = text => {
    if (this.props.onChangeText) this.props.onChangeText(text);
  };

  _onFocus = text => {
    if (this.props.onFocus) this.props.onFocus(text);
  };

  render() {
    // for focus
    var txt = null;

    const { mainContainer, labelStyle, textInputStyle } = styles;

    return (
      <TouchableOpacity
        onPress={() => {
          txt.focus();
        }}
        style={mainContainer}
      >
        <Text style={labelStyle}>{this.props.label}</Text>
        <TextInput
          ref={input => {
            txt = input;
          }}
          onFocus={this._onFocus.bind(this)}
          onChangeText={this._onChangeText.bind(this)}
          underlineColorAndroid="transparent"
          onEndEditing={this._onEndEditing.bind(this)}
          value={this.props.value}
          multiline={false}
          style={textInputStyle}
        />
      </TouchableOpacity>
    );
  }
}

const styles = {
  mainContainer: {
    padding: 20,
    flexDirection: "row"
  },
  textInputStyle: {
    minWidth: 200,
    textAlign: "right"
  },
  labelStyle: {
    flex: 1
  }
};

export default ValueInput;
