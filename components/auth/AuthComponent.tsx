import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; // Ensure this path is correct

// Define the type for navigation prop
type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

const AuthComponent = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mockUser = {
    email: "census@png.com",
    password: "password123",
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    resetForm();
  };

  const handleAuthAction = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (isSignIn) {
      if (email === mockUser.email && password === mockUser.password) {
        Alert.alert("Success", "Logged in successfully!");
        resetForm();
        console.log("Navigating to Home");
        (navigation as any).navigate('home'); // Ensure 'Home' is defined in your navigator
      } else {
        Alert.alert("Error", "Invalid email or password.");
      }
    } else {
      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match.");
      } else {
        Alert.alert("Success", "Account created successfully!");
        toggleForm();
      }
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <View style={styles.container}>
      {/* Horizontal image row */}
      <View style={styles.imageRow}>
        <Image
          source={require('@/assets/images/gov.png')}
          style={styles.govlogo}
        />
        <Image
          source={require('@/assets/images/nso.png')}
          style={styles.nso}
        />
      </View>

      <Text style={styles.headerText}>
        {isSignIn ? "Login" : "Create New Account"}
      </Text>

      {/* Form Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />
      {!isSignIn && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#888"
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleAuthAction}>
        <Text style={styles.buttonText}>
          {isSignIn ? "Login" : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleForm}>
        <Text style={styles.toggleText}>
          {isSignIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Be Counted</Text>
      <Text style={styles.countedText}>
    <Text style={styles.yellowText}>No one </Text>
    <Text style={styles.redText}>left </Text>
    <Text style={styles.blackText}>behind</Text>
  </Text>
      <Text style={styles.footer}>National Population Census</Text>
    </View>
  );
};

// Modern styling for the form
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    width: "100%",
  },
  imageRow: {
    flexDirection: "row", // Align images horizontally
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, // Space between the image row and the login text
  },
  govlogo: {
    width: 200, // Set an appropriate width
    height: 100, // Set an appropriate height
    marginRight: 10, // Space between images
    left: -60
  },
  nso: {
    width: 80, // Set an appropriate width
    height: 80, // Set an appropriate height
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
    textAlign: "center",
  },
  footerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
    textAlign: "center",
    bottom: -20,
  },
  footer: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    bottom: -100,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  button: {
    backgroundColor: "#11B5FB",
    borderRadius: 20,
    paddingVertical: 10, // Reduced padding for a smaller button
    paddingHorizontal: 60, // Reduced horizontal padding
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 20,
    height: 50, // Slightly reduced height
  },
  buttonText: {
    color: "#fff",
    fontSize: 18, // Reduced font size slightly for balance
    fontWeight: "600",
    textAlign: "center",
  },
  toggleText: {
    color: "#2196F3",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
  },
  countedText: {
    fontSize: 30, // Adjust the size if needed
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  yellowText: {
    color: "#FFD700", // Yellow color
  },
  redText: {
    color: "#FF0000", // Red color
  },
  blackText: {
    color: "#000000", // Black color
  },
});

export default AuthComponent;

