import React, { Component } from "react";
import {
  View,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import Styles from "./styles";
import {
  removeCard,
  refreshCardDetails,
  loadAllCardsFromRealm,
  setDefaultCard,
  openStripeAndAddCard
} from "./actions";
import CardListItem from "./components/cardListItem";

class CardDetails extends Component {
  static navigationOptions = {
    title: 'Payment Details',
    headerTintColor: "white"
  };
  componentWillMount() {
    this.props.loadAllCardsFromRealm();
    this.props.refreshCardDetails();
  }
  _onRefresh = () => {
    this.props.refreshCardDetails();
  };

  _renderSeparator = () => {
    return <View style={Styles.seperatorStyle} />;
  };

  _renderEmptyComponent = () => {
    return (
      <View style={Styles.emptyComponentContainer}>
        <Text
          style={{
            color: "#bbbbbb",
            textAlign: "center",
            padding: 20,
            paddingBottom: 0
          }}
        >
          Add a new card by pressing the plus button
        </Text>
      </View>
    );
  };

  _keyExtractor = (item, index) => item.card_id;
  _renderItem = ({ item }) => {
    return (
      <CardListItem
        default={item.default}
        card_last4={item.card_last4}
        card_holder={item.card_holder}
        card_exp_month={item.card_exp_month}
        card_exp_year={item.card_exp_year}
        onPressDelete={() => {
          var cardId = item.card_id;
          this.props.removeCard({ cardId });
        }}
        onRowPress={()=>{
          if(!item.default)
            this.props.setDefaultCard({ cardId: item.card_id, last4: item.card_last4 });
        }}
      />
    );
  };

  _renderFooter = () => {
    return (
      <TouchableOpacity
        onPress={this.props.openStripeAndAddCard}
        style={{
          alignSelf: "center",
          //borderWidth: 2,
          margin: 10,
          borderRadius: 40,
          paddingTop: 60
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
            width: 70,
            height: 70,
            borderRadius: 35
          }}
        >
          <Text
            style={{
              marginBottom: 14,
              alignSelf: "center",
              fontSize: 100,
              fontWeight: "300",
              color: "white"
            }}
          >
            +
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={Styles.mainContainer}>
        {this.props.isRemoving ? (
          <Modal transparent animationType="fade">
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.8)",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white", paddingBottom: 10 }}>
                {this.props.userInfoText}
              </Text>
              <ActivityIndicator />
            </View>
          </Modal>
        ) : null}
        <FlatList
          data={this.props.dataSource}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._renderSeparator}
          ListEmptyComponent={this._renderEmptyComponent}
          refreshing={this.props.refreshing}
          onRefresh={this._onRefresh}
          ListFooterComponent={this._renderFooter}
        />
      </View>
    );
  }
}

const mapsToProps = ({ cardDetailReducer }) => {
  return cardDetailReducer;
};

export default connect(
  mapsToProps,
  {
    removeCard,
    loadAllCardsFromRealm,
    refreshCardDetails,
    setDefaultCard,
    openStripeAndAddCard
  }
)(CardDetails);
