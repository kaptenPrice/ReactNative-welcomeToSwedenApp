import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, Dimensions } from "react-native";
import Styles from "../../css/Styles";
import ButtonComponent from "../../components/ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/app";
import "firebase-auth";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { AwesomeTextInput } from "react-native-awesome-text-input";

import { addPhone, signOut } from "../../redux/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-navigation";
import { ImageBackground } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
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
  const [editMode, setEditMode] = useState(false);

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

  const handleSaveUserData = () => {
    let data = {
      name: localUserName,
      phone: localPhone,
      city: localCity,
    };
    try {
      if (
        localUserName !== name ||
        localPhone !== phone ||
        localCity !== city
      ) {
        db.updateUserDataDB(data, uid);
      }
    } catch (error) {
      console.log("Error från feedback", error);
    }
    setIsEditable(false);
    setEditMode(false);
  };
  const discardChanges = () => {
    setLocalUserName(name);
    setLocalPhone(phone);
    setLocalCity(city);
    setIsEditable(true);
    setEditMode(false);
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
    setEditMode(true);
  };

  return (
    <ScrollView style={Styles.profileScreen}>
      <View
        style={{ alignItems: "center", borderColor: "blue", borderWidth: 1 }}
      >
        <ButtonComponent
          onTouch={() => console.log("clicked on image")} //TODO Change image from camera/library
          style={{ marginTop: 15, borderColor: "blue", borderWidth: 1 }}
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
          flex: 2,
          justifyContent: "center",
          flexDirection: "row",
          marginHorizontal: 2,
          marginVertical: 5,
          alignItems: "center",
          marginTop: 5,
        }}
      >
        {!editMode && (
          <ButtonComponent
            style={{
              flex: 1,
              // borderWidth: 1,
              // borderColor: "grey",
              borderRadius: 5,
              // marginRight: 20,
              alignItems: "center",
              justifyContent: "center",
              width: 40,
            }}
            onTouch={handleEdit}
          >
            <Text style={{ paddingBottom: 10 }}>
              <MaterialIcons name="edit" size={24} color="grey" />
            </Text>
          </ButtonComponent>
        )}

        {editMode && (
          <>
            <ButtonComponent
              style={{
                flex: 1,
                // borderWidth: 1,
                // borderColor: "grey",
                borderRadius: 5,
                // marginRight: 20,
                alignItems: "center",
                justifyContent: "center",
                width: 40,
              }}
              onTouch={discardChanges}
            >
              <Text style={{ paddingBottom: 10 }}>
                <AntDesign name="back" size={24} color="red" />
                {/* <Ionicons name="md-close-circle-outline" size={24} color="red" /> */}
              </Text>
            </ButtonComponent>
            <ButtonComponent
              style={{
                flex: 1,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                width: 40,
              }}
              onTouch={handleSaveUserData}
            >
              <Text style={{ paddingBottom: 10 }}>
                <FontAwesome name="save" size={24} color="green" />
              </Text>
            </ButtonComponent>
          </>
        )}
      </View>

      <View
        style={{
          flex: 2,
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          // marginHorizontal: 10,
        }}
      >
        <View style={{ flex: 1, marginTop: 0 }}>
          <Text
            style={{
              flex: 1,
              marginLeft: 15,
              marginRight: "auto",
              marginBottom: -9,
              backgroundColor: "white",
              color: appColors.labaleHeader,
              zIndex: 1000,
            }}
          >
            Name
          </Text>
          <AwesomeTextInput
            customStyles={{
              container: {
                borderWidth: 1,
                borderColor: "grey",
                borderRadius: 10,
                height: 45,
                width: width / 1.5,
              },
              inputContainer: {
                borderBottomWidth: 0,
              },
            }}
            editable={isEditable}
            onChangeText={(e) => {
              setLocalUserName(e);
            }}
            value={localUserName}
          />
        </View>

        <View style={{ flex: 1, marginTop: 10 }}>
          <Text
            style={{
              flex: 1,
              marginLeft: 15,
              marginRight: "auto",
              marginBottom: -9,
              backgroundColor: "white",
              color: appColors.labaleHeader,
              zIndex: 1000,
            }}
          >
            Email
          </Text>

          <AwesomeTextInput
            customStyles={{
              container: {
                borderWidth: 1,
                borderColor: "grey",
                borderRadius: 10,
                height: 45,
                width: width / 1.5,
              },
              inputContainer: {
                borderBottomWidth: 0,
              },
            }}
            editable={false}
            value={email}
          />
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text
            style={{
              flex: 1,
              marginLeft: 15,
              marginRight: "auto",
              marginBottom: -9,
              backgroundColor: "white",
              color: appColors.labaleHeader,
              zIndex: 1000,
            }}
          >
            Phone
          </Text>
          <AwesomeTextInput
            customStyles={{
              container: {
                borderWidth: 1,
                borderColor: "grey",
                borderRadius: 10,
                height: 45,
                width: width / 1.5,
              },
              inputContainer: {
                borderBottomWidth: 0,
              },
            }}
            dataDetectorTypes="phoneNumber"
            keyboardType="phone-pad"
            editable={isEditable}
            onChangeText={(e) => setLocalPhone(e)}
            value={localPhone}
            placeholder="Phone"
          />
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text
            style={{
              flex: 1,
              marginLeft: 15,
              marginRight: "auto",
              marginBottom: -9,
              backgroundColor: "white",
              color: appColors.labaleHeader,
              zIndex: 1000,
            }}
          >
            City
          </Text>

          <AwesomeTextInput
            customStyles={{
              container: {
                borderWidth: 1,
                borderColor: "grey",
                borderRadius: 10,
                height: 45,
                width: width / 1.5,
              },
              inputContainer: {
                borderBottomWidth: 0,
              },
            }}
            editable={isEditable}
            onChangeText={(e) => setLocalCity(e)}
            value={localCity}
          />
        </View>
      </View>

      <View
 
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          height: height / 3,
          marginHorizontal:5
        }}
      >
        <ButtonComponent
          buttonStyle={Styles.profileButtons}
          onPress={() => navigate("Home")}
        ><MaterialCommunityIcons name="home-outline" size={30} color={appColors.iconInActive} />
          {/* <Text style={Styles.signinRegisterButtonText}>Home</Text> */}
        </ButtonComponent>
        <ButtonComponent
          buttonStyle={Styles.profileButtons}
          onTouch={handleSignOut}
        >
          <FontAwesome name="sign-out" size={30} color={appColors.iconInActive} />
          {/* <Text style={Styles.signinRegisterButtonText}>Sign out</Text> */}
        </ButtonComponent>
      </View>
    </ScrollView>
  );
};

export default UserProfile;
