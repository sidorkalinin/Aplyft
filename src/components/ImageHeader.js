import React, { Component } from 'react';
import {
	View,
	ImageBackground
} from 'react-native';


class ImageHeader extends Component {

	render () {
		return (
			<ImageBackground 
				style={{
				height: 64,
				width: null,
				resizeMode:'center',
				borderBottomWidth: -200
			}}
			source={require('../assets/images/header-background.jpg')}
			>
			<Text>hiiiiiii</Text>
			</ImageBackground>);
	}
}

export default ImageHeader;