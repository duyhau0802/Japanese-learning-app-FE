import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Teacher = (props) => {
  return (
    <View
      style={styles.container}
      onPress={() => alert("Buy Now button pressed")}
    >
      <Image source={require("./teacher.jpg")} style={styles.teacherImage} />
      <Text style={styles.teacherName}>{props.teacherName} teacher</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  teacherImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  teacherName: {
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 10,
    marginBottom: 0,
  },
});

export default Teacher;
