import React, { PureComponent } from 'react';
import {
	View,
	Text,
	FlatList
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import {
	loadPaymentsFromRealm
} from './actions';
import moment from "moment";
import AmountPaidRow from './components/amountPaidRow';
// import stripe from 'tipsi-stripe';

// import { CHANGE_PHOTO_USER } from '../../../variables';

class PersonalTrainerAgreement extends PureComponent {

	state = {
		refreshing : false,
	};

	static navigationOptions = {
	    headerTintColor: 'white',
	};

	_keyExtractor = (item, index) => item.id;
    
    _processPayment =  async() =>{
        try {
          // this.setState({ loading: true, token: null })
          const token = await stripe.paymentRequestWithCardForm({
            // Only iOS support this options
            smsAutofillDisabled: true,
            requiredBillingAddressFields: 'full',
            prefilledInformation: {
              billingAddress: {
                name: 'Gunilla Haugeh',
                line1: 'Canary Place',
                line2: '3',
                city: 'Macon',
                state: 'Georgia',
                country: 'US',
                postalCode: '31217',
                email: 'geniuscd@gmail.com.com',
              },
            },
          });

          console.log("Olaaaaaa", token);

          // this.setState({ loading: false, token })
        } catch (error) {
          // this.setState({ loading: false })
        }
    };

    _handleBankAccountPayPress = async () => {
        try {
          this.setState({ loading: true, token: null })

          const token = await stripe.createTokenWithBankAccount({
              accountNumber: '000123456789', // required field
              countryCode: 'us', // required field
              currency: 'usd', // required field
              routingNumber: '110000000', // 9 digits
              accountHolderName: 'Test holder name',
              accountHolderType: 'company',
            });

          console.log("Olaaaaaa", token);

        } catch (error) {
            console.log("error", error);
        }
      }

    
    _renderItem = ({item}) => {
    	var date = moment(item.due_date).format("MMM Do, YYYY");
    	return (
	    	<AmountPaidRow
                // isPaid
                isDue
                onProcessPaymentPress={ this._processPayment.bind(this) }
                amount={200}
                currency={"USD"}
            />
    	);
    };

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle} />
        );
    };

    _renderEmptyComponent = () => {
    	return (
            <View style={styles.emptyComponentContainer}>
                <Text style={{color:'#bbbbbb', textAlign:'center'}}>No Payment History</Text>
            </View>
        );
    };

    _renderHeaderComponent = () => {
        return (
            <View>
                <View style={styles.emptyComponentContainer}>
                    <Text>Current total agreed goal payment amount till </Text>
                    <Text style={styles.centerBold}>April 3th 2018,  200 USD</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text>Obligations</Text>
                </View>
            </View>
        );
    };

    _onRefresh = () => {
        this.setState(
        {
            refreshing : true,
        }, 
        () => {
           // call back once the state is chaged
           // we can make a remote request here
           this.props.loadPaymentsFromRealm();
           this.setState({refreshing:false});
        });
    };


	render () {

		const { 
			mainContainer
		} = styles;
		
		return (
			<View style={mainContainer}>
				<FlatList
                    data={this.props.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderSeparator}
                    ListEmptyComponent={this._renderEmptyComponent}
                    ListHeaderComponent={this._renderHeaderComponent}
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
			</View>
		);
	}

}

const mapStateToProps = ({ paymentAgreementReducer }) => {
	return {
        data : [1,1],
    };
};

export default connect(mapStateToProps, {
	loadPaymentsFromRealm
})(PersonalTrainerAgreement);