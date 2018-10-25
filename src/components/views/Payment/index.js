import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  TextInput,
  NativeModules,
  LayoutAnimation,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import {
  goBack,
  stripeFuturePayments,
  getPaymentDetails,
  updateCardInfo,
  promoCodeChange,
  applyPromo
} from "./actions";
import styles from "./styles";
import FastImage from "react-native-fast-image";
import stripe from "tipsi-stripe";
import { STRIPE_KEY, STRIPE_MERCHANT_KEY } from "../../../variables";
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

stripe.setOptions({
  publishableKey: STRIPE_KEY,
  merchantId: STRIPE_MERCHANT_KEY // Optional
  // androidPayMode: 'test', // Android only
});

class Payment extends React.Component {
  static navigationOptions = {
    headerTintColor: "white"
  };

  constructor(props) {
    super(props);

    // refresh and get the
    var pt_id = this.props.paymentReducer.personalTrainerId;
    console.log("in the index !! >> !! pt_id is : ", pt_id);
    this.props.getPaymentDetails({ pt_id });
  }

  _onCancelPress = () => {
    this.props.goBack();
  };

  _processStripeFuturePayment = async () => {
    // wait for everything to finish and then process
    const user = this.props.user.user;
    var stripeacntId = user.stripeAccountId;
    var pt_id = this.props.paymentReducer.personalTrainerId;

    // sending the personal trainer name for mixpnel
    let personal_trainer_full_name = this.props.paymentReducer.personalTrainerFirstName + " "+ this.props.paymentReducer.personalTrainerLastName;

    try {
      if (user.stripeAccountId == null || user.stripeAccountId == "") {
        // this.setState({ loading: true, token: null })
        const token = await stripe.paymentRequestWithCardForm({
          // Only iOS support this options
          smsAutofillDisabled: true,
          requiredBillingAddressFields: "full",
          prefilledInformation: {
            billingAddress: {
              name: user.firstName + " " + user.lastName,
              email: user.email
            }
          }
        });

        stripeacntId = token.tokenId;
        var coupon_code = this.props.paymentReducer.coupon_code;
        this.props.updateCardInfo(
          token,
          () => {
            this.props.stripeFuturePayments(stripeacntId, pt_id, coupon_code, personal_trainer_full_name);
          },
          true
        );
      } else {
        var coupon_code = this.props.paymentReducer.coupon_code;
        this.props.stripeFuturePayments(stripeacntId, pt_id, coupon_code, personal_trainer_full_name);
      }
    } catch (error) {
      alert("there was an error processing your payment");
      console.log("ERROR STRIPE ", error);
    }
  };

  onPromoCodeChange(text) {
    this.props.promoCodeChange(text);
  }

  _renderStripe = authorized => {
    return (
      <TouchableOpacity
        style={styles.paymentContainer}
        onPress={this._processStripeFuturePayment.bind(this)}
      >
        <View
          style={{
            padding: 10,
            paddingLeft: 30,
            paddingRight: 30,
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#181f31",
            borderRadius: 5
          }}
        >
          <Text
            style={{
              fontWeight: "900",
              color: "white"
            }}
          >
            PAY
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderPromoBtn() {
    if (this.props.paymentReducer.verification == 0) {
      var codeValue = this.props.paymentReducer.codeValue;
      if (this.props.paymentReducer.checking) {
        return (
          <View
            style={{
              padding: 10,

              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ActivityIndicator />
          </View>
        );
      } else {
        return (
          <TouchableOpacity
            onPress={this.onApplyPromo.bind(this, codeValue)}
            style={{
              padding: 10,
              paddingLeft: 30,
              paddingRight: 30,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#181f31",
              borderRadius: 5
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "900",
                fontSize: 16
              }}
            >
              APPLY
            </Text>
          </TouchableOpacity>
        );
      }
    } else if (this.props.paymentReducer.verification == 1) {
      return (
        <View
          style={{
            padding: 10,

            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            style={{ width: 25, height: 20 }}
            source={require("./../../../assets/images/greenCheck.png")}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            padding: 10,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            style={{ width: 25, height: 25 }}
            source={require("./../../../assets/images/redX.png")}
          />
        </View>
      );
    }
  }

  onApplyPromo(codeValue) {
    var stripe_plan_id = this.props.paymentReducer.stripe_pricing_plan_id;
    var pt_id = this.props.paymentReducer.personalTrainerId;
    this.props.applyPromo({ codeValue, stripe_plan_id, pt_id });
  }
  renderDiscountSection() {
    LayoutAnimation.easeInEaseOut();
    if (this.props.paymentReducer.verification == 1) {
      return (
        <View style={{ width: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 20,
              marginBottom: 10
              // marginRight: 20
            }}
          >
            <View style={{ flex: 2 }}>
              <Text style={styles.descriptionStyle}>Promo code discount</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.amountStyle}>
                {this.props.paymentReducer.discount}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginLeft: 20,
              // marginRight: 20,
              marginBottom: 30,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View style={{ flex: 2 }}>
              <Text style={{ fontSize: 15, fontWeight: "900" }}>
                Final price
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.amountStyle}>
                {this.props.paymentReducer.total_amount}
                {this.props.paymentReducer.currency}
              </Text>
            </View>
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  }
  render() {

    // check if the payment details are not suplied
    if (!this.props.paymentReducer.init) {
      return (
        <View style={styles.mainConatiner}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "black", paddingBottom: 10 }}>
              Fetching Payment Details
            </Text>
            <ActivityIndicator />
          </View>
        </View>
      );
    }

    // if the payment details are supplied
    return (
      <ScrollView
        style={styles.scrollContainer}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.mainConatiner}>
          {this.props.paymentReducer.refreshing ? (
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
                  Confirming payment
                </Text>
                <ActivityIndicator />
              </View>
            </Modal>
          ) : null}

          <View style={styles.blueHeader} />
          <View style={styles.avatarAllContainer}>
            <View style={styles.avatarContainer}>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              style={styles.imageStyle}
              source={{
                uri: this.props.paymentReducer.personalTrainerPhoto,
                priority: FastImage.priority.normal
              }}
            />
            </View>
            <Text style={styles.fullNameStyle}>
              {this.props.paymentReducer.personalTrainerFirstName}{" "}
              {this.props.paymentReducer.personalTrainerLastName}
            </Text>
          </View>
          <View style={{ width: "100%" }}>
            <View
              style={{
                flexDirection: "row",
                //justifyContent: "space-between",
                marginLeft: 20,
                marginBottom: 10
                //marginRight: 20,
                //borderWidth: 1
              }}
            >
              <View style={{ flex: 2 }}>
                <Text style={styles.descriptionStyle}>
                  Required Amount to pay
                </Text>
              </View>
              <View
                style={{
                  flex: 1
                }}
              >
                <Text style={styles.amountStyle}>
                  {this.props.paymentReducer.amount}{" "}
                  {this.props.paymentReducer.currency}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginLeft: 20,
                marginBottom: 30,
                flexDirection: "row"
                //justifyContent: "space-between"
              }}
            >
              <View style={{ flex: 2 }}>
                <Text style={styles.descriptionStyle}>Time Offered</Text>
              </View>
              <View
                style={{
                  flex: 1
                  //borderWidth: 1,
                  //borderColor: "red"
                }}
              >
                <Text style={styles.amountStyle}>
                  {this.props.paymentReducer.dueDate}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "column"
            }}
          >
            <View
              style={{
                marginLeft: 20
              }}
            >
              <Text
                style={{ fontWeight: "900", color: "#171f30", fontSize: 15 }}
              >
                Promo/Coupon Code
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "#cccccc",
                margin: 20,
                flexDirection: "row"
              }}
            >
              <TextInput
                autoCapitalize="none"
                style={styles.inputStyle}
                underlineColorAndroid="transparent"
                autoCorrect={false}
                placeholder="enter your code"
                placeholderTextColor="#cccccc"
                onChangeText={this.onPromoCodeChange.bind(this)}
              />
              {this.renderPromoBtn()}
            </View>

            {this.renderDiscountSection()}
          </View>
          <View style={{ width: "100%" }}>
            {this._renderStripe(this.props.paymentReducer.isPaypalAuthorized)}
          </View>

          <TouchableOpacity onPress={this._onCancelPress.bind(this)}>
            <Text style={{ paddingTop: 20 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ user, paymentReducer }) => {
  return {
    user,
    paymentReducer
  };
};

export default connect(
  mapStateToProps,
  {
    goBack,
    stripeFuturePayments,
    getPaymentDetails,
    updateCardInfo,
    promoCodeChange,
    applyPromo
  }
)(Payment);
