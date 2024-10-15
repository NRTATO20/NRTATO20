import React, { useState } from "react";
import { View, TextInput, StyleSheet, ScrollView, Text, TouchableOpacity, Alert, Image } from "react-native";
import { useNavigation, useRoute, RouteProp, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from '../components/navigation/types';

// Define the type for the route parameters for IndicativeInfo2
type RouteParams = {
  province: string;
  district: string;
  LLG: string;
  ward: string;
  censusunit: string;
  censusunittype: string;
  workloadno: string;
};

// Component
const IndicativeInfo2: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();

  // Safely destructure parameters from the route with default values
  const {
    province = "",
    district = "",
    LLG = "",
    ward = "",
    censusunit = "",
    censusunittype = "",
    workloadno = ""
  } = route.params ?? {};

  // State management for form inputs
  const [locality, setLocality] = useState("");
  const [section, setSection] = useState<string>(""); // Keeps as string for input
  const [lot, setLot] = useState<string>(""); // Keeps as string for input
  const [structure, setStructure] = useState<string>(""); // Keeps as string for input
  const [PDno, setPDNo] = useState<string>(""); // Keeps as string for input
  const [householdno, setHousehold] = useState<string>(""); // Keeps as string for input

  // Handle form submission
  const handlePersonInfo = async () => {
    if (!locality || !section || !lot || !structure || !PDno || !householdno) {
      Alert.alert("Error", "Please fill in all fields correctly.");
      return;
    }

    (navigation as any).navigate("indicativeinfo3", {
      province,
      district,
      LLG,
      ward,
      censusunit,
      censusunittype,
      workloadno,
      locality,
      section: Number(section), 
      lot: Number(lot),
      structure: Number(structure), 
      PDno: Number(PDno), 
      householdno: Number(householdno), 
    });
  };

  // Check if the form is filled
  const isFormFilled = () => {
    return locality && section && lot && structure && PDno && householdno;
  };

  // Handle cancel action
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

  // Handle previous button action
  const handlePrev = () => {
    navigation.navigate("indicativeinfo", {
      province,
      district,
      LLG,
      ward,
      censusunit,
      censusunittype,
      workloadno,
    });
  };

  return (
    <ScrollView>
      <Image source={require('@/assets/images/gov.png')} style={styles.govlogo} />
      <Image source={require('@/assets/images/nso.png')} style={styles.nso} />
      <View style={styles.container}>
        <Text style={styles.header}>Indicative Information</Text>

        {/* Form Inputs Container */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Locality:</Text>
          <TextInput
            style={styles.input}
            placeholder="Locality"
            value={locality}
            onChangeText={setLocality}
            placeholderTextColor="#888"
          />

          <Text style={styles.label}>Section:</Text>
          <TextInput
            style={styles.input}
            placeholder="Section"
            value={section}
            onChangeText={setSection}
            placeholderTextColor="#888"
            keyboardType="numeric" // Optional: Limit input to numbers
          />

          <Text style={styles.label}>Lot:</Text>
          <TextInput
            style={styles.input}
            placeholder="Lot"
            value={lot}
            onChangeText={setLot}
            placeholderTextColor="#888"
            keyboardType="numeric" // Optional: Limit input to numbers
          />

          <Text style={styles.label}>Structure/Record No.:</Text>
          <TextInput
            style={styles.input}
            placeholder="Structure/Record No."
            value={structure}
            onChangeText={setStructure}
            placeholderTextColor="#888"
            keyboardType="numeric" // Optional: Limit input to numbers
          />

          <Text style={styles.label}>PD No.:</Text>
          <TextInput
            style={styles.input}
            placeholder="PD No."
            value={PDno}
            onChangeText={setPDNo}
            placeholderTextColor="#888"
            keyboardType="numeric" // Optional: Limit input to numbers
          />

          <Text style={styles.label}>Household No.:</Text>
          <TextInput
            style={styles.input}
            placeholder="Household No."
            value={householdno}
            onChangeText={setHousehold}
            placeholderTextColor="#888"
            keyboardType="numeric" // Optional: Limit input to numbers
          />
           {/* Buttons */}
        <TouchableOpacity
          style={styles.button}
          onPress={isFormFilled() ? handlePersonInfo : undefined}
          disabled={!isFormFilled()}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelbutton} onPress={handleCancel}>
          <Text style={styles.cancelbuttonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.prevbutton} onPress={handlePrev}>
          <Text style={styles.prevbuttonText}>Prev</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.footer}>National Population Census</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
  },
  inputContainer: {
      marginBottom: 20,
      backgroundColor: "#fff",
      borderRadius: 12,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  footer: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 80,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#11B5FB",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
    bottom: -50,
    left: 190
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
    left: 85
  },
  cancelbuttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  prevbutton: {
    backgroundColor: "#707070",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
    bottom: 47,
    left: -10
  },
  prevbuttonText: {
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
    right: -120,
    bottom: -20,
  },
});

export default IndicativeInfo2;
