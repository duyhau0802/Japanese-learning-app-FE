import { useNavigation, useRoute } from "@react-navigation/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from "react-native";

const CoursesList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { teacherID } = route.params;

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCourseDetail = (course) => {
    navigation.navigate("CourseDetail", { courseID: course.id, teacherID: teacherID });
  };

  useEffect(() => {
    const fetchAPICourseList = async () => {
      const res = await axios.get(
        `http://54.164.6.175:3000/api/teacher/${teacherID}`
      );
      setCourseList(res.data.courseList);
      setIsLoading(false);
    };
    fetchAPICourseList();
  }, []);

  const renderCourse = ({ item }) => (
    <TouchableOpacity
      style={styles.courseItem}
      onPress={() => handleCourseDetail(item)}
    >
      <Image source={require("./OIP.jpg")} style={styles.courseImage} />
      <Text
        style={{
          maxWidth: 100,
          flexWrap: "wrap",
          padding: 5,
        }}
      >
        {item && item.title}
      </Text>

      <Text style={styles.coursePrice}>{item && item.price}</Text>
    </TouchableOpacity>
  );

  const windowWidth = Dimensions.get("window").width;

  return (
    <View>
      {isLoading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop:50 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
        ) : (
      <View style={styles.container}>
        <FlatList
          data={
            showAllCourses && courseList.length > 0
              ? courseList
              : courseList.slice(0, 3)
          }
          renderItem={renderCourse}
          keyExtractor={(item) => String(item.id)}
          horizontal
          style={{ maxWidth: windowWidth - 25 }} // Set maxWidth to the device's width
        />
        {showAllCourses ? (
          <TouchableOpacity
            style={styles.showButton}
            onPress={() => setShowAllCourses(false)}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              コースの表示を減らす
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.showButton}
            onPress={() => setShowAllCourses(true)}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              さらにコースを表示する
            </Text>
          </TouchableOpacity>
        )}
      </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  courseImage: {
    width: 120,
    height: 120,
    resizeMode: "cover",
    marginBottom: 5,
  },
  coursePrice: {
    color: "green",
    fontWeight: "bold",
    padding: 5,
  },
  courseItem: {
    margin: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  showButton: {
    margin: 10,
    padding: 10,
    width: 320,
    backgroundColor: "#4CB9E7",
    borderRadius: 5,
    alignItems: "center",
  },
});

export default CoursesList;
