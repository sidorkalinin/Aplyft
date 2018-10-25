/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, Text, Keyboard, ViewPropTypes } from 'react-native';

import CustomComposer from './CustomComposer';
import CustomSend from './CustomSend';
import CustomActions from './CustomActions';

export default class CustomInputToolbar extends React.Component {

  constructor(props) {
    super(props);

    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);

    this.state = {
      position: 'absolute',
    };
  }

  componentWillMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  keyboardWillShow() {
    if (this.state !== 'relative') {
      this.setState({
        position: 'relative',
      });
    }
  }

  keyboardWillHide() {
    if (this.state !== 'absolute') {
      this.setState({
        position: 'absolute',
      });
    }
  }

  renderActions() {
    if (this.props.renderActions) {
      return this.props.renderActions(this.props);
    } else if (this.props.onPressActionButton) {
      return <CustomActions {...this.props} />;
    }
    return null;
  }

  renderSend() {
    if (this.props.renderSend) {
      return this.props.renderSend(this.props);
    }
    return <CustomSend {...this.props} />;
  }

  renderComposer() {
    if (this.props.renderComposer) {
      return this.props.renderComposer(this.props);
    }

    return <CustomComposer {...this.props} />;
  }

  renderAccessory() {
    if (this.props.renderAccessory) {
      return (
        <View style={[this.props.accessoryStyle]}>{this.props.renderAccessory(this.props)}</View>
      );
    }
    return null;
  }

  render() {
    return (
        <View style={[styles.container, this.props.containerStyle, { position: this.state.position }]}>
          <View style={[styles.primary, this.props.primaryStyle]}>
            {this.renderActions()}
            {this.renderComposer()}
            {this.renderSend()}
          </View>
          {this.renderAccessory()}
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: "#000000",
    // backgroundColor: "green",
    bottom: 0,
    left: 0,
    right: 0,
  },
  primary: {
    // borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'white',
  },
  
});

CustomInputToolbar.defaultProps = {
  renderAccessory: null,
  renderActions: null,
  renderSend: null,
  renderComposer: null,
  containerStyle: {},
  primaryStyle: {},
  accessoryStyle: {},
  onPressActionButton: () => {},
};

CustomInputToolbar.propTypes = {
  renderAccessory: PropTypes.func,
  renderActions: PropTypes.func,
  renderSend: PropTypes.func,
  renderComposer: PropTypes.func,
  onPressActionButton: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  primaryStyle: ViewPropTypes.style,
  accessoryStyle: ViewPropTypes.style,
};
