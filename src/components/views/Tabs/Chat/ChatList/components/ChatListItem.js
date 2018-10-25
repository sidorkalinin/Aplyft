import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import {colors} from '../../../../../styles/theme';
import {connect} from 'react-redux';
// import * as actions from './../actions';
import {StackNavigator} from 'react-navigation';
import moment from "moment";

class ChatListItem extends Component {

    onClientPress() {

        const {id, ClientName, ClientImage, ClientRequest, ClientLocation,} = this.props.clientlist;
        // this.props.clientselect({ id, ClientName, ClientImage, ClientRequest, ClientLocation });
    }

    _renderUnreadMessagesCount = () => {
        if (this.props.unreadMessagesCount)
            return (
                <View style={Styles.messageCountContainer}>
                    <View style={Styles.messageCountTextContainer}>
                        <Text style={Styles.messageCountTextStyle}>{this.props.unreadMessagesCount}</Text>
                    </View>
                </View>
            );
        return null;
    }

    //to render the time and unread message details on right
    _renderUnreadDetails = () => {
        if (this.props.lastMessageType)
            return (
                <View style={{paddingHorizontal: 10}}>
                    <View style={Styles.lastMessageTimeContainer}>
                        <Text style={
                            this.props.unreadMessagesCount > 0 ?
                                Styles.unreadLastMessageStyle : Styles.readLastMessageStyle
                        }>
                            {moment.unix(this.props.lastMessageCreatedAt / 1000).format("hh:mm a")}
                        </Text>
                    </View>
                    {this._renderUnreadMessagesCount()}
                </View>
            );
        return null;
    }

    //to render the last message details
    _renderLastMessage = () => {
        switch (this.props.lastMessageType) {
            //If the last message is a text message
            case "text":
                if (this.props.lastMessage)
                    return (
                        <View style={Styles.lastMessageContainer}>
                            {   // if user has sent it, Then show read receipt
                                this.props.lastMessageSenderID === this.props.user.user.id ?
                                    <Image
                                        resizeMode="contain"
                                        style={[Styles.lastMessageIcon,
                                            {tintColor:this.props.lastMessageReadStatus > 0 ? colors.lightGray:colors.lightBlue}]}
                                        source={require('../../../../../../assets/images/chat/chat_read_icon.png')}
                                    /> : null
                            }
                            <Text style={
                                this.props.unreadMessagesCount > 0 ?
                                    Styles.unreadLastMessageStyle :
                                    Styles.readLastMessageStyle}
                                  numberOfLines={1}>{this.props.lastMessage}</Text>
                        </View>
                    );
                return null;

            //If the last message is a photo, show photo icon
            case "image/jpeg":
                return (
                    <View style={Styles.lastMessageContainer}>
                        {   // if user has sent it, Then show read receipt
                            this.props.lastMessageSenderID === this.props.user.user.id ?
                                <Image
                                    resizeMode="contain"
                                    style={[Styles.lastMessageIcon,
                                        {tintColor:this.props.lastMessageReadStatus > 0 ? colors.lightGray:colors.lightBlue}]}
                                    source={require('../../../../../../assets/images/chat/chat_read_icon.png')}
                                /> : null
                        }
                        <Image
                            resizeMode="contain"
                            style={[Styles.lastMessageIcon,
                                {tintColor:this.props.unreadMessagesCount > 0 ?
                                    colors.darkBlueColor : colors.lightGray}]
                            }
                            source={require('../../../../../../assets/images/chat/chat_picture_icon.png')}
                        />
                        <Text style={
                            this.props.unreadMessagesCount > 0 ?
                                Styles.unreadLastMessageStyle :
                                Styles.readLastMessageStyle}
                              numberOfLines={1}>{"Photo"}</Text>
                    </View>
                );

            //If the last message is a video, show video icon
            case "video/mp4":
                return (
                    <View style={Styles.lastMessageContainer}>
                        {   // if user has sent it, Then show read receipt
                            this.props.lastMessageSenderID === this.props.user.user.id ?
                                <Image
                                    resizeMode="contain"
                                    style={[Styles.lastMessageIcon,
                                        {tintColor:this.props.lastMessageReadStatus > 0 ? colors.lightGray:colors.lightBlue}]}
                                    source={require('../../../../../../assets/images/chat/chat_read_icon.png')}
                                /> : null
                        }
                        <Image
                            resizeMode="contain"
                            style={[Styles.lastMessageIcon,
                                {tintColor:this.props.unreadMessagesCount > 0 ?
                                    colors.darkBlueColor : colors.lightGray}]}
                            source={require('../../../../../../assets/images/chat/chat_video_icon.png')}
                        />
                        <Text style={
                            this.props.unreadMessagesCount > 0 ?
                                Styles.unreadLastMessageStyle :
                                Styles.readLastMessageStyle}
                              numberOfLines={1}>{"Video"}</Text>
                    </View>
                );

            //If the last message is a audio, show video icon
            case "audio/mpeg":
                return (
                    <View style={Styles.lastMessageContainer}>
                        {   // if user has sent it, Then show read receipt
                            this.props.lastMessageSenderID === this.props.user.user.id ?
                                <Image
                                    resizeMode="contain"
                                    style={[Styles.lastMessageIcon,
                                        {tintColor:this.props.lastMessageReadStatus > 0 ? colors.lightGray:colors.lightBlue}]}
                                    source={require('../../../../../../assets/images/chat/chat_read_icon.png')}
                                /> : null
                        }
                        <Image
                            resizeMode="contain"
                            style={[Styles.lastMessageIcon,
                                {tintColor:this.props.unreadMessagesCount > 0?
                                    colors.darkBlueColor : colors.lightGray}]}
                            source={require('../../../../../../assets/images/chat/chat_micro_icon.png')}
                        />
                        <Text style={
                            this.props.unreadMessagesCount > 0 ?
                                Styles.unreadLastMessageStyle :
                                Styles.readLastMessageStyle}
                              numberOfLines={1}>{"Audio"}</Text>
                    </View>
                );
            default:
                return null;
        }
    };

    render() {

        const {id, ClientName, ClientImage, ClientRequest, ClientLocation, active} = this.props.clientlist;

        const {

            mainContainer,
            descriptionContainer,
            imageContainer,
            imageStyle,
            clientnameStyle,
            locationStyle,
            requestStyle,
        } = Styles;

        const grayStyleBg = {};
        if (active == 0)
            grayStyleBg.backgroundColor = '#eeeeee';

        return (
            <View style={[mainContainer, grayStyleBg]}>
                <View style={imageContainer}>
                    <Image
                        style={imageStyle}
                        source={{uri: ClientImage}}/>
                </View>

                <View style={descriptionContainer}>
                    <Text style={clientnameStyle}>{ClientName}</Text>
                    {ClientLocation && <Text style={locationStyle}>{ClientLocation}</Text>}
                    {ClientRequest && <Text style={requestStyle}>{ClientRequest}</Text>}
                    {this._renderLastMessage()}
                </View>

                {this._renderUnreadDetails()}

            </View>
        );
    }
}


const Styles = {
    mainContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        //borderTopWidth : 4,
        //borderBottomWidth : 4,
        //borderColor: '#eeeeee',
        backgroundColor: 'white',
    },

    imageContainer: {
        padding: 5,

    },
    messageCountContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    messageCountTextContainer: {
        borderRadius: 9,
        width: 18,
        height: 18,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageCountTextStyle: {
        color: 'white'
    },
    imageStyle: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },

    descriptionContainer: {
        flexDirection: 'column',
        flex: 1,
        paddingLeft: 10,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },

    clientnameStyle: {
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: colors.darkBlueColor
    },

    locationStyle: {
        fontSize: 14,
        color: "#bcbcbc"
    },

    requestStyle: {
        fontSize: 14,
        color: colors.darkBlueColor
    },
    lastMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical:5
    },
    readLastMessageStyle: {
        fontSize: 14,
        textAlignVertical: 'center',
        color: colors.lightGray
    },
    unreadLastMessageStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        color: colors.darkBlueColor
    },
    lastMessageTimeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    lastMessageIcon: {
        width: 20,
        height: 20,
        marginRight: 5
    }
};

const mapStatetoProps = ({user}) => {
    return {
        user: user
    }

};

export default connect(mapStatetoProps, {})(ChatListItem);