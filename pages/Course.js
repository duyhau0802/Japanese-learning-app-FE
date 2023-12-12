import { Text, View, StyleSheet, TextInput } from "react-native";

import CourseView from "../components/courseView/courseView";
import Cartegory from "../components/Category/Category";
import Teacher from "../components/Teacher/Teacher";

const Course = () => {
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Text style={styles.header1}>Search</Text>
        <View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a course"
            onChangeText={(text) => setSearchText(text)}
          ></TextInput>
        </View>
      </View>

      {/* Rest of your components */}
      <View style={styles.block}>
        <Text style={styles.header1}>Cartegory</Text>
        <View style={styles.row}>
          <Cartegory categoryTitle="N4"></Cartegory>
          <Cartegory categoryTitle="N4"></Cartegory>
          <Cartegory categoryTitle="N4"></Cartegory>
        </View>
      </View>

      <View style={styles.block}>
        <Text style={styles.header1}>Course</Text>
        <View style={styles.row}>
          <CourseView courseTitle="English" coursePrice="60"></CourseView>
          <CourseView courseTitle="English" coursePrice="60"></CourseView>
          <CourseView courseTitle="English" coursePrice="60"></CourseView>
        </View>
      </View>

      <View style={styles.block}>
        <Text style={styles.header1}>Teachers</Text>
        <View style={styles.row}>
          <Teacher teacherName="A" coursePrice="60"></Teacher>
          <Teacher teacherName="B" coursePrice="60"></Teacher>
          <Teacher teacherName="C" coursePrice="60"></Teacher>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 0,
  },
  searchInput: {
    marginHorizontal: 5,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#faebd7",
    marginBottom: 16,
    padding: 8,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  header1: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
});

export default Course;
