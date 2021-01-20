import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { signOut } from "../../redux/store/actions";
import { signOut } from "../redux/store/actions";

import { Dimensions } from "react-native";
import { StyleSheet, Text, View, Modal } from "react-native";
import appColors from "../assets/appColor";
import { MaterialCommunityIcons } from "@expo/vector-icons/";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import * as db from "../firestore/FirebaseUtils";
import firebase from "firebase/app";

const ModalEditMailPassComponent = ({ onCancel }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.authentication);
  const { email } = useSelector((state) => state.userAdditionalInfo);
  const {height, width}=Dimensions.get("screen")

  const [uid, setUid] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentEmail, setCurrentEmail] = useState(currentUser.email);
  const [newEmail, setNewEmail] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isPassFieldsEmpty, setIsPassFieldsEmpty] = useState(true);
  const [isEmailFieldsEmpty, setIsEmailFieldsEmpty] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isDeleteAccountBegin, setDeleteAccountBegin] = useState(false);

  
  //   onEnterText = (TextInputValue) =>{
  //     if(TextInputValue.trim() != 0){
  //      this.setState({TextInputValue : TextInputValue}) ;
  //    }else{
  //        this.setState({TextInputValue : TextInputValue, ErrorStatus : false}) ;
  //    }
  //  }

  useEffect(() => {
    // setCurrentEmail(db.auth.currentUser.email)
    setTimeout(() => {
      currentPassword >= 6
        ? setCurrentPassword("")
        : setCurrentPassword(currentPassword);
    }, 50000);

    setTimeout(() => {
      setDeleteAccountBegin(false);
    }, 45000);
  }, []);

  useEffect(() => {
    // currentPassword.length < 6
    //   ? setIsPassFieldsEmpty(true)
    //   : setIsPassFieldsEmpty(false);
    newPassword.length < 6
      ? setIsPassFieldsEmpty(true)
      : setIsPassFieldsEmpty(false);
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
      alert("Something fishy occurred, try again, or restart the app");
      console.log("error: ", error);
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
    if (newEmail.indexOf(" ") != -1 || newEmail.indexOf("..") != -1) {
      setIsEmailFieldsEmpty(true);
      return false;
    }
    setIsEmailFieldsEmpty(false);
    return true;
  }

  const reAuthenticated = () => {
    const user = db.auth.currentUser;
    console.log(user.email);
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  const handleChangePassword = async () => {
    await reAuthenticated(currentPassword)
      .then(() => {
        const user = db.auth.currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            alert("Password updated");
            setIsVisible(false);
          })
          .catch((error) => alert(`change password: ${error}`));
      })
      .catch((error) => {
        console.log(`Old password: ${error}`);
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
            dispatch({ type: "ADD_EMAIL", payload: newEmail });
            setIsVisible(false);
          })
          .catch((error) => alert(`change E-mail: ${error}`));
      })
      .catch((error) => {
        console.log(`password change: ${error}`);
      });
  };

  const authorizeUser = async (currentPass) => {
    await reAuthenticated(currentPass)
      .then(() => setIsAuthorized(true))
      .catch((error) => console.log(error));
  };
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{"Edit credentials"}</Text>
            {!isAuthorized && (
              <>
                <Text style={[styles.modalText, {fontWeight:"400"}]}>
                  {"Enter password to make changes"}
                </Text>
                <InputComponent
                  children={"Current password"}
                  editable={true}
                  onChangeText={(currentPass) =>
                    setCurrentPassword(currentPass)
                  }
                  clearTextOnFocus={true}

                  onEndEditing={() => authorizeUser(currentPassword)}
                  secureTextEntry={true}
                  autoCapitalize="none"
                />
                <ButtonComponent
                  style={[styles.confirmButtons, {marginTop:50, paddingVertical:5, paddingHorizontal:20}]}
                  onTouch={onCancel}
                  children={<Text style={{fontSize:16, fontWeight: "bold" }}>Cancel</Text>}
                />
              </>
            )}

            {isAuthorized && (
              <>
                <InputComponent
                  children={"New password"}
                  editable={true}
                  onChangeText={(newPassword) => setNewPassword(newPassword)}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  onEndEditing={() => setIsChangingPass(true)}
                  isLabel={true}
                  clearTextOnFocus={true}
                  
                />
                <InputComponent
                  children={"Current E-mail"}
                  editable={false}
                  value={currentEmail}
                  onFocus={() => setIsChangingPass(true)}
                  isLabel={true}

                />
                <InputComponent
                  children={"New E-mail"}
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
                      style={styles.confirmButtons}
                      disabled={isPassFieldsEmpty}
                      onTouch={() => handleChangePassword()}
                      children={
                        isPassFieldsEmpty ? (
                          <Text style={styles.buttonInActive}>"-1337-"</Text>
                        ) : (
                          // <Text style={styles.okButtonInActive}>ok</Text>
                          <Text style={styles.buttonActive}>
                            Change password
                          </Text>
                        )
                      }
                    />
                  ) :(null) }
                  {isChangingEmail ? (
                    <ButtonComponent
                      style={styles.confirmButtons}
                      disabled={isEmailFieldsEmpty}
                      onTouch={() => handleChangeEmail()}
                      children={
                        isEmailFieldsEmpty ? (
                          <Text style={styles.buttonInActive}>"-1337-"</Text>
                        ) : (
                          // <Text style={styles.okButtonInActive}>ok</Text>
                          <Text style={styles.buttonActive}>Change Email</Text>
                        )
                      }
                    />
                  ) : (null)}

                  <ButtonComponent
                    style={[
                      styles.confirmButtons,
                      { borderColor: "transparent" },
                    ]}
                    onTouch={() => deleteUserData()}
                    children={
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={26}
                        color="red"
                      />
                    }
                  />
                  <ButtonComponent
                    style={[styles.confirmButtons]}
                    onTouch={onCancel}
                    children={
                      <Text style={{ fontWeight: "bold" }}>Cancel</Text>
                    }
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ModalEditMailPassComponent;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: appColors.bgColor,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontWeight:"bold",
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    alignContent: "space-between",
    // height:45,

    marginTop: 15,
  },
  confirmButtons: {
    // flex: 1,
        backgroundColor: "white",

    marginTop: 20,
    borderColor: appColors.borderColor,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    // height:45
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  buttonInActive: {
    color: "transparent",
    fontWeight: "100",
  },
  buttonActive: { color: appColors.buttonActive, fontWeight: "bold" },
});
