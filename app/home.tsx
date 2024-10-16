import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Alert,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// HomeScreen Component
export default function HomeScreen() {
  const navigation = useNavigation();

  // Navigation Handlers
  const handleDashboard = () => {
    (navigation as any).navigate("indicativeinfo");
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel", 
        },
        {
          text: "OK",
          onPress: () => (navigation as any).navigate("auth"), 
        },
      ],
      { cancelable: false } 
    );
  };

  const testRoute = () => {
    (navigation as any).navigate("test");
  };

  return (
    <View style={styles.container}>
      {/* Images */}
      <Image
        source={require('@/assets/images/gov.png')}
        style={styles.govlogo}
      />
      <Image
        source={require('@/assets/images/nso.png')}
        style={styles.nso}
      />
      <Image
        source={require('@/assets/images/census-2024.jpg')}
        style={styles.census}
      />

      {/* Text Elements */}
      <Text style={styles.headerText}>Begin Census</Text>
      <Text style={styles.subText}>
        Start collecting the data
      </Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={handleDashboard}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.headerText2}> Be Counted</Text>
      <View style={styles.textcontainer}>
        <Text style={styles.yellowText}>No One </Text>
        <Text style={styles.redText}>Left </Text>
        <Text style={styles.blackText}>Behind</Text>
      </View>

      <Text style={styles.footer}>
        National Population Census
      </Text>
    </View>
  );
}

// Styling for a modern, attractive layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  textcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
    position: 'absolute',
    top: 500,
    left: 85,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
    bottom: -100,
  },
  headerText2: {
    fontSize: 25,
    fontWeight: "bold",
    left: 5,
    bottom: -80,
  },
  subText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    bottom: -100,
  },
  footer: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    bottom: -200,
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    bottom: -80,
  },
  buttonSecondary: {
    backgroundColor: "#7EA9BB",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    bottom: -80,
  },
  govlogo: {
    height: 130,
    width: 250,
    bottom: 500,
    left: -50,
    position: 'absolute',
    marginBottom: 20,
  },
  nso: {
    height: 85,
    width: 85,
    bottom: 520,
    left: 250,
    position: 'absolute',
    marginBottom: 20,
  },
  census: {
    height: 130,
    width: 300,
    bottom: 380,
    left: 30,
    position: 'absolute',
    marginBottom: 20,
  },
  yellowText: {
    color: "yellow",
    fontWeight: "bold",
    fontSize: 24,
  },
  redText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 24,
  },
  blackText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
