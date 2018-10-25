import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/theme';
import { viewportWidth } from '../../../../variables';

const padding = 40;

export default StyleSheet.create({
	mainContainer : {
		flex: 1,
		backgroundColor: colors.backgroundGray,
	},
	seperatorStyle : {
        height: 1,
        width: "100%",
        backgroundColor: "#eeeeee",
    },
    searchContainer : {
    	borderWidth: 0,
    	width:'100%',
    	backgroundColor: '#eeeeee',
    },
    inputStyle : {
    	padding: 20,
    },

    itemContainer: {
    	padding: 10,
        backgroundColor: 'white',
    }

});
