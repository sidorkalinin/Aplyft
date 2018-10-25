import React, { Component } from 'react';
import {
	View,
	Text,
	ImageBackground,
	Image,
	TouchableOpacity,
} from 'react-native';
import { colors } from '../../../styles/theme';
import { viewportWidth } from '../../../../variables';
import { connect } from 'react-redux';

class goalHeader extends Component {

	renderRight () {
		if(this.props.LeftButtonComponent) {
			return (
				<TouchableOpacity style={styles.leftButtonContainer} onPress={this.props.LeftPress}>
					{this.props.LeftButtonComponent}
				</TouchableOpacity>
			);
		}
	}

	renderLeft () {
		if(this.props.RightButtonComponent) {
			return (
				<TouchableOpacity style={styles.rightButtonContainer} onPress={this.props.RightPress}>
					{this.props.RightButtonComponent}
				</TouchableOpacity>
			);
		}
	}

	render () {	

		const { 
			titleStyle,
			headerStyle,
			profileImageContainer,
			profileImageStyle,
			plusIconStyle,
			plusTextStyle,
			rightButtonContainer,
			leftButtonContainer

		} = styles;

		return (
			<View>
				<ImageBackground 
					resizeMode="cover"
					style={headerStyle}
					source={require('../../../../assets/images/header-light-background.jpg')} >
						<View style={{backgroundColor:'transparent', flexDirection:'row', width:'100%'}}>
							{this.renderRight()}
							{this.renderLeft()}
						</View>
						
						<View style={{alignItems:'center' }}>
							<Text style={titleStyle}>WELCOME {this.props.FullName}</Text>
						</View>

				</ImageBackground>

				<View style={profileImageContainer}>
					<View >
						{ this.props.user.imageURL == "" ?
						<Image
							style={profileImageStyle}
		          			source={{uri: this.props.user.imageURL || ""}}
							/>
							:
						<Image
							style={profileImageStyle}
		          			source={require('../../../../assets/images/logo-gray-bg.png')}
							/>
						}
						
						
					</View>
				</View>
			</View>
		);

	}
};

const styles = {
	headerStyle : {
		height:160,
		alignItems: 'center',
		paddingTop: 25,
	},
	titleStyle : {
		color: colors.redColor,
		fontSize: 18,
		fontWeight: 'bold',
		backgroundColor: 'transparent',
	},
	rightButtonContainer : {
		flex:1,
		padding:10, 
		alignItems:'flex-end'
	},
	leftButtonContainer : {
		flex:1,
		padding:10, 
		paddingTop:5,
		alignItems:'flex-start'
	},
	profileImageContainer : {
		// height: 120,
		// width: '100%',
		// position: 'absolute',
		// bottom: -45,
		justifyContent:'center',
		paddingBottom: 5,
	},
	profileImageStyle : {
		width: 120,
		height: 120,
		borderRadius: 60,
		borderColor: 'white',
		borderWidth: 3,
		position: 'absolute',
		bottom: -45,
		left: (viewportWidth / 2) - 65,
		backgroundColor: 'transparent',
	},
	plusIconStyle : {
		position: 'absolute',
		top: 0,
		left: (viewportWidth / 2) + 15,
		width: 35,
		height: 35,
		borderRadius: 20,
		borderColor: 'white',
		borderWidth: 3,
		backgroundColor: 'red'
	},
	plusTextStyle : {
		paddingLeft: 5,
		marginTop: -6,
		fontSize: 30,
		color: 'white',
		fontWeight: 'bold',
		backgroundColor: 'transparent',
	},
};

const mapStateToProps = ({user}) => {
	return {
		user: user.user
	}
};

export default connect(mapStateToProps,{

})(goalHeader);