import { StyleSheet } from 'react-native';
import { colors } from '../../styles/theme';
import { viewportWidth } from '../../../variables';

const padding = 40;

export default StyleSheet.create({
	mainContainer:{
		flex: 1,
		backgroundColor: 'white',
	},
	preview: {
		flex:1,
		// position: 'relative'
		borderWidth: 1,
		borderColor: 'white',
	},

	snapButtonImage : {
		position: 'absolute',
		width: 70,
		height: 70,
		bottom : 30,
		right: '50%',
		marginRight: -35,
		backgroundColor: 'white',
		borderRadius: 35,
	},

	selfieButtonContainer : {
		position: 'absolute',
		
		bottom : 30,
		right: 30,
	},

	selfieImage : {
		width: 40,
		height: 40,
	},
	cancelButtonContainer : {
		position: 'absolute',
		top : 30,
		left: 30,
		backgroundColor: 'transparent',
		// borderWidth: 1,
		// borderColor: 'white',
	},

	cancelTextStyle : {
		color :'white'
	},

	takeAnotherContainer:{
		position: 'absolute',
		width: 100,
		bottom : 30,
		right: 30,
		marginRight: -50,
	},

	UploadImageContainer : {
		position: 'absolute',
		width: 100,
		bottom : 30,
		right: '50%',
		marginRight: -50,
	}


});