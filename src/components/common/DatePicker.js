import React, { PureComponent } from 'react';
import { TouchableOpacity, View, Text, DatePickerIOS } from 'react-native';

class DatePicker extends PureComponent {

	state = {
		show : false,
		monthNames : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

	};


	_renderDate = () => {
		if (this.state.show ) {
			return (
				<View state={styles.dateContainer}>
					<DatePickerIOS
						style={styles.iOSpickerStyle}
			          	date={new Date(this.props.value)}
		                mode="date"
		                onDateChange={this.props.onDateChange.bind(this)}
		                minimumDate={new Date(this.props.minimumDate)}
			        />
				</View>
			);
		}else{
			return null;
		}
	};

	render () {

		let currentDate = new Date(this.props.value);
		var value = this.state.monthNames[currentDate.getMonth()] + " " +currentDate.getUTCDate() + ", "+currentDate.getUTCFullYear();

		return (
			<TouchableOpacity style={styles.containerStyle} onPress={()=>this.setState({show: !this.state.show})}>
				<View style={styles.textContainer}>
					<Text style={styles.labelStyle}>{this.props.label}</Text>
					<Text style={styles.valueStyle}>{value}</Text>
				</View>
				<View>
					{this._renderDate()}
				</View>
			</TouchableOpacity>
		);
	}

};

const styles = {
	containerStyle: {
		// borderWidth: 1,
	},
	dateContainer:{
		height: 150,
		backgroundColor: '#eeeeee'
	},
	iOSpickerStyle:{
		backgroundColor: '#eeeeee',
		color: 'red',
	},
	textContainer:{
		flexDirection: 'row',
		padding: 20,
	},
	labelStyle:{
		flex: 1,
	},
	valueStyle:{
		width: 150,
		textAlign:'right',
	}

};

export { DatePicker };

