var React = require("react");
var ReactNative = require("react-native");
var {
  DatePickerAndroid,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity
} = ReactNative;

class BLDatePickerAndroid extends React.Component {
  static title = "DatePickerAndroid";
  static description = "Standard Android date picker dialog";

  state = {
    date: new Date(this.props.value),
    simpleText: this.props.value
  };

  showPicker = async (stateKey, options) => {
    try {
      var newState = {};
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(this.props.value),
        minDate: new Date(this.props.minDate),
        maxDate: new Date(this.props.maxDate),
        mode: "spinner"
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        newState[stateKey + "Text"] = "dismissed";

        var date = new Date(year, month, day);

        newState[stateKey + "Text"] = date.toDateString();

        this.props.onDateChange(date);
      }
      this.setState(newState);
    } catch ({ code, message }) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };

  render() {
    const label = this.props.label;
    //if label props is set show the label else render without label
    if (label) {
      return (
        <View title="Simple date picker">
          <TouchableOpacity
            style={styles.body}
            onPress={this.showPicker.bind(this, "min", "max", {
              minDate: new Date(this.props.minDate),
              maxDate: new Date(this.props.maxDate)
            })}
          >
            <View style={{ flexDirection: "row", margin: 10, height: 20 }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={
                    {
                      // fontFamily:'Zetta Serif'
                    }
                  }
                >
                  {this.props.field_description}
                </Text>
              </View>
              <View
                style={{ flex: 1, alignItems: "flex-end", paddingRight: 10 }}
              >
                <Text
                  style={
                    {
                      // fontFamily:'Zetta Serif'
                    }
                  }
                >
                  {this.props.value}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View title="Simple date picker" style={styles.defaultNoLabel}>
          <TouchableOpacity
            style={styles.body}
            onPress={this.showPicker.bind(this, "min", "max", {
              minDate: new Date(this.props.minDate),
              maxDate: new Date(this.props.maxDate)
            })}
          >
            <View style={{ flexDirection: "row", margin: 10, height: 20 }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={
                    {
                      //fontFamily:'Zetta Serif'
                    }
                  }
                >
                  {this.props.field_description}
                </Text>
              </View>
              <View
                style={{ flex: 1, alignItems: "flex-end", paddingRight: 10 }}
              >
                <Text
                  style={
                    {
                      // fontFamily:'Zetta Serif'
                    }
                  }
                >
                  {this.props.value}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

var styles = StyleSheet.create({
  text: {
    color: "black"
  },
  body: {
    backgroundColor: "white"
  },
  defaultNoLabel: {
    borderColor: "#e0dee4",
    borderTopWidth: 1
  }
});

export { BLDatePickerAndroid };
