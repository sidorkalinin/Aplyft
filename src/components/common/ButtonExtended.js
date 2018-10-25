import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ButtonExtended = ({ onPress, children }) => {
	const { buttonStyle } = styles;
  return (
	<TouchableOpacity onPress={onPress} style={buttonStyle}>
		{children}
	</TouchableOpacity>
  );
};

const styles = {
	buttonStyle: {
		flex: 1,
		//alignSelf: 'stretch',
		backgroundColor: '#181f31',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#181f31',
		marginLeft: 5,
		marginRight: 5,
	},
};

export { ButtonExtended };