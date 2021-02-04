import React from "react";
import { View, Text, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import splashAnim from "../assets/splashCode.json";
import appColors from "../assets/appColor";

const SplashScreen = () => {
  const { width, height } = Dimensions.get("window");

  return(
    
    
    <View style={{ flex: 1, justifyContent: 'center',
    alignItems: 'center', }}>
      <LottieView
        style={{flex:1, backgroundColor: appColors.bgColor }}
        source={splashAnim}
        autoPlay
        loop
      />
    </View>
  )
 
};

export default SplashScreen;
