import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import axios from "axios";
import GetToken from "../GetToken/GetToken";
import { useRoute } from "@react-navigation/core";

const SetAppointmentScreen = () => {
  const route = useRoute();
  const [selectedDate, setSelectedDate] = useState(null);
  const { teacherID } = route.params;

  const handleBookAppointment = async () => {
    const response = await axios.post(
      "http://localhost:4000/api/appointment/setAppointment",
      {
        teacher_id: teacherID,
        start_time: new Date(),
        end_time: selectedDate.format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEwNywiaWF0IjoxNzAxOTYwMTI1LCJleHAiOjE3MDE5NjM3MjV9.ZiWQujwcPPMi_j8MGToXKAiM31HU8hFmQZkiljbMVZo`,
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>New Appointment</Text>
      <DateTimePicker
        value={selectedDate ? selectedDate.toDate() : new Date()}
        mode="datetime"
        is24Hour={true}
        display="default"
        onValueChange={(date) => setSelectedDate(dayjs(date))}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleBookAppointment()}
      >
        <Text style={styles.buttonText}>Set Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default SetAppointmentScreen;
