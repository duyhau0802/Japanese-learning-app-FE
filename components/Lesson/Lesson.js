// AboutScreen.js
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";

const LessonScreen = ({ lessonList }) => {
  const navigation = useNavigation();

  const handleCardPress = (lesson) => {
    // Alert.alert("レッスン", lesson.description)
    navigation.navigate("LessonDetail", {title: lesson.title, description: lesson.description});
  };

  const renderLesson = () => {
    return lessonList.map((lesson) => {
      return (
        <TouchableOpacity
          key={lesson.id}
          style={styles.lessonCard}
          onPress={() => handleCardPress(lesson)}>
          <Text style={styles.cardTitle}>{lesson.title}</Text>
        </TouchableOpacity>
      ); 
    });
  };
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>レッスン</Text>
      {renderLesson()}
    </View>
  );
};

const styles = StyleSheet.create({
  lessonCard: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#e2caf8",
    color: "#8a2be2",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 5,
  },
});

export default LessonScreen;
