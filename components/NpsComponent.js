import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import appColors from "../assets/appColor";

const scale = [...Array(10)].map((e, i) => i + 1);

const NpsComponent = ({ value, setValue }) => {
  return (
    <>
      {!value
        ? scale.map((element) => (
            <TouchableOpacity
              key={element}
              style={styles.listItems}
              // disabled={Boolean(value)}
              onPress={() => {
                setValue(element);
              }}
            >
              <Text style={{ padding: 10, backgroundColor: appColors.bgColor }}>
                {element}
              </Text>
            </TouchableOpacity>
          ))
        : scale.map((element) =>
            element === value ? (
              <TouchableOpacity key={element} style={[styles.listItems]}>
                <Text
                  style={{
                    padding: 10,
                    fontWeight: "bold",
                    color: "#3d3d3d",
                    backgroundColor: appColors.bgColor,
                  }}
                >
                  {element}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setValue(element);
                }}
                key={element}
                style={styles.listItems}
              >
                <Text
                  style={{
                    padding: 10,
                    color: "#b1b1b1",
                    backgroundColor: appColors.bgColor,
                  }}
                >
                  {element}
                </Text>
              </TouchableOpacity>
            )
          )}
    </>
  );
};

export default NpsComponent;

const styles = StyleSheet.create({
  listItems: {
    padding: 0,
    borderColor: appColors.borderColor,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,

    shadowColor: "#474747",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10,
  },
});
