import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import { firebaseRef } from '../config/firebaseConfig'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this._login = this._login.bind(this);
        this._register = this._register.bind(this);
        this._loginWithGoogle = this._loginWithGoogle.bind(this);
        this._loginWithFacebook = this._loginWithFacebook.bind(this);
        this._fbAuth = this._fbAuth.bind(this)

    }

    _login() {
        firebaseRef.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            console.log(error.code);
            console.log(error.message);
        });

    }
    _loginWithGoogle() {
        var provider = new firebaseRef.auth.GoogleAuthProvider();
        console.log("inside dd",provider);
        firebaseRef.auth().getRedirectResult().then(function(result) {
            console.log("fff",result);
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // ...
            }
            // The signed-in user info.
            var user = result.user;
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    _fbAuth() {
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function(result) {
                
                if (result.isCancelled) {
                    alert('Login cancelled');
                } else {
                    alert('Login success with permissions: '
                        +result.grantedPermissions.toString());
                }
            },
            function(error) {
                alert('Login fail with error: ' + error);
            }
        );
    }

    _loginWithFacebook() {
        console.log("inside ff");
        LoginManager.logInWithReadPermissions(['email']).then(
            function (result) {
                console.log("reslt is", result);
                if(result.isCancelled){
                    alert("login cancelled")
                } else {
                    AccessToken.getCurrentAccessToken().then((accessTokenData) => {
                        const credential = firebaseRef.auth.FacebookAuthProvider.credential(accessTokenData.accessToken)
                        firebaseRef.auth().signInWithCredential(credential).then((result)=> {
                                console.log("signIn with facebook successful . ", accessTokenData)
                        },(error) => {
                            console.log(error);
                        }, (error) =>{
                            console.log("some error occr", error)
                        })
                    })
                }
            }
        )
    }

    _register() {
        this.props.navigator.push(this.props.nextScene);
    }
    render(){
       return(
        <View style={styles.ViewContainer}>
            <TextInput
                placeholder="Enter email"
                onChangeText={(text) => this.setState({email : text})}/>
            <TextInput
                secureTextEntry = {true}
                placeholder="Enter Password"
                onChangeText={(text) => this.setState({password : text})}/>
            <TouchableOpacity
                onPress={this._loginWithFacebook}>
                <Text>
                    SignIn
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._loginWithFacebook}>
                <Text> Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._loginWithFacebook}>
                <Text> google</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._register}>
                <Text> Create Account</Text>
            </TouchableOpacity>
        </View>
       );
    }
}

const styles =StyleSheet.create({
    ViewContainer : {
        marginTop : 60
    }
});
export default Login;