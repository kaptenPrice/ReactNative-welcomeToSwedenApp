import React from "react";
import { View, Text, Button } from "react-native";
import Styles from "../../css/Styles";
import ButtonComponent from '../../components/ButtonComponent'
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/app"
import "firebase-auth"

import {signOut} from '../../redux/store/actions'
import { useDispatch } from "react-redux";


const UserProfile = () => {
  const navigation = useNavigation();
  const dispatch=useDispatch();

  const handleSignOut= async ()=>{
    try {
      await firebase
      .auth()
      .signOut()

      dispatch(signOut())
      
    } catch (error) {
      alert("Something fishy occurred, try again, or restart the app")
    }
  }

  return (
    <View style={Styles.welcomeView}>
      <Button
        title="Go back"
        onPress={() => navigation.navigate("Home")}
      ></Button>
      <ButtonComponent
      buttonStyle={Styles.signinRegisterButton}
      onTouch={handleSignOut}
      >
<Text style={Styles.signinRegisterButtonText}>Sign out</Text>

</ButtonComponent>
    </View>
  );
};

export default UserProfile;
