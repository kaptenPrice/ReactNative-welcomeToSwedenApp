import React, {useEffect} from "react";
import { View, Text, Dimensions, Platform, StyleSheet, LogBox, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { Ionicons, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import appColors from "../../assets/appColor";
import ButtonComponent from "../../components/ButtonComponent";
import Styles from "../../css/Styles";
import { Image } from "react-native";
import Loading from "../../components/Loading";
import SwedenMapSvg from "../../assets/svg/SwedenMapSvg";
import { childStyles } from "./SocietyFunctions";
const socialLife_pic = require("../../assets/images/socialLife_unsplash.jpg");

export default function SocialLife() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const { isLoading, currentUser } = useSelector(
    (state) => state.authentication
  );
  useEffect(() => {
    LogBox.ignoreLogs(['Setting a timer for a long period of time'])
  }, [])

  return (
    <ScrollView style={{ flex: 1 }}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <View
            style={[childStyle.imageContainer, { width, height: height / 3 }]}
          >
            <Image
              style={[childStyle.image, { width: null, height: null }]}
              source={socialLife_pic}
            />
          </View>
          <View style={childStyle.buttonContainer}>
            <ButtonComponent
              style={childStyle.childButtons}
              onTouch={() => navigation.navigate("Fika")}
              buttonStyle={childStyle.buttonStyle}
            >
              <Text style={childStyle.buttonTextStyle}> Fika</Text>
              <Fontisto
                name="coffeescript"
                size={24}
                color={appColors.iconInActive}
              />
            </ButtonComponent>
            <ButtonComponent
              style={childStyle.childButtons}
              onTouch={() => navigation.navigate("Food")}
              buttonStyle={childStyle.buttonStyle}
            >
              <Text style={childStyle.buttonTextStyle}>Food</Text>
              <MaterialCommunityIcons
                name="food-fork-drink"
                size={24}
                color={appColors.iconInActive}
              />
            </ButtonComponent>
            <ButtonComponent
              style={childStyle.childButtons}
              onTouch={() => navigation.navigate("Traditions")}
              buttonStyle={childStyle.buttonStyle}
            >
              <Text style={childStyle.buttonTextStyle}>Traditions</Text>
              <SwedenMapSvg style={{ fill: appColors.iconActive }} />
            </ButtonComponent>
            <ButtonComponent
              style={childStyle.childButtons}
              onTouch={() => navigation.navigate("AnimatedComponent")}
              buttonStyle={childStyle.buttonStyle}
            >
              <Text style={childStyle.buttonTextStyle}>Animated</Text>
              <SwedenMapSvg style={{ fill: appColors.iconActive }} />
            </ButtonComponent>


          </View>
        </>
      )}
    </ScrollView>
  );
}

export const childStyle = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  image: { flex: 1 },

  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 55,
  },
  childButtons: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 12,
  },
  buttonStyle: {
    alignItems: "center",

    backgroundColor: appColors.bgColor,
    borderRadius: 10,
    padding: 5,
    width: 350,
    marginBottom: 10,
  },
  buttonTextStyle: {
    color: appColors.textColor,
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "left",
  },
});
