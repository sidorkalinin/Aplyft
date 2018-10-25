import React, { PureComponent } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Modal
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import moment from 'moment';
import { SuperGridSectionList } from 'react-native-super-grid';
import FastImage from "react-native-fast-image";
import { fetchDataFromServer, showGallery } from '../actions';

import Gallery from 'react-native-image-gallery';

class ProgressPhotoListView extends PureComponent {

	constructor(props) {
    	super(props);

  	}

	_keyExtractor = (item, index) => item.id;

	_renderSeparator = () => {
    	return <View style={styles.seperatorStyle} />;
  	};

  	_renderHeader = ({ section }) => {
	    return (
	     	 <View
	        	style={{
	        		padding:20,
	          		paddingBottom: 10,
	          		paddingTop: 10,
	          		backgroundColor: "#171d2a",
	        	}} >
	        	<Text style={{color:'white'}}>{moment(section.title).format('MMMM Do YYYY')}</Text>
	     	</View>
	    );
	};

	_onRefresh = () => {
      	// call back once the state is chaged
       	// we can make a remote request here
       	this.props.fetchDataFromServer();
  	};

  	_renderEmptyComponent = () => {
    	return (
      	<View style={{ padding: 20 }}>
        	<Text>No Progress Gallery</Text>
      	</View>
    	);
  	};

  	_renderItem = ({ item, index, section }) => {
  		const { 
			itemContainer,
			itemStyle,
		} = styles;

  		return (
  			<TouchableOpacity onPress={this._selectImage.bind(this, index)} style={itemContainer}>
				<FastImage
		          	resizeMode={FastImage.resizeMode.cover}
		          	style={itemStyle}
		          	source={{
		            	uri: item.url,
		            	priority: FastImage.priority.normal
		          	}}
		        />
			</TouchableOpacity>
  		);
  	};

  	_selectImage = (index) => {
  		this.props.showGallery(!this.props.isGalleryVisible, index);
  	};

	render () {

		const { 
			mainContainer,
			gridView
		} = styles;

		return (
            <View style={mainContainer}>
            	<SuperGridSectionList
            		ListEmptyComponent={this._renderEmptyComponent}
			        itemDimension={100}
                    refreshing={this.props.refreshing}
          			onRefresh={this._onRefresh}
			        sections={this.props.data}
			        style={gridView}
			        renderSectionHeader={this._renderHeader}
			        spacing={0}
			        renderItem={this._renderItem}
			      />

			      <Modal
			      	animationType="slide"
			      	visible={this.props.isGalleryVisible}>
			      	<TouchableOpacity style={{padding:20}} onPress={()=>this._selectImage(0)}>
			      		<Text>Close</Text>
			      	</TouchableOpacity>
			    	<Gallery
			    		initialPage={this.props.galleryIndex}
			        	style={{ flex: 1, backgroundColor: 'black' }}
			        	images={this.props.Images}
			      	/>
			      </Modal>
            </View>
		);
	}

}

const mapStateToProps = ({ progressGallerPhotoReducer }) => {
	return progressGallerPhotoReducer;
};

export default connect(mapStateToProps, {
	fetchDataFromServer,
	showGallery
})(ProgressPhotoListView);