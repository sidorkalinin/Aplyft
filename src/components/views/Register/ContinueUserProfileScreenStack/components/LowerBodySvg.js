import React, { PureComponent } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors } from "../../../../styles/theme";
import Svg, { Circle, Rect, Path, Line, G } from "react-native-svg";
class LowerBodySvg extends PureComponent {
  state = {
    selected: []
  };

  _onItemSelect = key => {
    if (this._ifKeyExists(key)) this._removeKey(key);
    else this._addKey(key);

    if (this.props.onSelect) {
      this.props.onSelect(this.state.selected);
    }
  };

  _ifKeyExists = key => {
    if (this.state.selected.indexOf(key) > -1) return true;
    return false;
  };
  _addKey = key => {
    this.setState({ selected: [...this.state.selected, key] });
  };
  _removeKey = key => {
    var index = this.state.selected.indexOf(key);
    var tmp = this.state.selected.slice();
    tmp.splice(index, 1);

    this.setState({ selected: tmp });
  };

  _ifPressed = key => {
    if (this._ifKeyExists(key)) return "#eb1d3a";
    else return "#969696";
  };

  render() {
    //const { mainContainer, labelStyle, valueStyle } = styles;

    return (
      <View style={{ flex: 1 }}>
        <Svg
          height="400"
          width="100%"
          style={{
            marginLeft: 50,
            marginTop: 20,
            marginBottom: 20
          }}
        >
          <G>
            <Path
              onPress={this._onItemSelect.bind(this, "1L")}
              fill={this._ifPressed("1L")}
              d="M101.2,70.8c0-14.5,0-29.1-0.1-43.6c-0.1-21.8,0,0,0-0.1l0,0c0-0.3,0-0.6,0-0.9C94.4,9.1,79.7-0.1,61.3,1.3
            	C58,1.5,54.8,2,51.6,2.7c-0.2,17.3-8.1,34.9-14.7,50.5c-2.9,6.9-6,13.7-9.2,20.5c4.2,5.6,7,12.8,8.5,19.3c0.3,1.2,0.5,2.5,0.8,3.8
            	c7.8,0.2,15.6-0.1,23.4-1c12.9-1.4,28.4-3.8,38.2-13.1c0.8-2.2,1.7-3.8,2.7-4.5C101.2,75.7,101.2,73.2,101.2,70.8z"
            />
            <Path
              onPress={this._onItemSelect.bind(this, "2L")}
              fill={this._ifPressed("2L")}
              d="M34.4,53.4C41,37.9,49,20.2,49.4,3.1c-2.8,0.7-5.5,1.5-8.1,2.5c-2.5,11.7-6,23.1-9.2,35.2
            	c-2.3,9.3-3.9,18.8-4.6,28.4C29.8,63.9,32.2,58.6,34.4,53.4z"
            />
            <Path
              onPress={this._onItemSelect.bind(this, "3L")}
              fill={this._ifPressed("3L")}
              d="M43.8,206.4c1.5-1.8,3.5-2.7,6.1-1.3c0.6,0.3,1.2,0.7,1.7,1.2c-2-7.1-2.6-14.5-1.8-21.8
            	c0.4-3.4,0.9-6.8,1.5-10.3l0,0.2c-3.1,9-6.7,17.5-14.3,23.6c-1,0.8-2,1.5-3.1,2.2c2.5-0.4,5,0.2,7.1,1.5
            	C42.5,202.7,43.6,204.5,43.8,206.4z"
            />
            <Path
              onPress={this._onItemSelect.bind(this, "4L")}
              fill={this._ifPressed("4L")}
              d="M66.2,97.1c-2.3,18.5-4.7,37.5-9,55.9c-1.9,10.3-4,20.7-5.3,31c-1,8.9,0.1,17.8,3.1,26.2l0.1,0.2
            	c0.1,0.2,0.2,0.4,0.1,0.6c1.1,2.9,2.3,5.7,3.8,8.4c1-2,2.2-4.3,3.4-6.7c0.5-11.3,1.8-22.5,4-33.6c4.7-25.4,13.1-50.3,27.2-72.1
            	c0.8-7,2.1-13.9,3.7-20.7C88.7,93.1,76.9,95.7,66.2,97.1z"
            />
            <Path
              onPress={this._onItemSelect.bind(this, "5L")}
              fill={this._ifPressed("5L")}
              d="M136.6,96.5c0,0,1.8,0.3,1.6,0.2c8.3,1,16.7,1,25.1,0.1c0.2-1.7,0.6-3.4,0.9-5.1c1.3-5.9,3.4-12.3,6.8-17.6
            	c-3.4-7-6.6-14.2-9.5-21.4c-6.8-16.6-13.8-34.6-14.1-52.7c-19.3,0-41.3,5.7-44,26.3c0,0.1,0,0.2,0,0.3c0,0.1,0,0.3-0.1,0.5
            	c0,17,0,34,0.1,51c1,0.7,1.9,2.4,2.8,4.7C113.9,90.7,125,94.8,136.6,96.5z"
            />
            <Path
              onPress={this._onItemSelect.bind(this, "6L")}
              fill={this._ifPressed("6L")}
              d="M41.3,210.6c0.1-0.6,0.2-1.3,0.2-1.9c0.1-9.4-10.1-6.5-16.8-3.5c0,0.3,0,0.6,0,0.8c-0.4,15.7-11.2,22.3-16,40.5
            	c-1.9,7-3.4,21.2-4.5,37.1c8.1-1.5,17.1-5,21-12.1c0-0.1,0.1-0.1,0.1-0.2c-1.2-11.3,2.5-24.5,6.4-35.1c2-5.3,4.1-10.5,6.2-15.8
            	c1.2-2.9,2.7-6,3.3-9.2C41.3,211,41.3,210.9,41.3,210.6L41.3,210.6z"
            />
            <Path
              onPress={this._onItemSelect.bind(this, "7L")}
              fill={this._ifPressed("7L")}
              d="M149,170.2c-9-22.5-11.9-48.2-12.6-71.6c-10.8-1.6-21.3-5.1-29.2-11.8c1.8,8.1,2.9,16.3,3.4,24.5
            	c5.7,10.3,10.7,21.1,14.8,32.1c9.5,24.8,15.6,51.1,15.8,77.8c0.5,1.4,1,2.5,1.5,3.5c2.1-2.8,3.8-5.9,5-9.2
            	C153,201,151.8,185,149,170.2z"
            />
            <Path
              onPress={this._onItemSelect.bind(this, "8L")}
              fill={this._ifPressed("8L")}
              d="M192.1,282.8c-0.2-2.4-0.5-4.6-0.7-6.7c-3.5-31.4-7.7-42.2-12.2-52.3c-2-4.9-3.3-10-4-15.3
            	c-1.3-1-2.7-1.9-4.1-2.6c-2.1-1.1-5.1-2.5-7.5-1.6c-3.5,1.3-4.4,5.7-4.8,9c1.1,1.4,2,3,2.8,4.6c3,5.8,5.7,11.8,7.9,18
            	c3.8,10.5,8.6,23.9,7.9,35.9C180.2,277.6,185.9,281.4,192.1,282.8z"
            />
            <Path
              onPress={this._onItemSelect.bind(this, "9L")}
              fill={this._ifPressed("9L")}
              d="M24.9,202.2c5.1-1.7,9.7-4.5,13.5-8.2c6.5-6.6,9.6-15.6,12.2-24.3c2-6.8,3.8-13.8,5.3-20.7
            	c0.1-0.8,0.3-1.6,0.4-2.4c0-0.2,0.1-0.3,0.2-0.4c3.4-16.1,5.6-32.4,7.6-48.7h-0.4C55,98.5,46.1,99,37.3,98.7
            	c2.8,19-2.3,38-10.3,55.3C26.8,172.8,25.3,190.3,24.9,202.2z"
            />
            <Path
              onPress={this._onItemSelect.bind(this, "10L")}
              fill={this._ifPressed("10L")}
              d="M26.8,76c-1.3,19-1.4,38.1-0.3,57.1c0.3,5.3,0.5,10.6,0.5,15.8c7.6-17.7,12-37.5,6.9-56.4
            	C32.5,86.7,30.1,81.1,26.8,76z"
            />
            <Path
              onPress={this._onItemSelect.bind(this, "11L")}
              fill={this._ifPressed("11L")}
              d="M138.5,98.8c0.7,22.3,3.4,46.8,11.6,68.4c0,0,0.8,1.9,0.9,2.3s-0.1-0.5,0,0c5.4,13.3,12.9,25.4,23.6,35.1
            	c-1.6-13.3-2.3-26.6-2-40c0-3.5,0.1-7.5,0.1-11.9c-7-16.8-11.8-35.5-9.7-53.8C154.9,99.8,146.6,99.7,138.5,98.8z"
            />
            <Path
              onPress={this._onItemSelect.bind(this, "12L")}
              fill={this._ifPressed("12L")}
              d="M53.2,211.1c-0.8-1.3-1.8-2.4-3-3.4c-3.2-2.5-5.3-0.2-6.6,2.8c-0.9,5-3.6,10.4-4.9,13.5
            	c-8,19.6-23.5,56.3,3.4,67.2c2.8-6.5,5.4-12.7,7.4-17.6c6.9-17.2,4.4-41.6,6.2-46.8c0.7-1.7,1.4-3.4,2.3-5.1
            	C56.1,218.4,54.5,214.8,53.2,211.1z"
            />
            <Path
              onPress={this._onItemSelect.bind(this, "13L")}
              fill={this._ifPressed("13L")}
              d="M68.3,181.1c-1.6,8.8-2.8,17.8-3.4,26.7c1.2-2.8,2.4-5.7,3.4-8.7c3.9-11.8,6.8-28.5,8.1-34.3s13.6-29,16-47.1
            	c0.2-1.9,0.5-3.8,0.7-5.7C80.2,133.1,72.5,157,68.3,181.1z"
            />
            <Path
              onPress={this._onItemSelect.bind(this, "14L")}
              fill={this._ifPressed("14L")}
              d="M18.5,368.9c0,0.6-0.5,1-1,1c-0.6,0-1-0.5-1-1c-0.2-12.4,2.5-26.3,9.1-37.2c3.2-9.2,9.8-24.5,15.8-38.4
            	c-9.3-3.9-13.9-10.8-15.4-18.9c-4.8,6.6-13.7,9.8-21.8,11.3c-0.1,1.1-0.1,2.2-0.2,3.2c2.5,1.7,3.9,6.7,4.5,8.7
            	c2,7.3,2.5,15.1,2.7,22.6c0.5,15.6-0.5,31.3-1.9,46.9c-0.1,1.3-2.2,1.3-2.1,0c1.2-14.8,2.2-29.7,1.9-44.6
            	c-0.2-7.6-0.5-15.4-2.3-22.8c-0.4-1.6-1.5-5.7-3-7.9c-1.4,22.8-2.1,46.8-2.3,56.9c-0.4,18.5-5.2,41.8,5.6,45s20.6-11.5,23.7-24.1
            	s-5.5-25.3-6.9-29.9C20.1,349,18.3,358.9,18.5,368.9z"
            />
            <Path
              onPress={this._onItemSelect.bind(this, "15L")}
              fill={this._ifPressed("15L")}
              d="M122.9,142.7c-3.5-9.1-7.5-18-12-26.6c0,0.2,0,0.5,0,0.7c0.5,14.9,11.5,43.2,14.4,54.4
            	c2.1,8.1,8.8,30.1,13.7,44C138,190.3,132,165.8,122.9,142.7z"
            />
            <Path
              onPress={this._onItemSelect.bind(this, "16L")}
              fill={this._ifPressed("16L")}
              d="M190.4,370.2c0.2,1.3-1.9,1.3-2.1,0c-3.3-25-1.6-50.3,5.1-74.6c-0.3-3.7-0.7-7.3-1-10.6
            	c-6.1-1.2-11.9-4.5-15.5-9.6c-0.2,1.1-0.4,2.2-0.7,3.2c-2.2,8-8.8,17.7-17.9,18.8c5.6,13.3,12.1,26.5,15,33.2
            	c0.8,1.8,1.5,3.8,1.9,5.7c5.9,9.7,7,23.5,7.6,34c0.1,1.3-2,1.3-2.1,0c-0.5-8.7-1.3-20.2-5.3-29.2c-0.7,3.1-3.1,4.6-4.9,7.7
            	c-3.1,5.2-4.9,21.3,3.8,36.3s18.1,11.9,22,2.8c3-7.1,0.5-51.7-2.4-86C188.6,324.2,187.4,347.4,190.4,370.2z"
            />
            <Path
              onPress={this._onItemSelect.bind(this, "17L")}
              fill={this._ifPressed("17L")}
              d="M174.8,274.5c1.1-12.4-2.8-25.3-6.9-36.9c-1.1-3-9-27-14.1-23.5c-2.3,1.7-4.4,3.8-5.9,6.2
            	c-0.8,1.6-1.8,3.1-2.8,4.6c-0.4,0.7-0.7,1.4-1.1,2.1c3.2,6.7,2.2,25.3,4.6,41.1c1,6.9,4.7,17,9,27.2
            	C167,294.6,174.1,283.1,174.8,274.5z"
            />
            <Path
              onPress={this._onItemSelect.bind(this, "18L")}
              fill={this._ifPressed("18L")}
              d="M172.8,147.3c0.3-21.9,0.6-50.4-0.5-70.5l-0.3-0.5c-2.6,4.7-4.5,9.7-5.6,15C162.3,110.2,166,129.5,172.8,147.3z
            	"
            />
            <Path
              onPress={this._onItemSelect.bind(this, "19L")}
              fill={this._ifPressed("19L")}
              d="M172,71.3c-0.3-4.1-0.8-8.1-1.5-12.1c-3.9-19.6-12-42.4-14.1-57.8c0-0.3-0.1-0.6-0.1-0.9
            	c-2.2-0.2-4.5-0.4-6.8-0.4c0.4,17.9,7.3,35.8,14,52.1C166.1,58.6,169,65,172,71.3z"
            />
            <Path
              onPress={this._onItemSelect.bind(this, "20L")}
              fill={this._ifPressed("20L")}
              d="M156.9,211.9c1.1-5.8,4.3-11.6,11.3-9.4c0.6,0.2,1.1,0.4,1.7,0.6c-7.2-7.4-13.1-15.9-17.5-25.2
            	c1.7,12,2,24.6-1.8,36c1.1-1.2,2.6-2,4.3-2.3C155.6,211.4,156.3,211.6,156.9,211.9z"
            />
          </G>
        </Svg>
      </View>
    );
  }
}

const styles = {};

export default LowerBodySvg;