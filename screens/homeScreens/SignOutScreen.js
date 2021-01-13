import React, {useEffect} from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import * as db from '../../firestore/FirebaseUtils'
import {  signOut } from "../../redux/store/actions";




export default function SignOutScreen() {
const dispatch= useDispatch()
    const navigation = useNavigation()
    useEffect(() => {
        handleSignOut()
     
    }, [])


    const handleSignOut = async () => {
        try {
          db.signOut();
          dispatch(signOut());
        } catch (error) {
          console.log("Error från signout",error)
          alert("Something fishy occurred, try again, or restart the app");
        }
      };



    return (
        <></>
        // <View>
        //     <Text></Text>
        // </View>
    )
}

