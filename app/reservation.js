import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import CustomPicker from "../components/CustomPicker";
import { places } from "../data/location";

const tarifJour = { priseEnCharge: 7.5, km: 1.5 };
const tarifNuit = { priseEnCharge: 7.5, km: 2.0 };

function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function ReservationScreen() {
  const [depart, setDepart] = useState("Mosquée Hassan II");
  const [destination, setDestination] = useState("Mosquée Hassan II");
  const [isNight, setIsNight] = useState(false);

  const router = useRouter();

  const departCoord = places.find((p) => p.title === depart);
  const destCoord = places.find((p) => p.title === destination);

  const distance =
    departCoord && destCoord
      ? getDistanceKm(
          departCoord.latitude,
          departCoord.longitude,
          destCoord.latitude,
          destCoord.longitude
        )
      : 0;

  const tarif = isNight ? tarifNuit : tarifJour;
  const price = tarif.priseEnCharge + distance * tarif.km;
  const time = Math.round(distance * 3);

  const handleConfirm = () => {
    if (!depart || !destination) {
      Alert.alert("Error", "Please select departure and destination!");
      return;
    }

    router.push(
      `/OngoingRideScreen?depart=${encodeURIComponent(
        depart
      )}&destination=${encodeURIComponent(
        destination
      )}&distance=${distance}&price=${price}&time=${time}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Departure:</Text>
      <CustomPicker
        selectedValue={depart}
        onValueChange={setDepart}
        items={places}
      />

      <Text style={styles.label}>Destination:</Text>
      <CustomPicker
        selectedValue={destination}
        onValueChange={setDestination}
        items={places}
      />

      <View style={styles.info}>
        <Text>Distance: {distance.toFixed(2)} km</Text>
        <Text>
          Estimated Price: {price.toFixed(2)} DH ({isNight ? "Night" : "Day"})
        </Text>
        <Text>Estimated Time: {time} min</Text>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Text style={{ fontSize: 16, marginRight: 10 }}>
            {isNight ? "Night 🌙" : "Day ☀️"}
          </Text>
          <Switch
            value={isNight}
            onValueChange={setIsNight}
            trackColor={{ false: "#ccc", true: "#555" }}
            thumbColor={isNight ? "#222" : "#fff"}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 18, marginTop: 20 },
  info: { marginTop: 30 },
  confirmButton: {
    backgroundColor: "#981509ff",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  confirmText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
