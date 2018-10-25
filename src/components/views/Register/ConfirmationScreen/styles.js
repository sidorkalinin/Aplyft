import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/theme';
import { viewportWidth } from '../../../../variables';

const padding = 40;
export default StyleSheet.create({

	mainContainer : {
		flex: 1,
		width : null,
		height: null,
		backgroundColor: 'transparent',
		paddingTop: 10,
		alignItems: 'center',
	},
	scrollViewStyle : {
		flexGrow : 1,
		alignItems : 'center'
	},
	logoStyle : {
		width: 100,
		resizeMode :'contain',
	},
	
	whiteText : {
		color: 'white'
	},

	sucessIconStyle : {
		width: 125,
		height: 125,
		borderRadius: 70,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center'
	},
	sucessImageStyle:{
		width: 70,
		height:70,
	},
	successIconContainerStyle: {
		paddingBottom: 10,
	},
	emailStyle : {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
		paddingBottom: 0,
	},
	descriptionStyle:{
		color: 'white',
		fontSize: 14,
		width: viewportWidth-padding,
		padding: 10,
		paddingBottom: 20,
		textAlign:'center',

	},
	loginButtonContainerStyle:{
		paddingTop: 20,
	},
	loginButtonStyle : {
		width: viewportWidth-padding,
		backgroundColor : '#ed1e3c',
		padding: 13,
		borderRadius : 5,
		alignItems: 'center'
	},

	wrongEmailContainerStyle: {
		backgroundColor: 'white',
		borderRadius: 10,
		width: viewportWidth-padding,
		padding: 25,
		textAlign:'center',
		paddingBottom: 10,
	},
	wrongEmailTitle: {
		color: 'black',
		fontSize: 18,
		fontWeight:'bold',
		paddingBottom: 10,
		textDecorationLine:'underline',
		textAlign:'center'
	},
	wrongEmailText:{
		color: 'black',
		fontSize: 13,
		paddingBottom: 10,
		textAlign:'center'

	}


});
