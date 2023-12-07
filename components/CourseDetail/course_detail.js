// CourseDetail.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  View: {
    display: "flex",
    margin: "10px",
    color: "white",
  },
  Text: {
    color: "white",
  },
});

const CourseDetail = ({ course, onBackPress }) => {
  return (
    <View>
      <Text>{course.title}</Text>
      <Text>{course.description}</Text>
      <Text>{course.price}</Text>
      <Button title="Back" onPress={onBackPress} style={{}} />
    </View>
  );
};

export default CourseDetail;
