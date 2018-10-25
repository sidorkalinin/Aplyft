import React, { Component } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Styles from "./styles";
import data from "./data.json";
import { onSetGoal } from "../actions";
import { Button } from "../../../../components/common";

class CrossLyft extends Component {
  state = {
    categoryId: 3,
    selectedItems: []
  };

  _renderItemSeperator = () => {
    const { itemSeperatorStyle } = Styles;

    return <View style={itemSeperatorStyle} />;
  };

  _isSelected = id => {
    // console.log("is selected ?",id, this.state.selectedItems.indexOf(id) > -1 );
    var tmp = false;
    for (var _index in this.state.selectedItems) {
      var row = this.state.selectedItems[_index];

      if (row.id == id) {
        tmp = true;
        break;
      }
    }
    return tmp;
  };

  _selectItem = ({ id, text }) => {
    var selectedItems = this.state.selectedItems.slice(); // copying array

    var index = -1;
    for (var _index in selectedItems) {
      var row = selectedItems[_index];

      if (row.id == id) {
        index = id;
        break;
      }
    }

    if (index > -1) {
      for (var _index in selectedItems) {
        var row = selectedItems[_index];
        if (row.id == id) selectedItems.splice(_index, 1);
      }
    } else {
      selectedItems.push({
        id: id,
        title: text,
        value: 0,
        value_unit: this.props.isMetric ? "kg" : "lb"
      });
    }

    this.setState({
      selectedItems: selectedItems
    });
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

  _onSetGoal = () => {
    var fields = this.state.selectedItems.map(value => value);
    this.props.onSetGoal(this.state.categoryId, { fields: fields });
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
        <Button onPress={this._onSetGoal.bind(this)}>
          <Text>SET GOAL</Text>
        </Button>
      </View>
    );
  };

  render() {
    const { mainContainer, descriptionStyle } = Styles;

    return (
      <View style={mainContainer}>
        <Text style={descriptionStyle}>CrossLyft</Text>

        <FlatList
          style={{ borderWidth: 0 }}
          ItemSeparatorComponent={this._renderItemSeperator}
          data={this.props.dataSource}
          renderItem={this._renderItem}
          ListFooterComponent={this._renderFooterComponent}
          // keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    dataSource: data
  };
};

export default connect(mapStateToProps, {
  onSetGoal
})(CrossLyft);
