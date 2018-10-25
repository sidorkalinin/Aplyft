import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

      
class FBLogin extends Component {

  //Create response callback.
  _responseInfoCallback = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
      console.log('Error fetching data: ' + error.toString());
    } else {
      alert('Result Name: ' + result.name + ',' + result.email);
      console.log('Result ', result);
    }
  }

  render(){
    return (
      <View>
        <LoginButton
          style={styles.mainContain}
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions);
                console.log("FACEBOOK RESULTS ",result);
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    const infoRequest = new GraphRequest(
                      '/me?fields=name,picture,email',
                      null,
                      this._responseInfoCallback
                    );
                    // Start the graph request.
                    new GraphRequestManager().addRequest(infoRequest).start();
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }
}

const styles = {
  mainContain : {
    width:150,
    height:50,
    fontSize: 20,
  }
};

export default FBLogin;