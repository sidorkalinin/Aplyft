import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { viewportWidth, viewportHeight } from '../../../../variables';


class Ruler extends Component {


    constructor (props) {
        super(props);

        var From = this.props.From || 0;
        var To  = this.props.To || 10;
        var ds = [];
        for (var i=From; i<To; i++ ) {
            ds.push(i);
        }

        this.state = {
            dataSource : ds,
            smallLine : this.props.smallLineDivision || 5,
            bigLine : this.props.bigLineDivision || 10,
        };

    }

    _calculateFirstItemIndex = () => {
        if (this.props.InitValue) {
            for (var i in this.state.dataSource) {
                var row = this.state.dataSource[i];
                if(row == this.props.InitValue){
                    return i;
                }
            }
        }

        return 0;
    };

    _onSnap = (index) => {
        if (this.props.onChange)
            this.props.onChange(this.state.dataSource[index]);
    }

    _renderItem = ({item, index}) => {

        var height = 30;
        if (index % this.state.smallLine ==0) 
            height += 12;
        if(index % this.state.bigLine ==0)
            height += 5

        return (
            <View style={{
                height: 80,
                paddingLeft:5,
                paddingRight:5,
                flexDirection: 'column',
                // borderWidth: 1,
            }}>
                <View style={{
                     width:2,
                     height: height,
                     backgroundColor: 'white',
                }} />

                {
                    index % this.state.bigLine == 0 ? <Text style={Styles.textPointerStyle}>{item}</Text> : <View />
                }
            </View>
        );
    };

    render () {

        let firstItem = this._calculateFirstItemIndex();

        return (
                <View style={Styles.mainContainer}>
                <Text style={Styles.titleStyle}>{this.props.label}</Text>
                <View style={Styles.pointerContainer}>
                    <Image 
                        source={require('./images/ruler-pointer.png')}
                        style={Styles.pointerStyle}
                    />
                </View>
                <Carousel   
                    ref={(c) => { this._carousel = c; }}
                    containerCustomStyle={{
                        backgroundColor: '#cccccc'
                    }}
                    firstItem={firstItem}                 
                    activeSlideOffset={1}
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                    sliderWidth={viewportWidth}
                    itemWidth={12}
                    onSnapToItem={this._onSnap.bind(this)}
                />
                </View>

        );

    }

}

const Styles = {
    mainContainer : {
        alignItems:'center',
        backgroundColor: 'white',
    },
    titleStyle : {

        padding: 5,
        fontSize: 17,
    },
    pointerStyle:{
        width: 30,
        height: 30,
        // backgroundColor: 'transparent'
    },
    pointerContainer : {
        // backgroundColor: '#cccccc',
        position: 'absolute',
        top: 25,
        zIndex: 99
    },
    textPointerStyle : {
        position: 'absolute', 
        zIndex: 100, 
        // borderWidth:1, 
        bottom:5,
        width: 30,
        height: 20,
        left: -9,
        textAlign: 'center',
        color: 'white'
    }
};

export default Ruler;

