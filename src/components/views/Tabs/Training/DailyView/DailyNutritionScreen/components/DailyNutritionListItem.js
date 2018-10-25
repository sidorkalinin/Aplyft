import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput
} from "react-native";
import { colors } from "../../../../../../styles/theme";
import { connect } from "react-redux";
import moment from "moment";

class DailyNutritionListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  _renderAccompCalories() {
    if (this.props.accCalories == "" || this.props.accCalories == null) {
      return <View />;
    } else {
      return (
        <View style={{ flexDirection: "column", marginRight: 5 }}>
          <View>
            <Text style={Styles.acc_caloriesStyle}>
              {this.props.accCalories}
            </Text>
          </View>
          <View>
            <Text style={Styles.recomendedStyle}>Actual</Text>
          </View>
        </View>
      );
    }
  }
  renderRecomCalories() {
    const {
      mainContainer,
      descriptionContainer,
      descriptionStyle,
      clientnameStyle,
      input,
      locationStyle,
      requestStyle,
      titleStyle,
      totalCaloriesStyle,
      recomendedStyle,
      acc_caloriesStyle,
      forwardicon
    } = Styles;
    
    if (this.props.totalCalories == "" || this.props.totalCalories == null) {
      return <View />;
    } else {
      return (
        <View>
          <View>
            <Text style={totalCaloriesStyle}>{this.props.totalCalories}</Text>
          </View>
          <View>
            <Text style={recomendedStyle}>Recomended</Text>
          </View>
        </View>
      );
    }
  }
  render() {
    const {
      mainContainer,
      descriptionContainer,
      descriptionStyle,
      clientnameStyle,
      input,
      locationStyle,
      requestStyle,
      titleStyle,
      totalCaloriesStyle,
      recomendedStyle,
      acc_caloriesStyle,
      forwardicon
    } = Styles;
    // var description

    return (
      <TouchableOpacity onPress={this.props.onMealPress}>
        <View style={mainContainer}>
          <View style={descriptionContainer}>
            <View style={{ flex: 2.5 }}>
              <Text style={titleStyle}>{this.props.title}</Text>
            </View>
            <View style={{ flex: 2, flexDirection: "column" }}>
              {this.renderRecomCalories()}
            </View>
            {this._renderAccompCalories()}
          </View>

          <View style={{ alignSelf: "center" }}>
            <Image
              style={forwardicon}
              source={require("./../../../../../../../assets/images/chevron.jpg")}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const Styles = {
  mainContainer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "white"
    //borderWidth: 2
  },
  descriptionContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center"
  },

  titleStyle: {
    fontWeight: "700",
    fontSize: 16,
    color: colors.darkBlueColor
  },
  descriptionStyle: {
    fontSize: 14,
    paddingTop: 10,
    color: colors.darkBlueColor
  },
  forwardicon: {
    width: 20,
    height: 20
  },

  totalCaloriesStyle: {
    color: colors.darkBlueColor
  },
  recomendedStyle: {
    color: "#cccccc"
  },
  acc_caloriesStyle: {
    color: "red"
  }
};

const mapStatetoProps = (state, ownProps) => {};

export default connect(
  null,
  {}
)(DailyNutritionListItem);
