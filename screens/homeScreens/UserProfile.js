import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
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
import AfterFeedback from "../../components/AfterFeedback";
import ModalPasswordComponent from "../../components/ModalPasswordComponent";

const pic =
  "https://i3.wp.com/hypebeast.com/image/2020/07/apple-memoji-update-headwear-masks-hairstyles-1.png?w=1600";

const UserProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const passwordInputRef = useRef("");

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
  const [currentPassword, setCurrentPassword] = useState("");
  const [profielImage, setProfileImage] = useState(currentUser.photoUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [rewritePass, setRewritePass] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      currentPassword >= 6
        ? setCurrentPassword("")
        : setCurrentPassword(currentPassword);
    }, 50000);

    setTimeout(() => {
      setRewritePass(false);
    }, 45000);

    currentPassword.length < 6 ? setIsEmpty(true) : setIsEmpty(false);

    name && setLocalUserName(name);
    phone && setLocalPhone(phone);
    city && setLocalCity(city);
    reduxProfileAvatar
      ? setLocalAvatar(reduxProfileAvatar)
      : setLocalAvatar(pic);
  }, [name, phone, city, reduxProfileAvatar, currentPassword]);

  useEffect(() => {
    setUid(currentUser.uid || currentUser.id);
  }, [uid]);

  //   onEnterText = (TextInputValue) =>{
  //     if(TextInputValue.trim() != 0){
  //      this.setState({TextInputValue : TextInputValue}) ;
  //    }else{
  //        this.setState({TextInputValue : TextInputValue, ErrorStatus : false}) ;
  //    }
  //  }

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

  // const deleteFireStoreCred = async () => {
  //   console.log("entered deleteFiresstoreCred");
  //   try {
  //     await db.deleteUserFromFireStore(uid);
  //     console.log(`User with ${uid} is deleted from firestore`);
  //   } catch (error) {
  //     console.log("Error in deleting from firestore: ", error);
  //   }
  // };

  const reAuthenticated = () => {
    const user = db.auth.currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  const deleteGoogleAuth = async () => {
    await db.db.doc(`users/${uid}`).delete();
    await reAuthenticated(currentPassword)
      .then()
      .catch((error) => {
        alert(error);
      });
    await db.auth.currentUser.delete();
    handleSignOut();
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
            paddingVertical: 5,
            height: height / 13,
            marginBottom: 0,
          }}
        >
          <ButtonComponent
            style={{ marginRight: width / 1.5 }}
            onTouch={() => {
              navigation.navigate("Home");
            }}
          >
            <MaterialCommunityIcons
              name="home"
              size={30}
              color={appColors.iconInActive}
            />
          </ButtonComponent>

          {!editMode && (
            <ButtonComponent style={{ marginRight: 20 }} onTouch={handleEdit}>
              <View>
                <MaterialIcons name="edit" size={30} color="grey" />
              </View>
            </ButtonComponent>
          )}
          {editMode && (
            <>
              <ButtonComponent
                style={styles.discardButton}
                onTouch={discardChanges}
              >
                <MaterialIcons name="cancel" size={24} color="grey" />
              </ButtonComponent>
              <ButtonComponent
                style={styles.saveButton}
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
          justifyContent: "flex-start",
          height: height / 5,
       
        }}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <ButtonComponent
            onTouch={() => addProfileImage()}
            style={{
              borderRadius: 70,
              marginTop: 0,
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

      <View style={styles.inputContainer}>
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
          editable={!isEditable}
          onFocus={() => console.log("onFokus")}
          // onChangeText={(e) => {
          //   setLocalEmail(e);
          // }}
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
        <ButtonComponent
          style={{ flex: 1, paddingTop: 20 }}
          onTouch={() => setIsModal(true)}
          buttonStyle={{
            padding: 10,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: appColors.changePass,
            backgroundColor: appColors.changePass,
          }}
          children={
            <Text
              style={{
                color: appColors.bgColor,
                fontWeight: "500",
              }}
            >
              Change password
            </Text>
          }
        />
        {isModal ? (
          <ModalPasswordComponent onCancel={() => setIsModal(false)} />
        ) : null}
      </View>
      <View style={{ flex: 1, flexDirection: "column-reverse" }}>
        <ButtonComponent
          style={{
            flex: 1,
            alignItems: "flex-end",
            paddingTop: 15,
            marginRight: 15,
          }}
          onTouch={() => setRewritePass(true)}
          children={
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={26}
              color="darkred"
            />
          }
        />
        {rewritePass ? (
          <View
            style={{ flex: 1, alignItems: "center", flexDirection: "column" }}
          >
            <View style={{ flex: 1, marginTop: 20, marginBottom: -15 }}>
              <Text style={{ color: "red", fontWeight: "bold" }}>
                To delete account, type your current password
              </Text>
            </View>
            <InputComponent
              onChangeText={(text) => setCurrentPassword(text)}
              autoCapitalize="none"
              secureTextEntry={true}
              children={"Password"}
              // ref={passwordInputRef}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row-reverse",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <ButtonComponent
                style={{
                  flex: 1,
                  borderColor: appColors.borderColor,
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}
                disabled={isEmpty}
                onTouch={() => {
                  deleteGoogleAuth(currentPassword);
                }}
                children={
                  isEmpty ? (
                    <Text
                      style={{
                        color: appColors.iconInActive,
                        fontWeight: "bold",
                      }}
                    >
                      ok
                    </Text>
                  ) : (
                    <Text style={{ color: "red", fontWeight: "bold" }}>OK</Text>
                  )
                }
              />
              <ButtonComponent
                style={{
                  flex: 1,
                  paddingHorizontal: 10,
                  borderColor: appColors.borderColor,
                  borderWidth: 1,
                  marginHorizontal: 5,
                  borderRadius: 10,
                }}
                onTouch={() => {
                  {
                    setRewritePass(false);
                    setCurrentPassword("");
                  }
                }}
                children={<Text style={{ fontWeight: "bold" }}>Cancel</Text>}
              />
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  homeButtonStyle: {
    borderWidth: 1,
    borderColor: "red",
    flex: 1,
    width: 40,
    position: "absolute",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  discardButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
  },
  saveButton:{
    flex: 1,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  }
});
