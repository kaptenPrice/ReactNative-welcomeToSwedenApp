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
} from "react-native";
import firebase from "firebase/app";
import "firebase-auth";
import {
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { signOut } from "../../redux/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-navigation";

import ButtonComponent from "../../components/ButtonComponent";
import Styles from "../../css/Styles";
import appColors from "../../assets/appColor";
import * as db from "../../firestore/FirebaseUtils";
import * as ImageHelpers from "../../helpers/ImageHelpers";
import Loading from "../../components/Loading";
import InputComponent from "../../components/InputComponent";
import AfterFeedback from "../../components/AfterFeedback";
import ModalEditMailPassComponent from "../../components/ModalEditMailPassComponent";

const pic =
  "https://i3.wp.com/hypebeast.com/image/2020/07/apple-memoji-update-headwear-masks-hairstyles-1.png?w=1600";

const UserProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const passwordInputRef = useRef("");

  const { showActionSheetWithOptions } = useActionSheet();

  const { currentUser } = useSelector((state) => state.authentication);
  const { name, email, phone, city, reduxProfileAvatar } = useSelector(
    (state) => state.userAdditionalInfo
  );
  const { width, height } = Dimensions.get("screen");
  const [localEmail] = useState(currentUser.email);
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
  const [isEmpty, setIsEmpty] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isOAuth, setIsOAuth] = useState(true);

  useEffect(() => {
    name && setLocalUserName(name);
    phone && setLocalPhone(phone);
    city && setLocalCity(city);
    reduxProfileAvatar
      ? setLocalAvatar(reduxProfileAvatar)
      : setLocalAvatar(pic);
  }, [name, phone, city, reduxProfileAvatar, currentPassword, localEmail]);

  useEffect(() => {
    currentUser.id ? setIsOAuth(false) : setIsOAuth(true);
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
    setIsEditable(false);
    setEditMode(false);
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View>

        </View>
        <View style={[styles.imageMainContainer, { height: height / 5 }]}>
          {isLoading ? (
            <Loading />
          ) : (
              <ButtonComponent
                onTouch={() => addProfileImage()}
                style={styles.imageContainer}
              >
                <Image
                  style={[styles.userProfileImage]}
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
            isLabel={true}
            valueColor={!editMode ? appColors.textColor : appColors.editableText}

          />
          <InputComponent
            children={"E-mail"}
            value={localEmail}
            editable={false}
            isLabel={true}
            valueColor={appColors.textColor}

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
            isLabel={true}
            valueColor={!editMode ? appColors.textColor : appColors.editableText}


          />

          <InputComponent
            editable={isEditable}
            children={"City"}
            dataDetectorTypes="address"
            value={localCity}
            onChangeText={(e) => {
              setLocalCity(e);
            }}
            isLabel={true}
            valueColor={!editMode ? appColors.textColor : appColors.editableText}

          />
          {!editMode && (
            <ButtonComponent
              style={{ marginTop: 25, height: height / 15 }}
              onTouch={() => handleEdit()}
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
                    paddingHorizontal: 45
                  }}
                >
                  Edit info
                </Text>
              }
            />
          )}
          {editMode && (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginTop: 25,
                height: height / 15,
              }}
            >
              <ButtonComponent
                style={styles.discardButton}
                onTouch={() => discardChanges()}
              >
                <MaterialIcons
                  name="cancel"
                  size={24}
                  color={appColors.iconInActive}
                />
              </ButtonComponent>
              <ButtonComponent
                style={styles.saveButton}
                onTouch={() => handleSaveUserData()}
              >
                <MaterialCommunityIcons
                  name="check-all"
                  size={24}
                  color={appColors.iconInActive}
                />
              </ButtonComponent>
            </View>
          )}
          {isOAuth && (
            <ButtonComponent
              style={{
                flex: 1,
                paddingTop: 20,
                position: "relative",
                height: height / 20,
              }}
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
                  Edit e-mail / password
                </Text>
              }
            />
          )}

          {isModal ? (
            <ModalEditMailPassComponent onCancel={() => setIsModal(false)} />
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  headerButtons: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    marginHorizontal: 2,
    paddingVertical: 5,
    marginBottom: 0,
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
  saveButton: {
    flex: 1,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
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
  },
  imageMainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  userProfileImage: {
    height: 140,
    width: 140,
    borderRadius: 70,
  },
});


// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Button,
//   Image,
//   Dimensions,
//   StyleSheet,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { useActionSheet } from "@expo/react-native-action-sheet";
// import {
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
// } from "react-native-gesture-handler";
// import firebase from "firebase/app";
// import "firebase-auth";
// import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

// import { useDispatch, useSelector } from "react-redux";
// import { SafeAreaView } from "react-navigation";

// import ButtonComponent from "../../components/ButtonComponent";
// import Styles from "../../css/Styles";
// import appColors from "../../assets/appColor";
// import * as db from "../../firestore/FirebaseUtils";
// import * as ImageHelpers from "../../helpers/ImageHelpers";
// import Loading from "../../components/Loading";
// import InputComponent from "../../components/InputComponent";
// import AfterFeedback from "../../components/AfterFeedback";
// import ModalEditMailPassComponent from "../../components/ModalEditMailPassComponent";

// const pic =
//   "https://i3.wp.com/hypebeast.com/image/2020/07/apple-memoji-update-headwear-masks-hairstyles-1.png?w=1600";

// const UserProfile = () => {
//   const navigation = useNavigation();

//   const { showActionSheetWithOptions } = useActionSheet();

//   const { currentUser } = useSelector((state) => state.authentication);
//   const { name, email, phone, city, reduxProfileAvatar } = useSelector(
//     (state) => state.userAdditionalInfo
//   );
//   const { width, height } = Dimensions.get("screen");
//   const [localEmail] = useState(currentUser.email);
//   const [localUserName, setLocalUserName] = useState("");
//   const [localPhone, setLocalPhone] = useState("");
//   const [localCity, setLocalCity] = useState("");
//   const [localAvatar, setLocalAvatar] = useState(null);
//   const [uid, setUid] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [profielImage, setProfileImage] = useState(currentUser.photoUrl);
//   const [isLoading, setIsLoading] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [isEditable, setIsEditable] = useState(false);
//   // const [isEmpty, setIsEmpty] = useState(true)
//   const [isModal, setIsModal] = useState(false);
//   // const [isFilled, setIsFilled] = useState(false)
//   const [isOAuth, setIsOAuth] = useState(true);

//   useEffect(() => {
//     name && setLocalUserName(name);
//     phone && setLocalPhone(phone);
//     city && setLocalCity(city);
//     reduxProfileAvatar
//       ? setLocalAvatar(reduxProfileAvatar)
//       : setLocalAvatar(pic);
//   }, [name, phone, city, reduxProfileAvatar, currentPassword, localEmail]);

//   useEffect(() => {
//     currentUser.id ? setIsOAuth(false) : setIsOAuth(true);
//     setUid(currentUser.uid || currentUser.id);
//   }, [uid]);

//   const handleSaveUserData = () => {
//     let data = {
//       name: localUserName,
//       phone: localPhone,
//       city: localCity,
//     };
//     try {
//       if (
//         localUserName !== name ||
//         localPhone !== phone ||
//         localCity !== city
//       ) {
//         db.updateUserDataDB(data, uid);
//       }
//     } catch (error) {
//       console.log("Error från feedback", error);
//     }
//     setIsEditable(false);
//     setEditMode(false);
//   };
//   const discardChanges = () => {
//     setLocalUserName(name);
//     setLocalPhone(phone);
//     setLocalCity(city);
//     setIsEditable(false);
//     setEditMode(false);
//   };

//   const handleEdit = () => {
//     setIsEditable(true);
//     setEditMode(true);
//   };
//   const handleUploadImage = async (image, profileAvatar) => {
//     setIsLoading(true);
//     const ref = firebase.storage().ref("profileAvatar").child(uid);
//     try {
//       const blob = await ImageHelpers.prepareBlob(image.uri);
//       const snapShot = await ref.put(blob);
//       const downLoadedUrl = await ref.getDownloadURL();
//       db.updateUserDataDB({ profileAvatar: downLoadedUrl }, uid);
//       blob.close();
//       setIsLoading(false);
//       return downLoadedUrl;
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const openImageLibrary = async (profileAvatar) => {
//     const result = await ImageHelpers.openImageLibrary();
//     if (result) {
//       const downLoadURL = await handleUploadImage(result, profileAvatar);
//     }
//   };
//   const openCamera = async (profileAvatar) => {
//     const result = await ImageHelpers.openCamera();
//     if (result) {
//       const downLoadURL = await handleUploadImage(result, profileAvatar);
//     }
//   };
//   const addProfileImage = (profileAvatar) => {
//     const options = ["SELECT FROM PHOTOS", "CAMERA", "CANCEL"];
//     const cancelButtonIndex = 2;
//     showActionSheetWithOptions(
//       { options, cancelButtonIndex },
//       (buttonIndex) => {
//         if (buttonIndex == 0) {
//           openImageLibrary(profileAvatar);
//         }
//         if (buttonIndex == 1) {
//           openCamera(profileAvatar);
//         }
//       }
//     );
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <ScrollView style={Styles.profileScreen}>
//         <View style={[styles.imageMainContainer, { height: height / 5 }]}>
//           {isLoading ? (
//             <Loading />
//           ) : (
//               <ButtonComponent
//                 onTouch={() => addProfileImage()}
//                 style={styles.imageContainer}
//               >
//                 <Image
//                   style={[Styles.userProfileImage]}
//                   imageStyle={{ borderRadius: 70 }}
//                   source={{ uri: localAvatar }}
//                 />
//               </ButtonComponent>
//             )}
//         </View>

//         <View style={styles.inputContainer}>
//           <InputComponent
//             editable={isEditable}
//             children={"Name"}
//             value={localUserName}
//             onChangeText={(e) => {
//               setLocalUserName(e);
//             }}
//             isLabel={true}
//             valueColor={
//               !editMode ? appColors.textColor : appColors.editableText
//             }
//           />
//           <InputComponent
//             children={"E-mail"}
//             value={localEmail}
//             editable={false}
//             isLabel={true}
//             valueColor={appColors.textColor}
//           />

//           <InputComponent
//             editable={isEditable}
//             children={"Phone"}
//             keyboardType="phone-pad"
//             dataDetectorTypes="phoneNumber"
//             value={localPhone}
//             onChangeText={(e) => {
//               setLocalPhone(e);
//             }}
//             isLabel={true}
//             valueColor={
//               !editMode ? appColors.textColor : appColors.editableText
//             }
//           />

//           <InputComponent
//             editable={isEditable}
//             children={"City"}
//             dataDetectorTypes="address"
//             value={localCity}
//             onChangeText={(e) => {
//               setLocalCity(e);
//             }}
//             isLabel={true}
//             valueColor={
//               !editMode ? appColors.textColor : appColors.editableText
//             }
//           />
//           {!editMode && (
//             <ButtonComponent
//               style={{ marginTop: 25, height: height / 15 }}
//               onTouch={() => handleEdit()}
//               buttonStyle={{
//                 padding: 10,
//                 borderRadius: 15,
//                 borderWidth: 1,
//                 borderColor: appColors.changePass,
//                 backgroundColor: appColors.changePass,
//               }}
//               children={
//                 <Text
//                   style={{
//                     color: appColors.bgColor,
//                     fontWeight: "500",
//                     paddingHorizontal: 45,
//                   }}
//                 >
//                   Edit info
//                 </Text>
//               }
//             />
//           )}
//           {editMode && (
//             <View
//               style={{
//                 flex: 1,
//                 flexDirection: "row",
//                 marginTop: 25,
//                 height: height / 15,
//               }}
//             >
//               <ButtonComponent
//                 style={styles.discardButton}
//                 onTouch={() => discardChanges()}
//               >
//                 <MaterialIcons
//                   name="cancel"
//                   size={24}
//                   color={appColors.iconInActive}
//                 />
//               </ButtonComponent>
//               <ButtonComponent
//                 style={styles.saveButton}
//                 onTouch={() => handleSaveUserData()}
//               >
//                 <MaterialCommunityIcons
//                   name="check-all"
//                   size={24}
//                   color={appColors.iconInActive}
//                 />
//               </ButtonComponent>
//             </View>
//           )}
//           {isOAuth && (
//             <ButtonComponent
//               style={{
//                 flex: 1,
//                 paddingTop: 20,
//                 position: "relative",
//                 height: height / 20,
//               }}
//               onTouch={() => setIsModal(true)}
//               buttonStyle={{
//                 padding: 10,
//                 borderRadius: 15,
//                 borderWidth: 1,
//                 borderColor: appColors.changePass,
//                 backgroundColor: appColors.changePass,
//               }}
//               children={
//                 <Text
//                   style={{
//                     color: appColors.bgColor,
//                     fontWeight: "500",
//                   }}
//                 >
//                   Edit e-mail / password
//                 </Text>
//               }
//             />
//           )}

//           {isModal ? (
//             <ModalEditMailPassComponent onCancel={() => setIsModal(false)} />
//           ) : null}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default UserProfile;

// const styles = StyleSheet.create({
//   homeButtonStyle: {
//     borderWidth: 1,
//     borderColor: "red",
//     flex: 1,
//     width: 40,
//     position: "absolute",
//   },
//   headerButtons: {
//     flex: 1,
//     justifyContent: "center",
//     flexDirection: "row",
//     marginHorizontal: 2,
//     paddingVertical: 5,
//     marginBottom: 0,
//   },
//   inputContainer: {
//     flex: 1,
//     justifyContent: "flex-start",
//     alignItems: "center",
//     flexDirection: "column",
//   },
//   discardButton: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     width: 40,
//   },
//   saveButton: {
//     flex: 1,
//     width: 40,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   imageContainer: {
//     borderRadius: 70,
//     marginTop: 0,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//     shadowOpacity: 0.4,
//     shadowRadius: 8,

//     elevation: 12,
//   },
//   imageMainContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//   },
// });
