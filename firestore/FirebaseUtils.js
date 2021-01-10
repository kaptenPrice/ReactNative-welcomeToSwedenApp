import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import * as Google from "expo-google-app-auth";
import { firebaseConfig } from "../config/config";
import { useDispatch, useSelector } from "react-redux";

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

// export const actionCodeSettings = {
//   url: "https://www.example.com/?email=" + auth.currentUser.email,
//   iOS: {
//     bundleId: "com.example.ios",
//   },
//   android: {
//     packageName: "com.example.android",
//     installApp: true,
//     minimumVersion: "12",
//   },
//   handleCodeInApp: true,
//   // When multiple custom dynamic link domains are defined, specify which
//   // one to use.
//   dynamicLinkDomain: "example.page.link",
// };
// auth.currentUser
//   .sendEmailVerification(actionCodeSettings)
//   .then(function () {
//     // Verification email sent.
//   })
//   .catch(function (error) {
//     // Error occurred. Inspect error.code.
//   });
export const signOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    alert("Something fishy occurred, try again, or restart the app");
  }
};

export const handleSaveToDB = async (
  collection1,
  doc1,
  collection2,
  doc2,
  content
) => {
  await db
    .collection(collection1)
    .doc(doc1)
    .collection(collection2)
    .doc(doc2)
    .set({ content });
};
export const getContentData = async (
  collection1,
  doc1,
  collection2,
  doc2,
  content
) => {
  try {
    const content = await db
      .collection(collection1)
      .doc(doc1)
      .collection(collection2)
      .doc(doc2)
      .get();
    if (!content.exists) {
      console.log("no content");
    }
    return content.data();
  } catch (error) {
    console.error(error);
  }
};

export const saveUserToDB = async (user, uid) => {
  try {
    const snapShot = await db.doc(`users/${uid}`).get();

    // console.log("SnapShot: ",snapShot.exists)

    if (!snapShot.exists) {
      await db.collection("users").doc(uid).set(user);
    }
  } catch (error) {
    console.log("error från firebase", error);
  }
};
export const updateUserDataDB = async (user, uid) => {
  try {
    await db.collection("users").doc(uid).update(user);
    alert('Succes')
  } catch (error) {
    console.log("error från firebase", error);
  }
};

export const getUserData = async (uid, cb) => {
 
  try {
    return db.collection("users").doc(uid).onSnapshot(cb);
   
  } catch (error) {
    console.log("User dosnt exist");
  }
};
