import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image
} from 'react-native';
import { colors } from '../../../styles/theme';
import RadioButton from '../../../radioButton';


class cardListItem extends Component {


	_onPressDelete = () => {
		if(this.props.onPressDelete)
			this.props.onPressDelete();
	};

	_renderDefault = () => {
		return (
			<View style={Styles.defaultContainer}>
                <RadioButton textStyle={{color:'black'}} isSelected={this.props.default} index={0} />
			</View>
		);
	};

	render () {
		return (
			<TouchableOpacity onPress={this.props.onRowPress} style={Styles.cardContainer}>

				{this._renderDefault()}

				<View style={Styles.cardNumberContainer}>
					<Text>**** **** **** {this.props.card_last4}</Text>
				</View>

				{/*<View style={Styles.cardHolderNameContainer}>
					<Text>Name</Text>
					<Text>{this.props.card_holder}</Text>
				</View>*/}

				<View style={Styles.cardExpiryContainer}>
					<Text>{this.props.card_exp_month} / {this.props.card_exp_year}</Text>
				</View>

				<TouchableOpacity style={Styles.removeCardContainer} onPress={this._onPressDelete}>
					<Image
              			resizeMode="contain"
						style={[Styles.imageContainer]}
						source={require('assets/images/trash-icon.png')}
						/>
				</TouchableOpacity>
			</TouchableOpacity>
		);
	}
}

const Styles = {
	removeCardContainer:{
		padding: 5,
	},
	removeCardText : {
		color: 'red',
		textAlign: 'center'
	},
	cardNumberContainer:{
		padding: 5,
		justifyContent:'center',
		paddingRight:15

	},
	cardHolderNameContainer : {
		padding: 5,
	},
	defaultContainer:{
		padding:10,
	},
	cardExpiryContainer: {
		padding: 5,
		justifyContent:'center',
		flex:1,
	},
	cardContainer : {
		padding: 10,
		backgroundColor: colors.white,
		flexDirection: 'row',
	},
	imageContainer : {
		width: 20,
		height: 20,
	}
};

export default cardListItem;