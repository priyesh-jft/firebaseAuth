import React, { Component } from 'react';
import {  Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components'
import Register from './register';
import FBAuth from './fbLogin';
import Login from './login';
import Icon from 'react-native-vector-icons/Entypo';


const REGISTER_ROUTE = {
    component: FBAuth,
    props: {
        nextScene: LOGIN_ROUTE,
        selectedChannel : ''
    }
};
const LOGIN_ROUTE = {
    component: Login,
    props: {
        nextScene: REGISTER_ROUTE
    }
};

export default class Nav extends Component {

    render() {
        return (
            <Navigator
                initialRoute={LOGIN_ROUTE}
                renderScene={this.renderScene}
            />
        );
    }
    renderScene(route, navigator) {
        return (
            <route.component
                {...route.props}
                navigator={navigator}
            />
        );
    }

    renderNavigationBar() {
        return (
            <Navigator.NavigationBar
                routeMapper={{
        LeftButton: this.renderLeftButton,
        RightButton: () => null,
        Title: this.renderTitle
      }}
                style={styles.navbar}
            />
        );
    }

    renderTitle(route) {
            return (
                <Text style={[styles.title,{backgroundColor:'#bbbbcc', marginTop : 10}]}>
                    {route.title}
                </Text>
            );
    }

    renderLeftButton(route, navigator, index) {
        if (index === 0) {
            return null;
        }
        return (
            <TouchableOpacity
                style={styles.leftButton}
                onPress={() => navigator.pop()}
            >
                <Icon name="back" size={30} color="#898686" style={{marginTop : 10}} />
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    navbar: {
        marginBottom : 40,
        backgroundColor: '#bbbbcc'
    }
});