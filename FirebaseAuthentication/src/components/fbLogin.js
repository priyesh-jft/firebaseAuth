
import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
    LoginManager,
    AccessToken
} = FBSDK;
import { firebaseRef } from '../config/firebaseConfig'

var FBAccessToken ;
var FBUserId ;

export default class FBAuth extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.textheader}>
                        Social Login
                    </Text>
                </View>
                <View style={styles.bottom}>
                    <LoginButton
                        onLoginFinished={
              (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                 console.log("login is cancelled.");
              } else {
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                    console.log("Data is",data);
                    FBAccessToken = data.accessToken;
                    FBUserId = data.userID;
                      const credential = firebaseRef.auth.FacebookAuthProvider.credential(data.accessToken)
                     firebaseRef.auth().signInWithCredential(credential) // facebook will need only access token.
                      .then((user)=>{
                       console.log("user info",user.uid);
                     })
                    }
                  )
              }
            }
          }
                        onLogoutFinished={() => console.log("logout.")}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1C2833',
        alignItems: 'center',
        flexDirection:'column',
        justifyContent: 'center',
    },
    top:{
        flex:1,
        justifyContent: 'center',
    },

    bottom:{
        flex:1,
    },
    textheader:{
        color:'white',
        fontSize: 50
    }
});

