import React, { useState } from "react";
import { View, TextInput, StyleSheet, ScrollView, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const IndicativeInfo = () => {
  const navigation = useNavigation();

  const handleNext = async () => {
    if (
      !province || 
      !district || 
      !LLG || 
      !ward || 
      !censusunit || 
      !censusunittype || 
      !workloadno
    ) {
      Alert.alert("Error", "Please fill in all fields correctly.");
      return;
    }

    (navigation as any).navigate("indicativeinfo2", {
      province,
      district,
      LLG,
      ward,
      censusunit,
      censusunittype,
      workloadno,
    });
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
          onPress: () => (navigation as any).navigate("index"),
        },
      ],
      { cancelable: true }
    );
  };

  const handlePrevious = () => {
    console.log("Previous button pressed");
    (navigation as any).navigate('home'); 
  };

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [LLG, setLLG] = useState("");
  const [ward, setWard] = useState("");
  const [censusunit, setCensusUnit] = useState("");
  const [censusunittype, setCensusUnitType] = useState("");
  const [workloadno, setWorkloadNo] = useState("");

  const isFormFilled = () => {
    return (
      province &&
      district &&
      LLG &&
      ward &&
      censusunit &&
      censusunittype &&
      workloadno
    );
  };

  return (
    <ScrollView>
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
        {/* New container for inputs and buttons */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Province:</Text>
          <TextInput
            style={styles.input}
            placeholder="Province"
            value={province}
            onChangeText={setProvince}
            placeholderTextColor="#888"
          />
          <Text style={styles.label}>District:</Text>
          <TextInput
            style={styles.input}
            placeholder="District"
            value={district}
            onChangeText={setDistrict}
            placeholderTextColor="#888"
          />
          <Text style={styles.label}>LLG:</Text>
          <TextInput
            style={styles.input}
            placeholder="LLG"
            value={LLG}
            onChangeText={setLLG}
            placeholderTextColor="#888"
          />
          <Text style={styles.label}>Ward:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ward"
            value={ward}
            onChangeText={setWard}
            placeholderTextColor="#888"
          />
          <Text style={styles.label}>Census Unit:</Text>
          <TextInput
            style={styles.input}
            placeholder="Census Unit"
            value={censusunit}
            onChangeText={setCensusUnit}
            placeholderTextColor="#888"
          />
          <Text style={styles.label}>Census Unit Type:</Text>
          <TextInput
            style={styles.input}
            placeholder="Census Unit Type"
            value={censusunittype}
            onChangeText={setCensusUnitType}
            placeholderTextColor="#888"
          />
          <Text style={styles.label}>Workload No:</Text>
          <TextInput
            style={styles.input}
            placeholder="Workload No"
            value={workloadno}
            onChangeText={setWorkloadNo}
            placeholderTextColor="#888"
          />

          {/* Button Container */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.prevButton} onPress={handlePrevious}>
              <Text style={styles.buttonText}>Prev</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            {/* Render the "Next" button conditionally */}
            {isFormFilled() && (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNext}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={styles.footer}>
          National Population Census
        </Text>
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
    marginBottom: 0,
  },
  footer: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  prevButton: {
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
    marginTop: 20,
    bottom: 0,
    left: -10
  },
  cancelButton: {
    backgroundColor: "#475156",  
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
    marginTop: 20,
    left: 0
  },
  nextButton: {
    backgroundColor: "#11B5FB",  
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
    marginTop: 20,
    bottom: 0,
    left: 5
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  prevButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default IndicativeInfo;

