import autobind from "autobind-decorator";
import * as React from "react";
import {TextInput} from "react-native";
import { AsyncStorage } from 'react-native';
import SignUpContainer from "./SignUpContainer";
import firebase from "firebase";
import {TextField, Firebase} from "../components";
import type {NavigationProps} from "../components/Types";
import * as Facebook from 'expo-facebook';

type LoginState = {
    loading: boolean
};

export default class Login extends React.Component<NavigationProps<*>, LoginState> {

    state: LoginState = {
        loading: false
    };

    @autobind
    async login(): Promise<void> {
        try {
            await Facebook.initializeAsync('304987363893598');
            const { type, token } = await Facebook.logInWithReadPermissionsAsync({
              permissions: ['public_profile'],
            });
            if (type === 'success') {
                const credential = firebase.auth.FacebookAuthProvider.credential(token);
                firebase.auth().signInWithCredential(credential).catch((error) => {
                  // Handle Errors here.
                  alert("Enable to Signin !");
                });
                await AsyncStorage.setItem('fb_token', token);
            } else {
              // type === 'cancel'
              alert("Enable to Signin !");
            }
          } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
          }
    }

    render(): React.Node {
        const {navigation} = this.props;
        const {loading} = this.state;
        return (
            <SignUpContainer
                title="Login"
                subtitle="Get Started"
                nextLabel="Login with Facebook"
                next={this.login}
                first
                {...{ navigation, loading }}
            >
            </SignUpContainer>
        );
    }
}
