import React, { Component } from 'react';
import {
	View,
	Text
} from 'react-native';
import { connect } from 'react-redux';

import { loginUser } from '../../actions';

class calendarScreen extends Component {

	render () {
		return (
			<View>
				<Text> this is the calendar screen</Text>
				<Text
					onPress={ () => this.props.loginUser() }
					>Press to login</Text>
			</View>
		);
	}

}

export default connect(null, {
	loginUser
})(calendarScreen);