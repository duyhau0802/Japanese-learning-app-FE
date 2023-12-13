import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { TouchableOpacity } from 'react-native';

const AppointmentScreen = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isStartDateTimePickerVisible, setStartDateTimePickerVisibility] = useState(false);
  const [isEndDateTimePickerVisible, setEndDateTimePickerVisibility] = useState(false);

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
  };

  const formatDateTime = (dateTime) => {
    return moment(dateTime).format('MMMM D, YYYY h:mm A');
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateButtonContainer}>
        <Button title="Select Start Date & Time" onPress={showStartDateTimePicker} />
        <Text style={styles.dateText}>Start Date: {formatDateTime(startDate)}</Text>
      </View>

      <View style={styles.dateButtonContainer}>
        <Button title="Select End Date & Time" onPress={showEndDateTimePicker} />
        <Text style={styles.dateText}>End Date: {formatDateTime(endDate)}</Text>
      </View>

      <DateTimePickerModal
        isVisible={isStartDateTimePickerVisible}
        mode="datetime"
        onConfirm={handleStartDateTimeConfirm}
        onCancel={hideStartDateTimePicker}
      />

      <DateTimePickerModal
        isVisible={isEndDateTimePickerVisible}
        mode="datetime"
        onConfirm={handleEndDateTimeConfirm}
        onCancel={hideEndDateTimePicker}
      />

      <View style={styles.createButtonContainer}>

        <TouchableOpacity
          style={styles.createButtonContainer}
          onPress={() => {
            console.log('Start Date:', startDate);
            console.log('End Date:', endDate);
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateButtonContainer: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  dateText: {
    marginTop: 5,
    fontSize: 16,
    color: '#000',
  },
  createButtonContainer: {
    color: '#000',
    backgroundColor: 'lightblue',
    borderRadius: 8,
    padding: 8,
  },
});

export default AppointmentScreen;
