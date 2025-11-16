import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: "#333",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="HomeScreen" options={{ title: "Home" }} />
      <Stack.Screen name="reservation" options={{ title: "Réservation" }} />
      <Stack.Screen
        name="OngoingRideScreen"
        options={{ title: "Ongoing Ride" }}
      />
      <Stack.Screen name="HistoryScreen" options={{ title: "Historique" }} />
    </Stack>
  );
}
