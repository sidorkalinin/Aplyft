import React, { Component } from 'react';
import {
	View,
	Text,
	Image
} from 'react-native';

class SocialMediaButton extends Component {

	renderFacebook () {
		
		const { mainContainer, imageContainer, textContainer, textStyle } = styles;
		
		return (
			<View style={[mainContainer, { backgroundColor: '#306199'}]}>
				<Image
					style={[imageContainer]}
					source={require('../assets/images/fb-icon.png')} />
				<View style={textContainer}>
					<Text style={textStyle}>Facebook</Text>
				</View>
			</View>
		);
	}

	renderGooglePlus () {
		const { mainContainer, imageContainer, textContainer, textStyle } = styles;
		
		return (
			<View style={[mainContainer, { backgroundColor: '#e93f2e'}]}>
				<Image
					style={[imageContainer]}
					source={require('../assets/images/googleplus-icon.png')} />
				<View style={textContainer}>
					<Text style={textStyle}>Google</Text>
				</View>
			</View>
		);
	}

	renderCorrect () {

		if(this.props.facebook){
			return this.renderFacebook();
		}else if(this.props.googleplus) {
			return this.renderGooglePlus();
		}

	}

	render () {

		return (
			<View>
			{this.renderCorrect()}
			</View>
		);

	}

}

const styles = {
	mainContainer: {
		flexDirection: 'row',
		height: 40,
		borderRadius: 4,
		alignItems: 'center',
		padding: 10,
		width: '100%',
	},
	imageContainer: {
		width: 30,
		height: 30,
		resizeMode: 'contain'
	},
	textContainer: {
		alignItems: 'flex-end',
		flex:1,
	},
	textStyle : {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	facebookButtonStyle : {
		padding: 10,
		backgroundColor : '#306199',
		borderRadius : 4
	},
	googleButtonStyle : {
		padding: 10,
		backgroundColor : '#e93f2e',
		borderRadius : 4
	},
};

export default SocialMediaButton;