import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import Styles from "./styles";
import data from "./data.json";
import { onSetGoal } from "../actions";
import { Button } from "../../../../components/common";

class PowerLyfting extends Component {
  state = {
    selectedItem: 0,
    values: []
  };

  _renderItemSeperator = () => {
    const { itemSeperatorStyle } = Styles;

    return <View style={itemSeperatorStyle} />;
  };

  _isSelected = id => {
    // console.log("is selected ?",id);
    // var tmp = false;
    // for (var _index in this.state.selectedItems){
    // 	var row = this.state.selectedItems[_index];

    // 	if(row.id == id){
    // 		tmp = true;
    // 		break;
    // 	}
    // }

    return this.state.selectedItem == id;
  };

  _selectItem = ({ id }) => {
    console.log("is selected", id);

    this.setState({
      selectedItem: this._isSelected(id) ? 0 : id,
      values: []
    });
  };

  _valueEdited = (text, categoryId, index, title, item_type) => {
    // console.log("editing", categoryId, index);
    // index the text inputs by sub category ID
    var tmp = this.state.values.slice();

    if (tmp[categoryId] == undefined) tmp[categoryId] = {};

    tmp[categoryId][index] = {
      id: index,
      value: text,
      title: title,
      item_type: item_type
    };

    this.setState({
      values: tmp
    });
  };

  _onEditingEnd = () => {};

  _renderCurrentMax = (item, index, item_type) => {
    const {
      detailContainer,
      ItemInputStyle,
      inputContainer,
      labelStyle,
      inputC
    } = Styles;

    return (
      <View style={{ flexDirection: "row", alignItems: "center", flex: 2 }}>
        <Text style={labelStyle}>Current Max</Text>
        <View style={inputC}>
          <TextInput
            returnKeyType="done"
            ref={input => {
              txt = input;
            }}
            underlineColorAndroid="transparent"
            style={ItemInputStyle}
            // onFocus={()=>this._valueEdited("", index, section.id)}
            onChangeText={text => {
              this._valueEdited(
                text,
                item.id,
                item.data[index].id,
                "Current",
                item_type
              );
            }}
            // onEndEditing={this._onEditingEnd.bind(this, index, section) }
            // value={String(item.acheived)}
            keyboardType="numeric"
          />
        </View>
        <Text> {this.props.isMetric ? "kg" : "lb"}</Text>
      </View>
    );
  };

  _renderTargetMax = (item, index, item_type) => {
    const {
      detailContainer,
      ItemInputStyle,
      inputContainer,
      labelStyle,
      inputC
    } = Styles;

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 2,
          paddingTop: 1
        }}
      >
        <Text style={labelStyle}>Target Max</Text>
        <View style={inputC}>
          <TextInput
            returnKeyType="done"
            ref={input => {
              txt = input;
            }}
            style={ItemInputStyle}
            underlineColorAndroid="transparent"
            // onFocus={()=>this._valueEdited("", index, section.id)}
            onChangeText={text => {
              this._valueEdited(
                text,
                item.id,
                item.data[index].id,
                "Target",
                item_type
              );
            }}
            // onEndEditing={ this._onEditingEnd.bind(this, index, section) }
            // value={String(item.acheived)}
            keyboardType="numeric"
          />
        </View>
        <Text> {this.props.isMetric ? "kg" : "lb"}</Text>
      </View>
    );
  };

  _renderDetail = (checked, item) => {
    if (!checked) {
      return <View />;
    }

    const {
      detailContainer,
      ItemInputStyle,
      inputContainer,
      labelStyle,
      inputC
    } = Styles;

    return (
      <View style={detailContainer}>
        <View style={inputContainer}>
          <View style={{ flex: 1 }}>
            <Text style={{ paddingBottom: 10, fontWeight: "bold" }}>Bench</Text>
            <View style={{ flex: 1 }}>
              {this._renderCurrentMax(item, 0, "Bench")}
              {this._renderTargetMax(item, 1, "Bench")}
            </View>
          </View>
        </View>

        <View style={inputContainer}>
          <View style={{ flex: 1 }}>
            <Text style={{ paddingBottom: 10, fontWeight: "bold" }}>
              Squats
            </Text>
            <View style={{ flex: 1 }}>
              {this._renderCurrentMax(item, 2, "Squats")}
              {this._renderTargetMax(item, 3, "Squats")}
            </View>
          </View>
        </View>

        <View style={inputContainer}>
          <View style={{ flex: 1 }}>
            <Text style={{ paddingBottom: 10, fontWeight: "bold" }}>
              Deadlift
            </Text>
            <View style={{ flex: 1 }}>
              {this._renderCurrentMax(item, 4, "Deadlift")}
              {this._renderTargetMax(item, 5, "Deadlift")}
            </View>
          </View>
        </View>
      </View>
    );
  };

  _renderItem = ({ item }) => {
    const {
      ItemContainer,
      ItemTextStyle,
      itemRightButtonContainer,
      rightButton,
      ItemTextContainer
    } = Styles;

    return (
      <View>
        <TouchableOpacity
          style={ItemContainer}
          onPress={this._selectItem.bind(this, item)}
        >
          <View style={ItemTextContainer}>
            <Text style={ItemTextStyle}>{item.text}</Text>
          </View>

          <View style={itemRightButtonContainer}>
            <View style={rightButton}>
              {this._renderCheckRadio(this._isSelected(item.id))}
            </View>
          </View>
        </TouchableOpacity>
        {this._renderDetail(this._isSelected(item.id), item)}
      </View>
    );
  };

  _renderCheckRadio = checked => {
    // console.log("will render", checked);

    const { rightButtonImage } = Styles;

    if (checked) {
      return (
        <Image
          resizeMode="contain"
          style={rightButtonImage}
          source={require("../../../../assets/images/check-red-thin.png")}
        />
      );
    } else {
      return <View />;
    }
  };

  _onPressSetGoal = () => {
    // workaround
    var count = 0;
    let cp = [...this.state.values];
    for (var i in cp) if (cp[i] != undefined) for (var u in cp[i]) ++count;

    //condition
    if (this.state.selectedItem < 1 || count < 6) {
      return Alert.alert(
        "",
        "Please fill your info first to be able to proceed",
        [{ text: "Ok" }],
        { cancelable: true }
      );
    }

    var fields = [];
    //parse the fields and insert them into the
    // for (var _filled_index in this.state.selectedItems) {

    // var f = this.state.selectedItem[_filled_index];
    // let id = f.id;
    // let title = f.title;
    // fields.push({id:id, title:title, value: 0});

    for (var index in this.state.values) {
      var row = this.state.values[index];
      // skip
      // if(index != id) continue;

      for (var _index in row) {
        var _row = row[_index];

        var val = _row.value;

        // send the values as metric
        if (!this.props.isMetric) val = (_row.value * 2.2).toFixed(0);

        fields.push({
          id: _row.id,
          title: "   " + _row.title,
          value: val,
          value_unit: this.props.isMetric ? "kg" : "lb",
          value_type: "weight",
          item_type: _row.item_type
        });
      }
    }
    // };

    let category_id = this.state.selectedItem; // powerlifting
    this.props.onSetGoal(category_id, {
      fields: fields
    });
  };

  _renderFooterComponent = () => {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 6,
          borderColor: "#eeeeee",
          paddingLeft: 10,
          paddingRight: 10
        }}
      >
        <Button onPress={this._onPressSetGoal.bind(this)}>
          <Text>SET GOAL</Text>
        </Button>
      </View>
    );
  };

  render() {
    const { mainContainer, descriptionStyle } = Styles;

    return (
      <View style={mainContainer}>
        {this.props.isSubmitting ? (
          <Modal transparent animationType="fade">
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.8)",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white", paddingBottom: 10 }}>
                Submitting your goal
              </Text>
              <ActivityIndicator />
            </View>
          </Modal>
        ) : null}
        <View style={{ paddingLeft: 10, paddingTop: 25, borderWidth: 0 }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
              source={require("../../../../assets/images/back.png")}
            />
          </TouchableOpacity>
        </View>
        <Text style={descriptionStyle}>Powerlifting</Text>
        <ScrollView state={{ flex: 1 }}>
          <KeyboardAvoidingView behavior="padding">
            <FlatList
              style={{ borderWidth: 0 }}
              ItemSeparatorComponent={this._renderItemSeperator}
              data={this.props.dataSource}
              renderItem={this._renderItem}
              ListFooterComponent={this._renderFooterComponent}
              // keyExtractor={this._keyExtractor}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ user, setGoal }) => {
  return {
    dataSource: data,
    isSubmitting: setGoal.isSubmitting,
    isMetric: user.user.units == "metric" ? true : false
  };
};

export default connect(
  mapStateToProps,
  {
    onSetGoal
  }
)(PowerLyfting);
