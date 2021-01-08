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
import { useSelector, useDispatch } from "react-redux";

import appColors from "../../assets/appColor";
import BuildingSvg from "../../assets/svg/BuildingSvg";
import Ionicons from "@expo/vector-icons/Ionicons";
import Loading from "../../components/Loading";
import * as db from "../../firestore/FirebaseUtils";

//TODO MOVE TO .env
//https://api.unsplash.com/
// Key:Sbpk7Dz6Xl862AgdaUuUAW8p2cnpd1QvS5S-kA8AE5g

export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("screen");

  const { isLoading, currentUser } = useSelector(
    (state) => state.authentication
  );
  const { isAdmin, name, email, phone, city } = useSelector(
    (state) => state.userAdditionalInfo
  );

  const [homeScreenImage, setHomeScreenImage] = useState([]);
  const _width = width;
  const _height = height / 3;
  const [uid, setUid] = useState(currentUser.uid || currentUser.id);
  const [_email, setEmail] = useState(currentUser.email);

  useEffect(() => {
    saveInitialUserData();
    getUserData();
    dispatch({ type: "ADD_EMAIL", payload: currentUser.email });
    async function getpics() {
      const pics = await Axios.get(
        "https://api.unsplash.com/search/photos?query=Sweden&client_id=Sbpk7Dz6Xl862AgdaUuUAW8p2cnpd1QvS5S-kA8AE5g"
      ).then((res) => {
        setHomeScreenImage(res.data.results);
      });
    }
    getpics();
  }, []);
//Skicka blanka fält till db
  const saveInitialUserData = () => {
    let data = {
      email: _email,
      uid: uid
    };
    try {
      db.saveUserToDB(data, uid);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = () => {
    try {
      db.getUserData(uid, (doc) => {
        const data=doc.data()
        dispatch({ type: "IS_ADMIN", payload: data.admin || false });
        dispatch({ type: "ADD_NAME", payload: data.name || "" });
        dispatch({ type: "ADD_PHONE", payload: data.phone || "" });
        dispatch({ type: "ADD_CITY", payload: data.city || "" });
        console.log("Redux in state Homescrreen",phone)

      })
      
    } catch (error) {
      console.log(error);
    }
  };

  //TODO move to components
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
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
    </ScrollView>
  );
}
