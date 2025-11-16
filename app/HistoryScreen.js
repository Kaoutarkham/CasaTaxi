import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

// Exemple de données initiales
const initialHistory = [
  {
    id: "1",
    date: "2025-11-15",
    time: "14:30",
    from: "Maarif",
    to: "Ain Diab",
    price: 50,
    duration: "20 min",
    tariff: "Jour",
  },
  {
    id: "2",
    date: "2025-11-14",
    time: "20:15",
    from: "Gauthier",
    to: "Anfa",
    price: 70,
    duration: "25 min",
    tariff: "Nuit",
  },
  {
    id: "3",
    date: "2025-11-13",
    time: "09:50",
    from: "Casa-Port",
    to: "Sidi Moumen",
    price: 40,
    duration: "15 min",
    tariff: "Jour",
  },
];

export default function HistoryScreen() {
  const [history, setHistory] = useState(initialHistory);

  const deleteItem = (id) => {
    Alert.alert(
      "Supprimer la course",
      "Êtes-vous sûr de vouloir supprimer cette course ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => setHistory(history.filter((item) => item.id !== id)),
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.rideCard}>
      <Text style={styles.date}>
        {item.date} - {item.time}
      </Text>
      <Text style={styles.route}>
        {item.from} → {item.to}
      </Text>
      <Text style={styles.details}>
        Prix: {item.price} DH | Durée: {item.duration} | Tarif: {item.tariff}
      </Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteItem(item.id)}
      >
        <Text style={styles.deleteText}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );

  const totalSpent = history.reduce((sum, item) => sum + item.price, 0);
  const totalRides = history.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique des courses</Text>

      {history.length === 0 ? (
        <Text style={styles.emptyText}>Aucune course passée</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <View style={styles.stats}>
        <Text style={styles.statsText}>Total dépensé: {totalSpent} DH</Text>
        <Text style={styles.statsText}>Nombre de courses: {totalRides}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#9a051eff",
  },
  rideCard: {
    backgroundColor: "#ffe6e6",
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ffb3b3",
  },
  date: { fontWeight: "700", fontSize: 16, color: "#222" },
  route: { fontSize: 16, marginTop: 4, color: "#333" },
  details: { fontSize: 14, marginTop: 2, color: "#555" },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 14,
    marginTop: 10,
  },
  deleteText: { color: "#fff", fontWeight: "bold" },
  stats: { padding: 15, borderTopWidth: 1, borderColor: "#ddd", marginTop: 10 },
  statsText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4,
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 50,
  },
});
