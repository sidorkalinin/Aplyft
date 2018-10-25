import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Styles from './styles';

import { 
	continueProcess, 
} from './actions';

class UserProfileCongratulations extends Component {

	_onPressContinue = () => {
		this.props.navigation.goBack(null);
		this.props.navigation.goBack(null);
	};

	render () {

		const {
			mainContainer,
			redText,
			infoContainer,
			normalText,
			continueButtonStyle,
			continueTextStyle
		} = Styles;

		return (
			<View style={mainContainer}>
				<Text style={redText}>YOU ARE NOW AN</Text>
				<Text style={redText}>OFFICIAL APLYFTER!</Text>

				<View style={infoContainer}>
					<Text style={normalText}>Thank you for choosing us.</Text>
					<Text style={normalText}>Let's connect you with global fitness experts.</Text>
					<Text style={normalText}>Meanwhile, enjoy our free daily workouts.</Text>
				</View>

				<TouchableOpacity style={continueButtonStyle} onPress={this._onPressContinue.bind(this)}>
					<Text style={continueTextStyle}>Continue</Text>	
				</TouchableOpacity>

			</View>
		);
	}

}


export default connect(null, {
	continueProcess, 
})(UserProfileCongratulations);