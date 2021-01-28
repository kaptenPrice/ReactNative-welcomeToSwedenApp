import React from "react";
import { Dimensions } from "react-native";
import { StyleSheet, Text, View, Modal } from "react-native";
import appColors from "../assets/appColor";
import { MaterialIcons } from "@expo/vector-icons/";
import { TouchableHighlight } from "react-native-gesture-handler";
import ButtonComponent from "./ButtonComponent";

const ModalConfirmDeleteAccount = ({ value, setValue, onTouch }) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={value}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.signinRegisterButtonText}>Are you sure? </Text>
            <ButtonComponent buttonStyle={styles.loginButton} onTouch={onTouch}>
              <Text style={styles.signinRegisterButtonText}>
                Delete account
              </Text>
            </ButtonComponent>
            <ButtonComponent
              buttonStyle={styles.loginButton}
              onTouch={setValue}
            >
              <Text style={styles.signinRegisterButtonText}>Cancel</Text>
            </ButtonComponent>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalConfirmDeleteAccount;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 22,
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

  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 40,
    borderRadius: 15,
    marginTop: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: appColors.borderColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  signinRegisterButtonText: {
    color: appColors.textColor,
    fontWeight: "600",
    fontSize: 18,
  },
});
