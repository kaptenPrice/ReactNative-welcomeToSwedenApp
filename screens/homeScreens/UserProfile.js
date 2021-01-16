import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { AwesomeTextInput } from "react-native-awesome-text-input";
import firebase from "firebase/app";
import "firebase-auth";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { signOut } from "../../redux/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-navigation";
import { ImageBackground } from "react-native";

import ButtonComponent from "../../components/ButtonComponent";
import Styles from "../../css/Styles";
import appColors from "../../assets/appColor";
import * as db from "../../firestore/FirebaseUtils";
import * as ImageHelpers from "../../helpers/ImageHelpers";
import Loading from "../../components/Loading";
import InputComponent from "../../components/InputComponent";

const pic =
  "https://i3.wp.com/hypebeast.com/image/2020/07/apple-memoji-update-headwear-masks-hairstyles-1.png?w=1600";

const UserProfile = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { showActionSheetWithOptions } = useActionSheet();

  const { currentUser } = useSelector((state) => state.authentication);
  const { name, email, phone, city, reduxProfileAvatar } = useSelector(
    (state) => state.userAdditionalInfo
  );
  const { width, height } = Dimensions.get("screen");
  const [localEmail, setLocalEmail] = useState(currentUser.email);
  const [localUserName, setLocalUserName] = useState("");
  const [localPhone, setLocalPhone] = useState("");
  const [localCity, setLocalCity] = useState("");
  const [localAvatar, setLocalAvatar] = useState(null);
  const [uid, setUid] = useState("");
  const [profielImage, setProfileImage] = useState(currentUser.photoUrl);
  const [isLoading, setIsLoading] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    name && setLocalUserName(name);
    phone && setLocalPhone(phone);
    city && setLocalCity(city);
    reduxProfileAvatar
      ? setLocalAvatar(reduxProfileAvatar)
      : setLocalAvatar(pic);
  }, [name, phone, city, reduxProfileAvatar]);

  useEffect(() => {
    setUid(currentUser.uid || currentUser.id);
  }, [uid]);

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
  const handleUploadImage = async (image, profileAvatar) => {
    setIsLoading(true);
    const ref = firebase.storage().ref("profileAvatar").child(uid);
    try {
      const blob = await ImageHelpers.prepareBlob(image.uri);
      const snapShot = await ref.put(blob);
      const downLoadedUrl = await ref.getDownloadURL();
      db.updateUserDataDB({ profileAvatar: downLoadedUrl }, uid);
      blob.close();
      setIsLoading(false);
      return downLoadedUrl;
    } catch (error) {
      console.log(error);
    }
  };
  const openImageLibrary = async (profileAvatar) => {
    const result = await ImageHelpers.openImageLibrary();
    if (result) {
      const downLoadURL = await handleUploadImage(result, profileAvatar);
    }
  };
  const openCamera = async (profileAvatar) => {
    const result = await ImageHelpers.openCamera();
    if (result) {
      const downLoadURL = await handleUploadImage(result, profileAvatar);
    }
  };
  const addProfileImage = (profileAvatar) => {
    const options = ["SELECT FROM PHOTOS", "CAMERA", "CANCEL"];
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      { options, cancelButtonIndex },
      (buttonIndex) => {
        if (buttonIndex == 0) {
          openImageLibrary(profileAvatar);
        }
        if (buttonIndex == 1) {
          openCamera(profileAvatar);
        }
      }
    );
  };

  return (
    <ScrollView style={Styles.profileScreen}>
      <View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            flexDirection: "row",
            marginHorizontal: 2,
            marginVertical: 0,
            height:height/20,
            
          }}
        >
          <ButtonComponent
            buttonStyle={{ flex: 1, width: 40, position:"absolute", right:width/1.3 }}
            onPress={() => navigate("Home")}
          >
            <MaterialCommunityIcons
              name="home"
              size={30}
              color={appColors.iconInActive}
            />
          </ButtonComponent>
          {!editMode && (
            <ButtonComponent
              style={{
                flex: 1,
                borderRadius: 5,
                width: 40,
                
              }}
              onTouch={handleEdit}
            >
              <Text style={{ paddingBottom: 10 }}>
                <MaterialIcons name="edit" size={30} color="grey" />
              </Text>
            </ButtonComponent>
          )}

          {editMode && (
            <>
              <ButtonComponent
                style={{
                  flex: 1,
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                }}
                onTouch={discardChanges}
              >
                <MaterialIcons name="cancel" size={24} color="grey" />
              </ButtonComponent>
              <ButtonComponent
                style={{
                  flex: 1,
                  borderRadius: 5,

                  width: 40,
                }}
                onTouch={handleSaveUserData}
              >
                <MaterialCommunityIcons
                  name="check-all"
                  size={24}
                  color="grey"
                />
              </ButtonComponent>
            </>
          )}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          height: height / 4,
        }}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <ButtonComponent
            onTouch={() => addProfileImage()}
            style={{
              borderRadius: 70,
              marginTop: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.4,
              shadowRadius: 8,

              elevation: 12,
            }}
          >
            <Image
              style={[Styles.userProfileImage]}
              imageStyle={{ borderRadius: 70 }}
              source={{ uri: localAvatar }}
            />
          </ButtonComponent>
        )}
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <InputComponent
          editable={isEditable}
          children={"Name"}
          value={localUserName}
          onChangeText={(e) => {
            setLocalUserName(e);
          }}
        />
        <InputComponent
          children={"E-mail"}
          value={localEmail}
          onChangeText={(e) => {
            setLocalEmail(e);
          }}
        />
        <InputComponent
          editable={isEditable}
          children={"Phone"}
          keyboardType="phone-pad"
          dataDetectorTypes="phoneNumber"
          value={localPhone}
          onChangeText={(e) => {
            setLocalPhone(e);
          }}
        />

        <InputComponent
          editable={isEditable}
          children={"City"}
          dataDetectorTypes="address"
          value={localCity}
          onChangeText={(e) => {
            setLocalCity(e);
          }}
        />
      </View>

     
    </ScrollView>
  );
};

export default UserProfile;
