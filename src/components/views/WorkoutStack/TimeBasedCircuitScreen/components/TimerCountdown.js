import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, ViewPropTypes as RNViewPropTypes } from 'react-native';
const ViewPropTypes = RNViewPropTypes || View.propTypes;

/**
 * A customizable countdown component for React Native.
 *
 * @export
 * @class TimerCountdown
 * @extends {React.Component}
 */

export default class TimerCountdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: this.props.initialSecondsRemaining,
      timeoutId: null,
      previousSeconds: null,
      playing : true
    };

    this.mounted = false;

    this.toggleTimer = this.toggleTimer.bind(this);
    this.tick = this.tick.bind(this);
    this.getFormattedTime = this.getFormattedTime.bind(this);
    this.reset = this.reset.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    if(this.props.autoStart){
    	this.tick();

      if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
      this.setState({ previousSeconds: null, secondsRemaining: this.props.initialSecondsRemaining });
    }

  }

  componentWillReceiveProps(newProps) {
    // if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
    // this.setState({ previousSeconds: null, secondsRemaining: newProps.initialSecondsRemaining });
  }

  componentDidUpdate(nextProps, nextState) {
    if ((!this.state.previousSeconds) && this.state.secondsRemaining > 0 && this.mounted) {
      this.tick();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    clearTimeout(this.state.timeoutId);
  }

  toggleTimer() {
    // console.log("toggling");
  	this.state.playing = !this.state.playing;
		if (this.props.onToggle) {
      this.props.onToggle(this.state.playing);
    }
		if (!this.state.playing) {
			this.state.previousSeconds = null;
  		clearTimeout(this.state.timeoutId);
  		return;
  	}
 		this.tick();
  }

  pause () {
      this.setState({playing: false });
      this.state.previousSeconds = 0;
      clearTimeout(this.state.timeoutId);
      // console.log("the timeout ID:", this.state.timeoutId);
      if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
  }

  play () {
    this.setState({playing: true });
    this.tick();
  }

  tick() {
    const currentSeconds = Date.now();
    const dt = this.state.previousSeconds ? (currentSeconds - this.state.previousSeconds) : 0;
    const interval = this.props.interval;

    // correct for small variations in actual timeout time
    const intervalSecondsRemaing = (interval - (dt % interval));
    let timeout = intervalSecondsRemaing;

    if (intervalSecondsRemaing < (interval / 2.0)) {
      timeout += interval;
    }

    const secondsRemaining = Math.max(this.state.secondsRemaining - dt, 0);
    const isComplete = (this.state.previousSeconds && secondsRemaining <= 0);

    if (this.mounted) {
      if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
      if (this.state.playing)
      this.setState({
        timeoutId: isComplete ? null : setTimeout(this.tick, timeout),
        previousSeconds: currentSeconds,
        secondsRemaining: secondsRemaining
      });
    }

    if (isComplete) {
      if (this.props.onTimeElapsed) { this.props.onTimeElapsed(); }
      return;
    }

    if (this.props.onTick) {
      this.props.onTick(secondsRemaining);
    }
  }

  reset () {
    if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
    this.setState({ 
      previousSeconds: null, 
      secondsRemaining: this.props.initialSecondsRemaining, 
      playing: false,
      timeoutId : null,
    });
    
  }



  getFormattedTime(milliseconds) {
    if (this.props.formatFunc) {
      return this.props.formatFunc(milliseconds);
    }

    const totalSeconds = Math.round(milliseconds / 1000);

    let seconds = parseInt(totalSeconds % 60, 10);
    let minutes = parseInt(totalSeconds / 60, 10) % 60;
    let hours = parseInt(totalSeconds / 3600, 10);

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;

    hours = hours === '00' ? '' : hours + ':';

    return hours + minutes + ':' + seconds;
  }

  render() {
    const secondsRemaining = this.state.secondsRemaining;
    return (
      <Text
        allowFontScaling={this.props.allowFontScaling}
        style={this.props.style}
      >
        {this.getFormattedTime(secondsRemaining)}
      </Text>
    );
  }
}

TimerCountdown.defaultProps = {
  interval: 1000,
  formatFunc: null,
  onTick: null,
  onTimeElapsed: null,
  allowFontScaling: false,
  style: {}
};

TimerCountdown.propTypes = {
  initialSecondsRemaining: PropTypes.number.isRequired,
  interval: PropTypes.number,
  formatFunc: PropTypes.func,
  onTick: PropTypes.func,
  onTimeElapsed: PropTypes.func,
  allowFontScaling: PropTypes.bool,
  style: ViewPropTypes.style,
};

