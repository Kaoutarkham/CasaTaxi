import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {DriverInfo }  from "../data/location";


export default function CourseScreen({ route }) {
  // Data jaya men ReservationScreen
  const { depart, destination, distance, price, time } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Ride Details</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Departure:</Text>
        <Text style={styles.value}>{depart}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Destination:</Text>
        <Text style={styles.value}>{destination}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Distance:</Text>
        <Text style={styles.value}>{distance.toFixed(2)} km</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Estimated Price:</Text>
        <Text style={styles.value}>{price.toFixed(2)} DH</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Estimated Time:</Text>
        <Text style={styles.value}>{time} min</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  infoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: { fontSize: 18, fontWeight: "600" },
  value: { fontSize: 18 },
});

