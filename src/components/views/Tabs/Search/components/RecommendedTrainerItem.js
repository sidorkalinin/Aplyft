import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Flag from "react-native-flags";
// import Icon from "react-native-ionicons";

// styles
import { colors } from "../../../../styles/theme";

//custom component
import Avatar from "../../../../Avatar";
import Rating from "../../../../Rating";
import Button from "../../../../Button";

class RecommendedTrainerItem extends Component {
  _renderButtons = () => {
    const { buttonsContainer } = styles;

    if (this.props.locked && this.props.status == "default") {
      return <View />;
    }

    // normal
    switch (this.props.status) {
      case "waiting_user_approval":
        return (
          <View style={buttonsContainer}>
            <Button onPress={this.props.onProcessPaymentPress}>
              PROCESS PAYMENT
            </Button>
          </View>
        );

      case "active":
        return (
          <View style={buttonsContainer}>
            <Button>CHOSEN</Button>
          </View>
        );

      case "pending_trainer_approval":
        return (
          <View style={buttonsContainer}>
            <Button Gray>PENDING</Button>
          </View>
        );

      case "declined":
        return (
          <View style={buttonsContainer}>
            <Button Gray>UNAVAILABLE</Button>
          </View>
        );

      default:
        // return (
        //   <View style={buttonsContainer}>
        //     <Button onPress={this.props.onChooseTrainerButtonPress}>
        //       CHOOSE
        //     </Button>
        //     <Button Gray>FREE TRIAL</Button>
        //   </View>
        // );
        return <View />;
    }
  };

  _renderPrice = () => {
    const {
      priceStyle,
      periodStyle,
      trainerPriceContainer,
      FreeTrailStyle
    } = styles;

    //if (this.props.showPrice)
    return (
      <View style={trainerPriceContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1
          }}
        >
          <View style={{ justifyContent: "flex-start" }}>
            <Text style={periodStyle}>Price range</Text>
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <Text style={priceStyle}>{this.props.price_range}</Text>
          </View>
        </View>
        {this.renderFreeTrail()}
      </View>
    );

    return <View />;
  };

  renderFreeTrail() {
    const { FreeTrailStyle } = styles;
    if (this.props.free_trail == "true") {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1
          }}
        >
          <View style={{ justifyContent: "flex-start" }}>
            <Text style={FreeTrailStyle}>Free Trial Available</Text>
          </View>
        </View>
      );
    }
    {
      return null;
    }
  }

  render() {
    const {
      mainContainer,
      infoContainer,
      trainerDetailsContainer,
      trainerNameAndCategoriesContainer,
      avatarContainer,
      fullNameStyle,
      categoryStyle,
      locationStyle,
      seperatorStyle
    } = styles;

    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={mainContainer}>
          <View style={avatarContainer}>
            <Avatar source={this.props.ImageSource} />
          </View>

          <View style={infoContainer}>
            <View
              style={{
                flexDirection: "row",
                flex: 1
              }}
            >
              <View style={{ flex: 1 }}>
                <View style={trainerDetailsContainer}>
                  <View style={trainerNameAndCategoriesContainer}>
                    <Text style={fullNameStyle}>{this.props.FullName}</Text>
                    <Text style={categoryStyle}>{this.props.Category}</Text>
                    <Rating
                      stars={this.props.Stars}
                      showStars={this.props.showStars}
                    />
                  </View>
                  <View style={{ paddingLeft: 10, paddingRight: 5 }}>
                    <Flag code={this.props.country_code} size={24} />
                  </View>
                </View>
                <View style={seperatorStyle} />

                {this._renderPrice()}
              </View>
              <View style={{ alignSelf: "center" }}>
                <Image
                  style={styles.forwardicon}
                  source={require("./../../../../../assets/images/chevron.jpg")}
                />
              </View>
            </View>
            {this._renderButtons()}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  mainContainer: {
    width: "100%",
    backgroundColor: "white",
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 13,
    paddingTop: 13,
    flexDirection: "row",
    justifyContent: "space-between"
    // borderWidth: 2
  },
  infoContainer: {
    flex: 3,
    flexDirection: "column"
  },
  trainerDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
  },
  trainerNameAndCategoriesContainer: {
    flexGrow: 1,

    width: "80%"
  },
  trainerPriceContainer: {
    flexDirection: "column",
    flex: 1,
    marginBottom: 10
  },

  avatarContainer: {
    flex: 1,
    // paddingLeft: 10,
    paddingRight: 15,
    paddingBottom: 15,
    paddingTop: 15
    // borderColor: "red"
  },
  buttonsContainer: {
    flexDirection: "row",
    paddingTop: 10
  },
  fullNameStyle: {
    color: colors.darkBlueColor,
    fontWeight: "bold"
  },
  categoryStyle: {
    width: "100%",
    color: colors.darkBlueColor
  },
  locationStyle: {
    color: colors.lightGray
  },
  priceStyle: {
    color: colors.darkBlueColor,
    fontWeight: "bold",
    alignSelf: "flex-end",
    fontSize: 12
  },
  periodStyle: {
    color: colors.lightGray,
    alignSelf: "flex-end",
    fontSize: 13
  },
  FreeTrailStyle: {
    color: "red",
    alignSelf: "flex-end",
    fontSize: 13
  },
  seperatorStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.lightGray,
    height: 1,
    marginTop: 10,
    marginBottom: 10
    // backgroundColor: colors.lightGray
  },
  forwardicon: {
    width: 18,
    height: 18,
    alignSelf: "center"
  }
};

export default RecommendedTrainerItem;
