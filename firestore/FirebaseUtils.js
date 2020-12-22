import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import * as Google from "expo-google-app-auth";
// import { useDispatch } from "react-redux";


// import {firebaseApp} from '../App'

// const db = firebaseApp.firestore();
// const auth = firebaseApp.auth();
// const storage = firebaseApp.storage();


// export async function signInWithGoogleAsync ()  {
//     try {
//       const res = await Google.logInAsync({
//         iosClientId:
//           "383691417994-fc40nclpp83r5jln1ou434lkptsc6oq4.apps.googleusercontent.com",
//         scopes: ["profile", "email"],
//       });
//       if (res.type === "success") {
//         dispatch({ type: "SIGN_IN", payload: res.user });

//         return res.accessToken;
//       } else {
//         return { cancelled: true };
//       }
//     } catch (e) {
//       return { error: true };
//     }
//     console.log(firebaseApp)
//   };