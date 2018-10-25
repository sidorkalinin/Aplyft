import { StyleSheet } from 'react-native';
import { viewportWidth } from '../../../../../variables';

export default StyleSheet.create({
  
    contentContainer: {
 	      paddingVertical: null,
        flexDirection:'column',
        backgroundColor: "#fff",
    },
    HeaderStyle:{
  		flex:1, 
  		height: 200,
    },
    HeaderpicStyle:{
 		flex:1, 
 		width: null, 
 		height: null, 
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerdescStyle: {
        //borderBottomWidth: 2,
        marginLeft: 20,
        marginRight:20,
        backgroundColor:'transparent',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: '#eeeeee',
        position: 'relative',
        marginTop:15,
        marginBottom:15
        //borderWidth: 2,
    },

    HeaderText: {
        fontWeight: 'bold',
        color:'#181f31',
		fontSize: 17,
	    //marginTop: 8,
		//marginBottom:14,
    },

    infoText: {
        color:'#181f31',
        fontSize: 13,
        //marginTop: 9,
        //marginBottom:14,
    },

    BodyText: {
		color:'#4f5565',
		fontSize: 15,
		marginTop:8,
		marginBottom:8,
    },

    videoPlayIconStyle : {
        position:'absolute',
        left: viewportWidth/2-25, 
        top: 75,
        width:50,
        height: 50,
    },

    bodydescStyle: {
        //borderBottomWidth: 2,
        marginLeft: 20,
        marginRight:20,
        backgroundColor:'transparent',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#eeeeee',
        position: 'relative',
        //borderWidth: 2,
    },

    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

});