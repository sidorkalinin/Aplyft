import { StyleSheet } from 'react-native';
import { colors } from '../../styles/theme';
import { viewportWidth } from '../../../variables';

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
	logoStyle : {
		width: 100,
		resizeMode :'contain',

	},
	titleStyle : {
		color : 'white',
		fontWeight: 'bold',
		fontSize:20,
		paddingTop : 10,
		paddingBottom: 20,
	},
	inputsContainer : {
		backgroundColor: 'white',
		borderRadius:10,
		//padding: 10,
		width: viewportWidth-padding
	},

	inputOptionsStyles : {
		width: viewportWidth-padding,
		flexDirection : 'row',
		paddingTop:10,
		paddingBottom:10,
	},

	keepMeLogTextStyles : {
		alignItems:'flex-start',
		flex:1,
	},
	forgotTextStyles : {
		alignItems:'flex-end',
		flex:1,
		paddingTop: 5,
		paddingBottom: 5,
		
	},
	whiteText : {
		color: 'white'
	},
	bottomSectionStyle : {
		paddingTop: 40,
		alignItems: 'center'
	},

	socialMediaButtonContainer : {
		flexDirection : 'row',
		paddingTop: 10,
		// width: '50%',
	},

	loginButtonStyle : {
		width: viewportWidth-padding,
		backgroundColor : '#ed1e3c',
		padding: 15,
		borderRadius : 5,
		alignItems: 'center',
	},

	registerButtonStyle : {
		
		backgroundColor : '#181f31',
		width: 200,
		borderRadius: 3,
		padding:15,
		alignItems: 'center',
		justifyContent : 'center'
	},


	iconStyle : {
		width: 25,
		height: 25,
		resizeMode :'contain',
	}

});
