import React from "react";
import { Feather } from "@expo/vector-icons";

// import ButtonComponent from "../components/ButtonComponent";
import { View } from "react-native-animatable";
import { Text } from "react-native-gesture-handler";
import Styles from "../css/Styles";
import ReadMore from "react-native-read-more-text";

// import { Dimensions } from "react-native";

const ContentComponent = ({ children1,children2 }) => {
  return (
    <View style={Styles.childComponentContentView}>
      {children1}
      <ReadMore numberOfLines={3}>
      {children2}
      </ReadMore>
    </View>
  );
};

export default ContentComponent;
