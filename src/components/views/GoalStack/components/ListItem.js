import React, { Component } from 'react';
import {
	View,
	Text,
	Image
} from 'react-native';

// styles
import { colors } from '../../../styles/theme';

class ListItem extends Component {

	render () {

		const { mainContainer, childrenStyle, chevronStyle, imgStyle } = styles;
		const {style} = this.props;

		return (
			<View style={[mainContainer,style]} onPress={()=>console.log('internal pressed')}>
				
				<View style={childrenStyle} onPress={()=>console.log('zabat')}>
					{this.props.children}
				</View>

				<View style={chevronStyle}>
          			<Image 
          				style={imgStyle}
						source={require('../../../../assets/images/chevron.jpg')}
          			/>
        		</View>
			</View>
		);
	}
}

const styles = {
	mainContainer : {
		borderBottomWidth: 1,
		borderTopWidth: 0,
		borderColor: '#eeeeee',
		padding: 10,
		paddingLeft: 20,
		paddingTop: 18,
		paddingBottom: 18,

		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	childrenStyle : {
		flex: 1,
    	flexDirection: 'column',
    	zIndex: 5,
	},
	chevronStyle: {
		width: 30,
		justifyContent: 'center',
    	alignItems: 'center',
    	zIndex: 4,
	},
	imgStyle : {
		width: 20,
		height: 20
	}
};

export default ListItem;