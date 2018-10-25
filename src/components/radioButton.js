import React, { Component } from 'react';
import {
	View,
	Text
} from 'react-native';
import { colors } from './styles/theme';


class radioButton extends Component {

	constructor (props) {
		super(props);

		this.state = { 
			index: null,
			isSelected: true,
		};
	}

	// this helper will handle the visual selection
	renderSelection () {

		const { innerContainer } = styles;

		if( this.props.isSelected ) {
			return (
				<View style={innerContainer}></View>
			);
		}else{

		}
	}

	renderLabel () {
		const { labelStyle } = styles;
		var styleArray = [];
		styleArray.push(labelStyle);

		if(this.props.textStyle)
			styleArray.push(this.props.textStyle)


		if(this.props.label){
			return (
				<Text style={styleArray}>{this.props.label}</Text>
			);
		}
	}

	render () {

		const { outerContainer, mainContainer } = styles;

		return (
			<View style={mainContainer}>
				<View style={outerContainer}>
					{this.renderSelection()}
				</View>
				{this.renderLabel()}
			</View>
		);
	}

}

const styles = {
	mainContainer: {
		flexDirection : 'row',
	},
	labelStyle: {
		paddingLeft: 10,
		color: 'white',
		fontWeight: 'bold'
	},
	outerContainer : {
		backgroundColor: 'white',
		borderColor: colors.redColor,
		borderWidth: colors.redColor,
		borderWidth: 1,
		borderRadius : 8,
		width: 16,
		height: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},
	innerContainer : {
		width: 10,
		height: 10,
		backgroundColor: colors.redColor,
		borderRadius: 5,
	}
};

export default radioButton;