import React, {useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import Styles from "../css/Styles";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import appColors from "../assets/appColor";
import { SafeAreaView } from "react-navigation";
import { Dimensions } from "react-native";
// import LinearGradient from 'react-native-linear-gradient'

//Logo?
const WelcomeScreen = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("screen");
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("LoginScreen");
    }, 1000);
  }, []);
  return (
  

    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: appColors.bgColor,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "transparent",
            borderRadius: 25,
            padding: 100,
            paddingVertical: 5,
            width: width / 1,

          }}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <View style={{ padding: 10 }}>
            <Text
              style={{
                fontSize: 29,
                letterSpacing: 1,
                fontWeight: "bold",
                color: appColors.textColor,
              }}
            >
              Welcome to Sweden
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
