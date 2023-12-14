import React, { useState } from "react";
import { View, Button, Text, StyleSheet, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const AppointmentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { teacherID } = route.params;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isStartDateTimePickerVisible, setStartDateTimePickerVisibility] =
    useState(false);
  const [isEndDateTimePickerVisible, setEndDateTimePickerVisibility] =
    useState(false);

  const handleCreateAppointment = async () => {
    console.log(startDate, endDate);
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
      Alert.alert("無事に予約を取る !");
      navigation.navigate("Home");
    } else {
      Alert.alert("もう一度試してください !");
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
        <Button title="開始日時の選択" onPress={showStartDateTimePicker} />
        <Text style={styles.dateText}>開始日: {formatDateTime(startDate)}</Text>
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
          title="終了日時を選択してください"
          onPress={showEndDateTimePicker}
        />
        <Text style={styles.dateText}>終了日: {formatDateTime(endDate)}</Text>
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
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            予約の作成
          </Text>
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
    backgroundColor: "#EEF5FF",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    margin: 10,
  },
  dateText: {
    marginTop: 5,
    fontSize: 18,
    color: "#000",
  },
  createButtonContainer: {
    backgroundColor: "#4CB9E7",
    borderRadius: 8,
    padding: 8,
  },
});

export default AppointmentScreen;
