import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../../../styles/theme';

const ExerciseCircuitRow = ({ title, value }) => {

	if (value == "0" || !value || value == null) {
		return (<View />);
	}

  	return (
  		<View style={styles.mainContainer}>
			<Text style={styles.exerciseTitleStyle}>{title}</Text>
			<Text style={styles.exerciseDetailStyle}>{value}</Text>
		</View>
  	);
};

const styles = {
	mainContainer:{
		flexDirection: 'row',
		paddingTop: 10,
		paddingBottom: 5,
		borderTopWidth: 1,
		borderColor: '#eeeeee',
	},
	exerciseTitleStyle : {
		flex: 1,
		// borderWidth:1,
	},
	exerciseDetailStyle : {
		color: colors.lightGray,
		// borderWidth:1,

	},

};

export default ExerciseCircuitRow;
