import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Appointment = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAPIAppointment = async () => {
      try {
        const res = await axios.get(
          "http://54.164.6.175:3000/api/appointment/studentAppointment",
          {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
          }
        );
        setAppointments(res.data.result);
        console.log(res.data.result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchAPIAppointment();
  }, []);

  const renderAppointmentCard = ({ item }) => {
    const currentDateTime = moment();
    const startDateTime = moment(item.start_time);
    const endDateTime = moment(item.end_time);

    let status = "";

    if (currentDateTime.isBefore(startDateTime, "second")) {
      status = "Chưa bắt đầu";
    } else if (
      currentDateTime.isBetween(startDateTime, endDateTime, "second")
    ) {
      status = "Đang diễn ra";
    } else if (currentDateTime.isAfter(endDateTime, "second")) {
      status = "Đã quá hạn";
    }
    const statusColors = {
      "Chưa bắt đầu": "green",
      "Đang diễn ra": "blue",
      "Đã quá hạn": "red",
    };
    return (
      <View style={[styles.card, { backgroundColor: item.backgroundColor }]}>
        <Text style={[styles.cardTitle, { color: item.titleColor }]}>
          Teacher name:{" "}
          {item.Teacher.User.first_name + " " + item.Teacher.User.last_name}
        </Text>
        <Text
          style={[
            styles.cardDate,
            styles.highlightedText,
            { color: statusColors[status] },
          ]}
        >
          {status}
        </Text>
        <View style={styles.cardDates}>
          <Text style={styles.cardDate}>
            Start: {startDateTime.format("YYYY-MM-DD HH:mm:ss")}
          </Text>
        </View>
        <View style={styles.cardDates}>
          <Text style={styles.cardDate}>
            End: {endDateTime.format("YYYY-MM-DD HH:mm:ss")}
          </Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate("Call")}
            >
              <Text style={styles.buttonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.buttonText}>Video</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const searchFilter = (item) => {
    const query = searchQuery.toLowerCase();
    return (
      item &&
      (item.Teacher.User.first_name + " " + item.Teacher.User.last_name)
        .toLowerCase()
        .includes(query)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enrolled Course Appointments</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={appointments.filter(searchFilter)}
        renderItem={renderAppointmentCard}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 60,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#A9A9A9",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  card: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#e2caf8",
    color: "#8a2be2",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  cardDates: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  cardDate: {
    color: "#888",
  },
  cardContent: {
    justifyContent: "space-between",
    paddingTop: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  actionButton: {
    marginTop: 15,
    backgroundColor: "#DCDCDC",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: "#00008B",
  },
  highlightedText: {
    fontWeight: "bold",
  },
});

export default Appointment;
