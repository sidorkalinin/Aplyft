import React, { PureComponent } from 'react';
import {
	View,
	Text,
	Image
} from 'react-native';
import { colors } from '../../../../styles/theme';

class Item extends PureComponent {
	

	render () {

		const {
			mainContainer,
			textStyleContainer,
			iconStyleContainer,
			textStyle,
			iconStyle,
			logoStyle
		} = styles;

		return (
			<View style={mainContainer}>
				<View style={textStyleContainer}>
					<Text style={textStyle}>Gain Speed</Text>
				</View>

				<View style={iconStyleContainer}>
					<View style={iconStyle}>
						{ this.props.selected  ?
							<Image
								style={logoStyle}
								source={require('../../../../../assets/images/check-red.png')}
							/>
							: null
						}
					</View>
				</View>
			</View>
		);
	}

}

const styles = {
	mainContainer : {
		paddingTop:12,
		paddingBottom: 12,
		flexDirection: 'row',
		alignItems:'center',
		borderBottomWidth : 1,
		borderBottomColor: '#dddddd'

	},
	textStyleContainer : {
		flex: 1,
	},
	textStyle: {

	},
	iconStyleContainer : {

	},
	iconStyle : {
		height: 30,
		width: 30,
		borderWidth: 1,
		borderColor: '#dddddd',
		borderRadius: 15,
		alignItems:'center',
		justifyContent:'center'
	},
	logoStyle : {
		resizeMode : 'contain',
		width: 20,
		height: 20
	}
	
};

export default Item;