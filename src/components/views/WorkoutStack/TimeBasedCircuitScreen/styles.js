import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/theme';
import { viewportWidth } from '../../../../variables';

export default StyleSheet.create({

	mainContainer : {
		flex: 1,
		backgroundColor: 'white',
	},
	timerContainer : {

		padding: 5,
		paddingBottom: 0,
		backgroundColor: '#eeeeee',
		alignItems: 'center',
		justifyContent: 'center',
		// borderWidth: 1,
	},
	buttonContainerStyle:{
		// borderWidth:1,
		padding: 10,
		width:'70%',
		height: 65
	},
	timerImageStyle: {
		width: 30,
		height: 30
	},
	timerTextContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		// borderWidth:1,

	},
	timerTextStyle: {
		fontSize: 50,
		color: colors.darkBlueColor,
		padding:5,
		
	},
	recoveryTextStyle: {
		
	},
	recoveryTextContainer: {
		padding: 10,
		paddingTop:0,
		alignItems:'center',

	},
	detailsContainer: {
		flex:1,
		// borderWidth:1,
	},

	itemSeperatorStyle : {
		height: 4,
		backgroundColor: '#eeeeee',
	},
	itemContainer : {
		padding:15,
	},
	itemTitle : {
		paddingBottom: 10,
		fontSize: 15,
		fontWeight: 'bold',
		color: colors.darkBlueColor
	},

	modal: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'transparent',
      padding: 30,

   	},
   	valuesDescriptionStyle : {
   		fontSize: 12,
   		color: colors.darkGray
   	},
});