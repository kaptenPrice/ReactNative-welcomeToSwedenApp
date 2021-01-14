import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import Styles from "../css/Styles";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import appColors from "../assets/appColor";
import { SafeAreaView } from "react-navigation";
import { Dimensions } from "react-native";

//Logo?
const WelcomeScreen = () => {
  const navigation = useNavigation();
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
          backgroundColor: appColors.bgColor,
          borderColor: appColors.borderColor,
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            backgroundColor:appColors.bgColor,
            borderColor: appColors.borderColor,
            borderWidth: 5,
            borderRadius: 25,
          padding:100,
            shadowColor: "#474747",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.4,
            shadowRadius: 8,
            elevation: 12,
            // marginVertical: 100,
          }}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text
            style={{
              fontSize: 46,
              letterSpacing: 4,
              fontWeight: "bold",
              paddingHorizontal: 10,
              paddingVertical:5,

              color: appColors.textColor,
              // borderWidth: 5,
              // borderRadius: 25,
              // borderColor: appColors.borderColor,
            }}
          >
            Welcome to Sweden
          </Text>
        </TouchableOpacity>

        {/* <View style={Styles.welcomeView}>
        <ButtonComponent
          onTouch={() => navigation.navigate("LoginScreen")}
          style={{
            flex: 1,
            alignContent: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: "green",
            borderRadius: 20,
            // top:20,
            // botttom:40,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.4,
            shadowRadius: 8,

            elevation: 12,
          }}
        >
          <Text
            style={{
              // flex:1,
              fontSize: 46,
              fontWeight: "bold",
              // padding:35,
              color: appColors.textColor,
              // height: (Dimensions.get("screen").height)/5
            }}
          >
            Welcome to Sweden
          </Text>
        </ButtonComponent>
      </View> */}
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
