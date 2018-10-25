import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

class CustomTabBar extends React.Component {


  constructor(props) {
    super(props);
    this.icons = [];
    // console.log(props);
  }

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue.bind(this));
  }

  setAnimationValue({ value, }) {
    this.icons.forEach((icon, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  }

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  render() {
    return <View style={[styles.tabs, this.props.style, ]}>
      {this.props.tabs.map((tab, i) => {
        const isTabActive = this.props.activeTab === i;
        
        var bg = { backgroundColor: isTabActive ? 'white': '#eeeeee'};
        var textStyle = {fontWeight:'bold', color: isTabActive ? '#181f31': 'white' };

        return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={[styles.tab, bg]}>
          <Text style={textStyle}>{tab}</Text>
        </TouchableOpacity>;
      })}
    </View>;
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop:10,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    borderWidth: 0,

  },
});

export default CustomTabBar;