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
          onTouch={() => navigation.navigate("Study")}
          buttonStyle={Styles.socialLifeButtonComp}
        >
          <Text style={Styles.socialLifeButtonText}> STUDY</Text>
          <Ionicons
            name="ios-man"
            size={30}
            color={appColors.placeHolderColor} //TODO HOW TO RM the override from buttonStyle?
          />
        </ButtonComponent>
        <ButtonComponent
          style={{}}
          onTouch={() => navigation.navigate("Job")}
          buttonStyle={Styles.socialLifeButtonComp}
        >
          <Text style={Styles.socialLifeButtonText}>JOB</Text>
          <Ionicons
            name="ios-man"
            size={30}
            color={appColors.placeHolderColor} //TODO HOW TO RM the override from buttonStyle?
          />
        </ButtonComponent>
        <ButtonComponent
          style={{}}
          onTouch={() => navigation.navigate("Healthcare")}
          buttonStyle={Styles.socialLifeButtonComp}
        >
          <Text style={Styles.socialLifeButtonText}>HEALTHCARE</Text>
          <Ionicons
            style={{ justifyContent: "flex-end" }} //TODO HOW TO RM the override from buttonStyle?
            name="ios-man"
            size={30}
            color={appColors.placeHolderColor}
          />
        </ButtonComponent>
      </View>
    </ScrollView>
  );
}
