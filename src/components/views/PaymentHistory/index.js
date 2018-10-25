import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import { loadPaymentsFromRealm, fetchPaymentsFromServer } from "./actions";
import moment from "moment";

class PaymentHistoryView extends Component {
  static navigationOptions = {
    headerTintColor: "white",
    title: "Payment History"
  };

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };
    var user_id = this.props.user.id;
    // load payment history from server
    this.props.fetchPaymentsFromServer({ user_id });
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => {
    var date = moment(item.due_date).format("MMM Do, YYYY");
    if (item.currency == "" || item.currency == null) {
      var currency = "";
    } else {
      var currency = item.currency;
    }

    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemLeftContainer}>
          <Text style={{ fontSize: 15, paddingTop: 10 }}>
            Payment Title: {item.name}
          </Text>
          <Text style={{ fontSize: 15, paddingTop: 10 }}>
            Original Amount: {item.original_amount} {item.currency}
          </Text>
          <Text style={{ fontSize: 15, paddingTop: 10 }}>
            Discount: {item.coupon_discount}
          </Text>
          <Text style={{ fontSize: 15, paddingTop: 10 }}>
            Amount Paid: {item.amount} {item.currency}
          </Text>
        </View>
        <View style={styles.itemRightContainer}>
          <Text>{date}</Text>
        </View>
      </View>
    );
  };

  _renderSeparator = () => {
    return <View style={styles.seperatorStyle} />;
  };

  _renderEmptyComponent = () => {
    return (
      <View style={styles.emptyComponentContainer}>
        <Text style={{ color: "#bbbbbb", textAlign: "center" }}>
          No Payment History
        </Text>
      </View>
    );
  };

  _onRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        // call back once the state is chaged
        // we can make a remote request here
        var user_id = this.props.user.id;
        this.props.fetchPaymentsFromServer({ user_id });
        this.setState({ refreshing: false });
      }
    );
  };

  render() {
    const { mainContainer } = styles;

    return (
      <View style={mainContainer}>
        <FlatList
          data={this.props.paymentHistoryReducer.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._renderSeparator}
          ListEmptyComponent={this._renderEmptyComponent}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ user, paymentHistoryReducer }) => {
  return {
    paymentHistoryReducer: paymentHistoryReducer,
    user: user.user
  };
};

export default connect(
  mapStateToProps,
  {
    loadPaymentsFromRealm,
    fetchPaymentsFromServer
  }
)(PaymentHistoryView);
