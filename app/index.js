import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  const taxiPosition = useRef(new Animated.Value(100)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(taxiPosition, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ZipTaxi</Text>

      <Animated.Image
        source={require("../assets/images/redtaxi.png")}
        style={[
          styles.taxiImage,
          { transform: [{ translateY: taxiPosition }] },
        ]}
        resizeMode="contain"
      />

      <Animated.Text style={[styles.subtitle, { opacity: textOpacity }]}>
        Moving Casablanca Forward
      </Animated.Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/HomeScreen")}
      >
        <Text style={styles.buttonText}>Get Moving</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 60,
    fontFamily: "Amiri Bold",
    color: "#9a051eff",
    fontWeight: "800",
    marginBottom: 60,
    textAlign: "center",
  },
  taxiImage: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: "LPoppins-Bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#9a051eff",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});
