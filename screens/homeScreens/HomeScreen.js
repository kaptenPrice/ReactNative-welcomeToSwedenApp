import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  LogBox
  
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Styles from '../../css/Styles';
import Axios from 'axios';
import ButtonComponent from '../../components/ButtonComponent';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';


import appColors from '../../assets/appColor';
import SocieltalFunctionsSvg from '../../assets/svg/SocieltalFunctionsSvg';
import Loading from '../../components/Loading';
import * as db from '../../firestore/FirebaseUtils';
import FriendsSvg from '../../assets/svg/FriendsSvg';
import Dots from "react-native-dots-pagination";


export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('screen');
  const [activeDot, setActiveDot] = useState(0);


  const { isLoading, currentUser } = useSelector(
    (state) => state.authentication
  );
  const { isAdmin, name, email, phone, city } = useSelector(
    (state) => state.userAdditionalInfo
  );

  const [homeScreenImages, setHomeScreenImages] = useState([]);
  const [uid, setUid] = useState(currentUser.uid || currentUser.id);
  const [_email, setEmail] = useState(currentUser.email);

  
  useEffect(() => {
    // LogBox.ignoreLogs(['Setting a timer for a long period of time']);
    saveInitialUserData();
    getUserData();
    dispatch({ type: 'ADD_EMAIL', payload: currentUser.email });
    dispatch({ type: 'ADD_UID', payload: uid });

    async function getpics() {
      const pics = await Axios.get(process.env.API_URL).then((res) => {
        setHomeScreenImages(res.data.results);
      });
  
    }
    getpics();
  }, []);

  const saveInitialUserData = () => {
    let data = {
      email: _email,
      uid: uid,
      created: new Date().toUTCString().toString(),
    };
    try {
      db.saveUserToDB(data, uid);
    } catch (error) {
      alert(error);
    }
  };

  const getUserData = () => {
    try {
      db.getUserData(uid, (doc) => {
        const data = doc.data();
        dispatch({ type: "IS_ADMIN", payload: data && data.admin || false });
        dispatch({ type: 'ADD_NAME', payload: (data && data.name) || '' });
        dispatch({ type: 'ADD_PHONE', payload: (data && data.phone) || '' });
        dispatch({ type: 'ADD_CITY', payload: (data && data.city) || '' });
        dispatch({
          type: 'ADD_AVATAR',
          payload: (data && data.profileAvatar) || '',
        });
      });
    } catch (error) {
      alert(error);
    }
  };

  const _renderItem = (item) => {
    return (
      <View style={{ width: width, height: height / 3 }}>
        <Image style={styles.image} source={{ uri: item.urls.regular }} />
      </View>
    );
  };
  const handleVieweableItemsChanged = useCallback(({ viewableItems }) => {
    setActiveDot(viewableItems[0].index);
  }, []);
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  return (
    <ScrollView
      style={{
        flex: 1,
      }}>
      {isLoading ? (
        <Loading />
      ) : (
          <>
            <View
              style={{
                flex: 1,
              }}>
              <FlatList
                horizontal
                pagingEnabled
                onViewableItemsChanged={handleVieweableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                showsHorizontalScrollIndicator={false}
                data={homeScreenImages}
                renderItem={({ item }) => _renderItem(item)}
                keyExtractor={(item) => item.id}
              />
            </View>
            <Dots
                activeDotWidth={6}
                activeDotHeight={6}
                passiveDotHeight={6}
                passiveDotWidth={6}
                length={homeScreenImages.length}
                activeColor={"#7D7D7D"}
                active={activeDot}
              />
            <View style={styles.buttonContainer}>
              <ButtonComponent
                onTouch={() => navigation.navigate('SocialLife')}
                style={styles.outerButtonStyle}
                buttonStyle={[
                  styles.homeButtonTouchStyle,
                  { width: width / 1.2 },
                ]}>
                <Text style={styles.homeButtonText}>EVERYDAY LIFE</Text>
                <FriendsSvg
                />
              </ButtonComponent>

              <ButtonComponent
                style={styles.outerButtonStyle}
                onTouch={() => navigation.navigate('SocietalFunctions')}
                buttonStyle={[
                  styles.homeButtonTouchStyle,
                  { width: width / 1.2 },
                ]}>
                <Text style={styles.homeButtonText}>SOCIETAL FUNCTIONS</Text>
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
//bakgroundsign in istch
const styles = StyleSheet.create({
  gradient: { flex: 1 },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  homeButtonTouchStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.bgColor,
    borderRadius: 10,
    paddingTop: 12,
    paddingBottom: 10,
    margin: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    top: 12,
  },
  homeButtonText: {
    color: appColors.textColor,
    fontWeight: 'bold',
    fontSize: 40,
  },
  outerButtonStyle: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 12,
  },
});
