import { StyleSheet } from 'react-native';
import { colors } from '../../styles/theme';
import { viewportWidth } from '../../../variables';

export default StyleSheet.create({
	mainContainer : {
		flex: 1,
		backgroundColor: colors.whiteColor,
	},
	seperatorStyle:{
		height: 1,
		width: '100%',
		backgroundColor: '#eeeeee',
	},
	emptyComponentContainer:{
		padding: 20,
	},
});