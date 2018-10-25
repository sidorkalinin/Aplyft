import React, { PureComponent } from 'react';
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Image
} from 'react-native';
import { colors } from '../../../../styles/theme';
import { viewportWidth } from '../../../../../variables';


class Select extends PureComponent {

	constructor (props) {
		super(props);

		this.state = {
			multi : this.props.multiple ? true:false,
			selectedItems: [],
			selectedItem: null
		};

		// initializing the defaults props
		if (this.props.value) {
			this.state.selectedItem= this.props.value;
		}
		
		// initializing the defaults props
		if(this.props.values) {
			this.state.selectedItems = this.props.values;
		}

	}

	_keyExtractor = ({item, index}) => index; 
	_renderItemSeperator = () => {
		const { itemSeperatorStyle } = styles;
		return (
			<View style={itemSeperatorStyle} />
		);
	};

	_isSelected = (id) => {
    	// console.log("is selected ?",id, this.state.selectedItems.indexOf(id) > -1 );
    	if(this.state.multi)
    		return this.state.selectedItems.indexOf(id) > -1;

    	return this.state.selectedItem == id;
    };

	_selectItem = (id) => {
    	
    	if(this.state.multi){
    		var selectedItems = this.state.selectedItems.slice(); // copying array
    		let index = this.state.selectedItems.indexOf(id);

	    	if ( index > -1 ){
	    		selectedItems.splice(index,1);
	    	}else{
	    		selectedItems.push(id);
	    	}

	    	// getting the

	    	this.state.selectedItems = selectedItems; // work around
	    	this.setState({
	    		selectedItems: selectedItems
	    	});
	    }else{

	    	this.state.selectedItem =  id; // workaround
	    	this.setState({
	    		selectedItem: id
	    	});
	    }

	    // work around for this
	    if(this.props.onChange){
	    	if(this.state.multi){

	    		var tmp = [];
	    		for (var u in this.props.dataSource) {
	    			var ds_row = this.props.dataSource[u];
		    		for (var i in this.state.selectedItems){
		    			var id = this.state.selectedItems[i];

		    			if(ds_row.id == id)
		    				tmp.push(ds_row);
		    		}
		    	}

	    		this.props.onChange (tmp);
	    	}
	    	else{
	    		// console.log("datasource", this.props.dataSource, this.state);
	    		for (var i in this.props.dataSource) {
	    			var row = this.props.dataSource[i];
	    			if(row.id == this.state.selectedItem){
	    				this.props.onChange(row);
	    				break;
	    			}
	    		}
	    	}
	    }

    	
    };

	_renderItem = ({item}) => {

		const { 
			ItemContainer,
			ItemTextStyle,
			itemRightButtonContainer,
			rightButton,
			ItemTextContainer
		} = styles;

		return  (
			<TouchableOpacity style={ItemContainer} onPress={this._selectItem.bind(this,item.id)}>
				<View style={itemRightButtonContainer}>
					<View style={rightButton}>
						{ this._renderCheckRadio(this._isSelected(item.id)) }
					</View>
				</View>

				<View style={ItemTextContainer}>
					<Text style={ItemTextStyle}>{item.text}</Text>
				</View>
			</TouchableOpacity>
		);

	};

	_renderCheckRadio = (checked) => {
		// console.log("will render", checked);

		const { 
			rightButtonImage,
		} = styles;

		if (checked) {
			if(this.props.multiple){
				return  (
					<Image
						resizeMode='contain'
						style={rightButtonImage}
						source={require('../../../../../assets/images/check-red-thin.png')}
					/>
				)
			}else{
				return (
					<View style={[rightButtonImage, {borderRadius: 10, backgroundColor:'red'} ]} />
				);
			}
		}else{
			return (
				<View />
			);
		}
	};

	render () {

		return (
			<View style={styles.mainContainer}>
				<FlatList
					style={{borderWidth:0}}	
					ItemSeparatorComponent={this._renderItemSeperator}
					data={this.props.dataSource}
					renderItem={this._renderItem}
					// ListFooterComponent={this._renderFooterComponent}
					keyExtractor={this._keyExtractor}
				/>
			</View>
		);

	}
};

const styles = {
	mainContainer: {
		padding: 20,
	},
	itemSeperatorStyle:{ 

	},
	ItemContainer : {
		alignItems:'center',
		flexDirection:'row',
		paddingTop:5,
		paddingBottom:5,
	},
	rightButtonImage:{
		width:20,
		height:20
	},
	itemRightButtonContainer:{
		flexDirection:'row',
		alignItems:'center',
	},
	rightButton : {
		width: 30,
		height: 30,
		borderWidth: 1,
		borderColor: '#dddddd',
		borderRadius: 15,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center'
	},
	ItemTextContainer: {
		paddingLeft: 10,
		flex: 1,
	},

};

export default Select;