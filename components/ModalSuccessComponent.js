import React from "react";
import { Dimensions } from "react-native";
import { StyleSheet, Text, View, Modal } from "react-native";
import appColors from "../assets/appColor";
import { TouchableHighlight } from "react-native-gesture-handler";
import ButtonComponent from "./ButtonComponent";


const ModalSuccessComponent = ({ visible, onTouch, buttonText, iconType, textFat, textSmall,  },props) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={visible} hasBackdrop={true}
        backdropOpacity={10} >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.iconView} {...props}>{iconType}</View>
            <Text style={styles.signinRegisterButtonText}>{textFat}</Text>
            <Text style={styles.textSmall}>{textSmall}</Text>
            <ButtonComponent buttonStyle={styles.loginButton} onTouch={onTouch} >
              <Text style={styles.buttonText}>
                {buttonText}
              </Text>
            </ButtonComponent>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalSuccessComponent;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 50,

  },
  modalView: {
    margin: 0,
    height: 150,
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
    marginTop: 20,
    backgroundColor: appColors.successColor,
    borderWidth: 1,
    borderColor: appColors.successColor,
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
    alignContent: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    left: 110,
    bottom: 95,
    width: '100%',
    height: '100%',

  },
  signinRegisterButtonText: {
    color: appColors.textColor,
    fontWeight: "600",
    fontSize: 20,
    marginTop: -5,
  },
  textSmall: {
    color: appColors.textColor,
    fontWeight: "400",
    fontSize: 16,
    marginTop: 10
  },
  buttonText: {
    color: appColors.bgColor,
    fontWeight: "bold",
    fontSize: 18
  }
});
