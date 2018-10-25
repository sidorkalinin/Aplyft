import { StyleSheet } from 'react-native';
export default StyleSheet.create({

profileBodySection: {
        flex:1,
        flexDirection:'column',
        paddingLeft:10,
        paddingRight:10,
        marginBottom:10,
        backgroundColor: '#fff',
        


    },
    
    profileDetailSection: {
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'flex-end',

        
        
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

    editVideoStyle:{
        backgroundColor:'transparent',
        color:'#ed1d37',
        fontSize:14,
        paddingRight:5,
        textDecorationLine:'underline',

    },

    videoPlayIconStyle : {
        width:50,
        height: 50,
        marginBottom:'10%',
    },
    
    
    infologoStyle: {
        width: 35, 
        height: 35,
        tintColor:'#ed1d37',

    },

    sectionBodyText: {
        color:'#727272',
        fontSize: 12,
        marginTop:3.5,
        textAlign:'left',
        //flex:1,
        

    },

    PriceText: {
        color:'red',
        fontWeight:'bold',
        fontSize: 12,
        marginTop:3.5,
        textAlign:'center',
        marginRight:10,
        marginLeft:10,
       
        

    },

    WeeksText: {
        color:'#cccccc',
        fontSize: 12,
        marginTop:3.5,
        textAlign:'center',
        marginLeft:10,

    },

    LangText: {
        color:'#777777',
        fontSize: 11,
        marginTop:3.5,
        textAlign:'center',
        marginLeft:10,
        fontWeight:'bold',

    },

    sectionBodyTextStructure:{
        flexDirection: 'column',
        flex:1,
        marginTop:10,
        marginBottom:10,

    },

    sectionHeaderText: {
        fontWeight: 'bold',
        color:'#000',
        fontSize: 15,

    },

    sectionBodyRed: {
        color:'red',
        fontSize: 14,
        marginTop:1

    },

    verificationText:{
        color:'red',
        fontSize: 11,
        marginTop:1,
        fontWeight:'bold',
    },


     EditText: {
        color:'red',
        fontSize: 11,
        marginTop:1,


    },

    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 3,
        paddingBottom: 0,
    },

contentContainer: {
        paddingVertical: null,
        flexDirection:'column',
        backgroundColor: "#fff",
    },

});