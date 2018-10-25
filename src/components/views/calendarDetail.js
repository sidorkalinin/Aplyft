import React, { Component } from 'react';
import {
	View,
	Text
} from 'react-native';
import { connect } from 'react-redux';

import { loginUser } from '../../actions';

class calendarDetail extends Component {

	render () {
		return (
			<View>
				<Text>this is the calendar Details</Text>
			</View>
		);
	}

}

export default connect(null, {
	loginUser
})(calendarDetail);