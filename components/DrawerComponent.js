import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../css/Styles";
import { Ionicons } from "@expo/vector-icons";
import appColors from "../assets/appColor";
import { DrawerItemList } from "@react-navigation/drawer";
import { StyleSheet } from "react-native";

export default function DrawerComponent(props) {
  return (
    
      <SafeAreaView style={{backgroundColor:appColors.bgColor, flex:1}}>
        <View style={styles.drawerComponentView}>
          <Ionicons
            name="ios-heart"
            size={50}
            color={appColors.placeHolderColor}
          />
          <Text style={Styles.drawerComponentText}>Menu</Text>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>

  );
}
const styles=StyleSheet.create({
  drawerComponentView: {
        height: 150,
        backgroundColor: appColors.bgColor,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Platform.OS == "android" ? 20 : 0,
      },
    drawerComponentText: {
          fontSize: 24,
          color: appColors.textColor,
          fontWeight: "100",
        },

})
