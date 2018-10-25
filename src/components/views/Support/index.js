import React from 'react';
import {
	View,
	Text,
	Image,
	ActivityIndicator,
	Alert,
	ScrollView,
	AsyncStorage,
	TouchableOpacity,
	Linking
} from 'react-native';

import { APP_VERSION } from '../../../variables';


class Support extends React.Component {

	static navigationOptions = {
	    headerTintColor: 'white',
	};

	state = {
		token: '',
		checking : true,
		latest : true,
	};

	render() {
	    return (
		      	<View style={styles.container}>
		      		<Image
		      			resizeMode='contain'
	                    source={require('../../../assets/images/logo.png')}
	                    style={{width:200,height:80}}
	                />
	                <Text style={styles.paragraph}>
	                	Welcome to APLYFT{"\n"}Should you require any assistance or have any inquiry please send an email to
	                </Text>
	               	<TouchableOpacity onPress={()=>Linking.openURL('mailto:hello@aplyft.com?subject=Mobile App Support&body=')}>
	               		<Text>hello@aplyft.com</Text>
	               	</TouchableOpacity>

	                <View style={styles.versioningContainer}>
			        	<Text style={styles.versioning}>
			          		Version {APP_VERSION}
			        	</Text>
		        	</View>
		        	
		        	<Text style={styles.copyright}>
		          		@2018. All rights reserved.
		        	</Text>

		        	
		      </View>
	    );
	 }
}

const styles = {
	container: {
	    flex: 1,
	    alignItems: 'center',
	    justifyContent: 'center',
	},
	paragraph: {
	    margin: 20,
	    fontSize: 14,
	    textAlign: 'center',
	    color: '#34495e',
	},
	versioningContainer :{
		flexDirection: 'row'
	},
	versioning: {
	    margin: 10,
	    fontSize: 14,
	    textAlign: 'center',
	    color: '#34495e',
	},
	copyright : {
		fontSize: 11,
	    color: '#34495e',

	}
}

export default Support;