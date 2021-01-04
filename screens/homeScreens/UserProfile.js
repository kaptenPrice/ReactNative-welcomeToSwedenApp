import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, Dimensions } from "react-native";
import Styles from "../../css/Styles";
import ButtonComponent from "../../components/ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/app";
import "firebase-auth";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";


import { addPhone, signOut } from "../../redux/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-navigation";
import { ImageBackground } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import appColors from "../../assets/appColor";
const pic =
  "https://i3.wp.com/hypebeast.com/image/2020/07/apple-memoji-update-headwear-masks-hairstyles-1.png?w=1600";

const UserProfile = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { width, height } = Dimensions.get("screen");

  const { isLoading, currentUser } = useSelector(
    (state) => state.authentication
  );
  const { phone, city } = useSelector((state) => state.userAdditionalInfo);

  const [userName, setUserName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [_phone, setPhone] = useState("");
  const [_city, setCity] = useState("");

  const [isEditable, setIsEditable] = useState(false);
  const [profielImage, setProfileImage] = useState(currentUser.photoUrl);

  useEffect(() => {
    if (!currentUser.photoUrl) {
      setProfileImage(pic);
    } else {
      setProfileImage(currentUser.photoUrl);
    }
  }, []);

  useEffect(() => {
    if (!currentUser.name) {
      setUserName("Avatar");
    } else {
      setUserName(currentUser.name);
    }
  }, []);
  useEffect(() => {
    if (!phone) {
      setPhone(null);
    } else {
      setPhone(phone);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();

      dispatch(signOut());
    } catch (error) {
      alert("Something fishy occurred, try again, or restart the app");
    }
  };

  const handleEdit = () => {
    setIsEditable(true);
  };
  const handleSave = () => {
    //TODO SET FIRESTORE USER SCHEMA
    dispatch({ type: "ADD_PHONE", payload: _phone });
    dispatch({ type: "ADD_CITY", payload: _city });

    setIsEditable(false);
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
            flex: 1 / 13,
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
            value={`${userName}`}
            name="name"
          />
          <TextInput
            style={{
              height: 40,
              borderBottomWidth: 0.5,

              color: appColors.placeHolderColor,
            }}
            editable={false}
            value={`${email}`}
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
            onChangeText={(e) => setPhone(e)}
            value={_phone}
            placeholder="Phone"
            name="phone"
          />
          <TextInput
            style={{
              height: 40,
              color: appColors.placeHolderColor,
            }}
            editable={isEditable}
            onChangeText={(e) => setCity(e)}
            value={city}
            placeholder="City"
            name="city"
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
        <ButtonComponent style={{ marginLeft: 20 }} onTouch={handleSave}>
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
          <Text style={Styles.signinRegisterButtonText}>Go back</Text>
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
