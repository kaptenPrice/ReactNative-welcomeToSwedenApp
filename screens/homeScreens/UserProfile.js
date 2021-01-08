import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, Dimensions } from "react-native";
import Styles from "../../css/Styles";
import ButtonComponent from "../../components/ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/app";
import "firebase-auth";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import Input from 'react-native-input-style'

import { addPhone, signOut } from "../../redux/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-navigation";
import { ImageBackground } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import appColors from "../../assets/appColor";
import * as db from "../../firestore/FirebaseUtils";
const pic =
  "https://i3.wp.com/hypebeast.com/image/2020/07/apple-memoji-update-headwear-masks-hairstyles-1.png?w=1600";

const UserProfile = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { width, height } = Dimensions.get("screen");

  const { isLoading, currentUser } = useSelector(
    (state) => state.authentication
  );
  const { name, email, phone, city } = useSelector(
    (state) => state.userAdditionalInfo
  );

  const [localEmail, setLocalEmail] = useState(currentUser.email);

  const [localUserName, setLocalUserName] = useState("");
  const [localPhone, setLocalPhone] = useState("");
  const [localCity, setLocalCity] = useState("");
  const [uid, setUid] = useState(currentUser.uid);

  const [userNameFromDB, setUserNameFromDB] = useState("");
  const [phoneFromDB, setphoneFromDB] = useState("");
  const [cityFromDB, setCityFromDB] = useState("");

  const [isEditable, setIsEditable] = useState(false);
  const [profielImage, setProfileImage] = useState(currentUser.photoUrl);

  useEffect(() => {
    // getUser();
    name && setLocalUserName(name);
    phone && setLocalPhone(phone);
    city && setLocalCity(city);

    if (!currentUser.photoUrl) {
      setProfileImage(pic);
    } else {
      setProfileImage(currentUser.photoUrl);
    }
  }, [name, phone, city]);

  useEffect(() => {
    if (currentUser.uid) {
      setUid(currentUser.uid);
    } else if (currentUser.id) setUid(currentUser.id);
  }, []);

  // const getUser = () => {
  //   db.getUserData(uid)
  //     .then((data) => {
  //       const { admin, name, email, city, phone } = data;
  //       setUserNameFromDB(name);
  //       setphoneFromDB(phone);
  //       setCityFromDB(city);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  //Ändra till en updatemetod i firebase utils
  const handleSaveUserData = () => {
    let data = {
      name: localUserName,
      phone: localPhone,
      city: localCity,
    };
    try {
      db.updateUserDataDB(data, uid);
    } catch (error) {
      console.log("Error från feedback", error);
    }
  };

  const handleSignOut = async () => {
    try {
      db.signOut();
      dispatch(signOut());
    } catch (error) {
      alert("Something fishy occurred, try again, or restart the app");
    }
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  return (
    <View style={Styles.profileScreen}>
      <View style={{ alignItems: "center" }}>
        <ButtonComponent
          onTouch={() => console.log("clicked on image")} //TODO Change image from camera/library
          style={{ marginTop: 20 }}
        >
          <ImageBackground
            style={Styles.userProfileImage}
            imageStyle={{ borderRadius: 50 }}
            source={{ uri: profielImage }}
          />
        </ButtonComponent>
      </View>
      <View
        style={{
          flex: 1 / 6,
          flexDirection: "row",
          justifyContent: "flex-end",
          marginEnd: width / 5,
          paddingHorizontal: 10,
        }}
      >
        <ButtonComponent onTouch={handleEdit} accessibilityRole="button">
          <MaterialIcons name="edit" size={30} color="black" />
        </ButtonComponent>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        
        <View
          style={{
            flex: 1 / 6,
            backgroundColor: "white",
            color: appColors.placeHolderColor,
          }}
        >
          
          <Text style={{ height: 40, marginTop: 10, marginLeft: 5 }}>Name</Text>
          <Text style={{ height: 40, marginLeft: 5 }}>E-mail</Text>
          <Text style={{ height: 40, marginLeft: 5 }}>Phone</Text>
          <Text style={{ height: 40, marginLeft: 5 }}>City</Text>
        </View>

        <View
          style={{
            flex: 1 / 2,
            backgroundColor: "white",
            color: appColors.placeHolderColor,
          }}
        >
          <TextInput
            style={{
              height: 40,
              borderBottomWidth: 0.5,
            }}
            editable={isEditable}
            onChangeText={(e) => {
              console.log(e);
              setLocalUserName(e);
            }}
            value={localUserName}
            placeholder="name"
          />
          
          <TextInput
            style={{
              height: 40,
              borderBottomWidth: 0.5,
              color: appColors.placeHolderColor,
            }}
            editable={false}
            value={email}
            name="email"
          />
          <TextInput
            style={{
              height: 40,
              color: appColors.placeHolderColor,
              borderBottomWidth: 0.5,
            }}
            dataDetectorTypes="phoneNumber"
            keyboardType="phone-pad"
            editable={isEditable}
            onChangeText={(e) => setLocalPhone(e)}
            value={localPhone}
            placeholder="Phone"
          />
          <TextInput
            style={{
              height: 40,
              color: appColors.placeHolderColor,
            }}
            editable={isEditable}
            onChangeText={(e) => setLocalCity(e)}
            value={localCity}
            placeholder="City"
          ></TextInput>
        </View>
      </View>
      <View
        style={{
          flex: 1 / 6,
          flexDirection: "row",
          justifyContent: "flex-end",
          marginEnd: width / 5,
          paddingHorizontal: 10,
        }}
      >
        <ButtonComponent
          style={{ marginLeft: 20 }}
          onTouch={handleSaveUserData}
        >
          <Feather name="save" size={30} color="black" />
        </ButtonComponent>
      </View>
   



      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        
        <ButtonComponent
          buttonStyle={Styles.signinRegisterButton}
          onPress={() => navigate("Home")}
        >
          <Text style={Styles.signinRegisterButtonText}>Home</Text>
        </ButtonComponent>
        <ButtonComponent
          buttonStyle={Styles.signinRegisterButton}
          onTouch={handleSignOut}
        >
          <Text style={Styles.signinRegisterButtonText}>Sign out</Text>
        </ButtonComponent>
      </View>
    </View>
  );
};

export default UserProfile;
