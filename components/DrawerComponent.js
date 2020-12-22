import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../css/Styles";
import { Ionicons } from "@expo/vector-icons";
import appColors from "../assets/appColor";
import { DrawerItemList } from "@react-navigation/drawer";

export default function DrawerComponent(props) {
  return (
    
      <SafeAreaView style={{backgroundColor:appColors.bgColor, flex:1}}>
        <View style={Styles.drawerComponentView}>
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
