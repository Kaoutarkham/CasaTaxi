import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { taxis, chauffeurs } from "../data/location";

export default function OngoingRideScreen() {
  const { depart, destination, distance, price, time } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 🚕 صورة الطاكسي */}
      <View style={styles.topTaxiContainer}>
        <Image
          source={require("../assets/images/redtaxi.png")}
          style={styles.taxiImage}
        />
      </View>

      {/* بطاقة المعلومات */}
      <View style={styles.infoCard}>
        <InfoRow label="Departure" value={depart} />
        <InfoRow label="Destination" value={destination} />
        <InfoRow
          label="Distance"
          value={`${parseFloat(distance).toFixed(2)} km`}
        />
        <InfoRow label="Price" value={`${parseFloat(price).toFixed(2)} DH`} />
        <InfoRow label="Estimated Time" value={`${time} min`} />
      </View>

      {/* Available taxis */}
      <Text style={styles.sectionTitle}>Available Taxis</Text>
      <FlatList
        data={taxis}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSub}>Lat: {item.latitude.toFixed(3)}</Text>
            <Text style={styles.cardSub}>Lon: {item.longitude.toFixed(3)}</Text>
          </View>
        )}
      />

      {/* Chauffeurs */}
      <Text style={styles.sectionTitle}>Chauffeurs</Text>
      <FlatList
        data={chauffeurs}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.driverCard}>
            <Image source={{ uri: item.photo }} style={styles.avatar} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSub}>⭐ {item.note}</Text>
          </View>
        )}
      />

      {/* Cancel button */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelText}>Cancel Ride</Text>
      </TouchableOpacity>
    </View>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}:</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  // 🔴 صورة الطاكسي
  topTaxiContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  taxiImage: {
    width: 130,
    height: 130,
    resizeMode: "contain",
  },

  // بطاقة الرحلة
  infoCard: {
    backgroundColor: "#ffe6e6",
    padding: 18,
    borderRadius: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ffb3b3",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  rowValue: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#b00020",
    marginBottom: 10,
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fafafa",
    padding: 10,
    marginRight: 12,
    borderRadius: 14,
    width: 120,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  driverCard: {
    backgroundColor: "#fafafa",
    padding: 10,
    marginRight: 12,
    borderRadius: 14,
    alignItems: "center",
    width: 120,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  cardSub: {
    fontSize: 13,
    color: "#666",
  },

  avatar: {
    width: 65,
    height: 65,
    borderRadius: 33,
    borderWidth: 2.5,
    borderColor: "#b00020",
    marginBottom: 6,
  },

  cancelButton: {
    backgroundColor: "#b00020",
    padding: 14,
    borderRadius: 14,
    marginTop: 20,
  },
  cancelText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
