import React, { PureComponent } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { colors } from '../../../../styles/theme';
import { viewportWidth } from '../../../../../variables';
import InfoIcon from '../../../GoalStack/components/infoIcon';


class RowValue extends PureComponent {

	state = {
		show: false
	};

	_onEndEditing = (text) => {
		if (this.props.onEndEditing)
			this.props.onEndEditing(text);
	};

	_onChangeText = (text) => {	
		if (this.props.onChangeText)
			this.props.onChangeText(text);
	};

	_onFocus = (text) => {
		if (this.props.onFocus)
			this.props.onFocus(text);
	};

	_renderInfoIcon = () => {
		if(this.props.infoIcon){
			return (
				<View style={{width: 40, zIndex:800}}>
				<InfoIcon
					text='Train to improve your athletic performance in specific sports.' />
				</View>
			);
		}
	};

	render () {

		// for focus
		var txt = null;

		const { 
			mainContainer,
			labelStyle,
			valueStyle
		} = styles;

		return (
			<View>
				<TouchableOpacity style={mainContainer} onPress={()=>this.setState({show:!this.state.show})}>
					{ this._renderInfoIcon() }
					<Text style={labelStyle}>{this.props.label}</Text>
					<Text style={valueStyle}>{this.props.value}</Text>
				</TouchableOpacity>
				<View style={{height: this.state.show ?  'auto' : 0, overflow:'hidden'}}>
				{this.props.children}
				</View>
			</View>
		);

	}
};

const styles = {
	mainContainer: {
		padding: 20,
		flexDirection: 'row'
	},
	labelStyle: {
		flex: 1,
		zIndex:0,
	},
	valueStyle:{
		width: 150,
		textAlign: 'right'
	}
};

export default RowValue;