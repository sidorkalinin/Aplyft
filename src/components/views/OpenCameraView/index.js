import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	Modal,
	ActivityIndicator,
	Linking
} from 'react-native';
import { connect } from 'react-redux';
import Styles from './styles';
import {
	save,
	onCancelPress,
	uploadImage
} from './actions';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';
import { CHANGE_PHOTO_USER } from '../../../variables';

class openCameraView extends Component {

	state = {
		type: RNCamera.Constants.Type.front,
		imagePath : '',
		imageData : null,
	};

	_onFirstNameChange = (text) => {
		// this.props.onChangeFirstName(text);
	};

	_takePicture = async function() {
    	if (this.camera) {
      		const options = { 
      			quality: 0.5, 
      			base64: true, 
      			mirrorImage: this.state.type == RNCamera.Constants.Type.front? true : false
      		};
      		const data = await this.camera.takePictureAsync(options)
      		// console.log(data);
      		
      		this.setState({
      			imagePath : data.uri,
      			imageData: data,
      		});
    	}
  	};

  	_uploadImage = () => {
  		// uplading photo to server as base 64
  		this.props.uploadImage(this.state.imageData, this.props.user_id);
  	}

  	_toggleType = () => {
  		if (this.camera) {
  			this.setState ({
  				type: this.state.type == RNCamera.Constants.Type.front ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front
  			});
  		}
  	};

  	_takeAnother = () => {
  		this.setState({
  			imagePath : '',
  			imageData : null,
  		});
  	};


  	_cancel = () => {
  		this.props.onCancelPress ();
  	};

  	gotoSettings = () => {
    
    	Linking.canOpenURL('app-settings:').then(supported => {
		  if (!supported) {
		    console.log('Can\'t handle settings url');
		  } else {
		    return Linking.openURL('app-settings:');
		  }
		}).catch(err => console.error('An error occurred', err));

    }


	render () {

		const { 
			mainContainer,
			preview,
			snapButtonImage,
			selfieButtonContainer,
			selfieImage,
			cancelButtonContainer,
			cancelTextStyle,
			takeAnotherContainer,
			UploadImageContainer
		} = Styles;


		if ( this.state.imagePath == '' ) { 

			return (
				<View style={mainContainer}>

					<RNCamera
			            ref={ref => {
			              this.camera = ref;
			            }}
			            mirrorImage={true}
						fixOrientation={true}
			            style = {preview}
			            type={this.state.type}
			            flashMode={RNCamera.Constants.FlashMode.on}
			            notAuthorizedView={(
			            	<View style={{
          							flex: 1,
          							alignItems: 'center',
          							justifyContent: 'center',
        						}} >
        						<Text style={{textAlign: 'center',fontSize: 16}}>
          							Camera not authorized
        						</Text>
        						<Text style={{textAlign: 'center',fontSize: 13, padding: 50}}>Need to enable the camera for APLYFT in order to take a photo</Text>
        						<TouchableOpacity onPress={this.gotoSettings.bind(this)}><Text>
        							Go To Settings
        						</Text></TouchableOpacity>
        						<TouchableOpacity style={{paddingTop: 10}} onPress={()=>this.props.onCancelPress()}>
        							<Text>GO back</Text>
        						</TouchableOpacity>
      						</View>
			            )}
			            permissionDialogTitle={'Permission to use camera'}
			            permissionDialogMessage={'We need your permission to use your camera phone in order for you to take a photo'}
			        >

			        <TouchableOpacity style={snapButtonImage} onPress={this._takePicture.bind(this)}>
			        	<View />
			        </TouchableOpacity>

			        <TouchableOpacity style={selfieButtonContainer} onPress={this._toggleType.bind(this)}>
			        	<Image
			        		resizeMode="contain"
			        		style={selfieImage}
			        		source={require('../../../assets/images/selfie-icon.png')}
			        	/>
			        </TouchableOpacity>

			        <TouchableOpacity style={cancelButtonContainer} onPress={this._cancel.bind(this)}>
			        	<Text style={cancelTextStyle}>Cancel</Text>
			        </TouchableOpacity>

			        </RNCamera>
				</View>
			);

		}else{

			return (
				<View style={preview}>


					{ this.props.isUploading ? 
					<Modal  transparent animationType="fade" >
						<View style={{flex:1 , backgroundColor : 'rgba(0,0,0,0.8)', justifyContent:'center', alignItems:'center'}}>
							<Text style={{color:'white', paddingBottom: 10}}>Uploading Photo</Text>
							<ActivityIndicator />
						</View>
					</Modal> 
					: null
					}

					<Image 
						style={{flex:1}}
						source={{uri: this.state.imagePath}}
						/>
					<TouchableOpacity style={cancelButtonContainer} onPress={this._cancel.bind(this)}>
			        	<Text style={cancelTextStyle}>Cancel</Text>
			        </TouchableOpacity>

			        <TouchableOpacity style={takeAnotherContainer} onPress={this._takeAnother.bind(this)}>
			        	<Text style={cancelTextStyle}>Retake</Text>
			        </TouchableOpacity>

			        <TouchableOpacity style={UploadImageContainer} onPress={this._uploadImage.bind(this)}>
			        	<Text style={cancelTextStyle}>Upload</Text>
			        </TouchableOpacity>

				</View>
			);

		}

	}

}

const mapsToProps = ({user, CameraView}) => {
	return {
		user_id: user.user.id,
		isUploading: CameraView.uploading,
	}
};

export default connect(mapsToProps, {
	save,
	onCancelPress,
	uploadImage
})(openCameraView);