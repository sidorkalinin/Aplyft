import { StyleSheet } from 'react-native';
import { colors } from '../../styles/theme';
import { viewportWidth } from '../../../variables';

const padding = 10;

export default StyleSheet.create({
	mainContainer : {
		backgroundColor: 'white',
		flex: 1,

	},
	subContainer : {
		
	},

	descriptionStyle : {
		color: colors.darkBlueColor,
		fontWeight: 'bold',
		fontSize: 18,
		backgroundColor: 'transparent',
		padding: padding,
		paddingLeft: 20,
		paddingTop: 40,
	},
	listTextStyle : {
		color : colors.lightGray
	},
	ItemContainerStyle : {
		flexDirection: 'row'
	},
	comingSoonContainer : {
        padding: 20,
        backgroundColor: colors.backgroundGray
    },
    comingSoonTextStyle : {
        color:'#bbbbbb',
        textAlign: 'center'
    },
    plusIconStyle : {
		position: 'absolute',
		top: 0,
		left: (viewportWidth / 2) + 15,
		width: 35,
		height: 35,
		borderRadius: 20,
		borderColor: 'white',
		borderWidth: 3,
		backgroundColor: 'red'
	},
	plusTextStyle : {
		paddingLeft: 5,
		marginTop: -6,
		fontSize: 30,
		color: 'white',
		fontWeight: 'bold',
		backgroundColor: 'transparent',
	},
	
});
