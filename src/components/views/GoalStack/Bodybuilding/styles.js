import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/theme';
import { viewportWidth } from '../../../../variables';

const padding = 10;

export default StyleSheet.create({
	scrollviewStyle :{
		flex:1
	},
	mainContainer : {
		backgroundColor: 'white',
		flex:1
	},
	seperatorStyle:{
		height: 1,
		width: '100%',
		backgroundColor: '#eeeeee'
	},
	itemSeperatorStyle : {
		height: 1,
		backgroundColor: "#eeeeee"
	},
	ItemContainer: {
		padding: 20,
		flexDirection:'row',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	itemIconStyle : {
		width: 40,
		height: 40,
	},
	itemRadioTitleStyle : {
		paddingLeft: 20,
		color : colors.lighGray,
		fontSize: 13,
	},

	/* only for radio */
	ItemRadioTextContainer : {
		flex: 1
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

	modal: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'transparent',
      padding: 30,
   	},

   	percentageStyle : {
   		padding: 5,
   		borderBottomWidth: 1,
   		flexDirection:'row',
   	},

   	infoText : {
   		color: 'red',
   		padding: 5,
   	},
	detailContainer : {
		flexDirection: 'row',
		width:'90%',
		padding: 20
	},
	inputStyle : {
		width: 50,
		textAlign:'right', 
		paddingRight:5
	}
	
});
