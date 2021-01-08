import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import appColors from "../assets/appColor";
import ButtonComponent from "../components/ButtonComponent";
import Styles from "../css/Styles";
import firebase from "firebase/app";
import "firebase/auth";
import * as Google from "expo-google-app-auth";
import * as db from '../firestore/FirebaseUtils'

const LoginScreen = () => {
  const dispatch=useDispatch()
  const {currentUser,isLoading}=useSelector(state=>state.authentication)
  // const { isAdmin,name, email, phone, city } = useSelector((state) => state.userAdditionalInfo);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);

 
  const signInWithGoogleAsync = async () => {
    try {
      const res = await Google.logInAsync({
        iosClientId:
          "383691417994-fc40nclpp83r5jln1ou434lkptsc6oq4.apps.googleusercontent.com",
          // default: "383691417994-1i9ac782aafjs5bpqqucshuaa9i1fh54.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });
      if (res.type === "success") {
        dispatch({ type: "SIGN_IN", payload: res.user });
        return res.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  const signIn = async () => {
    if (email && password) {
      try {
        const res = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (res) {
          dispatch({ type: "SIGN_IN", payload: res.user });

             }console.log(email)
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            alert(
              `${email} is not recognized, no worries , just klick on "Register"  to register account `
            );
            break;
          case "auth/invalid-email":
            alert(`${email} is misspelled? Try again`);
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
        const res = await firebase
          .auth()
          .createUserWithEmailAndPassword(email,password);
        if (res) {
          const user = await firebase
            .database()
            .ref("users")
            .child(res.user.uid)
            .set({ email: res.user.email, uid: res.user.uid });
            
          dispatch({ type: "SIGN_IN", payload: res.user });
  

        }
      } catch (error) {
        if (error.code == "auth/email-already-in-use") {
          alert(
            `Email: ${email} is already registerd, dont worry, press login`
          );
        }
        if (error.code == "auth/invalid-password") {
          alert(
            "The provided value for the password user property is invalid. It must be a string with at least six characters. "
          );
        } else {
          signIn()
        }
      }
    }
  };

  // passwordreminder to e-mail TODO set currentuser by redux useState
  // const actionCodeSettings =  {
  //   url: 'https://www.example.com/?email=' + firebase.auth().currentUser.email,
  //   iOS: {
  //     bundleId: 'com.example.ios'
  //   },
  //   android: {
  //     packageName: 'com.example.android',
  //     installApp: true,
  //     minimumVersion: '12'
  //   },
  //   handleCodeInApp: true,
  //   // When multiple custom dynamic link domains are defined, specify which
  //   // one to use.
  //   dynamicLinkDomain: "example.page.link"
  // };
  // firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
  //   .then(function() {
  //     // Verification email sent.
  //   })
  //   .catch(function(error) {
  //     // Error occurred. Inspect error.code.
  //   });
    



  return (
    <View style={{ flex:1 }}>
      <View style={Styles.welcomeViewLoginScreen}>
        <Text style={Styles.loginScreenMain}>Welcome</Text>
        <Text style={Styles.loginScreenMain}>Free for everyone to join</Text>
      </View>

      <View style={Styles.viewTextInput}>
        <TextInput
          style={Styles.textInputStyle}
          placeholder="Email*"
          placeholderTextColor={appColors.placeHolderColor}
          keyboardType="email-address"
          onChangeText={(email) => setEmail(email)}
        />

        <TextInput
          style={Styles.textInputStyle}
          placeholder="Password*"
          placeholderTextColor={appColors.placeHolderColor}
          keyboardType="default"
          secureTextEntry
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={Styles.viewSigninRegisterButtons}>
        <ButtonComponent
          buttonStyle={Styles.signinRegisterButton}
          onTouch={signIn}
        >
          <Text style={Styles.signinRegisterButtonText}>Sign in by email </Text>
        </ButtonComponent>

        <ButtonComponent
          buttonStyle={Styles.signinRegisterButton}
          // onTouch={signInWithGoogleAsync}
          onTouch={signInWithGoogleAsync}
        >
          <Text style={Styles.signinRegisterButtonText}>Sign with Google</Text>
        </ButtonComponent>
        {/* <Text style={Styles.infoText}>
          No Google-account? dont worry sign in with another email
        </Text> */}

        <ButtonComponent
          buttonStyle={Styles.signinRegisterButton}
          // onTouch={register}
           onTouch={register}

        >
          <Text style={Styles.signinRegisterButtonText}>Register</Text>
        </ButtonComponent>
        <ButtonComponent
          buttonStyle={Styles.forgotPasswordButton}
          // onTouch={register}
        >
          <Text style={Styles.signinRegisterButtonText}>Forgot password</Text>
        </ButtonComponent>
      </View>
    </View>
  );
};

export default LoginScreen;


//TODO PASSWORD CHNANGE

// const currentPass = window.prompt('Please enter current password');
// const emailCred  = firebase.auth.EmailAuthProvider.credential(
//     firebase.auth().currentUser, currentPass);
// firebase.auth().currentUser.reauthenticateWithCredential(emailCred)
//     .then(() => {
//       // User successfully reauthenticated.
//       const newPass = window.prompt('Please enter new password');
//       return firebase.auth().currentUser.updatePassword(newPass);
//     })
//     .catch(error = > {
//       // Handle error.
//     });