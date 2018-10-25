import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	ImageBackground,
	TouchableOpacity,
	StatusBar,
	ScrollView,

} from 'react-native';
import { connect } from 'react-redux';
import Styles from './styles';

import { 
	resendEmail, 
	gotoLogin
} from './actions';

class registerConfirmationScreen extends Component {

	render () {

		const {
			mainContainer,
			logoStyle,
			scrollViewStyle,
			whiteText,
			sucessIconStyle,
			successIconContainerStyle,
			emailStyle,
			descriptionStyle,
			loginButtonStyle,
			wrongEmailContainerStyle,
			wrongEmailTitle,
			wrongEmailText,
			loginButtonContainerStyle,
			sucessImageStyle
		} = Styles;

		return (
			<ImageBackground 
				resizeMode="cover"
				style={ mainContainer }
				source={require('../../../../assets/images/background.jpg')}
				>
				
				<StatusBar barStyle="light-content"/>

			<ScrollView
				contentContainerStyle={scrollViewStyle}
				showsVerticalScrollIndicator={false} >
				
				<Image
					style={logoStyle}
					source={require('../../../../assets/images/logo-white.png')}
				/>

				<View style={successIconContainerStyle}>
					<View style={sucessIconStyle}>
						<Image
							style={sucessImageStyle}
							resizeMode='contain'
							source={require('../../../../assets/images/blue-check.png')}
						/>
					</View>
				</View>

				<Text style={emailStyle}>{this.props.email}</Text>
				<Text style={descriptionStyle}>{this.props.fullName} as soon as you check the link sent to your email to confirm your account, we can get started.</Text>

				<View style={wrongEmailContainerStyle}>
					<Text style={wrongEmailTitle}>Wrong email?</Text>
					<Text style={wrongEmailText}>Didn't recieve the link? Check your spam folder or resend confirmation email.</Text>
				</View>

				<View style={loginButtonContainerStyle}>
					<TouchableOpacity
						style={loginButtonStyle}
						onPress={()=>{
							this.props.navigation.goBack(null);
							this.props.navigation.goBack(null);
						}}>
						<Text style={whiteText}>SIGN IN</Text>
					</TouchableOpacity>
				</View>
				
			</ScrollView>
				
			</ImageBackground>
		);
	}

}

const mapStateToProps = ({ register }) => {
	return {
		email : register.email,
		fullName: register.first_name+" "+register.last_name
	};	
};

export default connect(mapStateToProps, {
	resendEmail, 
	gotoLogin
})(registerConfirmationScreen);