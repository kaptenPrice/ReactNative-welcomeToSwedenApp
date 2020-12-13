import React from "react";
import { View, Text, Button } from "react-native";
import Styles from "../../css/Styles";
import { useNavigation } from "@react-navigation/native";

const UserProfile = () => {
  const navigation = useNavigation();

  return (
    <View style={Styles.welcomeView}>
      <Button
        title="Go back"
        onPress={() => navigation.navigate("Home")}
      ></Button>
    </View>
  );
};

export default UserProfile;
