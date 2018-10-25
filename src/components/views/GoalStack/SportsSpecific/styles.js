import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/theme';
import { viewportWidth } from '../../../../variables';

const padding = 10;

export default StyleSheet.create({
	mainContainer : {
		backgroundColor: colors.backgroundGray,
		flex: 1,
	},
	subContainer : {
		// borderWidth:1,
		flex:1
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
	listTextStyle : {
		color : colors.lightGray
	},
	ItemContainer :{
		backgroundColor: 'white',

		paddingLeft: 80,
		paddingRight: 20,
	},
	ItemContainerStyle : {
		paddingTop:10,
		paddingBottom:10,

		flexDirection: 'row',
		alignItems:'center',
		borderBottomWidth:1,
		borderColor: '#eeeeee'
	},

	logoStyle : {
		width: 30,
		height: 30,
	},
	secionHeadContainer:{
		padding: 20,
		flexDirection: 'row',
		// borderTopWidth:1,
		borderBottomWidth:1,
		borderColor: '#eeeeee',
		alignItems:'center',
		backgroundColor: 'white',
	},
	sectionHeadIcon:{
		width: 35,
		height: 35,
	},
	sectionHeadRightContainer :{

	},
	itemTitle:{
		flex:1,
		color: colors.lightGray,
	},
	sectionHeadTitle:{
		paddingLeft: 20,
		color: colors.lightGray,
		flex:1,

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
	rightButtonImage : {
		width: 20,
		height: 20,
	},
	itemRightButtonContainer:{
		flexDirection:'row',
		alignItems:'center',
	},
	sectionFooterContainer:{
		backgroundColor: 'white',
		padding:15,
		paddingLeft: 30,
		paddingRight:30,
	},
	selectAllTextStyle :{
		fontSize: 10,
		paddingRight: 5,
		color:colors.lightGray
	}
	
});
