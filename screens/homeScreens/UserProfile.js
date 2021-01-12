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

import {  signOut } from "../../redux/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-navigation";
import { ImageBackground } from "react-native";

import ButtonComponent from "../../components/ButtonComponent";
import Styles from "../../css/Styles";
import appColors from "../../assets/appColor";
import * as db from "../../firestore/FirebaseUtils";
import * as ImageHelpers from "../../helpers/ImageHelpers";
import Loading from "../../components/Loading";

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
    reduxProfileAvatar && setLocalAvatar(reduxProfileAvatar);


    // localAvatar ? setLocalAvatar(localAvatar):setLocalAvatar(pic) 
 
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
      //Lägg till länken under users data
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
          marginVertical: 5,
        }}
      >
        {!editMode && (
          <ButtonComponent
            style={{
              flex: 1,
              borderRadius: 5,
              // alignItems: "center",
              // justifyContent: "center",
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
                borderRadius: 5,
                // borderWidth:1,
                // borderColor:"red",
                alignItems:"center" ,
                justifyContent:"center",
                width: 40,
              }}
              onTouch={discardChanges}
            >
              <Text style={{ paddingBottom: 10 }}>
              <MaterialIcons name="cancel" size={24} color="grey" />
                {/* <AntDesign name="back" size={24} color="red" /> */}
                {/* <Ionicons name="md-close-circle-outline" size={24} color="red" /> */}
              </Text>
            </ButtonComponent>
            <ButtonComponent
              style={{
                flex: 1,
                borderRadius: 5,
                // alignItems: "center",
                // justifyContent: "center",
                width: 40,
              }}
              onTouch={handleSaveUserData}
            >
              <Text style={{ paddingBottom: 10 }}>
              <MaterialCommunityIcons name="check-all" size={24} color="grey" />
                {/* <FontAwesome name="save" size={24} color="green" /> */}
              </Text>
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
          height:height/4
        }}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <ButtonComponent
            onTouch={() => addProfileImage()} 
            style={{
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
              // imageStyle={{ borderRadius: 70 }}
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
          marginHorizontal: 5,
        }}
      >
        <ButtonComponent
          buttonStyle={Styles.profileButtons}
          onPress={() => navigate("Home")}
        >
          <MaterialCommunityIcons
            name="home-outline"
            size={30}
            color={appColors.iconInActive}
          />
          {/* <Text style={Styles.signinRegisterButtonText}>Home</Text> */}
        </ButtonComponent>
 
      </View>
    </ScrollView>
  );
};

export default UserProfile;
