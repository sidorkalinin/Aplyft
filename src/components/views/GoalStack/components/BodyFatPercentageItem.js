import React, { Component } from 'react';
import {
	View,
    Text,
    Image,
    TouchableOpacity
    
} from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../../styles/theme';

class BodyFatPercentageItem extends Component {


	_onPress = () => {
		if(this.props.onSelect)
			this.props.onSelect();
	}

	render () {

		return (
			<TouchableOpacity onPress={this._onPress.bind(this)} style={Styles.mainContainer}>
				<Image
					source={this.props.icon}
					resizeMode="contain"
					style={Styles.imageStyle} 
				/>
				<View style={Styles.descriptionContainerStyle}>
					<View style={Styles.circleStyle}>
						{this.props.selected ? <View style={Styles.circleInside} /> : null }
					</View>
					<Text style={Styles.percentageStyle}>{this.props.percentage}</Text>
				</View>
			</TouchableOpacity>
		);
	}

}

const Styles = {
	mainContainer : {
		borderWidth: 0,
		flex:1,
	},
	imageStyle : {
		width: '100%',
		height: '70%',
		borderWidth: 0,
	},
	percentageStyle: {
		fontSize: 12,
		color: colors.lightGray,
		paddingLeft: 5,
	},
	circleStyle: {
		padding:2,
		width: 18,
		height: 18,
		borderRadius: 9,
		borderWidth:1,
		borderColor:'red',
		justifyContent:'center',
		alignItems:'center',
	},
	circleInside : {
		width:12,
		height:12,
		borderRadius: 6,
		backgroundColor: 'red',
	},
	descriptionContainerStyle: {
		flexDirection: 'row',
		alignItems:'center',
	}
};

export default BodyFatPercentageItem;