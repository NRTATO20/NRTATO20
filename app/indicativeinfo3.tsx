import React, { useState } from "react";
import { View, TextInput, StyleSheet, ScrollView, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from '@/components/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Define the type for route parameters
type IndicativeInfo3RouteProp = RouteProp<RootStackParamList, 'indicativeinfo3'>;

const IndicativeInfo3 = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'indicativeinfo3'>>();
  const route = useRoute<IndicativeInfo3RouteProp>();

  // Destructure parameters from the route
  const {
    province = "",
    district = "",
    LLG = "",
    ward = "",
    censusunit = "",
    censusunittype = "",
    workloadno = "",
    locality = "",
    section = 0,
    lot = 0,
    structure = 0,
    PDno = 0,
    householdno = 0,
  } = route.params || {};

  // Add `isCitizen` and `country` to state
  const [totalpeople, setTotalPeople] = useState("");
  const [isCitizen, setIsCitizen] = useState<string>("Yes");  // Default value or initialize as needed
  const [country, setCountry] = useState<string>("Papua New Guinea"); // Default or empty value

  const handlePersonInfo = async () => {
    if (!totalpeople) {
      Alert.alert("Error", "Please fill in all fields correctly.");
      return;
    }

    // Pass parameters correctly
    navigation.navigate("dashboard", {
      province,
      district,
      LLG,
      ward,
      censusunit,
      censusunittype,
      workloadno,
      locality,
      section,
      lot,
      structure,
      PDno,
      householdno,
      totalpeople,
      isCitizen,  // Ensure these are passed
      country     // Ensure these are passed
    });
  };

  const isFormFilled = () => {
    return totalpeople.length > 0;
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancel Form",
      "Are you sure you want to cancel the form?",
      [
        {
          text: "No",
          onPress: () => console.log("Form cancellation canceled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => navigation.navigate("index"),
        },
      ],
      { cancelable: true }
    );
  };

  const handlePrev = () => {
    navigation.navigate("indicativeinfo2", {
      province,
      district,
      LLG,
      ward,
      censusunit,
      censusunittype,
      workloadno,
      locality,
      section,
      lot,
      structure,
      PDno,
      householdno
    });
  };
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image
        source={require('@/assets/images/gov.png')}
        style={styles.govlogo}
      />
      <Image
        source={require('@/assets/images/nso.png')}
        style={styles.nso}
      />
      <Text style={styles.header}>Indicative Information</Text>
      <View style={styles.container}>
        <Text style={styles.headerText}>
          How many people slept in your household on the night of Sunday, 16th June 2024?
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Amount of People"
          value={totalpeople}
          onChangeText={setTotalPeople}
          placeholderTextColor="#888"
          keyboardType="numeric"
        />

        {/* Conditionally render the "Next" button if form is filled */}
        {isFormFilled() && (
          <TouchableOpacity style={styles.button} onPress={handlePersonInfo}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.cancelbutton} onPress={handleCancel}>
          <Text style={styles.cancelbuttonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.prevbutton} onPress={handlePrev}>
          <Text style={styles.prevbuttonText}>Prev</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>National Population Census</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,  // Allows ScrollView to expand as needed
    backgroundColor: "#f2f2f2",
    paddingVertical: 20, // Add vertical padding
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3, // Add elevation for shadow effect
    marginHorizontal: 20, // Margin for spacing
    marginBottom: 20, // Space from the footer
  },
  headerText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20, // Space between text and input
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 0,
  },
  footer: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 20, // Space between text and buttons
  },
  button: {
    backgroundColor: "#11B5FB",  // Light blue background
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    marginBottom: 10, // Space below the button
    bottom: -99,
    left: 195
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  cancelbutton: {
    backgroundColor: "#475156",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    marginBottom: 10,
    bottom: -48,
    left: 86 // Space below the button
  },
  cancelbuttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  govlogo: {
    height: 190,
    width: 190,
    position: 'absolute',
    top: -35,
    right: 210,
    zIndex: 1,
  },
  nso: {
    height: 80,
    width: 80,
    marginBottom: 20,
    alignSelf: 'center',
    left: 100
  },
  prevbutton: {
    backgroundColor: "#707070",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    marginBottom: 10,
    left: -12 // Space below the button
  },
  prevbuttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default IndicativeInfo3;
