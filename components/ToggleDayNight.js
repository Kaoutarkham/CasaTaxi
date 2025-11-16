import React from "react";
import { View, Switch, Text, StyleSheet } from "react-native";

export default function ToggleDayNight({ isNight, setIsNight }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{isNight ? "🌙 Nuit" : "☀️ Jour"}</Text>
      <Switch
        value={isNight}
        onValueChange={setIsNight}
        trackColor={{ false: "#ccc", true: "#555" }}
        thumbColor={isNight ? "#222" : "#fff"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 13,
    paddingVertical: 2,
    borderRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  text: {
    marginRight: 10,
    fontWeight: "600",
    fontSize: 17,
    color: "#333",
  },
});
