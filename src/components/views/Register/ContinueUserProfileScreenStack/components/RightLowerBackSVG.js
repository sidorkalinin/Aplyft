import React, { PureComponent } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors } from "../../../../styles/theme";
import Svg, { Circle, Rect, Path, Line, G } from "react-native-svg";
class RightLowerBackSVG extends PureComponent {
  state = {
    selected: []
  };

  _onItemSelect = key => {
    if (this._ifKeyExists(key)) this._removeKey(key);
    else this._addKey(key);

    if (this.props.onSelect) {
      if (this._ifKeyExists(key)) {
        var array = this._removeKey2(key);

        this.props.onSelect(array, this.props.name);
      } else {
        this.props.onSelect([...this.props.dataArray, key], this.props.name);
      }
    }
  };

  _ifKeyExists = key => {
    if (this.props.dataArray.indexOf(key) > -1) return true;
    return false;
  };
  _addKey = key => {
    this.setState({ selected: [...this.props.dataArray, key] });
  };
  _removeKey = key => {
    var index = this.props.dataArray.indexOf(key);
    var tmp = this.props.dataArray.slice();
    tmp.splice(index, 1);

    this.setState({ selected: tmp });
  };
  _removeKey2 = key => {
    var index = this.props.dataArray.indexOf(key);
    var tmp = this.props.dataArray.slice();
    tmp.splice(index, 1);

    return tmp;
  };
  _ifPressed = key => {
    if (this._ifKeyExists(key)) return "#eb1d3a";
    else return "#969696";
  };

  render() {
    //const { mainContainer, labelStyle, valueStyle } = styles;

    return (
      <Svg
        height="510"
        width="100%"
        style={{
          marginLeft: 30,
          marginTop: 20,
          marginBottom: 20
        }}
      >
        <G scale={"0.7"}>
          <Path
            onPress={this._onItemSelect.bind(this, "1RLB")}
            fill={this._ifPressed("1RLB")}
            d="M183.6,138.5c-0.6,10.2-0.9,20.5-1,30.6c-14.7-34.2-23.2-72.6-13.3-109.1c2.9-10.7,7.2-22.3,13.7-31.9
          	C185.5,64.9,185.7,101.8,183.6,138.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "2RLB")}
            fill={this._ifPressed("2RLB")}
            d="M186.7,272c-9.8-3.2-18.7-8.7-26.1-15.9c-12.6-12.7-18.6-30.1-23.7-47c-4-13.2-7.3-26.6-10.3-40.1
          	c-0.3-1.5-0.6-3.1-0.8-4.6c0-0.3-0.2-0.6-0.4-0.8c-6.5-31.1-10.8-62.7-14.7-94.1l0.7,0.1c17,2.2,34.1,3,51.2,2.5
          	c-5.4,36.7,4.4,73.5,19.9,106.9C182.8,215.2,185.7,249,186.7,272z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "3RLB")}
            fill={this._ifPressed("3RLB")}
            d="M138.4,237.7c-0.8-6.6-1.8-13.2-2.9-19.8l0.1,0.3c5.9,17.4,13,33.7,27.7,45.6c1.9,1.5,3.9,3,6,4.3
          	c-5-0.5-9.8,0.2-13.7,2.8c-3.1,2.1-5.1,5.5-5.5,9.3c-2.9-3.4-6.9-5.2-11.8-2.6c-1.2,0.6-2.3,1.4-3.4,2.3
          	C138.8,266.1,140,251.9,138.4,237.7L138.4,237.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "4RLB")}
            fill={this._ifPressed("4RLB")}
            d="M226.6,429.3c-15.6-3-33.1-9.6-40.6-23.4c-0.1-0.1-0.2-0.2-0.3-0.3c2.3-22-4.8-47.4-12.3-67.8
          	c-3.8-10.3-8-20.4-12.1-30.5c-2.2-5.6-5.2-11.7-6.4-17.8c0-0.3,0-0.6-0.1-0.9l-0.1-0.2c-0.2-1.2-0.3-2.4-0.4-3.7
          	c-0.2-18.2,19.6-12.6,32.4-6.8c0,0.5,0,1.1,0,1.6c0.7,30.4,21.6,43.2,31,78.2C221.6,371.3,224.5,398.8,226.6,429.3L226.6,429.3z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "5RLB")}
            fill={this._ifPressed("5RLB")}
            d="M203.1,594.4c0.3-24-4.8-50.8-17.6-72c-6.1-17.8-18.9-47.3-30.5-74.3c18-7.5,26.8-20.8,29.9-36.5
          	c9.2,12.8,26.5,19,42.1,21.9c0.1,2.1,0.3,4.2,0.4,6.3c-4.9,3.3-7.6,12.9-8.6,16.8c-3.8,14.2-4.7,29.1-5.1,43.7
          	c-0.9,30.2,1,60.5,3.6,90.6c0.2,2.6,4.3,2.6,4,0c-2.4-28.6-4.4-57.5-3.7-86.2c0.3-14.7,0.9-29.8,4.4-44.1c0.8-3.1,3-11,5.8-15.2
          	c2.7,44,4.1,90.5,4.4,110c0.7,35.7,10.1,80.9-10.8,87s-39.7-22.3-45.8-46.6c-6-24.1,10.6-48.9,13.4-57.8
          	c7.5,17.9,10.4,38.1,10.2,56.5C199,597,203.1,597,203.1,594.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "6RLB")}
            fill={this._ifPressed("6RLB")}
            d="M122.7,309.9c3.6-6.6,6.8-13.4,9.3-20.5c1.6-2.5,3.5-4.7,5.8-6.6c6.2-4.9,10.2-0.3,12.7,5.5
          	c1.6,9.6,7,20.2,9.5,26.1c15.5,37.9,45.5,108.8-6.5,130c-5.4-12.6-10.5-24.5-14.4-34.1c-13.4-33.3-8.4-80.4-12-90.5
          	C125.7,316.4,124.3,313.1,122.7,309.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "7RLB")}
            fill={this._ifPressed("7RLB")}
            d="M54.8,97.9c24.7,40.6,39.7,86.7,47.9,133.4c3.1,17.1,5.3,34.3,6.6,51.6c-2.4-5.4-4.7-11-6.6-16.7
          	c-7.6-22.8-13.2-55.2-15.7-66.3s-26.3-56.1-30.8-91C55.8,105.3,55.3,101.6,54.8,97.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "8RLB")}
            fill={this._ifPressed("8RLB")}
            d="M46.5,48.2C63.2,61.1,86,66.1,106.7,68.9c4.5,35.8,9.1,72.5,17.3,108c3.7,19.9,7.8,39.9,10.2,60
          	c1.9,17.1-0.1,34.5-6,50.7L128,288c-0.2,0.3-0.3,0.7-0.3,1.1c-2.1,5.6-4.5,11.1-7.3,16.3c-2-3.9-4.2-8.2-6.5-12.9
          	c-0.7-21.7-3.8-43.6-7.7-64.9c-9.2-49-25.3-97.3-52.7-139.3C51.5,73.4,49.2,58.8,46.5,48.2z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "9RLB")}
            fill={this._ifPressed("9RLB")}
            d="M164.9,60.7c-0.6,2.4-1.1,4.8-1.5,7.3c-15.1,0.5-30.2-0.1-45.2-1.7C93.2,63.6,63.3,59,44.3,41
          	c-1.6-4.3-3.3-7.3-5.2-8.7c0-4.8,0-9.6,0-14.3c0-6,0-12,0-17.9h131.5c3.5,7.8,7,15.6,10.7,23.3C173.2,34.2,167.9,48.1,164.9,60.7z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "10RLB")}
            fill={this._ifPressed("10RLB")}
            d="M175,0h5.1c0.6,4.8,1.1,9.7,1.6,14.7C179.5,9.8,177.2,4.9,175,0z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "11RLB")}
            fill={this._ifPressed("11RLB")}
            d="M135.5,217.9l0.1,0.3c5.9,17.4,13,33.7,27.7,45.6c1.9,1.5,3.9,3,6,4.3c-5-0.5-9.8,0.2-13.7,2.8
          	c-3.1,2.1-5.1,5.5-5.5,9.3c-2.9-3.4-6.9-5.2-11.8-2.6c-1.2,0.6-2.3,1.4-3.4,2.3c3.9-13.7,5-28,3.4-42.1
          	C137.6,231.1,136.6,224.5,135.5,217.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "12RLB")}
            fill={this._ifPressed("12RLB")}
            d="M124,177c3.7,19.9,7.8,39.9,10.2,60c1.9,17.1-0.1,34.5-6,50.7l-0.3,0.4c-0.2,0.3-0.3,0.7-0.3,1.1
          	c-2.1,5.6-4.5,11.1-7.3,16.3c-2-3.9-4.2-8.2-6.5-12.9c-0.7-21.7-3.8-43.6-7.7-64.9C97,178.6,80.9,130.4,53.6,88.3
          	c-2-14.9-4.3-29.4-7.1-40.1C63.2,61.1,86,66.1,106.7,68.9C111.2,104.8,115.8,141.4,124,177z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "13RLB")}
            fill={this._ifPressed("13RLB")}
            d="M29.7,41.3C21.4,49.6,11.2,55.8,0,60.1V0h35.1c0,10.7,0,21.4,0,32.1C33.1,33.4,31.3,36.7,29.7,41.3z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "14RLB")}
            fill={this._ifPressed("14RLB")}
            d="M186,405.9c-0.1-0.1-0.2-0.2-0.3-0.3c2.3-22-4.8-47.4-12.3-67.8c-3.8-10.3-8-20.4-12.1-30.5
          	c-2.2-5.6-5.2-11.7-6.4-17.8c0-0.3,0-0.6-0.1-0.9l-0.1-0.2c-0.2-1.2-0.3-2.4-0.4-3.7c-0.2-18.2,19.6-12.6,32.4-6.8
          	c0,0.5,0,1.1,0,1.6c0.7,30.4,21.6,43.2,31,78.2c3.7,13.6,6.5,41.1,8.7,71.6C211,426.4,193.6,419.7,186,405.9z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "15RLB")}
            fill={this._ifPressed("15RLB")}
            d="M27.5,48.8C24.2,62,22,80.4,20.9,96.2c-7.8,13.9-14.8,28.2-20.9,43V64.4C10,60.9,19.3,55.6,27.5,48.8z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "16RLB")}
            fill={this._ifPressed("16RLB")}
            d="M136.9,209.1c-4-13.2-7.3-26.6-10.3-40.1c-0.3-1.5-0.6-3.1-0.8-4.6c0-0.3-0.2-0.6-0.4-0.8
          	c-6.5-31.1-10.8-62.7-14.7-94.1l0.7,0.1c17,2.2,34.1,3,51.2,2.5c-5.4,36.7,4.4,73.5,19.9,106.9c0.3,36.2,3.2,70,4.1,93.1
          	c-9.8-3.2-18.7-8.7-26.1-15.9C148,243.4,142,226,136.9,209.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "17RLB")}
            fill={this._ifPressed("17RLB")}
            d="M182.6,169.1c-14.7-34.2-23.2-72.6-13.3-109.1c2.9-10.7,7.2-22.3,13.7-31.9c2.6,36.7,2.8,73.6,0.7,110.4
          	C182.9,148.7,182.6,159,182.6,169.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "18RLB")}
            fill={this._ifPressed("18RLB")}
            d="M137.7,282.8c6.2-4.9,10.2-0.3,12.7,5.5c1.6,9.6,7,20.2,9.5,26.1c15.5,37.9,45.5,108.8-6.5,130
          	c-5.4-12.6-10.5-24.5-14.4-34.1c-13.4-33.3-8.4-80.4-12-90.5c-1.3-3.4-2.8-6.7-4.4-9.9c3.6-6.6,6.8-13.4,9.3-20.5
          	C133.5,286.9,135.4,284.7,137.7,282.8z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "19RLB")}
            fill={this._ifPressed("19RLB")}
            d="M109.4,282.9c-2.4-5.4-4.7-11-6.6-16.7c-7.6-22.8-13.1-55.2-15.7-66.3s-26.3-56.1-30.8-91
          	c-0.5-3.6-0.9-7.3-1.4-11c24.7,40.6,39.7,86.7,47.9,133.4C105.9,248.4,108.1,265.6,109.4,282.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "20RLB")}
            fill={this._ifPressed("20RLB")}
            d="M155,448.1c18-7.5,26.8-20.8,29.9-36.5c9.2,12.8,26.5,19,42.1,21.9c0.1,2.1,0.3,4.2,0.4,6.3
          	c-4.9,3.3-7.6,12.9-8.6,16.8c-3.8,14.2-4.7,29.1-5.1,43.7c-0.9,30.2,1,60.5,3.6,90.6c0.2,2.6,4.3,2.6,4,0
          	c-2.4-28.6-4.4-57.5-3.7-86.2c0.3-14.7,0.9-29.8,4.4-44.1c0.8-3.1,3-11,5.8-15.2c2.7,44,4.1,90.5,4.4,110
          	c0.7,35.7,10.1,80.9-10.8,87s-39.8-22.3-45.9-46.6c-6-24.1,10.6-48.9,13.4-57.8c7.5,17.9,10.4,38.1,10.2,56.5c0,2.6,4,2.6,4,0
          	c0.3-24-4.8-50.8-17.6-72C179.4,504.6,166.6,475,155,448.1z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "21RLB")}
            fill={this._ifPressed("21RLB")}
            d="M20.4,106.8C19.6,127.7,8.3,162,0,187.7v-37.8c6-15.1,12.8-29.9,20.4-44.3C20.4,106,20.4,106.4,20.4,106.8z"
          />
        </G>
      </Svg>
    );
  }
}

const styles = {};

export default RightLowerBackSVG;

///--------------------------------------------------------
