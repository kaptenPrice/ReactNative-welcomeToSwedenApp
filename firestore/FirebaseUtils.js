import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import * as Google from 'expo-google-app-auth';
import { firebaseConfig } from '../config/config';
import { useDispatch, useSelector } from 'react-redux';

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const signUp = async (email, password) => {
  if (!email || !password) {
    alert('PLEASE ENTER YOUR CREDENTIALS');
  } else {
    try {
      return (res = await auth.createUserWithEmailAndPassword(email, password));
      if (res) {
        db.collection('users')
          .doc(res.user.uid)
          .set({ email: res.user.email, uid: res.user.uid });
      }
    } catch (error) {
      if (error.code == 'auth/email-already-in-use') {
        alert(`[${email}] IS ALREADY TAKEN`);
      }
      if (error.code == 'auth/invalid-password') {
        alert('INVALID PASSWORD. PASSWORD MUST BE MIN 6 CHARACTERS. ');
      } else {
        alert('Error: ', error);
      }
    }
  }
};

export const signIn = async (email, password) => {
  if (!email || !password) {
    alert('PLEASE ENTER YOUR CREDENTIALS');
  } else
    try {
      return (res = await auth.signInWithEmailAndPassword(email, password));
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
};

export const signInWithGoogleAsync = async (iosClIdKey) => {
  try {
    return (res = await Google.logInAsync({
      iosClientId: iosClIdKey,
      scopes: ['profile', 'email'],
    }));
    if (res.type === 'success') {
      return res.user;
    } else {
      return { cancelled: true };
    }
  } catch (error) {
    return { error: true };
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    alert('Something fishy occurred', error);
  }
};
export const deleteUserFromFireStore = (uid) => {
  try {
    return db.doc(`users/${uid}`).delete();
  } catch (error) {
    alert(error);
  }
};

export const handleSaveToDB = async (doc1, collection2, doc2, content) => {
  await db
    .collection('welcome-to-sweden')
    .doc(doc1)
    .collection(collection2)
    .doc(doc2)
    .set({ content });
};

export const handleSaveFeedback = async (doc, content) => {
  const docRef = db.collection('user-feedback').doc();
  await docRef.set({ ...content, feedbackId: docRef.id });
};

export const getContentData = async (doc1, collection2, doc2, cb, error) => {
  return db
    .collection('welcome-to-sweden')
    .doc(doc1)
    .collection(collection2)
    .doc(doc2)
    .onSnapshot(cb, error);
};
export const getUserData = async (uid, cb) => {
  try {
    return db.collection('users').doc(uid).onSnapshot(cb);
  } catch (error) {
    alert('User dosnt exist');
  }
};

export const getFeedbackDataDB = async (cb) => {
  try {
    return db.collection('user-feedback').onSnapshot(cb);
  } catch (error) {
    alert('Error FB: ', error);
  }
};

export const saveUserToDB = async (user, uid) => {
  try {
    const snapShot = await db.doc(`users/${uid}`).get();

    if (!snapShot.exists) {
      await db.collection('users').doc(uid).set(user);
    }
  } catch (error) {
    alert('error från firebase', error);
  }
};
export const updateUserDataDB = async (user, uid) => {
  try {
    await db.collection('users').doc(uid).update(user);
  } catch (error) {
    alert('error från firebase', error);
  }
};

export const uploadProfileAvatar = async (uid) => {
  try {
    return (ref = storage.ref('profileAvatar').child(uid));
  } catch (error) {
    alert(error);
  }
};
