import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { viewportWidth, viewportHeight } from '../../../variables';
import { gotoLoginView, gotoRegisterView } from './actions';

// importing the styles of that specific page screen
import Styles from './styles';
import FastImage from 'react-native-fast-image';


class welcomeScreen extends Component {

	// page state 
	state = {
		sliderActiveSlide : 0,
	};

	// ho the item will be displayed on the screen
	_renderItem ({item, index}) {
        const { itemImage } = Styles;
        return (
            <View >
                <FastImage
                  resizeMode={FastImage.resizeMode.cover}
                  style={itemImage}
                  source={{
                    uri: item.imgSrc,
                    priority: FastImage.priority.normal,
                  }}
                />
            </View>
        );
    }


	render () {

        // destructoring so it wil be easier to read
		const {
            mainContainer,
            titleWhite,
            titleDark,
            titleContainer,
            carouselContainer,
            dotStyle,
            buttonStyle,
            buttonsContainer,
            loginButtonStyle
        } = Styles;

		return (

			<View style={ mainContainer }>

                <View style={ titleContainer }>
				    <Text style={ titleWhite }>CONNECT WITH</Text>
				    <Text style={ titleDark }>GLOBAL FITNESS EXPERTS</Text>
                </View>

				<Carousel                    
              		ref={(c) => { this._carousel = c; }}
              		data={[
              			{
                      imgSrc : 'https://app.aplyft.com/tutorial-images/1.jpg'
                    },
                    {
                      imgSrc : 'https://app.aplyft.com/tutorial-images/2.jpg'
                    },
                    {
                      imgSrc : 'https://app.aplyft.com/tutorial-images/3.jpg'
                    },
                    {
                      imgSrc : 'https://app.aplyft.com/tutorial-images/4.jpg'
                    },

              		]}
                    containerCustomStyle={carouselContainer}
              		renderItem={this._renderItem}
              		sliderWidth={viewportWidth}
              		itemWidth={viewportWidth-125}
              		onSnapToItem={(index) => this.setState({ sliderActiveSlide: index }) }
            	/>

            	<Pagination
                  	dotsLength={4}
                    containerStyle={{paddingVertical: 8}}
                  	activeDotIndex={this.state.sliderActiveSlide}
                  	dotColor={'rgba(24,31,49, 1)'}
                    dotStyle={dotStyle}
                    inactiveDotColor={'rgba(255,255,255, 1)'}
                  	inactiveDotOpacity={1}
                  	inactiveDotScale={1}
                />

                <View style={buttonsContainer}>
                    <TouchableOpacity style={buttonStyle} onPress={()=>this.props.gotoRegisterView()}>
                        <Text style={{color:'white', fontWeight:'bold'}}>NEW TO APLYFT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.gotoLoginView()} >
                        <Text style={loginButtonStyle}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
			</View>
		);
	}
}



export default connect(null, {
	gotoRegisterView,
    gotoLoginView
})(welcomeScreen);