import React from "react";
import { View, Text, Dimensions, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import appColors from "../../assets/appColor";
import ButtonComponent from "../../components/ButtonComponent";
import Styles from "../../css/Styles";
import { Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function SocialLife() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");

  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.2,
          alignItems: "center",
        }}
      >
        <Ionicons
          name="ios-arrow-dropright"
          size={200}
          color={appColors.bgColor}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 55,
        }}
      >
        <ButtonComponent
          style={{}}
          onTouch={() => navigation.navigate("Fika")}
          buttonStyle={Styles.socialLifeButtonComp}
        >
          <Text style={Styles.socialLifeButtonText}> Fika</Text>
          <Ionicons
            name="ios-man"
            size={30}
            color={appColors.placeHolderColor}
          />
        </ButtonComponent>
        <ButtonComponent
          style={{}}
          onTouch={() => navigation.navigate("Food")}
          buttonStyle={Styles.socialLifeButtonComp}
        >
          <Text style={Styles.socialLifeButtonText}>Food</Text>
          <Ionicons
            name="ios-man"
            size={30}
            color={appColors.placeHolderColor}
          />
        </ButtonComponent>
        <ButtonComponent
          style={{}}
          onTouch={() => navigation.navigate("Traditions")}
          buttonStyle={Styles.socialLifeButtonComp}
        >
          <Text style={Styles.socialLifeButtonText}>Traditions</Text>
          <Ionicons
            name="ios-man"
            size={30}
            color={appColors.placeHolderColor}
          />
        </ButtonComponent>
      </View>
    </ScrollView>
  );
}
