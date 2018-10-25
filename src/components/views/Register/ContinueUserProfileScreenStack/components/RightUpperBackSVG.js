import React, { PureComponent } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors } from "../../../../styles/theme";
import Svg, { Circle, Rect, Path, Line, G } from "react-native-svg";
class RightUpperBackSVG extends PureComponent {
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
            //onPress={this._onItemSelect.bind(this, "1RUB")}
            fill="white"
            d="M361.9,628.9c1.4,0.2,3.1,7.5,4.9,16.7H358C359.2,636.5,360.4,628.7,361.9,628.9z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "2RUB")}
            fill="white"
            d="M377.8,625.5c1.3-0.7,4.2,9,7.6,20.1h-8C376.9,635,376.5,626.2,377.8,625.5z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "3RUB")}
            fill="white"
            d="M391,619c1.2-1,7.7,13.8,14,26.5h-10.2C392.2,632.5,390,619.9,391,619z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "4RUB")}
            fill={this._ifPressed("4RUB")}
            d="M7.4,0h5.5C9.2,5.5,5.8,11.1,2.5,16.8c-0.9,1.5-1.7,3-2.5,4.5v-8.9c0.7-1.3,1.5-2.5,2.2-3.8
          	C3.7,6.2,5.5,3.2,7.4,0z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "5RUB")}
            fill={this._ifPressed("5RUB")}
            d="M35.8,81.6c0,9.7,0,19.4,0,29.2C31.5,103.7,24.6,98,17,94.4C25,91.9,31.6,87.8,35.8,81.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "6RUB")}
            fill={this._ifPressed("6RUB")}
            d="M147.9,473.3c5.8,1.4,11.4,3.1,17,5.2c5.2,24.6,12.6,48.5,19.4,73.8c4.4,16.5,7.6,37.2,9.8,59.5
          	c-5.1-10.9-10-21.9-14.7-33C165.5,546.3,148.7,509.3,147.9,473.3z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "7RUB")}
            fill={this._ifPressed("7RUB")}
            d="M180.4,255c-2.4,5-5.3,16.7-8.2,31.8c-9.1,10.3-21.5,19.1-34.4,23.1c-39.1,12.3-69.3-19.5-88.8-49.6
          	c11.3-14.2,22.6-28.5,34.2-42.5c13.2,2.6,26.6,4.4,40.1,5.2c16.1,1.1,36.8,2.6,51.9-5.6C175.6,230,177.7,242.8,180.4,255z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "8RUB")}
            fill={this._ifPressed("8RUB")}
            d="M175,212.5c-15,9.5-37.5,7.5-54.2,6.1c-11.5-0.9-23-2.4-34.3-4.5c7.3-8.7,14.8-17.3,22.7-25.5
          	c7.6-7.9,15.1-16.1,19-26.6c0.9-2.4,1.6-4.8,2.3-7.2c8.9,18.3,27.3,30.4,46.3,38.8C175.6,199.8,175,206.1,175,212.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "9RUB")}
            fill={this._ifPressed("9RUB")}
            d="M135.6,315.2c13.2-3.9,25.3-10.9,35.2-20.5c-3,16.7-5.8,36.5-8.1,56c-16,12.2-31.1,25.6-45.1,40
          	c-1.3,1.4-2.7,2.8-4.1,4.2c-10.2-33.5-23.3-68.3-41.2-99.4C89.5,311.7,111,322.2,135.6,315.2z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "10RUB")}
            fill={this._ifPressed("10RUB")}
            d="M68,478.4c4.8-29.5,24.9-55.6,45.6-77.4l0.8-0.9c3.3-3.4,6.6-6.7,9.8-9.9c11.9-11.8,24.5-23,37.7-33.4
          	c-2,17.5-3.4,34.5-4,48.4c-1,24.3,1.6,46.6,5.9,68.2c-15.5-5.7-31.9-8.6-48.5-8.7C97.2,464.8,81.2,469.6,68,478.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "11RUB")}
            fill={this._ifPressed("11RUB")}
            d="M39.8,271.7c2-2.4,3.9-4.8,5.8-7.2c30.8,38,50.2,87.7,64.2,134.2c-21.9,23.3-43,51.1-46.8,83.3l0,0
          	c-9.9,7.9-18,18-23.6,29.4C39.6,431.4,39.7,351.5,39.8,271.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "12RUB")}
            fill={this._ifPressed("12RUB")}
            d="M61.1,93.9c-8.3,3.3-16.4,8.5-21,15.8c0-9.9,0-19.8,0-29.7C44.9,86.9,52.6,91.2,61.1,93.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "13RUB")}
            fill={this._ifPressed("13RUB")}
            d="M161.7,101.4c-10.7,7.4-20.6,16.4-27,26.9c-3.5,5.7-5,11.8-6.5,18l-0.5,2c-1.1,5-2.7,9.9-4.8,14.6
          	c-5.1,10.4-13,18.1-20.7,26.5c-13.4,14.6-25.5,30.4-38.1,45.7l-19.3,23.5l-1.4,1.8l-3.6,4.4c0-6.1,0-12.2,0-18.3
          	c0.1-41,0.1-82.1,0.2-123.1c0.1-0.3,0.2-0.6,0.2-0.9c0.7-14.5,16.1-23.1,28.8-26.5c7.6,1.4,15.3,2.1,23.1,2.2
          	c14.2,0.3,28.5-0.6,42.6-2.6C143.6,97.9,152.6,99.9,161.7,101.4L161.7,101.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "14RUB")}
            fill={this._ifPressed("14RUB")}
            d="M254,210.6c-17.1-2.5-34-6.4-50.5-11.8c-3.8-1.2-7.6-2.5-11.6-4c-0.1,0-0.1-0.1-0.2-0.1
          	c-3.7-1.3-7.4-2.8-11.2-4.4c-0.3-0.2-0.7-0.4-1.1-0.5c-20.3-8.8-39.8-21.6-47.1-42.1c2.1-8.1,4.4-15.9,10.4-23
          	c7.4-8.6,16.1-16.1,25.6-22.3c5.9,1,12.6,2.2,20.9,3.9c28.5,5.8,62.1,32.1,62.9,70.9C252.1,188.8,252.8,199.8,254,210.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "15RUB")}
            fill={this._ifPressed("15RUB")}
            d="M266.4,267c-17.2-8.1-35-18.9-49-32.4l-2-2c-9.4-9.4-16.8-20.2-21.1-32.2l3.8,1.3c18.4,6.2,37.2,10.6,56.4,13.4
          	C256.7,232.7,260.7,250.1,266.4,267L266.4,267z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "16RUB")}
            fill={this._ifPressed("16RUB")}
            d="M233.2,361.6c18.6,4.4,38.1,2.7,52.3-12.6c4.5-4.9,8.3-10.3,11.4-16.2c6.2,11.6,13.1,25.4,22.7,48.3
          	c21.2,50.5,47.8,141.7,52.1,153.8c0.2,0.7,0.5,1.3,0.8,1.9c-9.5,10.1-22,17.6-35.5,19.1c-1.3-12.9-9.3-27.4-30.6-62.8
          	c-24.1-40.2-41-52-54.9-75.4c-13.9-23.4-17.6-49-18.3-55.6C233.3,361.9,233.3,361.8,233.2,361.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "17RUB")}
            fill={this._ifPressed("17RUB")}
            d="M207.4,297.6c8.8-17.2,12.1-37.6,10.7-56.6c14.9,13.3,33,23.8,50.4,31.6c1.8,4.9,3.7,9.8,5.9,14.8
          	c7.8,18,13.7,28.7,20.1,40.7c-2.3,5.1-5.2,9.9-8.8,14.2c-14.3,17.3-34,19.8-53.6,14.6c-3.2-9.8-11.7-28.8-20.6-49.7
          	C210,304,208.7,300.8,207.4,297.6L207.4,297.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "18RUB")}
            fill={this._ifPressed("18RUB")}
            d="M205.1,292.2c-7.8-18.9-15-36.1-20.7-39.4c-2.7-12.5-4.8-25.5-5-38.3v-2c0-5.8,0.5-11.5,1.4-17.2
          	c2.8,1.1,5.5,2.2,8.2,3.2c4.4,14.4,13.1,27.1,24.2,38C215.3,255,212.9,275,205.1,292.2L205.1,292.2z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "19RUB")}
            fill={this._ifPressed("19RUB")}
            d="M184.4,252.8c-2.7-12.5-4.8-25.5-5-38.3v-2c0-5.8,0.5-11.5,1.4-17.2c2.8,1.1,5.5,2.2,8.2,3.2
          	c4.4,14.4,13.1,27.1,24.2,38c2.1,18.4-0.3,38.4-8.1,55.6C197.3,273.3,190.1,256.1,184.4,252.8z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "20RUB")}
            fill={this._ifPressed("20RUB")}
            d="M120.8,218.5c-11.5-0.9-23-2.4-34.4-4.5c7.3-8.7,14.8-17.3,22.7-25.5c7.6-7.9,15.1-16.1,19-26.6
          	c0.9-2.4,1.6-4.8,2.3-7.2c8.9,18.3,27.3,30.4,46.3,38.8c-1.1,6.2-1.7,12.6-1.7,18.9C160,222,137.6,219.9,120.8,218.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "21RUB")}
            fill={this._ifPressed("21RUB")}
            d="M172.2,286.8c-9.1,10.3-21.5,19.1-34.4,23.1c-39.1,12.3-69.3-19.5-88.8-49.6c11.3-14.2,22.6-28.5,34.2-42.5
          	c13.2,2.6,26.6,4.4,40.1,5.2c16.1,1.1,36.8,2.6,51.9-5.6c0.5,12.5,2.6,25.3,5.2,37.4C177.9,260,175.1,271.7,172.2,286.8z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "22RUB")}
            fill={this._ifPressed("22RUB")}
            d="M114.4,400.1c3.3-3.4,6.6-6.7,9.8-9.9c11.9-11.8,24.5-23,37.7-33.4c-2,17.5-3.4,34.5-4,48.4
          	c-1,24.3,1.6,46.6,5.9,68.2c-15.5-5.7-31.9-8.6-48.5-8.7c-18.2,0.1-34.2,4.9-47.4,13.7c4.8-29.5,24.9-55.6,45.6-77.4L114.4,400.1z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "23RUB")}
            fill={this._ifPressed("23RUB")}
            d="M170.7,294.7c-3,16.7-5.8,36.5-8.1,56c-16,12.2-31.1,25.6-45.1,40c-1.3,1.4-2.7,2.8-4.1,4.2
          	c-10.2-33.5-23.3-68.3-41.2-99.4c17.4,16.1,38.9,26.6,63.4,19.6C148.8,311.3,160.8,304.2,170.7,294.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "24RUB")}
            fill={this._ifPressed("24RUB")}
            d="M39.2,630.9c0-5.2,0-10.4,0-15.6c0.1-30.5,0.1-61,0.2-91.5c0-0.1,0-0.1,0-0.2v-0.1c0-0.6,0-1.2,0-1.8
          	c14.2-36,44.9-55.4,83.6-52.4c6.9,0.5,13.7,1.5,20.5,2.9c0.5,36.2,17.1,73.2,30.8,105.9c6.1,14.5,12.5,28.8,19.3,43
          	c-5.5,7.5-9.8,15.7-13,24.4H51.2c-2.2-1.6-4.3-3.4-6.3-5.3C43.2,635.7,41.3,632.4,39.2,630.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "25RUB")}
            fill={this._ifPressed("25RUB")}
            d="M10.4,91.7L10.4,91.7z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "26RUB")}
            fill={this._ifPressed("26RUB")}
            d="M12.9,0h23c0,1.4,0,2.8,0,4.2c0,21.3-0.1,42.6-0.1,63.9c-1.3,13.8-11.7,20.7-25.5,23.6l0,0
          	c-1.1,0.1-2.2,0.3-3.2,0.6C4.8,92.7,2.4,93,0,93.2V21.3c0.8-1.5,1.6-3,2.5-4.5C5.8,11.1,9.2,5.5,12.9,0z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "27RUB")}
            fill={this._ifPressed("27RUB")}
            d="M10.3,91.7"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "28RUB")}
            fill={this._ifPressed("28RUB")}
            d="M10.4,91.7L10.4,91.7z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "29RUB")}
            fill={this._ifPressed("29RUB")}
            d="M35.7,125.3c-0.1,47.1-0.2,94.3-0.2,141.4l-2.1-2.3l-3.3-3.7c-0.6-0.8-1.3-1.5-2-2.2c0.3,0.1-0.1-0.1-0.1-0.1
          	c-2.6-2.9-5.3-5.8-7.9-8.7c-6.7-7.4-13.3-14.9-20-22.4V97.5c3.3-0.3,6.6-0.7,9.9-1.3C22.7,100.6,35.1,110.9,35.7,125.3z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "30RUB")}
            fill={this._ifPressed("30RUB")}
            d="M28,258.5C28,258.5,28,258.5,28,258.5C27.9,258.4,28.2,258.6,28,258.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "31RUB")}
            fill={this._ifPressed("31RUB")}
            d="M184.3,552.3c4.4,16.5,7.6,37.2,9.8,59.5c-5.1-10.9-10-21.9-14.7-33c-13.8-32.5-30.6-69.5-31.4-105.6
          	c5.8,1.4,11.4,3.1,17,5.2C170.2,503.1,177.5,527,184.3,552.3z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "32RUB")}
            fill={this._ifPressed("32RUB")}
            d="M218,241c14.9,13.3,33,23.8,50.4,31.6c1.8,4.9,3.7,9.8,5.9,14.8c7.8,18,13.7,28.7,20.1,40.7
          	c-2.3,5.1-5.2,9.9-8.8,14.2c-14.3,17.3-34,19.8-53.6,14.6c-3.2-9.8-11.7-28.8-20.6-49.7c-1.3-3.1-2.7-6.3-4-9.5
          	C216.2,280.5,219.4,260.1,218,241z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "33RUB")}
            fill={this._ifPressed("33RUB")}
            d="M40.1,109.7c0-9.9,0-19.8,0-29.7c4.7,6.9,12.4,11.2,21,13.9C52.8,97.1,44.8,102.4,40.1,109.7z"
          />
          <Path
            // onPress={this._onItemSelect.bind(this, "34RUB")}
            fill={this._ifPressed("34RUB")}
            d="M34.8,522c0,0.2,0,0.4,0.1,0.6c0,0.3,0.1,0.6,0.1,0.9c-0.1,35.7-0.1,71.4-0.2,107.1c-2.1,1.4-4.1,4.9-5.8,10
          	c-1.7,1.7-3.5,3.4-5.4,4.9H0V477.5C18.1,485.8,31.8,499.8,34.8,522z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "35RUB")}
            fill={this._ifPressed("35RUB")}
            d="M215.4,232.5c-9.4-9.4-16.8-20.2-21.1-32.2l3.8,1.3c18.4,6.2,37.3,10.6,56.4,13.4c2.2,17.7,6.2,35.1,11.9,51.9
          	c-17.2-8.1-35-18.9-49-32.4L215.4,232.5z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "36RUB")}
            fill={this._ifPressed("36RUB")}
            d="M81.7,15c1.7,2.5,3.4,4.9,5.1,7.4c-0.2,2.6-0.3,5.5-0.4,8.8c-0.5,20.6,8.6,51.4,37.9,61.1
          	c-8.6,0.9-17.2,1.3-25.8,1.4c-7.8,0-18.1-0.1-27.8-1.9l-1.9-0.4h-0.2c-13.4-2.8-25.4-8.9-28.3-22.3c0-0.1-0.1-0.1-0.1-0.2
          	c0-0.3,0-0.5,0-0.8c0-0.6,0-2.1,0-2.8c0.1,0.2,0-0.3,0,0c0-21.8,0.1-43.6,0.1-65.4H71C75.2,5.5,78.8,11,81.7,15z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "37RUB")}
            fill={this._ifPressed("37RUB")}
            d="M40.2,65.4C40.2,65.1,40.3,65.7,40.2,65.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "38RUB")}
            fill={this._ifPressed("38RUB")}
            d="M109.9,398.6c-21.9,23.3-43,51.1-46.8,83.3l0,0c-9.9,7.9-18,18-23.6,29.4c0.1-79.9,0.3-159.7,0.4-239.6
          	c2-2.4,3.9-4.8,5.8-7.2C76.5,302.5,95.8,352.1,109.9,398.6z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "39RUB")}
            fill={this._ifPressed("39RUB")}
            d="M134.7,128.3c-3.5,5.7-5,11.8-6.5,18l-0.5,2c-1.1,5-2.7,9.9-4.8,14.6c-5.1,10.4-13,18.1-20.7,26.5
          	c-13.4,14.6-25.5,30.4-38.1,45.7l-19.3,23.5l-1.4,1.8l-3.6,4.4c0-6.1,0-12.2,0-18.3c0.1-41,0.1-82.1,0.2-123.1
          	c0.1-0.3,0.2-0.6,0.2-0.9c0.7-14.5,16.1-23.1,28.8-26.5c7.6,1.4,15.3,2.1,23.1,2.2c14.2,0.3,28.5-0.6,42.6-2.6
          	c8.9,2.4,17.9,4.4,27,5.9C151,108.8,141.1,117.8,134.7,128.3z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "40RUB")}
            fill={this._ifPressed("40RUB")}
            d="M196.5,645.6h-11c2.5-6.7,5.8-13.2,9.8-19.2C195.8,632.7,196.1,639.1,196.5,645.6z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "41RUB")}
            fill={this._ifPressed("41RUB")}
            d="M93.9,4.6c-3,0.4-5.1,3-6.4,11.2c-2.9-4.2-5.9-8.3-9-12.4L75.9,0h21.2C96,2.7,94.8,4.5,93.9,4.6z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "42RUB")}
            fill={this._ifPressed("42RUB")}
            d="M7.4,0c-2,3.2-3.7,6.1-5.2,8.6C1.5,9.9,0.7,11.1,0,12.4V0H7.4z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "43RUB")}
            fill={this._ifPressed("43RUB")}
            d="M285.5,349c4.5-4.9,8.3-10.3,11.4-16.2c6.2,11.6,13.1,25.3,22.7,48.2c21.2,50.5,47.8,141.7,52.1,153.8
          	c0.2,0.7,0.5,1.3,0.8,1.9c-9.5,10.1-22,17.6-35.5,19.1c-1.3-12.9-9.3-27.4-30.6-62.8c-24.1-40.2-41-52-54.9-75.4
          	c-13.9-23.4-17.6-49-18.3-55.6c0-0.1-0.1-0.3-0.1-0.4C251.9,366,271.3,364.3,285.5,349z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "44RUB")}
            fill={this._ifPressed("44RUB")}
            d="M337.2,561c0-0.3,0-0.6,0-0.9c14.2-1.5,27.3-9,37.5-19.3c4.6,7.2,11.5,10.7,21.5,22.8
          	c12.4,15,23.3,47.8,23.3,49.8c0,9.8-17.5-18.9-21.1-18.2c-2.6,0.5,8.9,30.6,15.1,50.4H405c-6.3-12.7-12.8-27.5-14-26.5
          	s1.2,13.4,3.8,26.5h-9.3c-3.4-11.2-6.3-20.9-7.6-20.1s-1,9.6-0.4,20.1h-10.6c-1.8-9.2-3.5-16.5-4.9-16.7s-2.7,7.6-3.9,16.7h-10.8
          	c-1-11.9-1.6-24.7-4-33.4C339.2,597,336.4,586.6,337.2,561z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "45RUB")}
            fill={this._ifPressed("45RUB")}
            d="M191.9,194.9c-0.1,0-0.1-0.1-0.2-0.1c-3.7-1.3-7.4-2.8-11.2-4.4c-0.3-0.2-0.7-0.4-1.1-0.5
          	c-20.3-8.8-39.8-21.6-47.1-42.1c2.1-8.1,4.4-15.9,10.4-23c7.4-8.6,16.1-16.1,25.6-22.3c5.9,1,12.6,2.2,20.9,3.9
          	c28.5,5.8,62.1,32.1,62.9,70.9c0.2,11.4,0.9,22.4,2.1,33.2c-17.1-2.5-34-6.4-50.5-11.8C199.7,197.6,195.8,196.3,191.9,194.9z"
          />
          <Path
            // onPress={this._onItemSelect.bind(this, "46RUB")}
            fill={this._ifPressed("46RUB")}
            d="M0,472.9v-27.1c4.1,9.6,6.4,19.8,6.6,30.3C4.5,474.9,2.3,473.9,0,472.9z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "47RUB")}
            fill={this._ifPressed("47RUB")}
            d="M0,297.2v-1.4l1.7-1.5C1.1,295.3,0.6,296.3,0,297.2z"
          />
          <Path
            // onPress={this._onItemSelect.bind(this, "48RUB")}
            fill={this._ifPressed("48RUB")}
            d="M27.6,264.7l7.9,8.5c-0.1,33.3-0.1,66.6-0.2,99.9c-0.1,44.4-0.1,88.8-0.2,133.2c-5-12-13.4-21.1-24.1-27.7
          	c0.3-15.2-3.9-29.7-11-43V305.9c5.7-9.9,11.6-19.6,18.1-28.9C21.5,272.9,24.7,268.7,27.6,264.7z"
          />
          <Path
            onPress={this._onItemSelect.bind(this, "34LUB")}
            fill={this._ifPressed("34LUB")}
            d="M17,94.4c8-2.5,14.6-6.6,18.8-12.8c0,9.7,0,19.4,0,29.2C31.5,103.7,24.6,98,17,94.4z"
          />
          <Path
            //onPress={this._onItemSelect.bind(this, "50RUB")}
            fill={this._ifPressed("50RUB")}
            d="M14.9,274c-4.6,5.6-9.6,10.9-14.9,15.9v-55.7c8,9.1,16.2,18.2,24.5,27.1C21.2,265.4,18,269.6,14.9,274z"
          />
        </G>
      </Svg>
    );
  }
}

const styles = {};

export default RightUpperBackSVG;

///--------------------------------------------------------
