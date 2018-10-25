import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	Image,
	FlatList,
	Modal,
	ImageBackground,
	TouchableOpacity
} from 'react-native';
import Styles from './styles';
import { gotoSubmitView,updateTimerCircuitInRealm } from './actions';
import { Button } from '../../../common';
import TimerCountdown from './components/TimerCountdown';
import ExerciseCircuitRow from './components/exerciseCircuitRow';
import SubmitDataScreen from './components/SubmitDataScreen';
import PushNotification from 'react-native-push-notification';


class TimeBasedCircuitScreen extends Component {

	state = {
		isPlaying : false,
		modalVisible : false,
		isSubmitted: false,
		numberSubmitted : 0,
		textSubmitted : "",
	};

	_renderItemSeperator = () => (
		<View style={Styles.itemSeperatorStyle} />
	);

	_renderFooterComponent = () => {
		return (
			<View
            	style={{
                	paddingVertical: 20,
                	borderTopWidth: 6,
                	borderColor: "#eeeeee",
                	paddingLeft:10,
                	paddingRight:10,
            	}} >

            	<Button onPress={()=>console.log("save pressed")}>
                	<Text>Save</Text>
            	</Button>
        	</View>
		);
	};

	_renderItem = ({item}) => {

		return (
			<View style={Styles.itemContainer}>
				<Text style={Styles.itemTitle}>{item.title}</Text>
				<ExerciseCircuitRow title={'reps'} value={item.sets[0].repetition} />
				<ExerciseCircuitRow title={'Weigth'} value={item.sets[0].weight} />
				<ExerciseCircuitRow title={'Time'} value={item.sets[0].time} />
			</View>
		);
	};

	_onResetPress = () => {
		this.timer.reset();
		this.setState({isPlaying: false});
	};

	_onPlayPressed = () => {
		this.timer.play();
		this.setState({ isPlaying: true });

		// PushNotification.localNotificationSchedule({
		// 	    date: new Date(Date.now() + (13 * 1000)), // in 60 secs
		// 	    /* iOS and Android properties */
		// 	    title: "Circuiy", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
		// 	    message: "Time's UP!", // (required)
		// 	    // playSound: false, // (optional) default: true
		// 	    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
		// 	    number: '1', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
		// 	    repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
		// 	    actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
		// 	});

	};

	_onPausePressed = () => {
		this.timer.pause();
		this.setState({isPlaying: false});
	};

	_renderSavedValues = () => {
		if(!this.state.isSubmitted){
			return (
				<Text style={Styles.valuesDescriptionStyle}>Values not yet inputed</Text>
			);
		}else{
			return (
				<TouchableOpacity onPress={()=>this.setState({modalVisible:true})} >
					<Text>Edit Values</Text>
				</TouchableOpacity>
			);
		}
	};

	_renderTimerButtons = () => {

		switch(this.state.isPlaying) {
			case true:
			return (
				<View style={{flex:1,flexDirection:'row', justifyContent:'center'}}>
					<Button onPress={this._onResetPress.bind(this)}>
				        <Text>RESET </Text>
				    </Button>
					<Button onPress={this._onPausePressed.bind(this)}>
				        <Text>Pause </Text>
				    </Button>
			    </View>
			);
		
			default:
			return (
				<Button onPress={this._onPlayPressed.bind(this)}>
			        <Text>START TIMER</Text>
			    </Button>
			);
		}
	};

	_onTimerFinish = () => {
		this.setState({
			modalVisible: true, 
			isPlaying: false
		});
		this.timer.reset();

		
	};

	_onInputValues = ({text, number}) => {
		this.setState({
			isSubmitted: true,
			modalVisible: false,
			numberSubmitted: number,
			textSubmitted: text
		});

		this.props.updateTimerCircuitInRealm({
			number : number,
			id: this.props.moveId
		});
	}

	render () {

		const {
			mainContainer,
			timerContainer,
			timerImageStyle,
			timerTextContainer,
			timerTextStyle,
			recoveryTextStyle,
			buttonContainerStyle,
			detailsContainer,
			recoveryTextContainer,
			valuesDescriptionStyle
		} = Styles; 

		return (
			<View style={mainContainer}>

				<Modal 
                    animationType = {"fade"} 
                    transparent = {true}
                    visible = {this.state.modalVisible}
                    onRequestClose = {() => { console.log("Modal has been closed.") } }>

                        <ImageBackground 
                            style = {Styles.modal}
                            resizeMode="cover"
                            source={require('../../../../assets/images/background-transparent.png')}
                            >
                            <SubmitDataScreen
                            	text={this.state.textSubmitted}
                            	number={this.state.numberSubmitted}
                            	onPressPlus={()=>console.log('plus pressed')}
								onPressMinus={()=>console.log('minus pressed')}
								onPressSubmit={this._onInputValues.bind(this)}
								onPressCancel={()=>this.setState({modalVisible:false})}
                            />

                        </ImageBackground>
                </Modal>					

				<View style={timerContainer}>
					<View style={timerTextContainer}>
						<Image
							resizeMode={'contain'}
							source={require('../../../../assets/images/timer-icon.png')}
							style={timerImageStyle} />
						<TimerCountdown
							ref={(ref)=>this.timer=ref}
							autoStart={false}
				            initialSecondsRemaining={this.props.timerLimit}
				            onTick={() => console.log('tick')}
				            onToggle={(playing)=> this.setState({isPlaying: playing}) }
				            onTimeElapsed={this._onTimerFinish.bind(this)}
				            allowFontScaling={true}
				            style={timerTextStyle}
				        />
					</View>
					<View style={buttonContainerStyle}>
						{this._renderTimerButtons()}
		            </View>
					<View style={recoveryTextContainer}>
						<Text style={recoveryTextStyle}>Recovery {this.props.recoveryTime}</Text>
						{this._renderSavedValues()}
					</View>
				</View>
				<View style={detailsContainer}>
					<FlatList
						style={{flex:1}}
						ListFooterComponent={this._renderFooterComponent}
						ItemSeparatorComponent={this._renderItemSeperator}
						data={this.props.dataSource}
						renderItem={this._renderItem}
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = ({ currentCircuit }) => {

	console.log("current Circuit", {...currentCircuit});

	return {
		recoveryTime: "X min",
		timerLimit: currentCircuit.data.timer * 1000,
		dataSource: currentCircuit.data.exercises,
		moveId: currentCircuit.data.id,
	};
};

export default connect(mapStateToProps, {
	gotoSubmitView,
	updateTimerCircuitInRealm
})(TimeBasedCircuitScreen);