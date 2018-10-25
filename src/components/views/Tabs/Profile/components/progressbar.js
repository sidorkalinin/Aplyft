import React, { Component } from 'react';
import { Text, View } from 'react-native';

class ProgressBar extends	Component {

	render () {

		var percentage = 0;
		if(this.props.percentage)
			percentage = this.props.percentage + '%';

		return (
			<View>
				<View style={st.maincontainer}>
					<View style={[st.secondarycontainer, { width: percentage} ]} >
					</View>
				</View>
			</View>
		);
	}
}

 const st = {
	maincontainer: {
		borderRadius: 5,
		backgroundColor:'#dddddd',
		height: 15,
		flex:1,

    },
    secondarycontainer: {
    	height:15,
    	width: 0,
    	backgroundColor:'red',
    	borderRadius:5,
    },
};

export default ProgressBar;

