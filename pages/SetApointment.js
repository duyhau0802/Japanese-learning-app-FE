import React, { useState } from "react";
import { View, Button, Text, StyleSheet, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/core";

const AppointmentScreen = () => {
  const route = useRoute();
  const { teacherID } = route.params;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isStartDateTimePickerVisible, setStartDateTimePickerVisibility] =
    useState(false);
  const [isEndDateTimePickerVisible, setEndDateTimePickerVisibility] =
    useState(false);

  const handleCreateAppointment = async () => {
    if (startDate < endDate) {
      const res = await axios.post(
        "http://54.164.6.175:3000/api/appointment/setAppointment",
        {
          teacher_id: teacherID,
          start_time: startDate,
          end_time: endDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );
    } else {
      Alert.alert("Please try again !");
    }
  };

  const showStartDateTimePicker = () => {
    setStartDateTimePickerVisibility(true);
  };

  const hideStartDateTimePicker = () => {
    setStartDateTimePickerVisibility(false);
  };

  const showEndDateTimePicker = () => {
    setEndDateTimePickerVisibility(true);
  };

  const hideEndDateTimePicker = () => {
    setEndDateTimePickerVisibility(false);
  };

  const handleStartDateTimeConfirm = (date) => {
    setStartDate(date);
    hideStartDateTimePicker();
  };

  const handleEndDateTimeConfirm = (date) => {
    setEndDate(date);
    hideEndDateTimePicker();
    if (startDate > endDate) {
      Alert.alert(
        "Start date is greater than end date ! \n Please choose a different end date"
      );
    }
  };

  const formatDateTime = (dateTime) => {
    return moment(dateTime).format("MMMM D, YYYY h:mm A");
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateButtonContainer}>
        <Button
          title="Select Start Date & Time"
          onPress={showStartDateTimePicker}
        />
        <Text style={styles.dateText}>
          Start Date: {formatDateTime(startDate)}
        </Text>
      </View>

      <DateTimePickerModal
        isVisible={isStartDateTimePickerVisible}
        mode="datetime"
        onConfirm={handleStartDateTimeConfirm}
        isDarkModeEnabled={true}
        onCancel={hideStartDateTimePicker}
      />

      <View style={styles.dateButtonContainer}>
        <Button
          title="Select End Date & Time"
          onPress={showEndDateTimePicker}
        />
        <Text style={styles.dateText}>End Date: {formatDateTime(endDate)}</Text>
      </View>

      <DateTimePickerModal
        isVisible={isEndDateTimePickerVisible}
        mode="datetime"
        onConfirm={handleEndDateTimeConfirm}
        onCancel={hideEndDateTimePicker}
        isDarkModeEnabled={true}
      />

      <View style={styles.createButtonContainer}>
        <TouchableOpacity
          style={styles.createButtonContainer}
          onPress={() => {
            handleCreateAppointment();
          }}
        >
          <Text style={styles.createButtonText}>Create Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dateButtonContainer: {
    backgroundColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  dateText: {
    marginTop: 5,
    fontSize: 16,
    color: "#000",
  },
  createButtonContainer: {
    color: "#000",
    backgroundColor: "lightblue",
    borderRadius: 8,
    padding: 8,
  },
});

export default AppointmentScreen;
