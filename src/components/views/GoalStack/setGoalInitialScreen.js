import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import Styles from "./styles";
import { gotoSubPage } from "./actions";

//custom components
import ListItem from "./components/ListItem";
import InfoIcon from "./components/infoIcon";
import GoalHeader from "./components/goalHeader";

class setGoalInitialScreen extends Component {
  /*static navigationOptions = {
    	header: null
  	};*/

  gotoSubScreen(subcategory) {
    this.props.gotoSubPage(subcategory);
  }

  render() {
    const {
      mainContainer,
      profileImageContainer,
      profileImageStyle,
      descriptionStyle,
      plusIconStyle,
      plusTextStyle,
      subContainer,
      listTextStyle,
      ItemContainerStyle,
      comingSoonContainer,
      comingSoonTextStyle
    } = Styles;

    /*
		<View style={comingSoonContainer}>
			<Text style={comingSoonTextStyle}>Coming Soon</Text>
			<Text style={comingSoonTextStyle}>Set your goal to connect and train with our global fitness experts</Text>
		</View>
		*/

    return (
      <ScrollView style={mainContainer}>
        <GoalHeader
          FullName={`${this.props.user.fullname.toUpperCase()}`}
          // LeftButtonComponent={<Text>Cancel</Text>}
          // LeftPress={()=>this.props.navigation.goBack(null)}
        />

        <View style={subContainer}>
          <Text style={descriptionStyle}>
            SET YOUR GOAL TO START YOUR TRAINING
          </Text>

          <TouchableOpacity
            onPress={this.gotoSubScreen.bind(this, "powerlifting")}
          >
            <ListItem>
              <View style={ItemContainerStyle}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 8
                  }}
                >
                  <InfoIcon style={{ zIndex: 8 }} text="Train for Strength" />
                </View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 5
                  }}
                >
                  <Text
                    style={[
                      listTextStyle,
                      { zIndex: 5, paddingTop: 3, paddingLeft: 10 }
                    ]}
                  >
                    Powerlifting
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 5
                  }}
                >
                  <Text
                    style={[
                      listTextStyle,
                      {
                        fontSize: 11,
                        zIndex: 5,
                        paddingTop: 3,
                        paddingLeft: 5,
                        color: "#e30b19",
                        fontWeight: "100",
                        textDecorationLine: "underline"
                      }
                    ]}
                  >
                    (Official partners of the
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 5
                  }}
                >
                  <Image
                    resizeMode="contain"
                    style={{ width: 50, height: 50 }}
                    source={require("./../../../assets/images/IPF.png")}
                  />
                </View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 5
                  }}
                >
                  <Text
                    style={[
                      listTextStyle,
                      {
                        fontSize: 11,
                        zIndex: 5,
                        paddingTop: 3,
                        paddingLeft: 0,
                        color: "#e30b19",
                        fontWeight: "100",
                        textDecorationLine: "underline"
                      }
                    ]}
                  >
                    )
                  </Text>
                  
                </View>
              </View>
            </ListItem>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.gotoSubScreen.bind(this, "bodybuilding")}>
            <ListItem>
              <View style={ItemContainerStyle}>
                <InfoIcon
                  style={{ zIndex: 8 }}
                  text="Train to acheive your dream physique"
                />

                <Text
                  style={[
                    listTextStyle,
                    { zIndex: 5, paddingTop: 3, paddingLeft: 10 }
                  ]}
                >
                  Bodybuilding
                </Text>
              </View>
            </ListItem>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.gotoSubScreen.bind(this, "sportsspecific")}
          >
            <ListItem style={{ borderTopWidth: 1 }}>
              <View style={ItemContainerStyle}>
                <InfoIcon
                  style={{ zIndex: 8 }}
                  text="Train to improve your athletic abilities"
                />

                <Text
                  style={[
                    listTextStyle,
                    { zIndex: 5, paddingTop: 3, paddingLeft: 10 }
                  ]}
                >
                  Athletic Performance
                </Text>
              </View>
            </ListItem>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log("coming soon")}>
            <ListItem>
              <View style={ItemContainerStyle}>
                <InfoIcon style={{ zIndex: 8 }} text="Coming Soon" />

                <Text
                  style={[
                    listTextStyle,
                    {
                      zIndex: 5,
                      paddingTop: 3,
                      paddingLeft: 10,
                      color: "#cccccc"
                    }
                  ]}
                >
                  CrossLyft (Coming Soon)
                </Text>
              </View>
            </ListItem>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ user }) => {
  // console.log("the user is ", user.user);
  return {
    user: user.user
  };
};

export default connect(
  mapStateToProps,
  {
    gotoSubPage
  }
)(setGoalInitialScreen);
