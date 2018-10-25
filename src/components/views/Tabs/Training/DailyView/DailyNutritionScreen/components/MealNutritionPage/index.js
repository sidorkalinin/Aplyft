import React, { PureComponent } from "react";
import { Alert } from "react-native";
import moment from "moment";
import {
  View,
  Text,
  FlatList,
  SectionList,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import {
  autofillPressed,
  onProteinChange,
  onCarbsChange,
  onFatsChange,
  onFiberChange,
  onSugarChange,
  onCholesterolChange,
  onSodiumChange,
  onWaterChange,
  onMealTitleChange,
  onSaveMeal,
  loadMealInfo,
  canceladdition
} from "./actions";
import InfoIcon from "./../../../../../../GoalStack/components/infoIcon";
//import { colors } from "../../../../../styles/theme";
import Styles from "./styles";
import { Button } from "./../../../../../../../common";
import DailyNutritionListItem from "./../DailyNutritionListItem";
import { createStackNavigator, HeaderBackButton } from "react-navigation";
class MealNutritionPage extends PureComponent {
  // if( this.props.navigation.state.params.id != ''){
  //   var Headertitle = this.props.navigation.state.params.title;
  // }else{
  //   var Headertitle = 'Meal Addition'
  // }
  static navigationOptions = props => {
    return {
      headerTintColor: "white",
      title: props.navigation.state.params.title,
      headerTitleStyle: { textAlign: "center", alignSelf: "center" },
      headerLeft: (
        <HeaderBackButton
          tintColor={"white"}
          onPress={() => props.navigation.goBack(null)}
        />
      )
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };
  }
  // componentDidMount() {
  //   this.props.loadDailyNutrition(this.props.workout_date);
  //   this.props.loadDailyNutritionRealm(this.props.workout_date);
  // }
  componentWillMount() {
    var meal_id = this.props.navigation.state.params.id;
    this.props.loadMealInfo(meal_id);
  }

  autofillPressed() {
    var checked = this.props.checked;
    var meal_autofill_id = this.props.navigation.state.params.id;
    this.props.autofillPressed({ checked, meal_autofill_id });
  }

  _renderCheckRadio = () => {
    // check if al the values are the same as required in order to see if the section is checked or not

    const { rightButtonImage } = Styles;

    if (this.props.checked) {
      return (
        <View
          style={{
            width: 30,
            height: 30,
            borderWidth: 1,
            borderColor: "#cccccc",
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            resizeMode="contain"
            style={rightButtonImage}
            source={require("../../../../../../../../assets/images/check-red-thin.png")}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: 30,
            height: 30,
            borderWidth: 1,
            borderColor: "#cccccc",
            borderRadius: 100
          }}
        />
      );
    }
  };

  onMealTitleChange(text) {
    this.props.onMealTitleChange(text);
  }

  onProteinChange(text) {
    this.props.onProteinChange(text);
  }
  onCarbsChange(text) {
    this.props.onCarbsChange(text);
  }
  onFatsChange(text) {
    this.props.onFatsChange(text);
  }
  onFiberChange(text) {
    this.props.onFiberChange(text);
  }
  onSugarChange(text) {
    this.props.onSugarChange(text);
  }
  onCholesterolChange(text) {
    this.props.onCholesterolChange(text);
  }
  onSodiumChange(text) {
    this.props.onSodiumChange(text);
  }
  onWaterChange(text) {
    this.props.onWaterChange(text);
  }

  onSaveMeal(totalCalories) {
    var totalCalories = totalCalories;
    var proteinValue = this.props.proteinValue;
    var carbsValue = this.props.carbsValue;
    var fatsValue = this.props.fatsValue;
    var fiberValue = this.props.fiberValue;
    var sugarValue = this.props.sugarValue;
    var cholesterolValue = this.props.cholesterolValue;
    var sodiumValue = this.props.sodiumValue;
    var waterValue = this.props.waterValue;
    var workout_date = this.props.workout_date;
    var mealtitle = this.props.mealtitle;
    var id = this.props.navigation.state.params.id;
    this.props.onSaveMeal({
      proteinValue,
      carbsValue,
      fatsValue,
      fiberValue,
      sugarValue,
      cholesterolValue,
      sodiumValue,
      waterValue,
      workout_date,
      totalCalories,
      mealtitle,
      id
    });
  }

  renderMealTitle() {
    var meal_title_id = this.props.navigation.state.params.id;
    console.log("meal_title_id is : !!>>>>>!!", meal_title_id);
    console.log("this.props.mealtitle is : !!>>>>>!!", this.props.mealtitle);

    if (meal_title_id.includes("NOTLOGGED") == true || meal_title_id == "") {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#777777",
                fontWeight: "800",
                fontSize: 16
              }}
            >
              Meal Name:{" "}
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              borderRadius: 5,
              borderWidth: 2,
              borderColor: "#cccccc",
              height: 55
            }}
          >
            <TextInput
              style={Styles.MealtitleStyle}
              placeholder="Meal Title"
              onChangeText={this.onMealTitleChange.bind(this)}
              autoCorrect={false}
              underlineColorAndroid="rgba(0,0,0,0)"
              value={this.props.mealtitle}
            />
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  }

  renderAutoFill() {
    if (
      this.props.protein != "" &&
      this.props.carbs != "" &&
      this.props.fats != "" &&
      this.props.fiber != "" &&
      this.props.water != "" &&
      this.props.sugar != "" &&
      this.props.cholesterol != "" &&
      this.props.sodium != ""
    ) {
      return (
        <TouchableOpacity
          onPress={this.autofillPressed.bind(this)}
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <Text
            style={{ color: "#777777", paddingRight: 10, fontWeight: "600" }}
          >
            autofill
          </Text>
          {this._renderCheckRadio()}
        </TouchableOpacity>
      );
    } else {
      return <View />;
    }
  }
  renderRecomendedCalories() {
    if (this.props.total_calories != "") {
      return (
        <Text
          style={{
            color: "#777777",
            fontWeight: "200",
            fontSize: 15
          }}
        >
          {this.props.total_calories}
        </Text>
      );
    }
    return <View />;
  }
  renderActualTotalCalories() {
    var proteinValue = this.props.proteinValue;
    var carbsValue = this.props.carbsValue;
    var fatsValue = this.props.fatsValue;
    console.log(
      "the thre props fat protein and carbs are , ",
      this.props.proteinValue
    );
    console.log(
      "the thre props fat protein and carbs are , ",
      this.props.carbsValue
    );
    console.log(
      "the thre props fat protein and carbs are , ",
      this.props.fatsValue
    );
    if (
      proteinValue != "" &&
      carbsValue != "" &&
      fatsValue != "" &&
      proteinValue != null &&
      carbsValue != null &&
      fatsValue != null
    ) {
      var totalCalories =
        4 * parseInt(proteinValue) +
        4 * parseInt(carbsValue) +
        9 * parseInt(fatsValue);
      var totalCalories = totalCalories;
    } else {
      var totalCalories = "0";
    }
    if (totalCalories == NaN) {
      totalCalories == "0";
    }
    return (
      <View>
        <Text style={{ color: "red", fontSize: 16 }}>{totalCalories}</Text>
      </View>
    );
  }

  cancelMealAddition() {
    this.props.canceladdition();
  }

  render() {
    var proteinValue = this.props.proteinValue;
    var carbsValue = this.props.carbsValue;
    var fatsValue = this.props.fatsValue;
    var fiberValue = this.props.fiberValue;
    var sugarValue = this.props.sugarValue;
    var cholesterolValue = this.props.cholesterolValue;
    var sodiumValue = this.props.sodiumValue;
    var waterValue = this.props.waterValue;

    var protein = this.props.protein;
    var carbs = this.props.carbs;
    var sugar = this.props.sugar;
    var water = this.props.water;
    var cholesterol = this.props.cholesterol;
    var fiber = this.props.fiber;
    var sodium = this.props.sodium;
    var fats = this.props.fats;

    if (
      proteinValue != "" &&
      carbsValue != "" &&
      fatsValue != "" &&
      proteinValue != null &&
      carbsValue != null &&
      fatsValue != null
    ) {
      var totalCalories =
        4 * parseInt(proteinValue) +
        4 * parseInt(carbsValue) +
        9 * parseInt(fatsValue);
      var totalCalories = totalCalories; //.toString();
    } else {
      var totalCalories = "0";
    }

    if (totalCalories == NaN) {
      totalCalories == "0";
    }

    const { mainContainer, emptyComponentContainer } = Styles;
    return (
      <ScrollView style={mainContainer}>
        <View
          style={{
            flex: 1,
            marginTop: 10,
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 50
          }}
        >
          <View
            style={{
              flex: 1,
              marginBottom: 15,
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {this.renderMealTitle()}
          </View>
          <View style={{ flex: 1, marginBottom: 10 }}>
            {this.renderAutoFill()}
          </View>
          <View style={{ flex: 2 }}>
            <View style={Styles.InfoContainer}>
              <View style={Styles.NameAndValueContainer}>
                <View style={{ flex: 2 }}>
                  <Text style={Styles.MacroText}>Protein (g)</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={Styles.MacroValues}>{protein}</Text>
                </View>
              </View>

              <View style={Styles.ItemTitleColumnAchivedContainer}>
                <View style={Styles.ItemTitleColumnAchivedInputContainer}>
                  <TextInput
                    value={proteinValue}
                    keyboardType="numeric"
                    style={Styles.ItemInputStyle}
                    //placeholder="Search..."
                    onChangeText={this.onProteinChange.bind(this)}
                    autoCorrect={false}
                    underlineColorAndroid="rgba(0,0,0,0)"
                  />
                </View>
                <Text style={Styles.ItemTitleColumnAchivedText}>Actual</Text>
              </View>
            </View>
            <View style={Styles.InfoContainer}>
              <View style={Styles.NameAndValueContainer}>
                <View style={{ flex: 2 }}>
                  <Text style={Styles.MacroText}>Carbs (g)</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={Styles.MacroValues}>{carbs}</Text>
                </View>
              </View>

              <View style={Styles.ItemTitleColumnAchivedContainer}>
                <View style={Styles.ItemTitleColumnAchivedInputContainer}>
                  <TextInput
                    value={carbsValue}
                    style={Styles.ItemInputStyle}
                    //placeholder="Search..."
                    onChangeText={this.onCarbsChange.bind(this)}
                    autoCorrect={false}
                    keyboardType="numeric"
                    underlineColorAndroid="rgba(0,0,0,0)"
                  />
                </View>
                <Text style={Styles.ItemTitleColumnAchivedText}>Actual</Text>
              </View>
            </View>
            <View style={Styles.InfoContainer}>
              <View style={Styles.NameAndValueContainer}>
                <View style={{ flex: 2 }}>
                  <Text style={Styles.MacroText}>Fats (g)</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={Styles.MacroValues}>{fats}</Text>
                </View>
              </View>

              <View style={Styles.ItemTitleColumnAchivedContainer}>
                <View style={Styles.ItemTitleColumnAchivedInputContainer}>
                  <TextInput
                    value={fatsValue}
                    style={Styles.ItemInputStyle}
                    //placeholder="Search..."
                    onChangeText={this.onFatsChange.bind(this)}
                    autoCorrect={false}
                    keyboardType="numeric"
                    underlineColorAndroid="rgba(0,0,0,0)"
                  />
                </View>
                <Text style={Styles.ItemTitleColumnAchivedText}>Actual</Text>
              </View>
            </View>
            <View style={Styles.InfoContainer}>
              <View style={Styles.NameAndValueContainer}>
                <View style={{ flex: 2 }}>
                  <Text style={Styles.MacroText}>Fiber (g)</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={Styles.MacroValues}>{fiber}</Text>
                </View>
              </View>

              <View style={Styles.ItemTitleColumnAchivedContainer}>
                <View style={Styles.ItemTitleColumnAchivedInputContainer}>
                  <TextInput
                    value={fiberValue}
                    style={Styles.ItemInputStyle}
                    //placeholder="Search..."
                    onChangeText={this.onFiberChange.bind(this)}
                    autoCorrect={false}
                    keyboardType="numeric"
                    underlineColorAndroid="rgba(0,0,0,0)"
                  />
                </View>
                <Text style={Styles.ItemTitleColumnAchivedText}>Actual</Text>
              </View>
            </View>
            <View style={Styles.InfoContainer}>
              <View style={Styles.NameAndValueContainer}>
                <View style={{ flex: 2 }}>
                  <Text style={Styles.MacroText}>Sugar (g)</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={Styles.MacroValues}>{sugar}</Text>
                </View>
              </View>

              <View style={Styles.ItemTitleColumnAchivedContainer}>
                <View style={Styles.ItemTitleColumnAchivedInputContainer}>
                  <TextInput
                    value={sugarValue}
                    style={Styles.ItemInputStyle}
                    //placeholder="Search..."
                    onChangeText={this.onSugarChange.bind(this)}
                    autoCorrect={false}
                    keyboardType="numeric"
                    underlineColorAndroid="rgba(0,0,0,0)"
                  />
                </View>
                <Text style={Styles.ItemTitleColumnAchivedText}>Actual</Text>
              </View>
            </View>
            <View style={Styles.InfoContainer}>
              <View style={Styles.NameAndValueContainer}>
                <View style={{ flex: 2 }}>
                  <Text style={Styles.MacroText}>Cholesterol (mg)</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={Styles.MacroValues}>{cholesterol}</Text>
                </View>
              </View>

              <View style={Styles.ItemTitleColumnAchivedContainer}>
                <View style={Styles.ItemTitleColumnAchivedInputContainer}>
                  <TextInput
                    value={cholesterolValue}
                    style={Styles.ItemInputStyle}
                    //placeholder="Search..."
                    onChangeText={this.onCholesterolChange.bind(this)}
                    autoCorrect={false}
                    keyboardType="numeric"
                    underlineColorAndroid="rgba(0,0,0,0)"
                  />
                </View>
                <Text style={Styles.ItemTitleColumnAchivedText}>Actual</Text>
              </View>
            </View>
            <View style={Styles.InfoContainer}>
              <View style={Styles.NameAndValueContainer}>
                <View style={{ flex: 2 }}>
                  <Text style={Styles.MacroText}>Sodium (mg)</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={Styles.MacroValues}>{sodium}</Text>
                </View>
              </View>

              <View style={Styles.ItemTitleColumnAchivedContainer}>
                <View style={Styles.ItemTitleColumnAchivedInputContainer}>
                  <TextInput
                    value={sodiumValue}
                    style={Styles.ItemInputStyle}
                    //placeholder="Search..."
                    onChangeText={this.onSodiumChange.bind(this)}
                    autoCorrect={false}
                    keyboardType="numeric"
                    underlineColorAndroid="rgba(0,0,0,0)"
                  />
                </View>
                <Text style={Styles.ItemTitleColumnAchivedText}>Actual</Text>
              </View>
            </View>
            <View style={Styles.InfoContainer}>
              <View style={Styles.NameAndValueContainer}>
                <View style={{ flex: 2 }}>
                  <Text style={Styles.MacroText}>Water (L)</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={Styles.MacroValues}>{water}</Text>
                </View>
              </View>

              <View style={Styles.ItemTitleColumnAchivedContainer}>
                <View style={Styles.ItemTitleColumnAchivedInputContainer}>
                  <TextInput
                    value={waterValue}
                    style={Styles.ItemInputStyle}
                    //placeholder="Search..."
                    onChangeText={this.onWaterChange.bind(this)}
                    autoCorrect={false}
                    keyboardType="numeric"
                    underlineColorAndroid="rgba(0,0,0,0)"
                  />
                </View>
                <Text style={Styles.ItemTitleColumnAchivedText}>Actual</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 20
            }}
          >
            <View
              style={{
                flex: 2,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View style={{ flex: 2 }}>
                <Text
                  style={{
                    color: "#777777",
                    fontWeight: "900",
                    fontSize: 15
                  }}
                >
                  TOTAL CALORIES
                </Text>
              </View>
              <View style={{ flex: 1 }}>{this.renderRecomendedCalories()}</View>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <InfoIcon
                direction={"left"}
                style={{ zIndex: 8 }}
                text="Calculate based on your current macro entry"
              />

              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {this.renderActualTotalCalories()}
                <View>
                  <Text
                    style={{
                      color: "#cccccc",
                      fontSize: 10,
                      alignSelf: "flex-end"
                    }}
                  >
                    Actual
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{ width: "100%", flex: 1, marginTop: 20, marginBottom: 20 }}
          >
            <Button onPress={this.onSaveMeal.bind(this, totalCalories)}>
              <Text style={{ fontWeight: "900" }}>Save</Text>
            </Button>
          </View>
          <TouchableOpacity
            onPress={this.cancelMealAddition.bind(this)}
            style={{
              width: "100%",
              flex: 1,
              marginTop: 10,
              marginBottom: 10,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text>cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({
  dailyNutritionList,
  mealred,
  dailyTrainingList
}) => {
  const { inputValue, snackValue, count } = dailyNutritionList;
  console.log(mealred.proteinValue, "------- proteinValue");
  console.log(mealred.carbsValue, "-------carbsValue");
  console.log(mealred.fatsValue, "------- fatsValue");
  console.log(mealred.mealtitle, "-------mealtitle");

  var date = new Date();
  for (var index in dailyTrainingList.workouts) {
    let w = dailyTrainingList.workouts[index];
    date = new Date(w.workout_date);
    break;
  }

  return {
    workout_date: date,
    data: dailyNutritionList.data,
    proteinValue: mealred.proteinValue,
    carbsValue: mealred.carbsValue,
    fatsValue: mealred.fatsValue,
    fiberValue: mealred.fiberValue,
    sugarValue: mealred.sugarValue,
    cholesterolValue: mealred.cholesterolValue,
    sodiumValue: mealred.sodiumValue,
    waterValue: mealred.waterValue,

    mealtitle: mealred.mealtitle,

    protein: mealred.protein,
    carbs: mealred.carbs,
    sugar: mealred.sugar,
    water: mealred.water,
    cholesterol: mealred.cholesterol,
    fiber: mealred.fiber,
    sodium: mealred.sodium,
    fats: mealred.fats,

    checked: mealred.checked,

    total_calories: mealred.total_calories
  };
};

export default connect(
  mapStateToProps,
  {
    autofillPressed,
    onProteinChange,
    onCarbsChange,
    onFatsChange,
    onFiberChange,
    onSugarChange,
    onCholesterolChange,
    onSodiumChange,
    onWaterChange,
    onMealTitleChange,
    onSaveMeal,
    loadMealInfo,
    canceladdition
  }
)(MealNutritionPage);
