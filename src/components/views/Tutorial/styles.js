import { StyleSheet } from 'react-native';
import { colors } from '../../styles/theme';
import { viewportWidth } from '../../../variables';

export default StyleSheet.create({

	itemImage : {
		borderRadius : 2,
		width: viewportWidth-125, 
		height: 350,
	},

	mainContainer : {
		flex : 1,
		backgroundColor: 'white'
	},
	carouselContainer : {
		flexGrow :0,
		paddingBottom: 4
	},
	dotStyle :{
		borderWidth:1,
		borderColor:'#181f31',
		borderRadius:8,
		width:8,
		height:8
	},
	titleContainer : {
		paddingTop : 50,
		paddingBottom : 40,
		alignItems: 'center'
	},
	titleWhite : {
		color : 'black',
		fontSize: 20,

	},
	titleDark : {
		color : colors.primaryColor,
		fontSize : 18,
		fontWeight: 'bold',
	},
	buttonsContainer : {
		alignItems: 'center',
		paddingTop:20,
	},
	buttonStyle : {
		
		backgroundColor : '#181f31',
		width: 200,
		borderRadius: 3,
		padding:15,
		alignItems: 'center',
		justifyContent : 'center'
	},
	loginButtonStyle : {
		paddingTop:24,
		color: '#181f31',
		textDecorationLine : 'underline',

	},

});
