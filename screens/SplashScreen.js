import React from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";
import splashAnim from "../assets/splashCode.json";
import Styles from "../css/Styles";

const SplashScreen = () => (
  <View style={Styles.welcomeView}>
    <LottieView
      style={{ height: 200, width: 200 }}
      source={splashAnim}
      autoPlay
      loop
    />
  </View>
);
export default SplashScreen;
