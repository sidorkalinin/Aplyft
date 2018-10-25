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
import { fetchDataFromServer, showVideo } from '../actions';
import Video from "react-native-video";


class ProgressVideoListView extends PureComponent {

	constructor(props) {
    	super(props);

    	this.state = {
    		paused : false,
    	};

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
  			<TouchableOpacity onPress={this._selectVideo.bind(this, item)} style={itemContainer}>
				<FastImage
		          	resizeMode={FastImage.resizeMode.cover}
		          	style={itemStyle}
		          	source={{
		            	uri: 'https://s3-eu-west-1.amazonaws.com/images-aplyft/aplyft/video-thumb-default.jpg',
		            	priority: FastImage.priority.normal
		          	}}
		        />
			</TouchableOpacity>
  		);
  	};

  	_selectVideo = (item) => {
  		this.props.showVideo(!this.props.isGalleryVisible, item);
  		
  	};

  	_videoError = (err) => {
  		console.log("error in video", err);
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

			      {
			      	this.props.isGalleryVisible ? 
			      <Modal
			      	animationType="slide"
			      	visible={this.props.isGalleryVisible}>
			      	<TouchableOpacity style={{padding:20}} onPress={()=>this._selectVideo(null)}>
			      		<Text>Close</Text>
			      	</TouchableOpacity>
			    	<Video
			            source={{ uri: this.props.currentVideo.url }} // Can be a URL or a local file.
			            ref={ref => {
			              this.player = ref;
			            }} // Store reference
			            rate={1.0} // 0 is paused, 1 is normal.
			            volume={1.0} // 0 is muted, 1 is normal.
			            muted={true} // Mutes the audio entirely.
			            paused={this.state.paused} // Pauses playback entirely.
			            resizeMode={"contain"} // Fill the whole screen at aspect ratio.*
			            repeat={true} // Repeat forever.
			            playInBackground={false} // Audio continues to play when app entering background.
			            // playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
			            // ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
			            // progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
			            // onLoadStart={this.loadStart}            // Callback when video starts to load
			            // onLoad={this.setDuration}               // Callback when video loads
			            // onProgress={this.setTime}               // Callback every ~250ms with currentTime
			            // onEnd={this.onEnd}                      // Callback when playback finishes
			            onError={this._videoError} // Callback when video cannot be loaded
			            // onBuffer={this.onBuffer}                // Callback when remote video is buffering
			            // onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
			            style={{flex:1}}
			        />
			        	
			      </Modal>
			      : null
			    	}
            </View>
		);
	}

}

const mapStateToProps = ({ progressGalleryVideoReducer }) => {
	return progressGalleryVideoReducer;
};

export default connect(mapStateToProps, {
	fetchDataFromServer,
	showVideo
})(ProgressVideoListView);