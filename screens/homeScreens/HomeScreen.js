import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Styles from "../../css/Styles";
import Axios from "axios";
import ButtonComponent from "../../components/ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import appColors from "../../assets/appColor";
import BuildingSvg from "../../assets/svg/BuildingSvg";
import  Ionicons  from "@expo/vector-icons/Ionicons";

//https://api.unsplash.com/
// Key:Sbpk7Dz6Xl862AgdaUuUAW8p2cnpd1QvS5S-kA8AE5g

export default function SocialLife() {
  const testImg =
    "https://images.unsplash.com/photo-1607175589389-eded55c33441?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80";
  const [homeScreenImage, setHomeScreenImage] = useState([]);
  const { width, height } = Dimensions.get("window");
  const _width = width;
  const _height = height / 3;
  const navigation = useNavigation();

  useEffect(() => {
    async function getpics() {
      const pics = await Axios.get(
        "https://api.unsplash.com/search/photos?query=Sweden&client_id=Sbpk7Dz6Xl862AgdaUuUAW8p2cnpd1QvS5S-kA8AE5g"
      ).then((res) => {
        setHomeScreenImage(res.data.results);
      });
    }
    getpics();
  }, []);

  const _renderItem = (item) => {
    return (
      <View style={{ width: _width, height: _height }}>
        <Image
          style={{
            flex: 1,
            height: undefined,
            width: undefined,
          }}
          source={{ uri: item.urls.regular }}
        />
      </View>
    );
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <FlatList
          horizontal
          pagingEnabled
          data={homeScreenImage}
          renderItem={({ item }) => _renderItem(item)}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <ButtonComponent
          onTouch={() => navigation.navigate("SocialLife")}
          buttonStyle={[
            Styles.homeButtonTouchStyle,
            { width: _width, height: height / 4 },
          ]}
        >
          <Text style={Styles.homeButtonText}>EVERYDAY LIFE</Text>
          <Ionicons
            name="ios-people"
            size={50}
            color={appColors.placeHolderColor}
          />
        </ButtonComponent>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <ButtonComponent
          style={{ flex: 1 }}
          onTouch={() => navigation.navigate("SocietalFunctions")}
          buttonStyle={[
            Styles.homeButtonTouchStyle,
            { width: _width, height: height / 4 },
          ]}
        >
          <Text style={Styles.homeButtonText}>SOCIETAL FUNCTIONS</Text>
          <BuildingSvg
            style={{ color: appColors.placeHolderColor }}
            width="50"
            height="50"
          />
        </ButtonComponent>
      </View>
    </ScrollView>
  );
}
