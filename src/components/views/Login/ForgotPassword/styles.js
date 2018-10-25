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
	iconStyle : {
		width: 25,
		height: 25,
		resizeMode :'contain',
	},
	bottomSectionStyle : {

	},
	registerButtonStyle : {
		alignItems: 'center',
		padding:10,
	},
	
});