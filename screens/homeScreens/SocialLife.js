import React from "react";
import { View, Text, Dimensions, Platform, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { Ionicons, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import appColors from "../../assets/appColor";
import ButtonComponent from "../../components/ButtonComponent";
import Styles from "../../css/Styles";
import { Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Loading from "../../components/Loading";
import SwedenMapSvg from "../../assets/svg/SwedenMapSvg";

export default function SocialLife() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("screen");
  const { isLoading, currentUser } = useSelector(
    (state) => state.authentication
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Fontisto
              name="coffeescript"
              size={24}
              color={appColors.iconInActive}
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
          </View>
        </>
      )}
    </ScrollView>
  );
}

export const childStyle = StyleSheet.create({
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
    // borderWidth: 2,
    // borderColor: appColors.borderColor,
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
