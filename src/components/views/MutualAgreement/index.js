import React, { Component } from 'react';
import {
	View,
	Text
} from 'react-native';
import { connect } from 'react-redux';
import Styles from './styles';

import { CHANGE_PHOTO_USER } from '../../../variables';

class mutualAgreementView extends Component {

	render () {

		const { 
			mainContainer
		} = Styles;
		
		return (
			<View>
				<Text>Mutual Agreement</Text>
			</View>
		);
	}

}

const mapsToProps = ({ MutualAgreement }) => {
	return MutualAgreement;
};

export default connect(mapsToProps, {
	
})(mutualAgreementView);