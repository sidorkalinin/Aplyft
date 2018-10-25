import React, { Component } from 'react';
import {
	View,
	Text,
	Image
} from 'react-native';

// styles
import { colors } from './styles/theme';


class Rating extends Component {

	// if some of the props werent passed, this will handle the creation for their default values
	static defaultProps = {
		stars : 0,
	}

	renderStars (number) {

		const { imageStyle,mainContainer } = styles;
		let stars = [];

		for(var i=0; i<5; i++)
		{
			if (number <= i) {
				stars.push(
					<Image
						style={imageStyle}
						source={require('../assets/images/rating-star-empty-icon.png')}
					/>
				);
			}else{
				stars.push(
					<Image
						style={imageStyle}
						source={require('../assets/images/rating-star-filled-icon.png')}
					/>
				);
			}

		}
		return stars;

	}

	render () {

		const {
			mainContainer,
			textStyle
		} = styles;

		if (this.props.showStars)
			return (
				<View style={mainContainer}>
					{this.renderStars(this.props.stars)}
					<Text style={textStyle}>
						{this.props.stars}/5
					</Text>
				</View>
			);

		return (<View />);
	}
}

const styles = {
	mainContainer : {
		flexDirection: 'row',
		// paddingBottom: 10
	},
	imageStyle : {
		width : 15,
		height: 15,
		margin: 1
	},
	textStyle : {
		paddingLeft: 12,
		fontWeight: 'bold',
		color: colors.darkBlueColor
	}
};

export default Rating;