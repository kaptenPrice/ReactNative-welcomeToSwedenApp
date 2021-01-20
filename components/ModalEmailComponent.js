import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { StyleSheet, Text, View, Modal } from "react-native";
import appColors from "../assets/appColor";
import { MaterialIcons } from "@expo/vector-icons/";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import * as db from "../firestore/FirebaseUtils";
import firebase from "firebase/app";

const ModalEmailComponent = ({onCancel, visible}) => {

    const [isDisabled, setIsDisabled] = useState(true);
  const [currenEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [isVisible, setIsVisible]=useState(true)

  useEffect(() => {
  }, [])
    return (
      
    )
}
const check_email =(val)=>{
    return(
          if(!val.match(/\S+@\S+\.\S+/)){ // Jaymon's / Squirtle's solution
    // Do something
    return false;
}
if( val.indexOf(' ')!=-1 || val.indexOf('..')!=-1){
    // Do something
    return false;
}
return true;)
  
}

export default ModalEmailComponent

const styles = StyleSheet.create({})
