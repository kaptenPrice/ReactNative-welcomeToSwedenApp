import React, { useState, useEffect } from 'react';
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

export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('screen');

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
    // LogBox.ignoreLogs(['Setting a timer for a long period of time']);
    saveInitialUserData();
    getUserData();
    dispatch({ type: 'ADD_EMAIL', payload: currentUser.email });
    dispatch({ type: 'ADD_UID', payload: uid });

    async function getpics() {
      const pics = await Axios.get(process.env.API_URL).then((res) => {
        setHomeScreenImage(res.data.results);
      });
  
    }
    getpics();
  }, []);

  const saveInitialUserData = () => {
    let data = {
      email: _email,
      uid: uid,
      created: new Date(),
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
      console.log(error);
    }
  };

  const _renderItem = (item) => {
    return (
      <View style={{ width: width, height: height / 3 }}>
        <Image style={styles.image} source={{ uri: item.urls.regular }} />
      </View>
    );
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
                data={homeScreenImage}
                renderItem={({ item }) => _renderItem(item)}
                keyExtractor={(item) => item.id}
              />
            </View>
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
