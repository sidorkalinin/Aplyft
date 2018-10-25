import React, { Component } from "react";
import { View, TextInput, Text, Image } from "react-native";

class InputField extends Component {
  defaultProps = {
    secureTextEntry: false,
    placeholder: "",
    autoCorrect: false,
    value: "",
    onChangeText: () => {},
    iconComponent: <View />
  };

  renderIcon() {
    const { iconContainer, iconStyle } = styles;

    if (this.props.iconComponent) {
      return <View style={iconContainer}>{this.props.iconComponent}</View>;
    }
  }

  render() {
    const {
      secureTextEntry,
      placeholder,
      autoCorrect,
      inputStyle,
      value,
      onChangeText
    } = this.props;

    const { mainContainer, inputContainer } = styles;

    return (
      <View style={mainContainer}>
        {this.renderIcon()}
        <View style={inputContainer}>
          <TextInput
            { ...this.props }
            underlineColorAndroid="transparent"
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            autoCorrect={autoCorrect}
            style={inputStyle}
            value={value}
            onChangeText={onChangeText}
            ref={(input)=>{
              if(this.props.inputRef)
                this.props.inputRef(input)
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    flexDirection: "row"
  },
  iconContainer: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    fontSize: 14
  },
  iconStyle: {
    width: 25,
    height: 25,
    resizeMode: "contain"
  }
};

export default InputField;
