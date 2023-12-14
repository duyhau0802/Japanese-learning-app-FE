import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import CourseList from "../components/CourseList/CourseList";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Alert, TouchableOpacity } from "react-native";

const TeacherDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { teacherID } = route.params;
  const [teacherDetail, setTeacherDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchApiTeacher = async () => {
      const res = await axios.get(
        `http://54.164.6.175:3000/api/teacher/${teacherID}`
      );
      setTeacherDetail(res.data.result);
      setIsLoading(false);
    };

    fetchApiTeacher();
  }, []);

  return (
    <ScrollView>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop:50 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
      <View style={styles.container}>
        <View style={styles.row}>
          <Image
            source={
              teacherDetail && teacherDetail.avatar
                ? { uri: teacherDetail.avatar }
                : require("../components/Teacher/teacher.jpg") // Provide a default image
            }
            style={styles.teacherImage}
          />
          <View style={styles.col}>
            <Text style={styles.teacherName}>
              {teacherDetail &&
                teacherDetail.first_name + " " + teacherDetail.last_name}
            </Text>
            <Text style={styles.teacherEmail}>
              {teacherDetail && teacherDetail.mail}
            </Text>
          </View>
          <Text style={styles.phoneSymbol}>✆</Text>
        </View>
        <View style={styles.h2}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>情報</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.h3}>日本のレベル</Text>
            <Text style={styles.h4}>
              {teacherDetail.Teacher && teacherDetail.Teacher.jp_level}
            </Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.h3}>経験</Text>
            <Text style={styles.h4}>
              {teacherDetail.Teacher && teacherDetail.Teacher.experience}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.h3}>誕生日</Text>
            <Text style={styles.h4}>{teacherDetail && teacherDetail.dob}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>説明</Text>
        <View style={styles.row}>
          <Text
            style={{ fontSize: 20, margin: 8, fontWeight: 300, color: "gray" }}
          >
            {teacherDetail.Teacher && teacherDetail.Teacher.detail_infor}
          </Text>
        </View>

        <Text style={{ fontSize: 30, fontWeight: "bold" }}>コース</Text>
        <View style={styles.row}>
          <CourseList />
        </View>

        <TouchableOpacity
          style={styles.SetAppointmentBtn}
          onPress={() =>
            navigation.navigate("SetAppointment", { teacherID: teacherID })
          }
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            予約を追加する
          </Text>
        </TouchableOpacity>
      </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  h2: {
    fontSize: 23,
    marginTop: 15,
  },
  h3: {
    fontSize: 18,
    color: "#0961f5",
    fontWeight: "bold",
  },
  h4: {
    fontSize: 16,
    fontWeight: "400",
    color: "gray",
  },
  teacherImage: {
    width: 70,
    height: 70,
    borderRadius: 50, // To make it a circle
    margin: 10,
    top: 5,
  },
  teacherName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  teacherEmail: {
    fontSize: 15,
  },
  phoneSymbol: {
    fontSize: 70,
    margin: 8,
  },
  messageSymbol: {
    fontSize: 22,
    margin: 10,
  },
  TeacherDetail: {
    fontSize: 14,
    margin: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  col: {
    flex: 1,
    width: 20,
    padding: 10,
    marginBottom: 10,
  },
  SetAppointmentBtn: {
    margin: 10,
    padding: 10,
    backgroundColor: "#0961f5",
    borderRadius: 5,
    alignItems: "center",
    width: 320,
  },
});

export default TeacherDetail;
