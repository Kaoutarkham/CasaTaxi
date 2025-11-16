import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function BookButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Book a taxi</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "#9a051eff",
    paddingHorizontal: 60, // قيمة صحيحة هنا
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 3,
  },
  text: {
    color: "white",
    fontSize: 25, // قيمة صحيحة
    fontWeight: "bold",
    textAlign: "center",
  },
});
