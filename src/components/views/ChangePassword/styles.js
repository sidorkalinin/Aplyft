import { StyleSheet } from 'react-native';
import { colors } from '../../styles/theme';
import { viewportWidth } from '../../../variables';

const padding = 40;

export default StyleSheet.create({
	mainContainer:{
		flex:1,
		backgroundColor: 'white',
	},
	inputStyle:{
		padding: 20 ,
	},
	rowStyle:{
		borderTopWidth:1,
		borderColor: '#eeeeee'
	}
});
