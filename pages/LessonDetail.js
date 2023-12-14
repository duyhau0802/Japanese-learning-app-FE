// LessonDetail.js
import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const LessonDetail = () => {
  const route = useRoute();
  const { title } = route.params;
  const { description } = route.params;
  const lessonDetail = {
    title: title,
    description: description,
    vocabularyList: [
      { id: "1", term: "こんにちは", definition: "Xin chào" },
      { id: "2", term: "ありがとう", definition: "Cảm ơn" },
      { id: "3", term: "さようなら", definition: "Tạm biệt" },
      { id: "4", term: "おはようございます", definition: "Chào buổi sáng" },
      { id: "5", term: "おやすみなさい", definition: "Chúc ngủ ngon" },
    ],
  };

  const renderVocabularyItem = ({ item }) => (
    <View style={styles.vocabularyItem}>
      <Text style={styles.term}>{item.term}</Text>
      <Text style={styles.definition}>{item.definition}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lessonDetail.title}</Text>
      <Text style={styles.description}>{lessonDetail.description}</Text>
      <FlatList
        data={lessonDetail.vocabularyList}
        keyExtractor={(item) => item.id}
        renderItem={renderVocabularyItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
  vocabularyItem: {
    marginBottom: 16,
  },
  term: {
    fontSize: 18,
    fontWeight: "bold",
  },
  definition: {
    fontSize: 16,
    color: "#555",
  },
});

export default LessonDetail;
