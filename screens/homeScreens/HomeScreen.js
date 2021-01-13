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
import SocieltalFunctionsSvg from "../../assets/svg/SocieltalFunctionsSvg";
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
  const saveInitialUserData = () => {
    let data = {
      email: _email,
      uid: uid,
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
        const data = doc.data();
        dispatch({ type: "IS_ADMIN", payload: data.admin || false });
        dispatch({ type: "ADD_NAME", payload: data.name || "" });
        dispatch({ type: "ADD_PHONE", payload: data.phone || "" });
        dispatch({ type: "ADD_CITY", payload: data.city || "" });
        dispatch({ type: "ADD_AVATAR", payload: data.profileAvatar || "" });
      });
    } catch (error) {
      console.log(error);
    }
  };

  //TODO move to components
  const _renderItem = (item) => {
    return (
      <View style={{ width: width, height: height / 3 }}>
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
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <View
            style={{
              flex: 1,
            }}
          >
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
              alignItems: "center",
              top: 12,
            }}
          >
            <ButtonComponent
              onTouch={() => navigation.navigate("SocialLife")}
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 12,
              }}
              buttonStyle={[
                Styles.homeButtonTouchStyle,
                { width: width / 1.2 },
              ]}
            >
              <Text style={Styles.homeButtonText}>EVERYDAY LIFE</Text>
              <Ionicons
                name="ios-people"
                size={50}
                color={appColors.placeHolderColor}
              />
            </ButtonComponent>

            <ButtonComponent
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 12,
              }}
              onTouch={() => navigation.navigate("SocietalFunctions")}
              buttonStyle={[
                Styles.homeButtonTouchStyle,
                { width: width / 1.2 },
              ]}
            >
              <Text style={Styles.homeButtonText}>SOCIETAL FUNCTIONS</Text>
              <SocieltalFunctionsSvg
                style={{ color: appColors.placeHolderColor }}
                width="40"
                height="40"
              />
            </ButtonComponent>
          </View>
        </>
      )}
    </ScrollView>
  );
}

