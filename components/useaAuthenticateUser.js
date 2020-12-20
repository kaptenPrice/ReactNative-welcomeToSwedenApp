import { useEffect } from "react";
import { useDispatch } from "react-redux";
import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"


//TODO refakt to SWR


export default function useAuthenticateUser() {
    const dispatch = useDispatch()
    useEffect(() => {
        let unsubscribe
        try {

            unsubscribe = firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    dispatch({ type: "SIGN_IN", payload: user })
                } else {
                    dispatch({ type: "SIGN_OUT" })
                }
                unsubscribe();
            });
        } catch (error) {
            dispatch({ type: "SIGN_OUT" })
        }
    }, [dispatch]);
}