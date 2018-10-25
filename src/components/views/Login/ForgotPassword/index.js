import React, { Component } from 'react';
import {
	View,
	Text,
	Alert,
	ImageBackground,
	Image,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Styles from './styles';
import {
	changeEmail,
	goBack,
	resetSubmit
} from './actions';
import InputField from '../../../InputField';

class ForgotPassword extends Component {

	state = {
		email : ''
	};

	_onChangeText = (value) => {
		this.state.email = value;
		// this.props.changeEmail.bind(this)
	}

	_onSubmit = () => {
		this.props.resetSubmit(this.state.email);
	};

	render () {

		const {
			mainContainer,
			logoStyle,
			titleStyle,
			inputsContainer,
			iconStyle,
			bottomSectionStyle,
			registerButtonStyle,
		} = Styles;

		return (
			<ImageBackground 
				resizeMode="cover"
				style={ mainContainer }
				source={require('../../../../assets/images/background.jpg')}
				>

				<Image
					style={logoStyle}
					source={require('../../../../assets/images/logo-white.png')}
				/>
				<Text style={titleStyle}>FORGOT PASSWORD</Text>

				<KeyboardAvoidingView style={inputsContainer} behavior="padding">
					<View style={{padding:10}}>
					<InputField
						onChangeText={this._onChangeText.bind(this)} 
						placeholder = 'E-mail'
						autoFocus={false}
						autoCorrect={false}
						iconComponent = {
							<Image
								style={iconStyle}
								source={require('../../../../assets/images/email-icon.png')}
							/>
						}
						/>
					</View>

				</KeyboardAvoidingView>

				<View style={bottomSectionStyle}>
					
					<TouchableOpacity
						style={registerButtonStyle}
						onPress={this._onSubmit.bind(this)} >
						<Text style={{color:'white', fontWeight:'bold'}}>Send Reset Confirmation</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={registerButtonStyle}
						onPress={this.props.goBack.bind(this)} >
						<Text style={{color:'white', fontWeight:'bold'}}>GO BACK</Text>
					</TouchableOpacity>

				</View>

			</ImageBackground>
		);
	}

}

const mapStateToProps = ({user}) => {
	return {
		email : 'kkkk'
	}
};

export default connect(mapStateToProps, {
	changeEmail,
	goBack,
	resetSubmit
})(ForgotPassword);