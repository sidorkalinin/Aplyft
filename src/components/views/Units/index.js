import React, { Component } from 'react';
import {
	View,
	Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { viewportWidth, viewportHeight } from '../../../variables';
import { save, changeUnit } from './actions';

// importing the styles of that specific page screen
import Styles from './styles';
import RadioButton from '../../radioButton';


class UnitsScreen extends Component {

    static navigationOptions = {
        // title: 'Profile',
        headerTintColor: 'white',
    };

    _changeUnit = (payload) => {
        this.props.changeUnit(payload)
    };

	render () {

        // destructoring so it wil be easier to read
		const {
            mainContainer,
            InfoStyle,
            radioButtonLeftContainer,
            radioButtonContainer
        } = Styles;

		return (
			<View style={ mainContainer }>
                <Text style={InfoStyle}>Select your units type to be displayed and calculated in the app</Text>
                <View style={radioButtonContainer}>
                    
                    <TouchableOpacity onPress={this._changeUnit.bind(this, 'metric')} style={radioButtonLeftContainer}>
                        <RadioButton textStyle={{color:'black'}} isSelected={this.props.isMetric} label="Metric" index={0} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._changeUnit.bind(this, 'imperial')} style={radioButtonLeftContainer}>
                        <RadioButton textStyle={{color:'black'}} isSelected={!this.props.isMetric} label="Imperial" index={0} />
                    </TouchableOpacity>

                </View>
			</View>
		);
	}
}


const mapsStateToProps = ({ user }) => {
    return {
        user : user.user,
        isMetric : user.user.units == "metric" ? true: false
    }
};

export default connect(mapsStateToProps, {
    changeUnit
})(UnitsScreen);