import React, { PureComponent } from "react";
import {
  SectionList,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  NativeModules,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { Button } from "../../../../common";
import { show_var } from "./../actions";
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class exerciseSetScreen extends PureComponent {
  constructor(props) {
    super(props);

    // the data source prop is an array
    // so we have to loop and then insert them

    var ds = [];
    for (var index in this.props.dataSource) {
      var row = this.props.dataSource[index];

      // accomplished weight
      var accomplished_weight = row.accomplished_weight;
      var accomplished_repetitions = row.accomplished_repetitions;
      var accomplished_reps_left = row.accomplished_reps_left;
      var accomplished_distance = row.accomplished_distance;
      var accomplished_height = row.accomplished_height;
      var accomplished_rest_time = row.accomplished_rest_time;

      var reps_left_required = row.reps_left;
      var rest_time_required = row.restTime;
      var distance_required = row.distance;
      var height_required = row.height;
      var time_required = row.time;
      var weight_required = row.weight;
      var repetitions_required = row.repetitions;

      var reps_left = row.reps_left;
      var restTime = row.restTime;
      var distance = row.distance;
      var time = row.time;
      var weight = row.weight;
      var repetitions = row.repetitions;
      var height = row.height;

      var accomplished_reps_left = row.accomplished_reps_left;

      if (reps_left == "null") {
        reps_left = "*";
        reps_left_required = 0;
      }
      if (restTime == "null") {
        restTime = "*";
        rest_time_required = 0;
      }
      if (distance == "null") {
        distance = "*";
        distance_required = 0;
      }
      if (height == "null") {
        height = "*";
        height_required = 0;
      }
      if (time == "null") {
        time = "*";
        time_required = 0;
      }
      if (weight == "null") {
        weight = "*";
        weight_required = 0;
      }
      if (repetitions == "null") {
        repetitions = "*";
        repetitions_required = 0;
      }

      // checking the nan condition
      if (isNaN(accomplished_weight)) {
        accomplished_weight = 0;
      }
      if (isNaN(accomplished_repetitions)) {
        accomplished_repetitions = 0;
      }

      if (isNaN(accomplished_reps_left)) {
        console.log(
          "I am here where the accomplished_reps_left is NaN >>> > > >>> > > >>>"
        );
        accomplished_reps_left = 0;
      }

      if (!this.props.isMetric)
        accomplished_weight = Math.ceil(
          accomplished_weight * 2.2046226218
        ).toFixed(0);

      //time condition
      var accomplished_time = Math.ceil(row.accomplished_time / 60).toFixed(0);
      var accomplished_rest_time = row.accomplished_rest_time;
      if (isNaN(accomplished_time)) {
        accomplished_time = 0;
      }
      if (isNaN(accomplished_rest_time)) {
        accomplished_rest_time = 0;
      }

      if (!this.props.isMetric)
        accomplished_distance = (accomplished_distance * 3.3).toFixed(0);

      if (!this.props.isMetric)
        accomplished_height = (accomplished_height * 0.3937).toFixed(0);

      // for each supplied item we will add it
      ds.push({
        id: row.id,
        checked: false,
        title: row.title || this.props.title,
        bitwise_logic: this.props.bitwiseLogic,
        data: [
          {
            visible: "default",
            key: "reps",
            type: "number",
            title: "Reps",
            required_value: parseInt(repetitions_required),
            required: repetitions,
            acheived: accomplished_repetitions,
            help_text: "Insert Number of Repetitions"
          },
          {
            visible: "always",
            key: "weight",
            type: "number",
            title: "Weight",
            required_value: parseInt(weight_required),
            required: weight,
            acheived: accomplished_weight,
            help_text: "* Insert Weight Used to Assess Performance"
          },
          {
            visible: "default",
            key: "time",
            type: "time",
            title: "Duration",
            required_value: parseInt(time_required),
            required: time,
            acheived: accomplished_time,
            help_text: "Insert Time Accomplished"
          },
          {
            visible: "default",
            key: "distance",
            type: "number",
            title: "Distance",
            required_value: parseInt(distance_required),
            required: distance,
            acheived: accomplished_distance,
            help_text: "Insert Distance Accomplished"
          },
          {
            visible: "default",
            key: "height",
            type: "number",
            title: "Height",
            required_value: parseInt(height_required),
            required: height,
            acheived: accomplished_height,
            help_text: "Insert Height Accomplished"
          },
          {
            visible: "default",
            key: "repsleft",
            type: "number",
            title: "Reps Left",
            required_value: parseInt(reps_left_required),
            required: reps_left,
            acheived: accomplished_reps_left,
            help_text: "Insert Number of Repetitions Left Before Failure"
          },
          {
            visible: "default",
            key: "resttime",
            type: "time",
            title: "Recovery",
            required_value: parseInt(rest_time_required),
            required: restTime,
            acheived: accomplished_rest_time,
            help_text: ""
          }
        ]
      });
    }

    this.state = {
      showVariation: true,
      check: false,
      dataSource: ds,
      isMetric: this.props.isMetric
    };
  }

  _renderCheckRadio = SectionID => {
    // check if al the values are the same as required in order to see if the section is checked or not
    var checked = true;
    for (var index in this.state.dataSource) {
      var row = this.state.dataSource[index];

      if (row.id != SectionID) continue;

      for (var _index in row.data) {
        var set = row.data[_index];

        switch (set.key) {
          case "weight":
            if (!this.state.isMetric) {
              if (
                set.required_value !=
                Math.round(set.acheived * 2.2046226218).toFixed(0)
              )
                checked = false;
            } else {
              if (set.required_value != set.acheived) {
                checked = false;
                break;
              }
            }
            break;

          case "distance":
            if (!this.state.isMetric) {
              if (
                set.required_value.toFixed(0) !=
                Math.round(set.acheived / 3.3).toFixed(0)
              )
                checked = false;
            } else {
              if (set.required_value != set.acheived) {
                checked = false;
                break;
              }
            }
            break;
          case "height":
            if (!this.state.isMetric) {
              if (
                set.required_value.toFixed(0) !=
                Math.round(set.acheived / 0.39).toFixed(0)
              )
                checked = false;
            } else {
              if (set.required_value != set.acheived) {
                checked = false;
                break;
              }
            }
            break;

          case "time":
            if (String(set.required_value) != String(set.acheived * 60))
              checked = false;
            break;

          default:
            if (set.required_value != set.acheived) checked = false;
            break;
        }
      }
    }

    const { rightButtonImage } = Styles;

    if (checked) {
      return (
        <Image
          resizeMode="contain"
          style={rightButtonImage}
          source={require("../../../../../assets/images/check-red-thin.png")}
        />
      );
    } else {
      return <View />;
    }
  };

  _checkPress = id => {
    // workaround for changing the checked section header
    var tmp = [...this.state.dataSource];
    for (var index in tmp) {
      var section = tmp[index];
      if (section.id == id) {
        section.checked = !section.checked;
        if (section.checked)
          for (var ind in section.data) {
            var row = section.data[ind];

            // conversion units
            switch (row.key) {
              case "weight":
                if (this.state.isMetric) row.acheived = row.required_value;
                else
                  row.acheived = Math.round(
                    row.required_value * 2.2046226218
                  ).toFixed(0);

                break;

              case "time":
                row.acheived = Math.round(row.required_value / 60).toFixed(0);

                break;

              case "distance":
                if (this.state.isMetric)
                  row.acheived = row.required_value.toFixed(0);
                else row.acheived = (row.required_value * 3.3).toFixed(0);

                break;
              case "height":
                if (this.state.isMetric)
                  row.acheived = row.required_value.toFixed(0);
                else row.acheived = (row.required_value * 0.3937).toFixed(0);

                break;

              default:
                row.acheived = row.required_value;

                break;
            }
          }
      }
    }

    this.setState({ dataSource: tmp });

    // callback event function
    if (this.props.onChangeValue)
      this.props.onChangeValue({
        data: this.state.dataSource
      });
  };
  Show_Var() {
    this.setState({ showVariation: true });
  }
  Hide_Var() {
    this.setState({ showVariation: false });
  }
  renderVariations() {
    LayoutAnimation.easeInEaseOut();
    console.log("I am were show_var is changing", this.state.showVariation);
    if (this.state.showVariation) {
      var rows = [];
      for (var variation_index in this.props.variations) {
        var variation_row = this.props.variations[variation_index];

        rows.push(
          <View
            style={{
              marginBottom: 5,
              borderWidth: 0,
              alignSelf: "flex-start"
            }}
          >
            <Text
              style={{
                color: "#777777",

                padding: 4,
                backgroundColor: "#EEEEEE"
              }}
            >
              {variation_row}
            </Text>
          </View>
        );
      }
      if (rows.length > 0) {
        return (
          <View>
            <TouchableOpacity
              onPress={this.Hide_Var.bind(this)}
              style={{ marginBottom: 5 }}
            >
              <Text
                style={{ color: "#cccccc", textDecorationLine: "underline" }}
              >
                Hide Variations
              </Text>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>{rows}</View>
          </View>
        );
      } else {
        return (
          <View>
            <TouchableOpacity
              onPress={this.Hide_Var.bind(this)}
              style={{ marginBottom: 5 }}
            >
              <Text
                style={{ color: "#cccccc", textDecorationLine: "underline" }}
              >
                Hide Variations
              </Text>
            </TouchableOpacity>
            <View>
              <Text style={{ color: "red", fontSize: 12 }}>
                No Variations Found
              </Text>
            </View>
          </View>
        );
      }
    } else {
      return (
        <TouchableOpacity
          onPress={this.Show_Var.bind(this)}
          style={{ marginBottom: 5 }}
        >
          <Text style={{ color: "#cccccc", textDecorationLine: "underline" }}>
            Show Variations
          </Text>
        </TouchableOpacity>
      );
    }
  }
  _renderSectionHeader = ({ section }) => {
    const {
      sectionContainer,
      sectionTitleColumnTitle,
      sectionRightButtonContainer,
      rightButton,
      autoFillStyle
    } = Styles;

    return (
      <View style={sectionContainer}>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <View>
            <Text style={sectionTitleColumnTitle}>{section.title}</Text>
          </View>
          <View style={{ marginTop: 10 }}>{this.renderVariations()}</View>
        </View>

        <TouchableOpacity onPress={this._checkPress.bind(this, section.id)}>
          <View style={sectionRightButtonContainer}>
            <Text style={autoFillStyle}>Auto Fill</Text>
            <View style={rightButton}>
              {this._renderCheckRadio(section.id)}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  _valueEdited = (text, item_index, section_id) => {
    console.log("changing ", section_id, item_index, text);
    var tmp = [...this.state.dataSource]; // copying the object instead odf referencing it
    for (var index in tmp) {
      var section = tmp[index];
      if (section.id == section_id) {
        switch (section.data[item_index].key) {
          case "repsleft":
            var txt = text;

            let repsLeftText = "";
            let repsLeftnumbers = "0123456789";
            for (var i = 0; i < txt.length; i++) {
              if (repsLeftnumbers.indexOf(txt[i]) > -1) {
                repsLeftText = repsLeftText + text[i];
              }
            }
            console.log(
              "in _valueEdited() in the repsleft case checking if there is a dot in the submitted text, : ",
              repsLeftText
            );
            // if (this.state.isMetric) txt = (text * 0.45).toFixed(0);

            section.data[item_index].acheived = repsLeftText;
            break;
          case "reps":
            var txt = text;

            let repsText = "";
            let repsnumbers = "0123456789";
            for (var i = 0; i < txt.length; i++) {
              if (repsnumbers.indexOf(txt[i]) > -1) {
                repsText = repsText + text[i];
              }
            }
            console.log(
              "!!!! in _valueEdited() in the reps case checking if there is a dot in the submitted text, : ",
              repsText
            );
            // if (this.state.isMetric) txt = (text * 0.45).toFixed(0);

            section.data[item_index].acheived = repsText;
            break;

          default:
            section.data[item_index].acheived = text;
            break;
        }
        break;
      }
    }
    this.setState({ dataSource: tmp });
  };

  _onEditingEnd = (item, index, section) => {
    if (item.acheived == "") this._valueEdited("0", index, section.id);
    console.log(">>>>>>>>>>>>>>>>>>>", this.state.dataSource);

    // var data_row = data[index];
    // for (var data_index in data_row.data) {
    //   var ex_row = data_row.data[data_index];
    //   if (ex_row.title == "Reps Left") {
    //     let newText = "";
    //     let numbers = "0123456789";
    //     var text = ex_row.acheived;
    //     for (var i = 0; i < text.length; i++) {
    //       if (numbers.indexOf(text[i]) > -1) {
    //         newText = newText + text[i];
    //       }
    //     }
    //   }
    // }
    // callback event function
    if (this.props.onChangeValue)
      this.props.onChangeValue({
        data: this.state.dataSource
      });
  };

  _convertUnits = item => {
    switch (item.key) {
      case "weight":
        if (
          item.required == "*" ||
          item.required == "0" ||
          item.required == 0
        ) {
          if (this.state.isMetric) return "* kg";
          // by default its stored in Kg in the database so no need to convert
          else return "* lb";
        } else {
          // case for alredy predefined weight
          if (this.state.isMetric)
            return Math.round(item.required).toFixed(0) + " kg";
          // by default its stored in Kg in the database so no need to convert
          else
            return Math.round(item.required * 2.2046226218).toFixed(0) + " lb";
        }

        break;

      case "time":
        if (item.required == "*" || item.required == "0" || item.required == 0)
          return "* min";

        return (item.required / 60).toFixed(0) + " min";

      case "resttime":
        if (item.required == "*" || item.required == "0" || item.required == 0)
          return "* sec";

        return item.required + " sec";

      case "distance":
        if (
          item.required == "*" ||
          item.required == "0" ||
          item.required == 0
        ) {
          if (this.state.isMetric) {
            return "* m";
          } else {
            return "* ft";
          }
        } else if (this.state.isMetric) return item.required + " m";
        else {
          var feet = (item.required * 3.3).toFixed(0);
          return feet + " ft";
        }
      case "height":
        if (
          item.required == "*" ||
          item.required == "0" ||
          item.required == 0
        ) {
          if (this.state.isMetric) {
            return "* cm";
          } else {
            return "* inches";
          }
        } else if (this.state.isMetric) return item.required + " cm";
        else {
          var inch = (item.required * 0.3937).toFixed(0);
          return inch + " inches";
        }

      default:
        return item.required;
        break;
    }
  };

  _renderAcheivedValue = item => {
    //console.log("====ITEM====", item);
    return String(item.acheived); //== "0" ? "" : item.acheived);
  };

  _renderItem = ({ item, index, section }) => {
    // we will add the bitwise logic. every row contains a value for it
    // the values are located in the google sheet
    /* weight (1), reps left (2), time (4), distance (8), reps (16), height(32) */
    //console.log("ITEM IN RENDER ITEM IS <><<><><><><><> : ", item);
    var isWeightVisible = (section.bitwise_logic & 1) > 0 ? true : false;
    var isRepsLeftVisible = (section.bitwise_logic & 2) > 0 ? true : false;
    var isTimeVisible = (section.bitwise_logic & 4) > 0 ? true : false;
    var isRestTimeVisible = true;
    var isDistanceVisible = (section.bitwise_logic & 8) > 0 ? true : false;
    var isRepetitionsVisible = (section.bitwise_logic & 16) > 0 ? true : false;
    var isHeightVisible = (section.bitwise_logic & 32) > 0 ? true : false;

    switch (item.key) {
      case "weight":
        if (!isWeightVisible) return <View />;
        else break;
      case "reps":
        if (!isRepetitionsVisible) return <View />;
        else break;
      case "time":
        if (!isTimeVisible) return <View />;
        else break;
      case "distance":
        if (!isDistanceVisible) return <View />;
        else break;
      case "repsleft":
        if (!isRepsLeftVisible) return <View />;
        else break;
      case "height":
        if (!isHeightVisible) return <View />;
        else break;
    }

    // rules and conditions
    if (item.key == "time") {
      if (item.required == 0) return <View />;
    }
    if (item.key == "resttime") {
      if (item.required == 0) return <View />;
    }

    if (item.key == "distance") {
      if (item.required == 0) return <View />;
    }

    // console.log ("the item is", item);
    const {
      ItemContainer,
      ItemTitleColumnTitle,
      ItemTitleColumnRequired,
      ItemTitleColumnAchivedText,
      ItemTitleColumnAchivedContainer,
      ItemTitleColumnAchivedInputContainer,
      ItemInputStyle,
      RowFlex
    } = Styles;

    // for focus
    var txt = null;

    return (
      <TouchableOpacity
        style={ItemContainer}
        onPress={() => {
          txt.focus();
        }}
      >
        <View style={RowFlex}>
          <View style={{ flex: 1 }}>
            <View style={RowFlex}>
              <Text style={ItemTitleColumnTitle}>{item.title}</Text>
              <Text style={ItemTitleColumnRequired}>
                {this._convertUnits(item)}
              </Text>
            </View>
            <View style={{ paddingLeft: 10, paddingBottom: 5 }}>
              <Text style={{ color: "#bcbcbc" }}>{item.help_text}</Text>
            </View>
          </View>
          <View style={ItemTitleColumnAchivedContainer}>
            <View style={ItemTitleColumnAchivedInputContainer}>
              <TextInput
                ref={input => {
                  txt = input;
                }}
                style={ItemInputStyle}
                onFocus={() => this._valueEdited("", index, section.id)}
                onChangeText={text => {
                  this._valueEdited(text, index, section.id);
                }}
                returnKeyType={"done"}
                onEndEditing={this._onEditingEnd.bind(this, index, section)}
                value={this._renderAcheivedValue(item)}
                keyboardType="numeric"
                underlineColorAndroid="transparent"
              />
            </View>
            <Text style={ItemTitleColumnAchivedText}>Actual</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // DEPRECATED
  _renderFooter = () => (
    <View
      style={{
        paddingVertical: 20,
        paddingLeft: 10,
        paddingRight: 10
      }}
    >
      <Button>
        <Text>Save</Text>
      </Button>
    </View>
  );

  _keyextractor = (item, index) => index;

  render() {
    const { mainContainer } = Styles;

    return (
      <SectionList
        extraData={this.state}
        scrollEnabled={false}
        removeClippedSubviews={false}
        style={mainContainer}
        sections={this.state.dataSource}
        keyExtractor={this._keyextractor}
        renderItem={this._renderItem}
        renderSectionHeader={this._renderSectionHeader}
        //renderSectionFooter={this._renderFooter}
      />
    );
  }
}

const Styles = {
  mainContainer: {
    //flex: 1,
    padding: 10,
    paddingTop: 0,
    backgroundColor: "white"
  },
  sectionContainer: {
    flexDirection: "row",
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd"
  },
  sectionTitleColumnTitle: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    paddingTop: 5
  },
  sectionRightButtonContainer: {
    width: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1
  },
  autoFillStyle: {
    fontSize: 13,
    color: "#dddddd",
    paddingRight: 4,
    width: 60
  },
  rightButton: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 15,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  rightButtonImage: {
    width: 20,
    height: 20
  },
  ItemContainer: {
    backgroundColor: "white",
    borderColor: "#dddddd",
    // borderTopWidth: 1,
    borderBottomWidth: 1
  },
  RowFlex: {
    flexDirection: "row",
    alignItems: "center"
  },
  ItemTitleColumnTitle: {
    width: 100,
    padding: 10,
    paddingTop: 14,
    paddingBottom: 10,
    fontSize: 16
  },
  ItemTitleColumnRequired: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 16
  },
  ItemTitleColumnAchivedContainer: {
    width: 100,
    backgroundColor: "#eeeeee",
    padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "flex-end"
  },
  ItemTitleColumnAchivedInputContainer: {
    backgroundColor: "white",
    width: "100%",
    borderBottomWidth: 2,
    borderColor: "red",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    height: 40
  },
  ItemTitleColumnAchivedText: {
    color: "#dddddd"
  },
  ItemInputStyle: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
    height: "100%",
    width: "100%",
    textAlign: "right"
  }
};

export default connect(
  null,
  { show_var }
)(exerciseSetScreen);
