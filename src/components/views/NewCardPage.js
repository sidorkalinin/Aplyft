import React, { Component } from 'react';
import { View } from 'react-native';
//import stripe from 'tipsi-stripe';

/*stripe.init({
    publishableKey: 'pk_test_GTg32uUxjSuhNvmgVpiyxZcw',
});*/

const theme = {
    primaryBackgroundColor: '#f8f8f8',
    secondaryBackgroundColor: '#ffffff',
    primaryForegroundColor: '#ffffff',
    secondaryForegroundColor: '#ffffff',
    accentColor: '#ff0000',
    errorColor: '#ffffff'
};

class NewCardPage extends Component {

    componentDidMount() {
    
        const options = {
            smsAutofillDisabled: true,
            requiredBillingAddressFields: 'zip', // or 'full'
            
        };
        /*stripe.paymentRequestWithCardForm(options)
          .then(response => {
                // Get the token from the response, and send to your server
                console.log("success",response);
          })
          .catch(error => {
                // Handle error
                console.log("error", error);
          });*/
    }

    render() {
        return <View />
    }
}

export default NewCardPage;