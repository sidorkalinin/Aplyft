import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/theme';
import { viewportWidth } from '../../../../variables';

const padding = 40;
export default StyleSheet.create({

	mainContainer : {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor:'white',
	},
	infoContainer :{
		paddingTop: 20,
		paddingBottom: 20,
		alignItems: 'center',
	},
	redText : {
		fontSize: 25,
		fontWeight:'bold',
		color: 'red'
	},
	normalText: {
		paddingTop:5,
		paddingBottom:5,
		fontSize: 14,
		fontWeight:'bold',
		color: colors.darkBlueColor
	},

	continueButtonStyle : {
		padding: 10,
		width: '70%',
		backgroundColor: 'red',
		borderRadius: 10,
		justifyContent:'center',
		alignItems:'center',
	},
	continueTextStyle : {
		color: 'white',
		fontWeight: 'bold',
		fontSize:18
	}

});
