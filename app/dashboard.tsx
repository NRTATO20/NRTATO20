import React, { useState, useEffect } from "react";
import {
  Image,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
  View,
  Platform,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  addPerson,
  updatePerson,
  deletePerson,
  initializeDB,
  Person,
} from "@/database";

// Define a type for the route parameters
type DashboardRouteParams = {
  totalpeople: string;
  province: string;
  district: string;
  LLG: string;
  ward: string;
  censusunit: string;
  censustype: string;
  censusunittype: string;
  workloadno: string;
  locality: string;
  section: number;
  lot: number;
  structureno: number;
  PDno: number;
  householdno: number;
};

const Dashboard = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const params = route.params as DashboardRouteParams || {};

  const {
    totalpeople = '0',
    province = '',
    district = '',
    LLG = '',
    ward = '',
    censusunit = '',
    censusunittype = '',
    workloadno = '',
    locality = '',
    section = 0,
    lot = 0,
    structureno = 0,
    PDno = 0,
    householdno = 0,
  } = params;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [maritalstatus, setMaritalStatus] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null);

  // New state to hold family members
  const [familyMembers, setFamilyMembers] = useState<any[]>([]); // Initialize an empty array for family members

  // New state variables for citizenship status
  const [isCitizen, setIsCitizen] = useState("PNG Citizen");
  const [country, setCountry] = useState("");

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const handleCancel = () => {
    (navigation as any).navigate("index");
  };

  const handlePrev = () => {
    (navigation as any).navigate("indicativeinfo3");
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setRelationship("");
    setPhone("");
    setEmail("");
    setGender("Select Gender");
    setMaritalStatus("Select Marital Status");
    setDate(new Date());
    setIsCitizen("PNG Citizen");
    setCountry("");
    setEditingPersonId(null);
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !relationship || !phone || !email || gender === "Select Gender") {
      Alert.alert("Error", "Please fill in all fields correctly.");
      return;
    }

    try {
      const totalPeopleNumber = parseInt(totalpeople, 10);

      if (isNaN(totalPeopleNumber)) {
        Alert.alert("Error", "Total people must be a valid number.");
        return;
      }

      if (editingPersonId) {
        await updatePerson(
          editingPersonId,
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
          structureno,
          PDno,
          householdno,
          totalPeopleNumber,
          firstName,
          lastName,
          relationship,
          phone,
          email,
          date.toISOString(),
          gender,
          maritalstatus,
          isCitizen,
          country
        );
        console.log("Person updated successfully");
      } else {
        const id = await addPerson(
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
          structureno,
          PDno,
          householdno,
          totalPeopleNumber,
          firstName,
          lastName,
          relationship,
          phone,
          email,
          date.toISOString(),
          gender,
          maritalstatus,
          isCitizen,
          country
        );
        console.log("Person created successfully with ID:", id);

        // Add the new family member to the list
        setFamilyMembers(prev => [
          ...prev,
          { firstName, lastName, relationship, phone, email, gender, date: date.toDateString(), maritalstatus }
        ]);
      }
      resetForm();
    } catch (error) {
      console.error("Error submitting person:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require('@/assets/images/gov.png')}
          style={styles.govlogo}
        />
        <Image
          source={require('@/assets/images/nso.png')}
          style={styles.nso}
        />
        <Text style={styles.header}>Person Details</Text>
        <Text style={styles.normal}>Fill in the Details:</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Surname"
            value={lastName}
            onChangeText={setLastName}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Relationship"
            value={relationship}
            onChangeText={setRelationship}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#888"
          />
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label={"Select Gender"} value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
          <View>
            <Button
              title="Select Date of Birth"
              onPress={() => setShowDatePicker(true)}
            />
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
            <Text style={styles.dateText}>
              Date of Birth: {date.toDateString()}
            </Text>
          </View>
          <Picker
            selectedValue={maritalstatus}
            onValueChange={(itemValue) => setMaritalStatus(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label={"Select Marital Status"} value="" />
            <Picker.Item label="Single" value="single" />
            <Picker.Item label="Married" value="married" />
            <Picker.Item label="Divorced" value="divorced" />
            <Picker.Item label="Not Applicable" value="not applicable" />
          </Picker>
          <Text style={styles.radioLabel}>Are you a PNG Citizen?</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity onPress={() => setIsCitizen("PNG Citizen")}>
              <Text style={isCitizen === "PNG Citizen" ? styles.selectedRadio : styles.radio}>PNG Citizen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsCitizen("Non-Citizen")}>
              <Text style={isCitizen === "Non-Citizen" ? styles.selectedRadio : styles.radio}>Non-Citizen</Text>
            </TouchableOpacity>
          </View>
          {isCitizen === "Non-Citizen" && (
            <TextInput
              style={styles.input}
              placeholder="Country of Origin"
              value={country}
              onChangeText={setCountry}
              placeholderTextColor="#888"
            />
          )}
        </View>

        <View style={styles.container}>
          <View style={styles.tableContainer}>
            <Text style={styles.tableHeader}>Province/District/LLG Information</Text>
            <View style={styles.tableRow}>
              <Text style={styles.tableRowText}>Province: {province}</Text>
              <Text style={styles.tableRowText}>District: {district}</Text>
              <Text style={styles.tableRowText}>LLG: {LLG}</Text>
              <Text style={styles.tableRowText}>Ward: {ward}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableRowText}>Census Unit: {censusunit}</Text>
              <Text style={styles.tableRowText}>Census Type: {censusunittype}</Text>
              <Text style={styles.tableRowText}>Workload No: {workloadno}</Text>
            </View>
          </View>

          <View style={styles.tableContainer}>
            <Text style={styles.tableHeader}>Locality Information</Text>
            <View style={styles.tableRow}>
              <Text style={styles.tableRowText}>Locality: {locality}</Text>
              <Text style={styles.tableRowText}>Section: {section}</Text>
              <Text style={styles.tableRowText}>Lot: {lot}</Text>
              <Text style={styles.tableRowText}>Structure No: {structureno}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableRowText}>PD No: {PDno}</Text>
              <Text style={styles.tableRowText}>Household No: {householdno}</Text>
            </View>
          </View>

          <View style={styles.tableContainer}>
            <Text style={styles.tableHeader}>Family Members</Text>
            <FlatList
              data={familyMembers}
              keyExtractor={(item, index) => index.toString()} // Using index as key for simplicity
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={styles.tableRowText}>{item.firstName} {item.lastName}</Text>
                  <Text style={styles.tableRowText}>{item.relationship}</Text>
                  <Text style={styles.tableRowText}>{item.phone}</Text>
                  <Text style={styles.tableRowText}>{item.email}</Text>
                  <Text style={styles.tableRowText}>{item.gender}</Text>
                  <Text style={styles.tableRowText}>{item.date}</Text>
                  <Text style={styles.tableRowText}>{item.maritalstatus}</Text>
                </View>
              )}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button title={editingPersonId ? "Update Person" : "Add Person"} onPress={handleSubmit} />
          </View>
        </View>

        <TouchableOpacity style={styles.cancelbutton} onPress={handleCancel}>
          <Text style={styles.cancelbuttonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.prevbutton} onPress={handlePrev}>
          <Text style={styles.prevbuttonText}>Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitbutton} onPress={handleSubmit}>
          <Text style={styles.submitbuttonText}>Submit</Text>
        </TouchableOpacity>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 60,
    bottom: -50,
  },
  footer: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    bottom: -50,
  },
  normal: {
    fontSize: 15,
    color: "#333",
    textAlign: "left",
    marginBottom: 30,
    bottom: -20,
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
  picker: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  dateText: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#666",
  },
  personContainer: {
    marginBottom: 20,
  },
  govlogo: {
    height: 120,
    width: 190,
    position: 'absolute',
    top: 20,
    left: -40,
  },
  nso: {
    height: 70,
    width: 70,
    position: 'absolute',
    top: 40,
    left: 280,
  },
  submitbutton: {
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
    left: 217,
    bottom: 50,
  },
  submitbuttonText: {
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
    left: 100,
    bottom: -38,
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
    marginBottom: 10,
    left: -12 // Space below the button
  },
  prevbuttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },

  buttonContainer: { // New buttonContainer style
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  tableContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  tableRowText: {
    flex: 1,
    marginHorizontal: 5,
    color: "#555",
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 2,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
  addperson: {
    backgroundColor: "#fff", // Make the button transparent
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 200, // Adjust width for a longer button
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: "center", // Center the button horizontally
    marginTop: 20, // Space above the button
  },
  addpersonText: {
    color: "black", // Text color
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  radioLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  radio: {
    fontSize: 16,
    color: "#000",
  },
  selectedRadio: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  inputContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Dashboard;
