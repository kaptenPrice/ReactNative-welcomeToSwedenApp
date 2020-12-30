import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import * as Google from "expo-google-app-auth";
import { firebaseConfig } from "../config/config";
// import firebase from "firebase/app";
// import "firebase/auth";
// import * as Google from "expo-google-app-auth";

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const dbStore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();


export const signIn = async () => {
    if (email && password) {
      try {
        const res = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (res) {
          dispatch({ type: "SIGN_IN", payload: res.user });
        }
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            alert(
              `${email} is not recognized, no worries , just register a new account `
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
  export const register = async () => {
    if (email && password) {
      try {
        const res = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
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
          alert("Please enter both email and password");
        }
      }
    }
  };
  export const signInWithGoogleAsync = async () => {
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
//   export const actionCodeSettings =  {
//     url: 'https://www.example.com/?email=' + auth.currentUser.email,
//     iOS: {
//       bundleId: 'com.example.ios'
//     },
//     android: {
//       packageName: 'com.example.android',
//       installApp: true,
//       minimumVersion: '12'
//     },
//     handleCodeInApp: true,
//     // When multiple custom dynamic link domains are defined, specify which
//     // one to use.
//     dynamicLinkDomain: "example.page.link"
//   };
//   auth.currentUser.sendEmailVerification(actionCodeSettings)
//     .then(function() {
//       // Verification email sent.
//     })
//     .catch(function(error) {
//       // Error occurred. Inspect error.code.
//     });



