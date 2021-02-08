import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import appColors from '../assets/appColor';
import ButtonComponent from '../components/ButtonComponent';
import Styles from '../css/Styles';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as Google from 'expo-google-app-auth';
import * as db from '../firestore/FirebaseUtils';
import InputComponent from '../components/InputComponent';
import ModalSendMailComponent from '../components/ModalSendMailComponent';
import MailSvg from '../assets/svg/MailSvg';
import EyeSvg from '../assets/svg/EyeSvg';
import EyeOffSvg from '../assets/svg/EyeOffSvg';

const LoginScreen = () => {
  useEffect(() => {}, []);
  const dispatch = useDispatch();
  const { currentUser, isLoading } = useSelector((state) => state.authentication);
  const _width = Dimensions.get('window').width;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [isSecure, setSecure] = useState(true);
  const [isModal, setIsModal] = useState(false);

  const signInWithGoogleAsync = async () => {
    try {
      const res = await Google.logInAsync({
        iosClientId: process.env.CLIENTKEY,
        scopes: ['profile', 'email'],
      });
      if (res.type === 'success') {
        dispatch({ type: 'SIGN_IN', payload: res.user });
        return res.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (error) {
      return { error: true };
    }
  };

  const signIn = async () => {
    if (email && password) {
      try {
        const res = await firebase.auth().signInWithEmailAndPassword(email, password);
        if (res) {
          dispatch({ type: 'SIGN_IN', payload: res.user });
        }
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert(`[${email}] IS NOT REGISTERED, CHOOSE "SIGN UP" `);
            break;
          case 'auth/invalid-email':
            alert(`[${email}] is misspelled? Try again`);
            break;
          case 'auth/wrong-password':
            alert(`INCORRECT PASSWORD`);
            break;
          default:
            alert(error.code);
        }
      }
    }
  };
  const register = async () => {
    if (email && password) {
      try {
        const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
        if (res) {
          const user = await firebase
            .database()
            .ref('users')
            .child(res.user.uid)
            .set({ email: res.user.email, uid: res.user.uid });

          dispatch({ type: 'SIGN_IN', payload: res.user });
        }
      } catch (error) {
        if (error.code == 'auth/email-already-in-use') {
          alert(`[${email}] IS ALREADY TAKEN`);
        }
        if (error.code == 'auth/invalid-password') {
          alert(
            'INVALID PASSWORD. PASSWORD MUST BE MIN 6 CHARACTERS. '
          );
        } else {
          signIn();
        }
      }
    }
  };

  return (
    // <LinearGradient colors={["#6c7578","#8E8887"]} style={styles.gradient}>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.welcomeViewLoginScreen}>
        <Text style={styles.loginScreenMain}>Welcome</Text>
        <Text style={styles.header}>Free for everyone to join</Text>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={[styles.container]}>
          <View style={[styles.inputContainer]}>
            <InputComponent
              autoCapitalize="none"
              placeholder="Email*"
              placeholderTextColor={appColors.placeHolderColor}
              keyboardType="email-address"
              onChangeText={(e) => setEmail(e)}
            />
            <MailSvg style={styles.icon} />
          </View>
          <View style={styles.inputContainer}>
            <InputComponent
              autoCapitalize="none"
              placeholder="Password*"
              placeholderTextColor={appColors.placeHolderColor}
              keyboardType="default"
              secureTextEntry={isSecure}
              onChangeText={(password) => setPassword(password)}
              clearTextOnFocus={true}
            />
            {isSecure ? (
              <EyeOffSvg onPress={() => setSecure(false)} style={styles.icon} />

            ) : (
              <EyeSvg onPress={() => setSecure(true)} style={styles.icon} />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.buttonContainer}>
        <ButtonComponent buttonStyle={styles.loginButton} onTouch={signIn}>
          <Text style={styles.signinRegisterButtonText}>SIGN IN BY EMAIL</Text>
        </ButtonComponent>
        <ButtonComponent
          buttonStyle={styles.loginButton}
          onTouch={() => signInWithGoogleAsync()}
        >
          <Text style={styles.signinRegisterButtonText}>SIGN IN WITH GOOGLE</Text>
        </ButtonComponent>
        <ButtonComponent buttonStyle={styles.loginButton} onTouch={() => register()}>
          <Text style={styles.signinRegisterButtonText}>SIGN UP</Text>
        </ButtonComponent>
        <ButtonComponent
          buttonStyle={styles.loginButton}
          onTouch={() => setIsModal(true)}
        >
          <Text style={[styles.signinRegisterButtonText], {color:"blue"}}>Forgot password</Text>
        </ButtonComponent>
      </View>
      <View style={{ flex: 0 }}>
        <ModalSendMailComponent visible={isModal} onCancel={() => setIsModal(false)} />
      </View>
    </SafeAreaView>
    // </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  header: {
    color: appColors.textColor,
    fontSize: 24,
    fontWeight: '500',
    marginTop: 5,
  },
  welcomeViewLoginScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginScreenMain: {
    color: appColors.textColor,
    fontWeight: '600',
    fontSize: 40,
  },
  container: {
    flex: 0.6,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  icon: {
    right: 35,
    bottom: 6,
    position:"relative",
    height:50, width:50
  },
  buttonContainer: {
    flex: 1.1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButton: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 40,
    borderRadius: 15,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: appColors.borderColor,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 12,
  },
  signinRegisterButtonText: {
    color: appColors.textColor,
    fontWeight: '600',
    fontSize: 16,
  },
});
