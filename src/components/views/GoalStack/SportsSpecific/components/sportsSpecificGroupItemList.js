import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	ImageBackground,
	Image,
	TouchableOpacity,
} from 'react-native';
import { colors } from '../../../../styles/theme';
import Item from './Item';
import { 
	Button
} from '../../../../../components/common';
import { onSetGoal } from '../../actions';

class SportsSpecificGroupItemList extends PureComponent {
	
	onSetGoal () {
		this.props.onSetGoal();
	}

	render () {

		const {
			mainContainer,
			logoStyle,
			listTextStyle,
			rowDetailContainer,
			goalSetButtonStyle,
			iconStyle,
			selectAllContainer,
			selectAllStyleText
		} = styles;

		return (
			<View style={mainContainer}>
				<View style={{flexDirection: 'row', alignItems:'center'}}>
					<Image
						style={logoStyle}
						source={require('../../../../../assets/images/goal_icons/basketball.png')}
					/>
					<Text style={[listTextStyle, {zIndex:5, paddingTop: 3, paddingLeft: 10}]}>Basketball</Text>	
					<View style={selectAllContainer}>
						<Text styel={selectAllStyleText}>Select all</Text>
						<View style={iconStyle}>
							
						</View>
					</View>
				</View>

				<View style={rowDetailContainer}>
					<Item />
					<Item selected />
					<Item selected/>
					<Item />
					<Item />
				</View>

				<View style={goalSetButtonStyle}>
	                <Button onPress={this.onSetGoal.bind(this)}>
	                   	<Text>SET GOAL</Text>
	                </Button>
                </View>
            	
			</View>
		);
	}

}

const styles = {
	mainContainer : {
		paddingLeft: 20,
		paddingRight: 20,
	},
	listTextStyle : {
		flex: 1,
		color: colors.lightGray,
	},
	logoStyle : {
		width: 30,
		height: 30,
	},
	rowDetailContainer : {
		paddingLeft: 50,
		paddingTop: 10,
		
	},
	goalSetButtonStyle : {
		height: 43,
		paddingLeft: 50,
		paddingRight: 20
	},
	iconStyle : {
		height: 30,
		width: 30,
		borderWidth: 1,
		borderColor: '#dddddd',
		borderRadius: 15,
		alignItems:'center',
		justifyContent:'center'
	},
	selectAllStyleText : {
		fontColor: colors.lightGray
	},
	selectAllContainer : {
		flexDirection: 'row'
	}
};


const mapStateToProps = ({ setGoal }) => {
	return {
		isSubmitting : setGoal.isSubmitting
	};
};

export default connect(mapStateToProps, {
	onSetGoal
})(SportsSpecificGroupItemList);