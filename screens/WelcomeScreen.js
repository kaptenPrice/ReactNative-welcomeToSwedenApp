import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import Styles from "../css/Styles";
import { useNavigation } from "@react-navigation/native";

//Logo?
const WelcomeScreen = () => {
  const navigation = useNavigation();
  console.log("WelcomeScreen");
  return (
    <View style={Styles.welcomeView}>
      <View style={Styles.welcomeViewUpper}>
        <Text style={Styles.welcomeText}>Welcome to Sweden</Text>
      </View>

      <View style={Styles.welcomeView}>
        <ButtonComponent
          onTouch={() => navigation.navigate("LoginScreen")}
          buttonStyle={Styles.loginButton}
        >
          <Text style={Styles.loginButtonText}>Welcome</Text>
        </ButtonComponent>
      </View>
    </View>
  );
};

export default WelcomeScreen;
