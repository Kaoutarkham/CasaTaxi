import { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { router } from "expo-router";
import BookButton from "../components/BookButton";
import ToggleDayNight from "../components/ToggleDayNight";
import UserMarker from "../components/UserMarker";

export default function HomeScreen() {
  const [isNight, setIsNight] = useState(false);

  const places = [
    {
      id: 1,
      name: "Aéroport Mohammed V",
      latitude: 33.3675,
      longitude: -7.58997,
    },
    {
      id: 2,
      name: "Gare Casa-Voyageurs",
      latitude: 33.5731,
      longitude: -7.5898,
    },
    { id: 3, name: "Morocco Mall", latitude: 33.5664, longitude: -7.6883 },
    { id: 4, name: "Twin Center", latitude: 33.5881, longitude: -7.6328 },
    {
      id: 5,
      name: "Marina de Casablanca",
      latitude: 33.6071,
      longitude: -7.6257,
    },
    { id: 6, name: "Mosquée Hassan II", latitude: 33.6084, longitude: -7.6325 },
    { id: 7, name: "Quartier des Habous", latitude: 33.574, longitude: -7.583 },
    { id: 8, name: "Ain Diab", latitude: 33.5883, longitude: -7.692 },
    {
      id: 9,
      name: "Boulevard Zerktouni",
      latitude: 33.5844,
      longitude: -7.619,
    },
    { id: 10, name: "Marché Central", latitude: 33.594, longitude: -7.615 },
  ];

  const userLocation = { latitude: 33.5731, longitude: -7.5898 };

  const [taxiLocations, setTaxiLocations] = useState([
    {
      id: 101,
      latitude: 33.5731,
      longitude: -7.5898,
      directionLat: 0.0003,
      directionLng: 0.0003,
    },
    {
      id: 102,
      latitude: 33.5844,
      longitude: -7.619,
      directionLat: -0.0003,
      directionLng: 0.0002,
    },
    {
      id: 103,
      latitude: 33.5883,
      longitude: -7.692,
      directionLat: 0.0002,
      directionLng: -0.0003,
    },
    {
      id: 104,
      latitude: 33.59,
      longitude: -7.625,
      directionLat: 0.0003,
      directionLng: 0.0001,
    },
    {
      id: 105,
      latitude: 33.577,
      longitude: -7.61,
      directionLat: -0.0002,
      directionLng: 0.0003,
    },
    {
      id: 106,
      latitude: 33.575,
      longitude: -7.62,
      directionLat: 0.0003,
      directionLng: -0.0002,
    },
    {
      id: 107,
      latitude: 33.585,
      longitude: -7.63,
      directionLat: -0.0003,
      directionLng: -0.0002,
    },
    {
      id: 108,
      latitude: 33.587,
      longitude: -7.635,
      directionLat: 0.0002,
      directionLng: 0.0003,
    },
  ]);

  // Animation des taxis
  useEffect(() => {
    const interval = setInterval(() => {
      setTaxiLocations((prev) =>
        prev.map((taxi) => ({
          ...taxi,
          latitude: taxi.latitude + taxi.directionLat,
          longitude: taxi.longitude + taxi.directionLng,
        }))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.5731,
          longitude: -7.5898,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <UserMarker coordinate={userLocation} />

        {/* Taxi markers */}
        {taxiLocations.map((taxi) => (
          <Marker
            key={taxi.id}
            coordinate={{
              latitude: taxi.latitude,
              longitude: taxi.longitude,
            }}
            title="Taxi disponible"
          />
        ))}

        {/* Places markers */}
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            title={place.name}
            pinColor="blue"
          />
        ))}
      </MapView>

      {/* Bouton Historique */}
      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => router.push("/HistoryScreen")}
      >
        <Text style={styles.historyText}>Historique</Text>
      </TouchableOpacity>

      {/* Toggle Jour/Nuit */}
      <View style={styles.toggleContainer}>
        <ToggleDayNight isNight={isNight} setIsNight={setIsNight} />
      </View>

      {/* BookButton */}
      <BookButton onPress={() => router.push("/reservation")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  toggleContainer: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    zIndex: 10,
    right: 16,
  },
  historyButton: {
    position: "absolute",
    bottom: 100, // au-dessus de BookButton
    right: 16,
    backgroundColor: "#b00020",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
    zIndex: 10,
  },
  historyText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
