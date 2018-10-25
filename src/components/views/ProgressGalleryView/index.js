import React, { PureComponent } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	ActivityIndicator,
	Linking,
	Alert
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { uploadData, fetchDataFromServer } from './actions';
import ScrollableTabView from "react-native-scrollable-tab-view";
import CustomTabBar from "../Tabs/Training/CustomTabBar";
import PhotoList from './ProgressPhotoListView';
import VideoList from './ProgressVideoListView';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';

class ProgressGalleryView extends PureComponent {

	static navigationOptions = ({navigation}) => {
		const {params = {}} = navigation.state;
		return {
	    	headerTintColor: 'white',
	    	title: 'Progress Gallery',
	    	headerRight: (
		    	<TouchableOpacity style={{padding:15}} onPress = {() => params.handlePress()}>
					<Text style={{color:'white', fontSize: 28}}>+</Text>
				</TouchableOpacity>
			)
		};

	};

	componentDidMount () {
      this.props.navigation.setParams({handlePress: this._addButtonPressed});
      this.props.fetchDataFromServer();
    };

    _addButtonPressed = () => {
      	this.ActionSheet.show()
    };

	_renderUpperRightButton = () => {
		return (
			<View style={{padding:3}}>
				<Text>+</Text>
			</View>
		);
	};

	_onAcceptFiles = (files, multiple = true) => {
		this.props.uploadData(files, multiple);
	};

	_openSettings = () => {
		// this is only for iOS
		Linking.openURL('app-settings:');
	};	

	_onActionSheetPress = (index) => {
		switch (index) {
			case 0: // take photo
				ImagePicker.openCamera({
				  	// multiple: true
				  	compressImageQuality: 0.5,
				}).then(image => {
				  	console.log ("choosing from camera",image);
				  	this._onAcceptFiles(image, false);
				}).catch(err => {
              		if (err.code == 'E_PICKER_NO_CAMERA_PERMISSION')
	              		Alert.alert(
	              			"Camera Access",
	              			"Please allow APLYFT to access your camera",
	              			[
	              				{
	              					text: "Settings", 
	              					onPress: () => {
	              						// this is only for iOS
		              					this._openSettings();
		              				}
		              			},
		              			{ text: "Cancel" }
		              		],
	              			{ cancelable: true }
	            		);

          		});
			break;

			case 1: // choose photos
				ImagePicker.openPicker({
				  	multiple: true,
				  	mediaType: "photo",
				  	compressImageQuality: 0.5,
				}).then(images => {
				  	console.log ("choosing from gallery", images);
				  	this._onAcceptFiles(images);
				}).catch(err=>{
					console.log(">>>>>>>>>>>", err.code);
					
              		if (err.code == 'E_PERMISSION_MISSING')
						Alert.alert(
	              			"Gallery Access",
	              			"Please allow APLYFT to access your gallery",
	              			[
	              				{
	              					text: "Settings", 
	              					onPress: () => {
	              						// this is only for iOS
		              					this._openSettings();
		              				}
		              			},
		              			{ text: "Cancel" }
		              		],
	              			{ cancelable: true }
	            		);
				});
			break;

			case 2: // choose video
				ImagePicker.openPicker({
				  	mediaType: "video",
				  	multiple: true,
				}).then((video) => {
				  console.log("choosing from gallery video",video);
				  this._onAcceptFiles(video);
				}).catch(err=>{
					console.log(">>>>>>>>>>>", err.code);
              		if (err.code == 'E_PERMISSION_MISSING')
						Alert.alert(
	              			"Gallery Access",
	              			"Please allow APLYFT to access your gallery",
	              			[
	              				{
	              					text: "Settings", 
	              					onPress: () => {
	              						// this is only for iOS
		              					this._openSettings();
		              				}
		              			},
		              			{ text: "Cancel" }
		              		],
	              			{ cancelable: true }
	            		);
				});
			break;
		}
	};

	render () {

		const { 
            underlineStyle,
            mainContainer
		} = styles;
		
		return (
			<View style={mainContainer}>

				{ this.props.uploading ? 
	            <Modal transparent animationType="fade" >
	                <View style={{flex:1 , backgroundColor : 'rgba(0,0,0,0.8)', justifyContent:'center', alignItems:'center'}}>
	                    <Text style={{color:'white', paddingBottom: 10}}>Uploading...</Text>
	                    <ActivityIndicator />
	                    <Text style={{color:'white', paddingBottom: 10}}>{this.props.percentage}%</Text>
	                </View>
	            </Modal> 
	            : null
	            }
			
	            <ScrollableTabView
	                tabBarUnderlineStyle={underlineStyle}
	                locked={false}
	                renderTabBar={() => <CustomTabBar />}
	                prerenderingSiblingsNumber={1}
	                // onChangeTab={this._onChangeTab.bind(this)}
	            >
	                <PhotoList tabLabel="Photos" />
	                <VideoList tabLabel="Videos" />
	            </ScrollableTabView>

	            <ActionSheet
	          		ref={o => this.ActionSheet = o}
	          		title={'Upload your progress photos or videos'}
	          		options={['Take Photo', 'Choose Photo(s)', 'Choose Video(S)', 'Cancel']}
	          		cancelButtonIndex={3}
	          		onPress={this._onActionSheetPress.bind(this)}
	        	/>
            </View>
		);
	}

}

const mapStateToProps = ({ progressGallerReducer }) => {
	return progressGallerReducer;
};

export default connect(mapStateToProps, {
	uploadData, fetchDataFromServer
})(ProgressGalleryView);