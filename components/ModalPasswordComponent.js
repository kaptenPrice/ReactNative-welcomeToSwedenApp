import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { StyleSheet, Text, View, Modal } from "react-native";
import appColors from "../assets/appColor";
import { MaterialIcons } from "@expo/vector-icons/";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import * as db from "../firestore/FirebaseUtils";
import firebase from "firebase/app";

const ModalPasswordComponent = ({ onCancel,  }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [isVisible, setIsVisible]=useState(true)

  useEffect(() => {
    // setTimeout(()=>{setIsVisible(false)},60000)
    currentPassword.length < 6 ? setIsEmpty(true) : setIsEmpty(false);
    newPassword.length < 6 ? setIsEmpty(true) : setIsEmpty(false);
  }, [currentPassword, newPassword]);

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
          })
          .catch((error) => alert(`change password: ${error}`));
      })
      .catch((error) => {
        console.log(`Old password: ${error}`);
      });
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{"Change password"}</Text>
            <InputComponent
              children={"Old password"}
              editable={true}
              onChangeText={(currentPass) => setCurrentPassword(currentPass)}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            <InputComponent
              children={"New password"}
              editable={true}
              onChangeText={(newPassword) => setNewPassword(newPassword)}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            <View style={styles.buttonContainer}>
              <ButtonComponent
                style={styles.confirmButtons}
                disabled={isEmpty}
                onTouch={() => handleChangePassword()}
                children={
                  isEmpty ? (
                    <Text style={styles.okButtonInActive}>ok</Text>
                  ) : (
                    <Text style={styles.okButtonActive}>OK</Text>
                  )
                }
              />
              <ButtonComponent
                style={styles.confirmButtons}
                onTouch={onCancel}
                children={<Text style={{ fontWeight: "bold" }}>Cancel</Text>}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ModalPasswordComponent;
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
    // zIndex: 100000,
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
    marginTop: 15,
    borderColor: appColors.borderColor,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    // height:45
  },
  okButtonInActive: {
    color: appColors.iconInActive,
    fontWeight: "bold",
  },
  okButtonActive: { color: "red", fontWeight: "bold" },
});
