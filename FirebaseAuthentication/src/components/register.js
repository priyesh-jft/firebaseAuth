import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { firebaseRef }from '../config/firebaseConfig'
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword : ''
        };
        this.verifyPassword = this.verifyPassword.bind(this);
        this._register = this._register.bind(this);
    }
    verifyPassword(){
        console.log("insideverify",this.state);
        if(this.state.password === this.state.confirmPassword) {
           this._register();
        }
        else {
            console.log("password do not match");
        }
    }
    _register() {
        console.log("inside reg");
            firebaseRef.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
                console.log(error.code);
                console.log(error.message);
            });
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
                <TextInput
                    secureTextEntry = {true}
                    placeholder="Confirm Password"
                    onChangeText={(text) => this.setState({confirmPassword : text})}/>
                <TouchableOpacity onPress={this.verifyPassword}>
                    <Text>
                        Register
                    </Text>
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
export default Register;