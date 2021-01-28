import React from "react";
import { View, Text, Dimensions, Platform, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  MaterialIcons,
  Fontisto,
  FontAwesome5,
} from "@expo/vector-icons";
import appColors from "../../assets/appColor";
import ButtonComponent from "../../components/ButtonComponent";
import Styles from "../../css/Styles";
import { Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Loading from "../../components/Loading";
const pic = require("../../assets/images/sweden-flag.jpg");

export default function SocietalFunctions() {
  const { isLoading, currentUser } = useSelector(
    (state) => state.authentication
  );

  const navigation = useNavigation();
  const { width, height } = Dimensions.get("screen");

  return (
    <ScrollView style={{ flex: 1 }}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <View
            style={[childStyles.imageContainer, { width, height: height / 3 }]}
          >
            <Image
              style={[childStyles.image, { width: null, height: null }]}
              source={pic}
            />
          </View>
          <View style={childStyles.buttonContainer}>
            <ButtonComponent
              style={childStyles.childButtons}
              onTouch={() => navigation.navigate("Study")}
              buttonStyle={childStyles.buttonStyle}
            >
              <Text style={childStyles.buttonTextStyle}> STUDY</Text>
              <Ionicons
                name="ios-school"
                size={30}
                color={appColors.iconInActive}
              />
            </ButtonComponent>
            <ButtonComponent
              style={childStyles.childButtons}
              onTouch={() => navigation.navigate("Job")}
              buttonStyle={childStyles.buttonStyle}
            >
              <Text style={childStyles.buttonTextStyle}>JOB</Text>
              <MaterialIcons
                name="work"
                size={24}
                color={appColors.iconInActive}
              />
            </ButtonComponent>
            <ButtonComponent
              style={childStyles.childButtons}
              onTouch={() => navigation.navigate("Healthcare")}
              buttonStyle={childStyles.buttonStyle}
            >
              <Text style={childStyles.buttonTextStyle}>HEALTHCARE</Text>
              <FontAwesome5
                name="hospital"
                size={30}
                color={appColors.iconInActive}
              />
            </ButtonComponent>
          </View>
        </>
      )}
    </ScrollView>
  );
}
export const childStyles = StyleSheet.create({
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
