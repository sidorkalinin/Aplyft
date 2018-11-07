import React, { Component } from "react";
import {
  DatePickerAndroid,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity
} from "react-native";
import moment from "moment";

class AndroidDatePicker extends React.Component {
  static title = "DatePickerAndroid";
  static description = "Standard Android date picker dialog";

  state = {
    date: new Date(this.props.value),
    simpleText: this.props.value
  };

  showPicker = async (stateKey, options) => {
    // try {
    //   var newState = {};
    //   const { action, year, month, day } = await DatePickerAndroid.open(
    //     options
    //   );
    //   if (action !== DatePickerAndroid.dismissedAction) {
    //     newState[stateKey + "Text"] = "dismissed";
    //
    //     var date = new Date(year, month, day);
    //     newState[stateKey + "Text"] = date.toDateString();
    //
    //     this.props.onDateChange(date);
    //   }
    //   this.setState(newState);
    // } catch ({ code, message }) {
    //   console.warn(`Error in example '${stateKey}': `, message);
    // }

    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(),
        mode: "spinner",
        maxDate: new Date(
          moment()
            .add(1, "d")
            .format("YYYY-MM-DD")
        )
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        var date = new Date(year, month, day);
        this.props.onDateChange(date);
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  render() {
    return (
      <View title="Simple date picker" style={styles.defaultNoLabel}>
        <TouchableOpacity
          style={styles.body}
          onPress={this.showPicker.bind(this, {
            mode: "spinner"
          })}
        >
          <View
            style={{
              flexDirection: "row",
              margin: 10,
              alignItems: "center",
              height: 30
            }}
          >
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={{ color: "#181f31" }}>{this.props.value}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    color: "#22763B"
  },
  body: {
    backgroundColor: "#F0EFEF",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  defaultNoLabel: {
    // borderWidth: 1,
    borderColor: "#e0dee4"
    //borderTopWidth: 1
  }
});

export default AndroidDatePicker;
