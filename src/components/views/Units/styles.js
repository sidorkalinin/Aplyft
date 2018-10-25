import { StyleSheet } from 'react-native';
import { colors } from '../../styles/theme';
import { viewportWidth } from '../../../variables';

export default StyleSheet.create({

	mainContainer : {
		flex : 1,
		backgroundColor: 'white'
	},
	InfoStyle : {
		padding: 20,
		color:'#bbbbbb',
		textAlign:'center'
	},
	radioButtonContainer : {
		borderTopWidth:1,
		borderColor: '#eeeeee',
		flexDirection: 'row',
		paddingTop: 20,
		paddingBottom: 20,
		width:'100%',
	},
	radioButtonLeftContainer : {
		flex: 2,
		alignItems: 'center',
	},
});
