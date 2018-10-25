import React, { Component } from "react";
import { View, Text, Image, PanResponder, Dimensions } from "react-native";
import { colors } from "../../../styles/theme";

class infoIcon extends Component {
  constructor(props) {
    super(props);
    const panResponder = PanResponder.create({
      // executed anytime the user presse the screen, i.e () => true
      onStartShouldSetPanResponder: () => {
        // console.log("user press");
        this.setState({ display: "flex" });
        return true;
      },

      // executed when the user move their finger while pressing
      onPanResponderMove: (event, gesture) => false,

      // executed when the user remove his finger
      onPanResponderRelease: () => {
        this.setState({ display: "none" });
        console.log("user released");
      }
    });

    this.state = {
      panResponder,
      display: "none",
      height: 0
    };
  }

  // helper function
  measureView(event) {
    this.setState({ height: event.nativeEvent.layout.height });
  }

  render() {
    const { hiddenTextContainer, hiddenText, iStyle, iTextStyle } = styles;
    const { style } = this.props;

    var Direction = {
      left: -10,
      width: Dimensions.get("window").width - 25 // workaround
    };
    if (this.props.direction)
      if (this.props.direction == "left")
        Direction = {
          right: -10,
          width: Dimensions.get("window").width - 105 // workaround
        };

    return (
      <View style={style}>
        <View
          onLayout={event => this.measureView(event)}
          style={[
            hiddenTextContainer,
            {
              display: this.state.display,
              top: -(this.state.height / 2) + 12.5
            },
            Direction
          ]}
        >
          <Text style={hiddenText}>{this.props.text}</Text>
        </View>
        <View {...this.state.panResponder.panHandlers} style={iStyle}>
          <Text style={iTextStyle}>i</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  iStyle: {
    borderWidth: 1,
    borderColor: colors.redColor,
    borderRadius: 15,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "white"
  },
  hiddenTextContainer: {
    position: "absolute",
    borderRadius: 5,
    padding: 25,
    paddingLeft: 42,
    backgroundColor: "white",
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: "#a8a9aa",
    shadowOffset: { height: 0, width: 0 }
  },
  hiddenText: {
    color: colors.redColor
  },
  iTextStyle: {
    color: colors.redColor,
    fontSize: 15,
    backgroundColor: "white",
    height: 20
  }
};

export default infoIcon;
