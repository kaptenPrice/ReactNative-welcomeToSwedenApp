import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Image, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import 'firebase-auth';
import SuccesSvg from '../../assets/svg/SuccesSvg';
import { signOut } from '../../redux/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import ButtonComponent from '../../components/ButtonComponent';
import Styles from '../../css/Styles';
import appColors from '../../assets/appColor';
import * as db from '../../firestore/FirebaseUtils';
import * as ImageHelpers from '../../helpers/ImageHelpers';
import Loading from '../../components/Loading';
import InputComponent from '../../components/InputComponent';
import AfterFeedback from '../../components/AfterFeedback';
import ModalEditMailPassComponent from '../../components/ModalEditMailPassComponent';
import ModalConfirmDeleteAccount from '../../components/ModalConfirmDeleteAccount';
import ModalSuccessComponent from '../../components/ModalSuccessComponent';
import EditImageSvg from '../../assets/svg/EditImageSvg';
import LockSvg from '../../assets/svg/LockSvg';
import UnLockSvg from '../../assets/svg/UnLockSvg';
import UserProfileAdmin from '../../components/UserProfileAdmin';
// import { app } from 'firebase-admin';
const pic =
  'https://i3.wp.com/hypebeast.com/image/2020/07/apple-memoji-update-headwear-masks-hairstyles-1.png?w=1600';

const UserProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { showActionSheetWithOptions } = useActionSheet();

  const { currentUser } = useSelector((state) => state.authentication);
  const { name, email, phone, city, reduxProfileAvatar, isAdmin } = useSelector(
    (state) => state.userAdditionalInfo
  );
  const { width, height } = Dimensions.get('window');
  const [localEmail] = useState(currentUser.email);
  const [localUserName, setLocalUserName] = useState('');
  const [localPhone, setLocalPhone] = useState('');
  const [localCity, setLocalCity] = useState('');
  const [localAvatar, setLocalAvatar] = useState(null);
  const [uid, setUid] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [profielImage, setProfileImage] = useState(currentUser.photoUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isOAuth, setIsOAuth] = useState(true);
  const [isSucces, setIsSuccess] = useState(false);

  useEffect(() => {
    name && setLocalUserName(name);
    phone && setLocalPhone(phone);
    city && setLocalCity(city);
    reduxProfileAvatar ? setLocalAvatar(reduxProfileAvatar) : setLocalAvatar(pic);
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
      if (localUserName !== name || localPhone !== phone || localCity !== city) {
        db.updateUserDataDB(data, uid);
      }
    } catch (error) {
      alert('Error från feedback', error);
    }
    setIsEditable(false);
    setEditMode(false);
    setIsSuccess(true);
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
    const ref = db.storage.ref('profileAvatar').child(uid);

    try {
      const blob = await ImageHelpers.prepareBlob(image.uri);
      const snapShot = await ref.put(blob);
      const downLoadedUrl = await ref.getDownloadURL();
      db.updateUserDataDB({ profileAvatar: downLoadedUrl }, uid);
      blob.close();
      setIsLoading(false);
      return downLoadedUrl;
    } catch (error) {
      alert(error);
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
    const options = ['SELECT FROM PHOTOS', 'CAMERA', 'CANCEL'];
    const cancelButtonIndex = 2;
    showActionSheetWithOptions({ options, cancelButtonIndex }, (buttonIndex) => {
      if (buttonIndex == 0) {
        openImageLibrary(profileAvatar);
      }
      if (buttonIndex == 1) {
        openCamera(profileAvatar);
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isAdmin ? (
        <UserProfileAdmin />
      ) : (
        <ScrollView style={{ flex: 1, backgroundColor: appColors.bgColor }}>
          <View style={[styles.imageMainContainer, { height: height / 5 }]}>
            {isLoading ? (
              <Loading />
            ) : (
              <ButtonComponent onTouch={() => addProfileImage()} style={styles.imageContainer}>
                <Image
                  style={[styles.userProfileImage]}
                  imageStyle={{ borderRadius: 70 }}
                  source={{ uri: localAvatar }}
                />
                <View style={styles.editImage}>
                  <EditImageSvg />
                </View>
              </ButtonComponent>
            )}
          </View>

          <View style={styles.inputContainer}>
            <InputComponent
              editable={isEditable}
              children={'Name'}
              value={localUserName}
              onChangeText={(e) => {
                setLocalUserName(e);
              }}
              isLabel={true}
              icon={!editMode ? <LockSvg /> : <UnLockSvg />}
            />
            <InputComponent
              children={'E-mail'}
              value={localEmail}
              editable={false}
              isLabel={true}
              valueColor={appColors.textColor}
              icon={<LockSvg />}
            />

            <InputComponent
              editable={isEditable}
              children={'Phone'}
              keyboardType="phone-pad"
              dataDetectorTypes="phoneNumber"
              value={localPhone}
              onChangeText={(e) => {
                setLocalPhone(e);
              }}
              isLabel={true}
              icon={!editMode ? <LockSvg /> : <UnLockSvg />}
            />
            <InputComponent
              editable={isEditable}
              children={'City'}
              dataDetectorTypes="address"
              value={localCity}
              onChangeText={(e) => {
                setLocalCity(e);
              }}
              isLabel={true}
              icon={!editMode ? <LockSvg /> : <UnLockSvg />}
            />
            {!editMode && (
              <ButtonComponent
                style={{ marginTop: 25, height: height / 17 }}
                onTouch={() => handleEdit()}
                buttonStyle={styles.editButton}
                children={<Text style={styles.buttonText}>Edit info</Text>}
              />
            )}
            {editMode && (
              <View style={[styles.afterEditButtons, { height: height / 15 }]}>
                <ButtonComponent
                  style={{ height: height / 15, marginLeft: 5 }}
                  onTouch={() => discardChanges()}
                  buttonStyle={styles.editButton}
                  children={<Text style={styles.buttonText}>Cancel</Text>}
                />
                <ButtonComponent
                  style={{ height: height / 15 }}
                  onTouch={() => handleSaveUserData()}
                  buttonStyle={styles.editButton}
                  children={<Text style={styles.buttonText}>Save</Text>}
                />
              </View>
            )}
            {/* isOuath user can edit email and password and delete the account, gmailAuth cannot edit password or mail */}
            {isOAuth && (
              <ButtonComponent
                style={[styles.oauthButton, { height: height / 20 }]}
                onTouch={() => setIsModal(true)}
                buttonStyle={styles.editButton}
                children={<Text style={styles.buttonText}>Edit e-mail / password</Text>}
              />
            )}

            <ModalEditMailPassComponent visible={isModal} onCancel={() => setIsModal(false)} />

            {isSucces && (
              <ModalSuccessComponent
                visible={isSucces}
                iconType={<SuccesSvg />}
                textFat={'Success'}
                textSmall={'Credentials are now updated'}
                onTouch={() => setIsSuccess(false)}
                buttonText={'OK'}
              />
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonText: {
    color: appColors.bgColor,
    fontWeight: '500',
    paddingHorizontal: 45,
  },
  editButton: {
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: appColors.changePass,
    backgroundColor: appColors.changePass,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,

    elevation: 12,
  },
  afterEditButtons: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignContent: 'space-around',
    marginTop: 25,
  },
  discardButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  saveButton: {
    flex: 1,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  oauthButton: {
    flex: 1,
    paddingTop: 20,
    position: 'relative',
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',

    borderRadius: 70,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 12,
  },
  imageMainContainer: {
    marginVertical: 10,
    flex: 1,
    flexDirection: 'column',
  },
  userProfileImage: {
    height: 140,
    width: 140,
    borderRadius: 70,
  },
  originalMode: {
    color: appColors.textColor,
    backgroundColor: appColors.bgColor,
    borderWidth: 1,
    borderColor: appColors.borderColor,
    borderRadius: 10,
    height: 45,
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 10,
    paddingLeft: 10,
  },
  editableMode: {
    color: appColors.textColor,
    backgroundColor: appColors.editmode,
    borderWidth: 1,
    borderColor: appColors.borderColor,
    borderRadius: 10,
    height: 45,
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 10,
    paddingLeft: 10,
  },
  editImage: {
    borderRadius: 20,
    left: 110,
    bottom: 140,
    width: 30,
    padding: 5,
    backgroundColor: appColors.bgColor,
    opacity: 0.9,
  },
});
