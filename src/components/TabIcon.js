import React, { PureComponent } from "react";
import { View, Text, Image } from "react-native";
import { connect } from "react-redux";

class TabIcon extends PureComponent {
  render() {
    return (
      <View style={this.props.containerStyle}>
        <Image source={this.props.imgSource} style={this.props.imgStyle} />
        {this.props.notificationCount > 0 ? (
          <View
            style={{
              position: "absolute",
              right: 0,
              top: -4,
              backgroundColor: "red",
              borderRadius: 9,
              // width: 18,
              paddingLeft: 5,
              paddingRight: 5,
              height: 18,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "white", fontSize: 13 }}>
              {this.props.notificationCount}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    notificationCount: user.notifications
  };
};

export default connect(
  mapStateToProps,
  {}
)(TabIcon);
