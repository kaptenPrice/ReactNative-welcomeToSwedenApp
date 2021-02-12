import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/store/actions';

import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Modal } from 'react-native';
import appColors from '../assets/appColor';
import InputComponent from './InputComponent';
import ButtonComponent from './ButtonComponent';
import ModalConfirmDeleteAccount from './ModalConfirmDeleteAccount';

import * as db from '../firestore/FirebaseUtils';
import firebase from 'firebase/app';
import ModalSuccessComponent from './ModalSuccessComponent';
import ArrowRightSvg from '../assets/svg/ArrowRightSvg';
import { color } from 'react-native-reanimated';
import SuccesSvg from '../assets/svg/SuccesSvg';

const ModalEditMailPassComponent = ({ onCancel, visible }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.authentication);
  const { email } = useSelector((state) => state.userAdditionalInfo);
  const { height, width } = Dimensions.get('window');

  const [uid, setUid] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentEmail, setCurrentEmail] = useState(currentUser.email);
  const [newEmail, setNewEmail] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isPassFieldsEmpty, setIsPassFieldsEmpty] = useState(true);
  const [isEmailFieldsEmpty, setIsEmailFieldsEmpty] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  // const [isVisible, setIsVisible] = useState(true);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isDeleteAccountBegin, setDeleteAccountBegin] = useState(false);
  const [buttonIsVisible, setButtonIsVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSucces, setIsSuccess] = useState(false);

  useEffect(() => {
    // setTimeout(() => {
    //   currentPassword >= 6
    //     ? setCurrentPassword("")
    //     : setCurrentPassword(currentPassword);
    // }, 50000);

    setTimeout(() => {
      setDeleteAccountBegin(false);
    }, 45000);
  }, []);

  useEffect(() => {
    newPassword.length < 6 ? setIsPassFieldsEmpty(true) : setIsPassFieldsEmpty(false);
  }, [newPassword]);

  useEffect(() => {
    check_email();
  }, [newEmail]);

  useEffect(() => {
    setUid(currentUser.uid || currentUser.id);
  }, [uid]);

  const handleSignOut = async () => {
    try {
      db.signOut();
      dispatch(signOut());
    } catch (error) {
      alert('Something fishy occurred, try again, or restart the app');
      alert('error: ', error);
    }
  };
  const deleteUserData = async () => {
    await db.db.doc(`users/${uid}`).delete();
    await reAuthenticated(currentPassword)
      .then()
      .catch((error) => {
        alert(error);
      });
    await db.auth.currentUser.delete();
    handleSignOut();
  };

  function check_email() {
    if (!newEmail.match(/\S+@\S+\.\S+/)) {
      // Jaymon's / Squirtle's solution
      setIsEmailFieldsEmpty(true);
      return false;
    }
    if (newEmail.indexOf(' ') != -1 || newEmail.indexOf('..') != -1) {
      setIsEmailFieldsEmpty(true);
      return false;
    }
    setIsEmailFieldsEmpty(false);
    return true;
  }

  const reAuthenticated = () => {
    try {
      const user = db.auth.currentUser;
      var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);

      return user.reauthenticateWithCredential(cred);
    
    } catch (error) {
      alert(error);
    }
  };

  const handleChangePassword = async () => {
    await reAuthenticated(currentPassword)
      .then(() => {
        const user = db.auth.currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            setIsSuccess(true);

          })
          .catch((error) => alert(`change password: ${error}`));
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/too-many-requests':
            alert(`Too many requests, I have to rest! Try to hit me again in a while `);
            break;
          case 'auth/wrong-password':
            alert(`Try again with another password`);
            break;
          default:
            alert(error.code);
        }
      });
  };

  const handleChangeEmail = async () => {
    await reAuthenticated(currentPassword)
      .then(() => {
        const user = db.auth.currentUser;
        user
          .updateEmail(newEmail)
          .then(() => {
            alert(`E-mail updated, use ${newEmail} at next login`);
            dispatch({ type: 'ADD_EMAIL', payload: newEmail });
            onCancel();
            const [isSucces, setIsSuccess] = useState(false);
          })
          .catch((error) => alert(`change E-mail: ${error}`));
      })
      .catch((error) => {
        alert(`password change: ${error}`);
      });
  };

  const authorizeUser = async (currentPass) => {
    await reAuthenticated(currentPass)
      .then(() => setIsAuthorized(true))
      .catch((error) => {
        switch (error.code) {
          case 'auth/too-many-requests':
            alert(`Too many requests, I have to rest! Try to hit me again in a while `);
            break;
          case 'auth/wrong-password':
            alert(`password is misspelled? Try again`);
            break;
          default:
            alert(error.code);
        }
      });
  };
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{'Edit credentials'}</Text>
            {!isAuthorized && (
              <>
                <Text style={[styles.modalText, { fontWeight: '400' }]}>
                  {'Enter password to make changes'}
                </Text>
                <View style={styles.inputContainer}>
                  <InputComponent
                    children={'Current password'}
                    editable={true}
                    onChangeText={(currentPass) => setCurrentPassword(currentPass)}
                    clearTextOnFocus={true}
                    onEndEditing={() =>
                      currentPassword.length >= 6 && setButtonIsVisible(true)
                    }
                    secureTextEntry={true}
                    autoCapitalize="none"
                  />
                  {buttonIsVisible && (
                    <ButtonComponent
                      onTouch={() => authorizeUser(currentPassword)}
                      style={{ padding: 2, right: 0, bottom: 7 }}
                    >
                      <ArrowRightSvg />
                    </ButtonComponent>
                  )}
                </View>
                <ButtonComponent
                  style={[
                    styles.confirmButtons,
                    {
                      marginTop: 50,
                      paddingVertical: 5,
                      paddingHorizontal: 20,
                    },
                  ]}
                  onTouch={onCancel}
                  children={
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Cancel</Text>
                  }
                />
              </>
            )}

            {isAuthorized && (
              <>
                <InputComponent
                  children={'New password'}
                  editable={true}
                  onChangeText={(newPassword) => setNewPassword(newPassword)}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  onEndEditing={() => setIsChangingPass(true)}
                  isLabel={true}
                  clearTextOnFocus={true}
                />
                <InputComponent
                  children={'Current E-mail'}
                  editable={false}
                  value={currentEmail}
                  onFocus={() => setIsChangingPass(true)}
                  isLabel={true}
                />
                <InputComponent
                  children={'New E-mail'}
                  editable={true}
                  keyboardType="email-address"
                  onChangeText={(newEmail) => setNewEmail(newEmail)}
                  secureTextEntry={false}
                  autoCapitalize="none"
                  onFocus={() => setIsChangingEmail(true)}
                  isLabel={true}
                />

                <View style={styles.buttonContainer}>
                  {isChangingPass ? (
                    <ButtonComponent
                      style={[styles.confirmButtons, { borderColor: 'transparent' }]}
                      buttonStyle={{ padding: 7 }}
                      disabled={isPassFieldsEmpty}
                      onTouch={() => handleChangePassword()}
                      children={
                        isPassFieldsEmpty ? (
                          <Text style={styles.buttonInActive}>"-1337-"</Text>
                        ) : (
                          <Text style={[styles.buttonText, { color: 'blue' }]}>
                            Change password
                          </Text>
                        )
                      }
                    />
                  ) : null}
                  {isChangingEmail ? (
                    <ButtonComponent
                      style={[styles.confirmButtons, { borderColor: 'transparent' }]}
                      disabled={isEmailFieldsEmpty}
                      onTouch={() => handleChangeEmail()}
                      children={
                        isEmailFieldsEmpty ? (
                          <Text style={styles.buttonInActive}>"-1337-"</Text>
                        ) : (
                          <Text style={styles.buttonActive}>Change Email</Text>
                        )
                      }
                    />
                  ) : null}

                  <ButtonComponent
                    style={[styles.confirmButtons, { borderColor: 'transparent' }]}
                    onTouch={() => {
                      setIsModalVisible(true);
                    }}
                    children={
                      <Text
                        style={{
                          color: 'red',
                          fontWeight: 'bold',
                          fontSize: 18,
                          paddingVertical: 5,
                        }}
                      >
                        Delete account
                      </Text>
                    }
                  />
                  <ButtonComponent
                    style={[styles.confirmButtons, { borderColor: 'transparent' }]}
                    onTouch={onCancel}
                    children={
                      <Text
                        style={{
                          fontWeight: 'bold',
                          paddingHorizontal: 25,
                          paddingVertical: 10,
                        }}
                      >
                        Cancel
                      </Text>
                    }
                  />
                </View>
              </>
            )}
          </View>
          {isModalVisible ? (
            <ModalConfirmDeleteAccount
              onTouch={deleteUserData}
              setValue={() => setIsModalVisible(false)}
              value={isModalVisible}
              actionType={'Delete account'}
            />
          ) : null}
          {isSucces && (
            <ModalSuccessComponent
              value={isSucces}
              iconType={<SuccesSvg />}
              textFat={'Success'}
              textSmall={'Please log in with your new credential'}
              onTouch={() => {
                // setIsSuccess(false);
                handleSignOut();
              }}
              buttonText={'OK'}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};
export default ModalEditMailPassComponent;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: appColors.bgColor,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconView: {
    left: 90,
    bottom: 35,
  },
  openButton: {
    backgroundColor: appColors.bgColor,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: appColors.textColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'space-between',

    marginTop: 100,
  },
  confirmButtons: {
    backgroundColor: 'white',

    marginTop: 20,
    borderColor: appColors.borderColor,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  buttonInActive: {
    color: 'transparent',
    fontWeight: '100',
  },
  buttonActive: { color: 'blue', fontWeight: 'bold' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  icon: {
    right: 30,
    bottom: 10,

    // backgroundColor: '#e2e2e2',
  },
  buttonText: {
    color: appColors.changePass,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
