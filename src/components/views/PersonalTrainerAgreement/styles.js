import { StyleSheet } from 'react-native';
import { colors } from '../../styles/theme';
import { viewportWidth } from '../../../variables';

export default StyleSheet.create({
	mainContainer : {
		flex: 1,
	},
	emptyComponentContainer:{
		padding: 20,
	},
	seperatorStyle : {
        height: 6,
        width: "100%",
        backgroundColor: "#eeeeee",
    },
    itemContainer : {
    	padding: 20,
    	backgroundColor: 'white',
    	flexDirection: 'row',

    },
    itemLeftContainer : {
    	flex:1,
    },
    centerBold: {
        fontWeight: 'bold',
        fontSize:16,
        padding: 5,
        textAlign: 'center'
    },
    titleContainer : {
        padding: 20,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor:'#eeeeee'
    },
});