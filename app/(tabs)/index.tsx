import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AuthComponent from "@/components/auth/AuthComponent";

// Authentication Component
const Authentication = () => {
  return (
    <View style={styles.container}>
      <Text>Authention</Text>
      <AuthComponent />
    </View>
  );
};

export default Authentication;

// Styles for the Authentication component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
