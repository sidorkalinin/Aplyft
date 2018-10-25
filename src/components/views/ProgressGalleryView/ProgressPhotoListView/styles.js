import { StyleSheet } from 'react-native';
import { colors } from "../../../styles/theme";
import { viewportWidth } from '../../../../variables';

export default StyleSheet.create({
	mainContainer : {
		flex: 1,
	},
	gridView:{
		padding: 0
	},
	itemContainer: {
	    height: 100,
	    padding: 3,
	},
	itemStyle:{
	    flex: 1,
	    justifyContent: 'center',
	    alignItems:'center',
	},
	itemName: {
	    fontSize: 16,
	    color: 'black',
	    fontWeight: '600',
	},
	itemCode: {
	    fontWeight: '600',
	    fontSize: 12,
	    color: 'black',
	},
});