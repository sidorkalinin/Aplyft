import React, { Component } from 'react';
import {
	View,
	Animated,
	Text,
	PanResponder,
	ScrollView,
	Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');
class MetricPanInput extends Component {

	constructor (props) {
		super (props);

		const position = new Animated.ValueXY();
		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder : () => true,
			onPanResponderMove: (event, gesture) => {
				this.draggingRuler (gesture);
			},
			onPanResponderRelease: (event, gesture) => {
				this.dragginRelease(gesture);
			}
		}); 

		this.state = { panResponder, position };
		

	}

	componentWillMount () {

		/*Animated.spring(this.state.position, {
			toValue : { x: -300, y: 0}
		}).start();*/
	}

	draggingRuler (gesture) {
		// console.log(gesture.vx);
		this.state.position.setValue({ x: gesture.dx, y: 0 });
	}

	dragginRelease (gesture) {
		const duration = Math.abs((50 - Math.abs(gesture.dx)) / gesture.vx);
		nimated.spring(this.state.position, {
			toValue : { x: -300, y: 0}
		}).start();
	}

	drawDetails () {
		const { 
			detailContainer,
			detailLines,
			detailLines2
		} = styles;

		return (
			<View style={detailContainer}>
				<View style={detailLines2} />
				<View style={detailLines} />
				<View style={detailLines} />
				<View style={detailLines} />
				<View style={detailLines2} />
				<View style={detailLines} />
				<View style={detailLines} />
				<View style={detailLines} />
				<View style={detailLines} />
				<View style={detailLines2} />
				<View style={detailLines} />
				<View style={detailLines} />
				<View style={detailLines} />
				<View style={detailLines} />
				<View style={detailLines2} />
				<View style={detailLines} />
				<View style={detailLines} />
				<View style={detailLines} />
				<View style={detailLines2} />
				<View style={detailLines} />
				<View style={detailLines} />
				<View style={detailLines} />
				<View style={detailLines2} />
				<View style={detailLines} />
				<View style={detailLines} />
				<View style={detailLines} />
				<View style={detailLines2} />
				<View style={detailLines} />
				<View style={detailLines} />
				<View style={detailLines} />
				<View style={detailLines2} />
				<View style={detailLines} />
				<View style={detailLines} />
				<View style={detailLines} />

			</View>
		);
	}

	drawDetailLines () {

	}

	render () {

		const {
			mainContainer,
			ruler
		} = styles;

		return (
			<View style={mainContainer}>
				<Animated.View 
					style={[ruler, this.state.position.getLayout()]}
					{...this.state.panResponder.panHandlers}
					>
					{this.drawDetails()}
				</Animated.View>
			</View>
		);
	}

}

const styles = {
	mainContainer : {
		
		height: 50,
		backgroundColor:'red'
	},
	ruler : {
		borderWidth : 4,
		borderColor : 'green',
		width : 500,
		height : 40
	},
	detailContainer : {
		flexDirection : 'row',
		paddingRight : 100
	},
	detailLines : {
		width : 2,
		height: '50%',
		marginRight : 20,
		backgroundColor : 'white'
	},
	detailLines2 : {
		width : 2,
		height: '100%',
		marginRight : 30,
		backgroundColor : 'white'
	}

};


export default MetricPanInput;