import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import { colors } from '../../../styles/theme';

class SettingsRow extends Component {

	render () {

		const { 
			mainContainer,
			textStyle,
		} = styles;

		return (
			<TouchableOpacity style={mainContainer} {...this.props}>
			<View>
				<Text style={textStyle}>{this.props.title}</Text>
			</View>
			</TouchableOpacity>
		);
	}
}

const styles = {
	mainContainer: {
		padding: 20,
		borderTopWidth: 1,
		borderColor: '#eeeeee',
	},
	textStyle: {
		color: colors.darkBlueColor
	}
};

export default SettingsRow;