import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	Modal,
	SectionList,
	Alert
} from 'react-native';
import { connect } from 'react-redux';
import Styles from './styles';
import { onSetGoal } from '../actions';

//custom components
import GoalHeader from '../components/goalHeader';
// import SportsSpecificGroupItemList from './components/sportsSpecificGroupItemList';
import { Button } from '../../../common';

//testing only
import data from './data.json';

const IMAGES = {

  	basketball: require('../../../../assets/images/goal_icons/basketball.png'), // statically analyzed
  	basketball_active: require('../../../../assets/images/goal_icons/basketball_active.png'), // statically analyzed
  	volleyball: require('../../../../assets/images/goal_icons/volleyball.png'), // statically analyzed
  	volleyball_active: require('../../../../assets/images/goal_icons/volleyball_active.png'), // statically analyzed
  	baseball: require('../../../../assets/images/goal_icons/baseball.png'),
  	baseball_active: require('../../../../assets/images/goal_icons/baseball_active.png'),
	running : require('../../../../assets/images/goal_icons/running.png'),
	running_active : require('../../../../assets/images/goal_icons/running_active.png'),
	boxing : require('../../../../assets/images/goal_icons/boxing.png'),
	boxing_active : require('../../../../assets/images/goal_icons/boxing_active.png'),
	hockey : require('../../../../assets/images/goal_icons/hockey.png'),
	hockey_active : require('../../../../assets/images/goal_icons/hockey_active.png'),
	football : require('../../../../assets/images/goal_icons/football.png'),
	football_active : require('../../../../assets/images/goal_icons/football_active.png'),

	cycling : require('../../../../assets/images/goal_icons/cycling.png'),
	cycling_active : require('../../../../assets/images/goal_icons/cycling_active.png'),

	rugby : require('../../../../assets/images/goal_icons/football.png'),
	rugby_active : require('../../../../assets/images/goal_icons/football_active.png'),

	swimming : require('../../../../assets/images/goal_icons/swimming.png'),
	swimming_active : require('../../../../assets/images/goal_icons/swimming_active.png'),

	soccer : require('../../../../assets/images/goal_icons/soccer.png'),
	soccer_active : require('../../../../assets/images/goal_icons/soccer_active.png'),

	tennis : require('../../../../assets/images/goal_icons/tennis.png'),
	tennis_active : require('../../../../assets/images/goal_icons/tennis_active.png'),

	wrestling : require('../../../../assets/images/goal_icons/wrestling.png'),
	wrestling_active : require('../../../../assets/images/goal_icons/wrestling_active.png'),

	martial_arts : require('../../../../assets/images/goal_icons/martial_arts.png'),
	martial_arts_active : require('../../../../assets/images/goal_icons/martial_arts_active.png'),

};

class sportsSpecificScreen extends Component {

	state = {
		dataSource : data,
		activeSection: -1,
		selectedItems:[],
		selectedPositions:[],
	};

	_keyextractor = ({item, index}) => index;

	_renderCorrectImageColor = (section, activeKey) => {

		if(activeKey == section.key || this._inArray(section.required_positions, activeKey) )
			return IMAGES[section.icon_active];
		else
			return IMAGES[section.icon];
	};
	_renderSectionHeader = ({section}) => {
		const { 
			secionHeadContainer, 
			sectionHeadIcon, 
			sectionHeadTitle,
			sectionHeadRightContainer,
			itemRightButtonContainer,
			rightButton,
			selectAllTextStyle
		} = Styles;

		
		// condition the section title coloring
		var colorStyle = {
			color: section.active ? '' : '#bebebe'
		};

		return (

			<TouchableOpacity onPress={this._onPressSection.bind(this,section.key, section.active, section.required_positions, section.only_main_category)} >
				<View style={secionHeadContainer}>
					<Image
						style={sectionHeadIcon}
						resizeMode='contain'
						source={this._renderCorrectImageColor(section, this.state.activeSection)}
					/>
					<Text style={[sectionHeadTitle,colorStyle]}>{section.title}</Text>
					{ section.active ?
					<TouchableOpacity 
						onPress={this._onPressSectionCheckAll.bind(this, section.key, section.only_main_category)} 
						style={sectionHeadRightContainer} >
						<View style={itemRightButtonContainer}>
							<Text style={selectAllTextStyle}>{section.only_main_category ? "Select" : "Select All" }</Text>
							<View style={rightButton}>
								{ this._renderCheckRadio(this._isAllSectionSelected(section.key, section.only_main_category)) }
							</View>
						</View>
					</TouchableOpacity> : null
					}
				</View>
			</TouchableOpacity>
		);
	};

	_onSetGoal = (section) => {
		// calling the actions
	    console.log("current state", this.state);

		if ((this.state.activeSection == -1 || this.state.selectedItems.length < 1 || this.state.selectedPositions.length < 1) && !section.only_main_category ) {
			return (
				Alert.alert(
		            'Goal selection',
		            'You need to select at least one option from each section',
		            [
		            	{text: 'Ok'}
		            ],
		            { cancelable: true }
		        )
			);
		}

		var parsed_ids = [];
		for(var index in this.state.selectedItems){
			var row = this.state.selectedItems[index];
			parsed_ids.push({
				id: row.id,
				title: "   "+row.title,
				value: 0,
			});
		}
		// add the position
		for(var index in this.state.selectedPositions){
			var row = this.state.selectedPositions[index];
			parsed_ids.push({
				id: row.id,
				title: "   Position   "+row.title,
				value: 0,
			});
		}

		this.props.onSetGoal (this.state.activeSection, {fields: parsed_ids});
	};

	_renderPlayPosition = (positions) => {

		return positions.map((object, index) => {
			return (
				<TouchableOpacity style={Styles.ItemContainer} onPress={this._selectItem.bind(this, this.state.selectedPositions, object, "position", true)}>
					<View style={[Styles.ItemContainerStyle,{color:'transparent'}]}>
						<Text style={Styles.itemTitle}>{object.title}</Text>
						<View style={Styles.itemRightButtonContainer}>
							<View style={Styles.rightButton}>
								{ this._renderCheckRadio(this._isSelected(this.state.selectedPositions, object.id), false) }
							</View>
						</View>
					</View>
				</TouchableOpacity>
			);

		});
	};

	_renderSectionFooter = ({section}) => {

		// in order to make the section accordion
		if (this.state.activeSection == section.key || this._inArray(section.required_positions, this.state.activeSection) ){
			return (
				<View>
				<View style={{
						flex:1,
						backgroundColor: '#eeeeee',
						paddingTop: 20,
						paddingBottom: 20,
					}}>
					{ section.required_positions.length > 0 ?
						<Text style={{
							color: '#aaaaaa',
							fontWeight:'bold',
							paddingBottom: 5,
							paddingLeft:20,
						}}>Choose position</Text>
						: null
					}
					{this._renderPlayPosition(section.required_positions)}
				</View>
				<View style={Styles.sectionFooterContainer}>
	                <Button onPress={this._onSetGoal.bind(this, section)}>
	                    <Text>Set Goal</Text>	                    
	                </Button>
	            </View>
	            </View>
        	);
        }else {

	     	return (<View />);
	    }
	};

	// utility 
	_inArray = (array, key) => {
		for(var index in array)
			if(array[index].id == key)
				return true;

		return false;
	};

	_renderItem = ({item, section}) => {
		const { 
			ItemContainer,
			ItemContainerStyle, 
			itemRightButtonContainer, 
			rightButton,
			itemTitle
		} = Styles;

		// in order to make the section accordion 
		if ( (this.state.activeSection == section.key || this._inArray(section.required_positions, this.state.activeSection)) && !section.only_main_category ){
	     	return (   
	     		<TouchableOpacity onPress={this._selectItem.bind(this, this.state.selectedItems, item)} style={ItemContainer}>
					<View style={ItemContainerStyle}>
						<Text style={itemTitle}>{item.title}</Text>
						<View style={itemRightButtonContainer}>
							<View style={rightButton}>
								{ this._renderCheckRadio(this._isSelected(this.state.selectedItems, item.id)) }
							</View>
						</View>
					</View>
				</TouchableOpacity>
			);
	    }else {

	     	return (<View />);
	    }
    };

    _onPressSectionCheckAll = (key, only_main_category) => {
		let currentSelectedSection = key;
		let ar = [];
		console.log(only_main_category);
		// toggling emptying all arrays
		if (this._isAllSectionSelected(key, only_main_category) ){
			currentSelectedSection = -1;
			this.setState({
				selectedItems: [],
				selectedPositions: [],
			});
		}
		else
			for (var index in data) {
				var section = data[index];
				if (section.key == key) {
					ar = section.data.map((row,index) => {
						return {
							id: row.id, 
							title: row.title
						};
					});
					
				}
			}

		if (this.state.selectedPositions.length < 1)
		    this.setState({
				activeSection: currentSelectedSection
			});

		// instantiating
		this.setState({
			selectedItems: ar
		})
	    
    };

    _onPressSection = (key, isActive, required_positions_array, onlyParent) => {
		
    	// skip the non active section
		if(!isActive) return;

		let currentSelectedSection = key == this.state.activeSection? -1 : key;
		if (onlyParent){
			this.setState({
				activeSection: currentSelectedSection
			});
		}

		if(currentSelectedSection == -1 || key != this.state.activeSection || !this._inArray(required_positions_array, key) ){
			this.state.selectedItems = [];
			this.state.selectedPositions = [];
		}

		// we need first to check if this array has 
		// if(required_positions_array.length < 1 && currentSelectedSection == -1) {
			this.setState({
				activeSection: currentSelectedSection
			});
		// }

    };

    _isAllSectionSelected = (key, only_main_category = false) => {

    	// check if the current selected sport is main category or not
    	if (only_main_category){
    		return key == this.state.activeSection;
    	}else
	    	for (var index in data) {
				var section = data[index];
				if (section.key == key) {
					return (section.data.length == this.state.selectedItems.length);
				}
			}
    };

    _isSelected = (array, id) => {
    	var tmp = false;
    	for (var _index in array){
    		var row = array[_index];

    		if(row.id == id){
    			tmp = true;
    			break;
    		}
    	}
    	return tmp;
    };

    _selectItem = (array, {id, title}, arrayName = "tmp", uniq = false) => {
    	var selectedItems = array.slice(); // copying array

    	var index = -1;
    	for (var _index in selectedItems){
    		var row = selectedItems[_index];

    		if(row.id == id){
    			index = id;
    			break;
    		}
    	}

    	if ( index > -1 ){

    		// make the uniq always selected
    		if (!uniq)
	    		for (var _index in selectedItems){
		    		var row = selectedItems[_index];
		    		if(row.id == id)
		    			selectedItems.splice(_index,1);
		    	}

    	}else{
    		// if the selected id is not in the array
    		if (uniq)
				selectedItems = [];

			selectedItems.push({id:id, title:title});
    		
    	}

    	if (arrayName == "position")
    		this.setState({
    			activeSection: id, // overright for required_position if they exists
	    		selectedPositions: selectedItems
	    	});
    	else
	    	this.setState({
	    		selectedItems: selectedItems
	    	});
    };

    _renderCheckRadio = (checked, isRadio = true) => {
		// console.log("will render", checked);

		const { 
			rightButtonImage,
		} = Styles;

		if (checked) {

			if (isRadio) {

				return  (
					<Image
						resizeMode='contain'
						style={rightButtonImage}
						source={require('../../../../assets/images/check-red-thin.png')}
					/>
				)

			}else{
				// dont render the check render the full circle button
				return (
					<View
						style={{
							backgroundColor:'red',
							// borderWidth: 1,
							width:22,
							height:22,
							borderRadius: 11,

						}}
					/> 
				);
			}

		}else{
			return (
				<View />
			);
		}
	};

	render () {
		// console.log("rendering");
		// console.log("section now is ", this.state.activeSection);

		const { 
			listTextStyle,
			subContainer,
			descriptionStyle,
			mainContainer,
			logoStyle
		} = Styles;
					
		return (
			<View style={mainContainer}>

				{ this.props.isSubmitting ? 
					<Modal  transparent animationType="fade" >
						<View style={{flex:1 , backgroundColor : 'rgba(0,0,0,0.8)', justifyContent:'center', alignItems:'center'}}>
							<Text style={{color:'white', paddingBottom: 10}}>Submitting your goal</Text>
							<ActivityIndicator />
						</View>
					</Modal> 
					: null
				}

				<View style={subContainer}>
					<View  style={{paddingLeft: 10, paddingTop:25, borderWidth:0}}>
						<TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
						<Image 
							style={{width:25,height:25}}
							resizeMode='contain'
							source={require('../../../../assets/images/back.png')}
						/>
						</TouchableOpacity>
					</View>

					<Text style={descriptionStyle}>Athletic Performance</Text>

					<SectionList 
						style={{borderWidth:0}}
						sections={this.state.dataSource}	
						// keyExtractor={this._keyextractor} 
						renderItem={this._renderItem}
		  				renderSectionHeader={this._renderSectionHeader}
		  				renderSectionFooter={this._renderSectionFooter}
					/>

				</View>

			</View>
		);
	}

}

const mapStateToProps = ({ user, setGoal }, ownProps) => {

 	return {
 		user : user.user,
 		isSubmitting : setGoal.isSubmitting
 	};
};

export default connect(mapStateToProps, {
	onSetGoal
})(sportsSpecificScreen);