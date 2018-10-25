import React from 'react';
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native';

const AmountPaidRow = props => (
	<View style={styles.mainContainer}>
		<View style={styles.leftContainer}>
			<Text style={styles.boldText}>{props.amount} {props.currency}, April 3th 2018</Text>
		</View>
		{
			props.isPaid ? 
			<View style={styles.rightContainer}>
				<Text>paid</Text>
			</View>
			:
			(
				props.isDue ?
				<TouchableOpacity onPress={ props.onProcessPaymentPress }>
					<Text>Process payment</Text>
				</TouchableOpacity>
				:
				<View />
					
			)
			
		}
	</View>
);

const styles = {
	mainContainer :{
		padding: 20,
		backgroundColor: 'white',
		flexDirection:'row'
	},
	leftContainer : {
		flex: 1,
		justifyContent: 'flex-start',
	},
	rightContainer : {
		justifyContent: 'flex-end',

	},
	boldText: {
		fontWeight: 'bold'
	}
};

// let other components use it
export default AmountPaidRow;