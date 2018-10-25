import React from 'react';
import {
	View,
	Text,
	FlatList,
	TextInput,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Styles from './styles';
import { selectCountry,onSearchCountry } from './actions';

class Support extends React.Component {

	static navigationOptions = {
	    // title: 'Profile',
	    headerTintColor: 'white',
	};
	
	_keyExtractor = (item, index) => item.id;
	_renderItem = ({item}) => (
		<TouchableOpacity style={Styles.itemContainer} onPress={this.props.selectCountry.bind(this, item)}>
	        <Text>{item.name}</Text>
		</TouchableOpacity>
    );

    _renderSeparator = () => {
        return (
            <View style={Styles.seperatorStyle} />
        );
    };

    _onSearchCountryChange = (value) => {
    	this.props.onSearchCountry(value);
    };

	render() {

		const { mainContainer, searchContainer, inputStyle } = Styles;

	    return (
		    <View style={mainContainer}>
				<View style={searchContainer}>

					<TextInput
						style={inputStyle}
						underlineColorAndroid='transparent'
						autoCorrect={false}
						placeholder="Search"
						placeholderTextColor='#cccccc'
						onChangeText={this._onSearchCountryChange.bind(this)}
					/>

				</View>

				<FlatList
                    data={this.props.dataSource}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderSeparator}
                />

			</View>
	    );
	 }
}

const mapStateToProps = ({ countryListReducer }) => {
	return {
		dataSource : countryListReducer.data
	};
};

export default connect(mapStateToProps,{
	selectCountry,onSearchCountry
})(Support);