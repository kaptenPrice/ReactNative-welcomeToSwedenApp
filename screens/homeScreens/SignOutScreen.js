import React, {useEffect, useState} from 'react'
import {  LogBox } from 'react-native'
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import * as db from '../../firestore/FirebaseUtils'
import {  signOut } from "../../redux/store/actions";
import ModalConfirmDeleteAccount from '../../components/ModalConfirmDeleteAccount';




export default function SignOutScreen() {
const dispatch= useDispatch()
const [isModalVisible, setIsModalVisible]=useState(true)
    const navigation = useNavigation()
    useEffect(() => {
      LogBox.ignoreLogs(['Setting a timer for a long period of time'])
        // handleSignOut()
    }, [isModalVisible])

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
        <>
        <ModalConfirmDeleteAccount
              onTouch={()=>handleSignOut()}
              setValue={() => setIsModalVisible(false)}
              value={isModalVisible}
              actionType={"Exit"}
            />
        </>
  
    )
}

