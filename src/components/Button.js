import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native';

// styles
import { colors } from './styles/theme';


class Button extends Component {

	
	render () {

		const {
			mainContainerB,
			mainContainerG,
			textStyleG,
			textStyleB,
		} = styles;

		return (
			
			<TouchableOpacity onPress={ this.props.onPress }>
				<View style={this.props.Gray ? mainContainerG : mainContainerB}>
					<Text style={this.props.Gray ? textStyleG : textStyleB}>{this.props.children}</Text>
				</View>
			</TouchableOpacity>
		);
	}

}

const styles = {
	mainContainerB : {
		borderRadius : 5,
		backgroundColor: colors.darkBlueColor,
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: 20,
		paddingLeft: 20,
		marginRight: 10,
	},
	mainContainerG : {
		borderRadius : 5,
		borderWidth: 2,
		borderColor: colors.lightGray,
		backgroundColor: 'white',
		paddingTop: 3,
		paddingBottom: 3,
		paddingRight: 20,
		paddingLeft: 20,
		marginRight: 10,
	},
	textStyleB : {
		color : 'white',
		fontSize: 15,
		fontWeight: '400'
	},
	textStyleG : {
		color : colors.lightGray,
		fontSize: 15,
		fontWeight: '400'
	}
};

export default Button;