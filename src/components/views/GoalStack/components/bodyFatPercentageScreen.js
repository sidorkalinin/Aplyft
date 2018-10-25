import React, { Component } from 'react';
import {
	View,
    Text,
    TouchableOpacity,
    
} from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../../styles/theme';
import BodyFatPercentageItem from './BodyFatPercentageItem';

const IMAGES = {
	male_03 : require('../../../../assets/images/male_body_fat/male_body_fat_3.jpg'),
	male_06 : require('../../../../assets/images/male_body_fat/male_body_fat_6.jpg'),
	male_10 : require('../../../../assets/images/male_body_fat/male_body_fat_10.jpg'),
	male_15 : require('../../../../assets/images/male_body_fat/male_body_fat_15.jpg'),
	male_20 : require('../../../../assets/images/male_body_fat/male_body_fat_20.jpg'),
	male_26 : require('../../../../assets/images/male_body_fat/male_body_fat_26.jpg'),
	male_31 : require('../../../../assets/images/male_body_fat/male_body_fat_31.jpg'),
	male_35 : require('../../../../assets/images/male_body_fat/male_body_fat_35.jpg'),

	female_10: require('../../../../assets/images/female_body_fat/female_body_fat_10.jpg'),
	female_15: require('../../../../assets/images/female_body_fat/female_body_fat_15.jpg'),
	female_20: require('../../../../assets/images/female_body_fat/female_body_fat_20.jpg'),
	female_25: require('../../../../assets/images/female_body_fat/female_body_fat_25.jpg'),
	female_31: require('../../../../assets/images/female_body_fat/female_body_fat_31.jpg'),
	female_35: require('../../../../assets/images/female_body_fat/female_body_fat_35.jpg'),

};

class BodyFatPercentageScreen extends Component {


	constructor(props) {
	  	super(props);


	  	this.state = {
	  		selected_index: -1,
	  		percentage : ""
	  	};

	  	if (this.props.initIndex)
	  		this.state.selected_index = this.props.initIndex;
	}

	_onCancelPress = () => {
		if(this.props.onCancelPress)
			this.props.onCancelPress (this.state.percentage);
	};

	_onOkPress = () => {
		if(this.props.onOkPress)
			this.props.onOkPress (this.state);
	};

	_isSelected = (value) => {
		return this.state.selected_index == value;
	}

	render () {
		return (
			<View style={Styles.mainContainer}>
				<Text style={Styles.titleStyle}>Fat Percentage</Text>
				
				{ this.props.isMale ? 
				<View style={Styles.contentContainer}>
					
					<View style={Styles.row}>
						<BodyFatPercentageItem icon={IMAGES.male_03} onSelect={()=>this.setState({percentage:"3-5", selected_index:0})} selected={this._isSelected(0)} percentage="3-5" />
						<BodyFatPercentageItem icon={IMAGES.male_06} onSelect={()=>this.setState({percentage:"6-10", selected_index:1})} selected={this._isSelected(1)} percentage="6-10" />
						<BodyFatPercentageItem icon={IMAGES.male_10} onSelect={()=>this.setState({percentage:"10-14", selected_index:2})} selected={this._isSelected(2)} percentage="10-14" />
						<BodyFatPercentageItem icon={IMAGES.male_15} onSelect={()=>this.setState({percentage:"15-19", selected_index:3})} selected={this._isSelected(3)} percentage="15-19" />
					</View>
					<View style={Styles.row}>
						<BodyFatPercentageItem icon={IMAGES.male_20} onSelect={()=>this.setState({percentage:"20-25", selected_index:4})} selected={this._isSelected(4)} percentage="20-25"/>
						<BodyFatPercentageItem icon={IMAGES.male_26} onSelect={()=>this.setState({percentage:"26-30", selected_index:5})} selected={this._isSelected(5)} percentage="26-30" />
						<BodyFatPercentageItem icon={IMAGES.male_31} onSelect={()=>this.setState({percentage:"31-35", selected_index:6})} selected={this._isSelected(6)} percentage="31-35" />
						<BodyFatPercentageItem icon={IMAGES.male_35} onSelect={()=>this.setState({percentage:"35+", selected_index:7})} selected={this._isSelected(7)} percentage="35+" />
					</View>

				</View>
				:
				<View style={Styles.contentContainer}>
					
					<View style={Styles.row}>
						<BodyFatPercentageItem icon={IMAGES.female_10} onSelect={()=>this.setState({percentage:"10-14", selected_index:0})} selected={this._isSelected(0)} percentage="10-14" />
						<BodyFatPercentageItem icon={IMAGES.female_15} onSelect={()=>this.setState({percentage:"15-18", selected_index:1})} selected={this._isSelected(1)} percentage="15-18" />
						<BodyFatPercentageItem icon={IMAGES.female_20} onSelect={()=>this.setState({percentage:"19-24", selected_index:2})} selected={this._isSelected(2)} percentage="19-24" />
					</View>
					<View style={Styles.row}>
						<BodyFatPercentageItem icon={IMAGES.female_25} onSelect={()=>this.setState({percentage:"25-30", selected_index:3})} selected={this._isSelected(3)} percentage="25-30"/>
						<BodyFatPercentageItem icon={IMAGES.female_31} onSelect={()=>this.setState({percentage:"31-35", selected_index:4})} selected={this._isSelected(4)} percentage="31-35" />
						<BodyFatPercentageItem icon={IMAGES.female_35} onSelect={()=>this.setState({percentage:"35+", selected_index:5})} selected={this._isSelected(5)} percentage="35+" />
					</View>

				</View>
				}

				<View style={Styles.bottomContainer}>

					<TouchableOpacity onPress={this._onCancelPress.bind(this)}>
						<Text style={Styles.buttonTestStyle}>Cancel</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={this._onOkPress.bind(this)}>
						<Text style={Styles.buttonTestStyle}>Ok</Text>
					</TouchableOpacity>

				</View>
			</View>
		);
	}
};

const mapStateToProps = () => {
	return {

	};
};

const Styles = {

	mainContainer : {
		width: '100%',
		height:'100%',
		padding: 30,
		paddingLeft:5,
		paddingRight: 5,
		borderRadius: 20,
		backgroundColor: 'white',
	},
	contentContainer: {
		flex: 1,
		justifyContent: 'space-around',
		padding: 5
	},

	row : {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'stretch',
		flex:1
	},
	bottomContainer:{
		padding: 15,
		flexDirection: 'row',
		justifyContent: 'space-around',

	},
	titleStyle: {
		textAlign:'center',
		fontSize: 18,
		fontWeight: 'bold',
		paddingBottom: 5,
	},
	buttonTestStyle : {
		color:'red',
		padding: 5,
		fontSize: 16,
	}
};

export default connect(mapStateToProps,{

})(BodyFatPercentageScreen);