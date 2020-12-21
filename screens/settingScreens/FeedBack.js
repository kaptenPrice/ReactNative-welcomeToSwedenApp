import React from "react";
import { View, Text, Button, Dimensions, TextInput } from "react-native";
import Styles from "../../css/Styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons/";

import ButtonComponent from "../../components/ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/app";
import "firebase-auth";

import { useDispatch, useSelector } from "react-redux";
import { TextInputComponent } from "react-native";
import appColors from "../../assets/appColor";

const FeedBack = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { width, height } = Dimensions.get("window");
  const {phone, city}= useSelector((state)=> state.userAdditionalInfo)



  return (
    <View style={Styles.welcomeView}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="thought-bubble-outline"
          size={50}
          color={appColors.iconInActive}
        />
        <TextInput
          placeholder="feedback "
          style={{
            backgroundColor: appColors.bgChildContainers,
            height: height/1.2,
            width: width / 2,
            borderRadius: 7,
            marginBottom: 20,
            textAlign:"left"
          }}
        > {`My phone nr: ${phone} \n City: ${city}` }</TextInput>
        <View style={{flexDirection: "row-reverse"}} >

        <ButtonComponent buttonStyle={{marginLeft:width/2.2}} onTouch={() => console.log("feedback send")}>
          <Ionicons name="ios-send" color={appColors.iconInActive} size={30} />
        </ButtonComponent>
        <ButtonComponent onPress={() => navigation.navigate("Home")}>
          <MaterialCommunityIcons name="home" size={30} color={appColors.iconInActive}/>
        </ButtonComponent>
        </View>
      </View>
      <View style={{flex:1,alignSelf:"flex-start", marginLeft:250 }}>
    
      </View>
    </View>
  );
};

export default FeedBack;
{
  /* <ion-icon name="filter-outline"></ion-icon> */
}
