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
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
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
  const dispatch = useDispatch();
  const { currentUser, isLoading } = useSelector((state) => state.authentication);
  const { width, height } = Dimensions.get('screen');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isAuthorized, setIsAuthorized] = useState(true);
  const [isSecure, setSecure] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const handleSignUp = () => {
    return db.signUp(email, password).then((res) => {
      res && dispatch({ type: 'SIGN_IN', payload: res.user });
    });
  };
  const handleSignIn = () => {
    return db.signIn(email, password).then((res) => {
      res && dispatch({ type: 'SIGN_IN', payload: res.user });
    });
  };
  const handleSignInWithGoogleAsync = (iosKey) => {
    iosKey = process.env.CLIENTKEY;

    return db.signInWithGoogleAsync(iosKey).then((res) => {
      dispatch({ type: 'SIGN_IN', payload: res.user });
    });
  };
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    // <LinearGradient colors={["#6c7578","#8E8887"]} style={styles.gradient}>
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginRight: 15,
          marginTop: 15,
        }}
      >
        {isEnabled ? (
          <Text style={{ marginTop: 5, marginRight: 7, fontWeight: '500' }}>Sign in</Text>
        ) : (
          <Text style={{ marginTop: 5, marginRight: 2, fontWeight: '500' }}>Sign up</Text>
        )}
        <Switch
          trackColor={{ false: '#d3d5d1', true: '#d3d5d1' }}
          thumbColor={isEnabled ? '#f9f9f9' : '#f4f3f4'}
          ios_backgroundColor="#d3d5d1"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.shadowEffekt}
        />
      </View>

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
          {isEnabled ? (
            <ButtonComponent onTouch={() => setIsModal(true)}>
              <Text
                style={
                  ([styles.signinRegisterButtonText],
                  {
                    color: 'blue',
                    textDecorationLine: 'underline',
                    fontStyle: 'italic',
                    marginRight: width / 2.2,
                    marginTop: 10,
                  })
                }
              >
                FORGOT PASSWORD
              </Text>
            </ButtonComponent>
          ) : (
            <Text style={{ color: 'transparent', marginTop: 10 }}>13337</Text>
          )}
        </View>
      </TouchableWithoutFeedback>

      <View style={[styles.buttonContainer]}>
        {isEnabled ? (
          <ButtonComponent buttonStyle={styles.loginButton} onTouch={() => handleSignIn()}>
            <Text style={styles.signinRegisterButtonText}>SIGN IN </Text>
          </ButtonComponent>
        ) : (
          <ButtonComponent buttonStyle={styles.loginButton} onTouch={() => handleSignUp()}>
            <Text style={styles.signinRegisterButtonText}>SIGN UP</Text>
          </ButtonComponent>
        )}

        <ButtonComponent buttonStyle={styles.loginButton} onTouch={handleSignInWithGoogleAsync}>
          <Text style={styles.signinRegisterButtonText}>SIGN IN WITH GOOGLE</Text>
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
    marginBottom: 10,
  },
  icon: {
    right: 35,
    bottom: 6,
    position: 'relative',
    height: 50,
    width: 50,
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
  shadowEffekt: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 12,
  },
});
