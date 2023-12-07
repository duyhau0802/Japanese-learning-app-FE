import { useNavigation, useRoute } from "@react-navigation/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const CoursesList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { teacherID } = route.params;

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [courseList, setCourseList] = useState([]);

  const handleCourseDetail = (course) => {
    navigation.navigate("CourseDetail", { courseID: course.id });
  };

  useEffect(() => {
    const fetchAPICourseList = async () => {
      const response = await axios.get(
        `http://localhost:4000/api/teacher/${teacherID}`
      );

      setCourseList(response.data.courseList);
    };
    fetchAPICourseList();
  }, []);

  const renderCourse = ({ item }) => (
    <TouchableOpacity
      style={styles.courseItem}
      onPress={() => handleCourseDetail(item)}
    >
      <Image source={require("./OIP.jpg")} style={styles.courseImage} />
      <Text>{item && item.title}</Text>
      <Text style={styles.coursePrice}>{item && item.price}</Text>
    </TouchableOpacity>
  );

  const windowWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <FlatList
          data={
            showAllCourses && courseList.length > 0
              ? courseList
              : courseList.slice(0, 3)
          }
          renderItem={renderCourse}
          keyExtractor={(item) => item.id}
          horizontal
          style={{ maxWidth: windowWidth - 25 }} // Set maxWidth to the device's width
        />
      </ScrollView>

      {showAllCourses ? (
        <TouchableOpacity
          style={styles.showButton}
          onPress={() => setShowAllCourses(false)}
        >
          <Text>Show Less Courses</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.showButton}
          onPress={() => setShowAllCourses(true)}
        >
          <Text>Show More Courses</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // maxWidth:'',
    marginTop: 20,
  },
  courseImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginBottom: 5,
  },
  coursePrice: {
    color: "green",
    fontWeight: "bold",
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
    left: 10,
    width: 300,
    backgroundColor: "lightblue",
    borderRadius: 5,
    alignItems: "center",
  },
});

export default CoursesList;
