// AboutScreen.js
import React, { useState } from "react";
import { View, Text, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";

const AboutScreen = ({ courseData }) => {
  if (!courseData) {
    return;
  }
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigation = useNavigation();

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderDescription = () => {
    const maxLength = 150;
    const truncatedDescription =
      courseData.description && courseData.description.substring(0, maxLength);

    return (
      <View>
        <Text style={{ marginTop: 10 }}>
          {showFullDescription ? courseData.description : truncatedDescription}
          {!showFullDescription &&
            courseData.description &&
            courseData.description.length > maxLength && (
              <Text style={{ color: "blue" }} onPress={toggleDescription}>
                Read More
              </Text>
            )}
        </Text>
      </View>
    );
  };

  const enrollNow = () => {
    // Chuyển đến màn hình thanh toán và truyền tham số
    navigation.navigate("Payment", {
      price: courseData.price,
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {courseData.title}
      </Text>

      {renderDescription()}

      <Text style={{ marginTop: 10, fontWeight: "bold" }}>Teacher</Text>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <View style={{ flex: 1 }}>
          <Text>{`Name: ${
            courseData.Teacher && courseData.Teacher.User.nick_name
          }`}</Text>
          <Text>{`Japanese Level: ${
            courseData.Teacher && courseData.Teacher.jp_level
          }`}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>{`Experience: ${
            courseData.Teacher && courseData.Teacher.experience
          }`}</Text>
          <Text>{`Date of Birth: ${
            courseData.Teacher && courseData.Teacher.User.dob
          }`}</Text>
        </View>
      </View>

      <Text style={{ marginTop: 10 }}>{`Price: $${courseData.price}`}</Text>

      <Button title="Enroll now" onPress={enrollNow} />
    </View>
  );
};

export default AboutScreen;
