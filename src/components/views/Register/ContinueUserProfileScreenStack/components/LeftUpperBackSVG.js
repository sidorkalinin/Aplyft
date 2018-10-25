import React, { PureComponent } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors } from "../../../../styles/theme";
import Svg, { Circle, Rect, Path, Line, G } from "react-native-svg";
class LeftUpperBackSVG extends PureComponent {
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
          //borderWidth: 2,
          //marginLeft: 0,
          //marginRight: 30,
          marginTop: 20,
          marginBottom: 20
        }}
      >
        <G x="0" scale={"0.7"}>
          <Path
            //onPress={this._onItemSelect.bind(this, "1LUB")}
            fill="white"
            d="M57.6,629c-1.4,0.2-3.1,7.5-4.9,16.7h8.8C60.3,636.6,59.1,628.8,57.6,629z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "2LUB")}
            fill="white"
            d="M41.7,625.5c-1.3-0.7-4.2,9-7.6,20.1h8C42.7,635.1,43,626.2,41.7,625.5z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "3LUB")}
            fill="white"
            d="M28.5,619.1c-1.2-1-7.7,13.8-14,26.5h10.2C27.3,632.5,29.6,620,28.5,619.1z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "4LUB")}
            fill={this._ifPressed("4LUB")}
            d="M412.1,0.1h-5.5c3.7,5.4,7.1,11.1,10.4,16.8c0.9,1.5,1.7,3,2.5,4.5v-8.9c-0.7-1.3-1.5-2.5-2.2-3.8
          	C415.8,6.2,414.1,3.2,412.1,0.1z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "5LUB")}
            fill={this._ifPressed("5LUB")}
            d="M402.5,94.4c-7.6,3.7-14.5,9.3-18.7,16.4c0-9.7,0-19.4,0-29.2C387.9,87.8,394.5,91.9,402.5,94.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "6LUB")}
            fill={this._ifPressed("6LUB")}
            d="M240.2,578.9c-4.7,11.1-9.6,22.1-14.7,33c2.1-22.4,5.3-43,9.8-59.5c6.8-25.2,14.1-49.1,19.4-73.8
          	c5.6-2.1,11.2-3.8,17-5.2C270.8,509.4,254,546.4,240.2,578.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "7LUB")}
            fill={this._ifPressed("7LUB")}
            d="M244.4,217.6c15,8.2,35.7,6.6,51.9,5.6c13.5-0.9,26.9-2.6,40.1-5.2c11.6,14,22.9,28.3,34.2,42.5
          	c-19.5,30.1-49.7,61.9-88.8,49.6c-12.9-4-25.3-12.8-34.4-23.1c-2.9-15.1-5.8-26.8-8.2-31.8C241.8,242.9,243.9,230.1,244.4,217.6
          	L244.4,217.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "8LUB")}
            fill={this._ifPressed("8LUB")}
            d="M242.9,193.6c19-8.4,37.4-20.5,46.3-38.8c0.7,2.4,1.4,4.8,2.3,7.2c3.9,10.4,11.4,18.7,19,26.6
          	c7.8,8.2,15.3,16.8,22.7,25.5c-11.4,2.1-22.9,3.6-34.4,4.5c-16.8,1.4-39.2,3.4-54.2-6.1C244.5,206.2,244,199.8,242.9,193.6
          	L242.9,193.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "9LUB")}
            fill={this._ifPressed("9LUB")}
            d="M347.4,295.6c-18,31.1-31,65.9-41.2,99.4c-1.3-1.4-2.7-2.8-4.1-4.2c-14.1-14.4-29.1-27.8-45.1-40
          	c-2.3-19.5-5.2-39.4-8.1-56c9.9,9.6,21.9,16.6,35.1,20.5C308.5,322.2,330,311.7,347.4,295.6L347.4,295.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "10LUB")}
            fill={this._ifPressed("10LUB")}
            d="M304.1,464.7c-16.5,0.1-32.9,3-48.5,8.7c4.3-21.6,6.9-43.9,5.9-68.2c-0.6-14-2-30.9-4-48.4
          	c13.2,10.4,25.8,21.6,37.7,33.4c3.2,3.2,6.5,6.5,9.8,9.9l0.8,0.9c20.7,21.7,40.8,47.9,45.6,77.4
          	C338.3,469.6,322.4,464.8,304.1,464.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "11LUB")}
            fill={this._ifPressed("11LUB")}
            d="M380.1,511.3c-5.6-11.4-13.7-21.4-23.6-29.4l0,0c-3.9-32.2-25-59.9-46.9-83.3c14.1-46.5,33.4-96.2,64.2-134.2
          	c1.9,2.4,3.9,4.8,5.8,7.2C379.8,351.6,380,431.4,380.1,511.3L380.1,511.3z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "12LUB")}
            fill={this._ifPressed("12LUB")}
            d="M379.4,80c0,9.9,0,19.8,0,29.7c-4.7-7.3-12.7-12.5-21-15.8C367,91.2,374.6,86.9,379.4,80L379.4,80z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "13LUB")}
            fill={this._ifPressed("13LUB")}
            d="M284.8,95.5c14.1,2,28.3,2.8,42.6,2.5c7.7-0.1,15.5-0.8,23.1-2.2c12.7,3.4,28.1,12,28.8,26.5
          	c0,0.3,0.1,0.6,0.2,0.9c0.1,41,0.1,82.1,0.2,123.1c0,6.1,0,12.2,0,18.3l-3.6-4.4l-1.4-1.8l-19.2-23.5
          	c-12.5-15.3-24.7-31.1-38.1-45.7c-7.7-8.4-15.6-16.1-20.7-26.5c-2.1-4.7-3.7-9.6-4.8-14.6l-0.5-2c-1.5-6.2-3-12.3-6.5-18
          	c-6.4-10.5-16.4-19.6-27-26.9C266.9,99.9,275.9,97.9,284.8,95.5L284.8,95.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "14LUB")}
            fill={this._ifPressed("14LUB")}
            d="M167.6,177.4c0.7-38.8,34.4-65.1,62.9-70.9c8.3-1.7,14.9-2.9,20.9-3.9c9.5,6.2,18.2,13.7,25.6,22.3
          	c6,7.1,8.3,14.9,10.4,23c-7.3,20.5-26.9,33.3-47.1,42.1c-0.4,0.1-0.8,0.2-1.1,0.5c-3.7,1.6-7.5,3-11.2,4.4c-0.1,0-0.1,0-0.2,0.1
          	c-4,1.4-7.9,2.8-11.6,4c-16.5,5.3-33.4,9.2-50.6,11.7C166.7,199.8,167.4,188.9,167.6,177.4L167.6,177.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "15LUB")}
            fill={this._ifPressed("15LUB")}
            d="M165,215.1c19.2-2.7,38.1-7.2,56.4-13.4l3.8-1.3c-4.3,12-11.8,22.7-21.1,32.2l-2,2c-14,13.6-31.8,24.4-49,32.4
          	C158.9,250.2,162.8,232.8,165,215.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "16LUB")}
            fill={this._ifPressed("16LUB")}
            d="M186.2,362.1c-0.7,6.6-4.4,32.2-18.3,55.6c-13.9,23.4-30.7,35.1-54.9,75.4c-21.2,35.4-29.3,49.9-30.6,62.8
          	c-13.5-1.5-26-9.1-35.5-19.1c0.3-0.6,0.5-1.2,0.8-1.9c4.4-12.1,30.9-103.3,52.1-153.8c9.6-22.9,16.6-36.6,22.7-48.3
          	c3,5.9,6.9,11.4,11.4,16.2c14.2,15.3,33.7,17,52.3,12.6C186.3,361.8,186.2,362,186.2,362.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "17LUB")}
            fill={this._ifPressed("17LUB")}
            d="M208.2,307.2c-9,20.9-17.5,39.9-20.7,49.7c-19.6,5.2-39.3,2.7-53.6-14.6c-3.5-4.3-6.5-9.1-8.7-14.2
          	c6.4-11.9,12.3-22.6,20.1-40.7c2.1-5,4.1-9.9,5.9-14.8c17.4-7.8,35.5-18.3,50.4-31.6c-1.4,19,1.9,39.4,10.7,56.6
          	C210.8,300.9,209.5,304.1,208.2,307.2L208.2,307.2z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "18LUB")}
            fill={this._ifPressed("18LUB")}
            d="M206.4,236.6c11.1-10.9,19.8-23.6,24.2-38c2.7-1,5.5-2.1,8.2-3.2c1,5.7,1.4,11.4,1.4,17.2v2
          	c-0.2,12.8-2.3,25.8-5,38.3c-5.7,3.3-12.9,20.5-20.7,39.4C206.6,275,204.2,255.1,206.4,236.6L206.4,236.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "19LUB")}
            fill={this._ifPressed("19LUB")}
            d="M235.1,252.9c2.7-12.5,4.8-25.5,5-38.3v-2c0-5.8-0.5-11.5-1.4-17.2c-2.8,1.1-5.5,2.2-8.2,3.2
          	c-4.4,14.4-13.1,27.1-24.2,38c-2.1,18.4,0.3,38.4,8.1,55.6C222.3,273.4,229.4,256.2,235.1,252.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "20LUB")}
            fill={this._ifPressed("20LUB")}
            d="M298.7,218.6c11.5-0.9,23-2.4,34.4-4.5c-7.3-8.7-14.8-17.3-22.7-25.5c-7.6-7.9-15.1-16.1-19-26.6
          	c-0.9-2.4-1.6-4.8-2.3-7.2c-9,18.3-27.3,30.4-46.3,38.8c1.1,6.2,1.7,12.6,1.7,18.9C259.5,222,281.9,220,298.7,218.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "21LUB")}
            fill={this._ifPressed("21LUB")}
            d="M247.3,286.8c9.1,10.3,21.5,19.1,34.4,23.1c39.1,12.3,69.3-19.5,88.8-49.6c-11.4-14.2-22.6-28.5-34.2-42.5
          	c-13.2,2.6-26.6,4.4-40.1,5.2c-16.1,1.1-36.9,2.6-51.9-5.6c-0.5,12.5-2.6,25.3-5.2,37.4C241.6,260.1,244.5,271.7,247.3,286.8z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "22LUB")}
            fill={this._ifPressed("22LUB")}
            d="M305.1,400.2c-3.3-3.4-6.6-6.7-9.8-9.9c-11.9-11.8-24.5-23-37.7-33.4c2,17.5,3.4,34.5,4,48.4
          	c1,24.3-1.6,46.6-5.9,68.2c15.5-5.7,31.9-8.6,48.5-8.7c18.2,0.1,34.2,4.9,47.4,13.7c-4.8-29.5-24.9-55.7-45.6-77.4L305.1,400.2z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "23LUB")}
            fill={this._ifPressed("23LUB")}
            d="M248.8,294.7c3,16.7,5.8,36.5,8.1,56c16,12.2,31.1,25.6,45.1,40c1.3,1.4,2.7,2.8,4.1,4.2
          	c10.2-33.5,23.3-68.3,41.2-99.4c-17.4,16.1-38.9,26.6-63.4,19.6C270.8,311.3,258.7,304.3,248.8,294.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "24LUB")}
            fill={this._ifPressed("24LUB")}
            d="M380.3,630.9c0-5.2,0-10.4,0-15.6c-0.1-30.5-0.1-61-0.1-91.5c0-0.1,0-0.1,0-0.2v-0.1c0-0.6,0-1.2,0-1.8
          	c-14.2-36-44.9-55.4-83.6-52.4c-6.9,0.5-13.7,1.5-20.5,2.9c-0.5,36.2-17.1,73.2-30.8,105.9c-6.1,14.5-12.5,28.8-19.3,43
          	c5.5,7.5,9.8,15.7,13,24.4h129.4c2.2-1.6,4.3-3.4,6.3-5.3C376.4,635.7,378.2,632.4,380.3,630.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "25LUB")}
            fill={this._ifPressed("25LUB")}
            d="M409.2,91.8L409.2,91.8z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "26LUB")}
            fill={this._ifPressed("26LUB")}
            d="M406.6,0.1h-23c0,1.4,0,2.8,0,4.2c0,21.3,0.1,42.6,0.1,63.9c1.2,13.8,11.7,20.7,25.4,23.6l0,0
          	c1.1,0.1,2.2,0.3,3.2,0.6c2.3,0.4,4.7,0.7,7.1,0.9V21.3c-0.8-1.5-1.6-3-2.5-4.5C413.8,11.2,410.4,5.5,406.6,0.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "27LUB")}
            fill={this._ifPressed("27LUB")}
            d="M409.2,91.7"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "29LUB")}
            fill={this._ifPressed("29LUB")}
            d="M409.2,91.7L409.2,91.7z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "30LUB")}
            fill={this._ifPressed("30LUB")}
            d="M383.8,125.3c0.1,47.1,0.2,94.3,0.2,141.5l2.1-2.3l3.3-3.7c0.6-0.8,1.3-1.5,2-2.2c-0.3,0.1,0.1-0.1,0.1-0.1
          	c2.6-2.9,5.3-5.8,7.9-8.7c6.7-7.4,13.3-14.9,20-22.4V97.5c-3.3-0.3-6.6-0.7-9.9-1.3C396.8,100.7,384.4,111,383.8,125.3z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "31LUB")}
            fill={this._ifPressed("31LUB")}
            d="M391.5,258.6C391.5,258.6,391.6,258.5,391.5,258.6C391.6,258.5,391.3,258.6,391.5,258.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "32LUB")}
            fill={this._ifPressed("32LUB")}
            d="M235.2,552.3c-4.4,16.5-7.6,37.2-9.8,59.5c5.1-10.9,10-21.9,14.7-33c13.8-32.5,30.6-69.5,31.4-105.6
          	c-5.8,1.4-11.4,3.1-17,5.2C249.4,503.2,242,527.1,235.2,552.3z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "33LUB")}
            fill={this._ifPressed("33LUB")}
            d="M201.5,241.1c-14.9,13.3-33,23.8-50.4,31.6c-1.8,4.9-3.7,9.8-5.9,14.8c-7.8,18-13.7,28.7-20.1,40.7
          	c2.3,5.1,5.2,9.9,8.8,14.2c14.3,17.3,34,19.8,53.6,14.6c3.2-9.8,11.7-28.8,20.6-49.7c1.3-3.1,2.7-6.3,4-9.5
          	C203.4,280.5,200.1,260.1,201.5,241.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "34LUB")}
            fill={this._ifPressed("34LUB")}
            d="M379.4,109.7c0-9.9,0-19.8,0-29.7c-4.7,6.9-12.4,11.2-21,13.9C366.7,97.2,374.7,102.4,379.4,109.7z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "35LUB")}
            fill={this._ifPressed("35LUB")}
            d="M384.7,522.1c0,0.2,0,0.4-0.1,0.6c0,0.3-0.1,0.6-0.1,0.9c0.1,35.7,0.1,71.4,0.2,107.1c2.1,1.4,4.1,4.9,5.8,10
          	c1.7,1.7,3.5,3.4,5.4,4.9h23.6V477.5C401.4,485.9,387.7,499.8,384.7,522.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "36LUB")}
            fill={this._ifPressed("36LUB")}
            d="M204.2,232.6c9.4-9.4,16.8-20.2,21.1-32.2l-3.8,1.3c-18.4,6.2-37.3,10.6-56.4,13.4
          	c-2.2,17.7-6.2,35.1-11.9,51.9c17.2-8.1,35-18.9,49-32.4L204.2,232.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "37LUB")}
            fill={this._ifPressed("37LUB")}
            d="M337.8,15.1c-1.7,2.5-3.4,4.9-5.1,7.4c0.2,2.6,0.3,5.5,0.4,8.8c0.5,20.6-8.6,51.3-37.9,61.1
          	c8.6,0.9,17.2,1.3,25.8,1.4c7.8,0,18.1-0.1,27.8-1.9l1.9-0.4h0.1c13.4-2.8,25.4-8.9,28.4-22.3c0-0.1,0.1-0.1,0.1-0.2
          	c0-0.3,0-0.5,0-0.8c0-0.6,0-2.1,0-2.8c-0.1,0.2,0-0.3,0,0c0-21.8-0.1-43.6-0.1-65.4h-30.7C344.4,5.6,340.7,11,337.8,15.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "38LUB")}
            fill={this._ifPressed("38LUB")}
            d="M379.4,65.5C379.4,65.2,379.3,65.7,379.4,65.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "39LUB")}
            fill={this._ifPressed("39LUB")}
            d="M309.6,398.7c21.9,23.3,43,51.1,46.9,83.3l0,0c9.9,7.9,18,18,23.6,29.4c-0.1-79.9-0.3-159.7-0.4-239.6
          	c-2-2.4-3.9-4.8-5.8-7.2C343,302.5,323.7,352.2,309.6,398.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "40LUB")}
            fill={this._ifPressed("40LUB")}
            d="M284.8,128.4c3.5,5.7,5,11.8,6.5,18l0.5,2c1.1,5,2.7,9.9,4.8,14.6c5.1,10.4,13,18.1,20.7,26.5
          	c13.4,14.6,25.5,30.4,38.1,45.7l19.2,23.5l1.4,1.8l3.6,4.4c0-6.1,0-12.2,0-18.3c-0.1-41-0.1-82.1-0.2-123.1
          	c-0.1-0.3-0.2-0.6-0.2-0.9c-0.6-14.5-16.1-23.1-28.8-26.5c-7.6,1.4-15.4,2.1-23.1,2.2c-14.2,0.3-28.5-0.6-42.6-2.6
          	c-8.9,2.4-17.9,4.4-27,5.9C268.5,108.8,278.4,117.8,284.8,128.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "41LUB")}
            fill={this._ifPressed("41LUB")}
            d="M223.1,645.7h11c-2.5-6.7-5.8-13.2-9.8-19.2C223.8,632.8,223.4,639.2,223.1,645.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "42LUB")}
            fill={this._ifPressed("42LUB")}
            d="M325.6,4.6c3,0.4,5.1,3,6.4,11.2c2.9-4.2,5.9-8.3,9-12.4l2.6-3.4h-21.2C323.5,2.8,324.7,4.5,325.6,4.6z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "43LUB")}
            fill={this._ifPressed("43LUB")}
            d="M412.1,0.1c2,3.2,3.7,6.1,5.2,8.6c0.8,1.2,1.5,2.5,2.2,3.8V0.1H412.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "44LUB")}
            fill={this._ifPressed("44LUB")}
            d="M134,349.1c-4.5-4.9-8.3-10.3-11.4-16.2c-6.2,11.6-13.1,25.3-22.7,48.2c-21.2,50.5-47.8,141.7-52.1,153.8
          	c-0.2,0.7-0.5,1.3-0.8,1.9c9.5,10.1,22,17.6,35.5,19.1c1.3-12.9,9.3-27.4,30.6-62.8c24.1-40.2,41-52,54.9-75.4s17.6-49,18.3-55.6
          	c0-0.1,0-0.3,0.1-0.4C167.6,366.1,148.2,364.4,134,349.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "45LUB")}
            fill={this._ifPressed("45LUB")}
            d="M82.3,561.1c0-0.3,0-0.6,0-0.9c-14.2-1.5-27.3-9-37.4-19.3c-4.6,7.2-11.5,10.7-21.5,22.8
          	C10.9,578.6,0,611.4,0,613.4c0,9.8,17.5-18.9,21.1-18.2c2.6,0.5-8.9,30.6-15.1,50.4h8.5c6.3-12.7,12.8-27.5,14-26.5
          	s-1.2,13.4-3.8,26.5h9.3c3.4-11.2,6.3-20.9,7.6-20.1s1,9.6,0.4,20.1h10.6c1.8-9.2,3.5-16.5,4.9-16.7s2.7,7.6,3.9,16.7h10.8
          	c1-11.9,1.6-24.7,4-33.4C80.4,597.1,83.1,586.6,82.3,561.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "46LUB")}
            fill={this._ifPressed("46LUB")}
            d="M227.7,194.9c0.1,0,0.1-0.1,0.2-0.1c3.7-1.3,7.5-2.8,11.2-4.4c0.3-0.2,0.7-0.4,1.1-0.5
          	c20.3-8.8,39.8-21.6,47.1-42.1c-2.1-8.1-4.4-15.9-10.4-23c-7.4-8.6-16.1-16.1-25.6-22.3c-5.9,1-12.6,2.2-20.9,3.9
          	c-28.5,5.8-62.1,32.1-62.9,70.9c-0.2,11.4-0.9,22.4-2.1,33.2c17.1-2.5,34-6.4,50.5-11.8C219.8,197.7,223.7,196.4,227.7,194.9z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "47LUB")}
            fill={this._ifPressed("47LUB")}
            d="M419.5,472.9v-27.1c-4.1,9.6-6.4,19.8-6.6,30.3C415.1,475,417.3,473.9,419.5,472.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "48LUB")}
            fill={this._ifPressed("48LUB")}
            d="M419.5,297.3v-1.4l-1.7-1.5C418.4,295.3,418.9,296.3,419.5,297.3z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "49LUB")}
            fill={this._ifPressed("49LUB")}
            d="M391.9,264.7l-7.9,8.5c0.1,33.3,0.1,66.6,0.2,99.9c0.1,44.4,0.1,88.8,0.2,133.2c5-12,13.5-21.1,24.1-27.7
          	c-0.3-15.2,3.9-29.7,11-43V306c-5.7-9.9-11.6-19.6-18.1-28.8C398,273,394.8,268.8,391.9,264.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "33RUB")}
            fill={this._ifPressed("33RUB")}
            d="M402.5,94.4c-8-2.5-14.6-6.6-18.8-12.8c0,9.7,0,19.4,0,29.2C388,103.7,394.9,98.1,402.5,94.4z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "51LUB")}
            fill={this._ifPressed("51LUB")}
            d="M404.6,274c4.6,5.6,9.6,10.9,14.9,15.9v-55.7c-8,9.1-16.2,18.2-24.5,27.1C398.4,265.5,401.5,269.7,404.6,274z"
          />
        </G>
      </Svg>
    );
  }
}

const styles = {};

export default LeftUpperBackSVG;

///--------------------------------------------------------
