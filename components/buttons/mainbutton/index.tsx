import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../../utils/theme";

const MainButton = (props: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress();
      }}>
      <View style={{ ...styles.button, ...props.style }}>
        <Text style={{ ...styles.btnText, ...props.style }}>
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 333,
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
    shadowColor: theme.colors.primary,

    elevation: 2,
    paddingVertical: 12,
    paddingHorizontal: 30,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
  },
  btnText: {
    textAlign: "center",
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
  },
});

export default MainButton;
