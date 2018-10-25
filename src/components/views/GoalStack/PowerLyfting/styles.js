import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/theme';
import { viewportWidth } from '../../../../variables';

const padding = 10;

export default StyleSheet.create({
	
	itemSeperatorStyle : {
		height: 1,
		backgroundColor: '#eeeeee',
	},
	ItemTextContainer: {
		flex: 1,
	},
	ItemContainer : {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
		backgroundColor: 'white',
	},
	ItemRadioTextContainer : {

	},
	ItemTextStyle:{
		// borderWidth:1,
		color: colors.lightGray
	},
	mainContainer : {
		backgroundColor: colors.backgroundGray,
		flex:1,
	},
	itemRightButtonContainer:{
		flexDirection:'row',
		alignItems:'center',
	},
	rightButtonImage : {
		width: 20,
		height: 20,
	},
	rightButton : {
		width: 30,
		height: 30,
		borderWidth: 1,
		borderColor: '#dddddd',
		borderRadius: 15,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center'
	},

	descriptionStyle : {
		color: colors.darkBlueColor,
		fontWeight: 'bold',
		fontSize: 18,
		backgroundColor: 'transparent',
		padding: padding,
		paddingLeft: 20,
		paddingTop: 10,
	},

	detailContainer : {
		backgroundColor: 'white'
	},

	inputContainer: {
		flexDirection: 'row',
		padding: 20,
		borderBottomWidth:1,
		borderColor: '#eeeeee'

	},
	ItemInputStyle : {
		borderBottomWidth: 1,
		borderColor:'red',
		backgroundColor: 'white',
		padding: 5,
		flex:1,
		textAlign:'right'
	},
	labelStyle: {
		flex:1,
		paddingRight:6,
		paddingLeft: 6,
	},
	inputC : {
		padding:5,
		backgroundColor:'#eeeeee',
		width: 150
	}
});
