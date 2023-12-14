// AboutScreen.js
import React, { useState } from "react";
import { View, Text, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";

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
        <Text style={{ marginTop: 10, fontSize: 20, color: "gray" }}>
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
      name: courseData.title,
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 35, fontWeight: "bold" }}>
        {courseData.title}
      </Text>

      {renderDescription()}

      <Text style={{ fontSize: 26, marginTop: 10, fontWeight: "bold" }}>
        教師
      </Text>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, margin: 5 }}>{`名前: ${
            courseData.Teacher && courseData.Teacher.User.nick_name
          }`}</Text>
          <Text style={{ fontSize: 16, margin: 5 }}>{`日本語のレベル: ${
            courseData.Teacher && courseData.Teacher.jp_level
          }`}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, margin: 5 }}>{`経験: ${
            courseData.Teacher && courseData.Teacher.experience
          }`}</Text>
          <Text style={{ fontSize: 16, margin: 5 }}>{`誕生日: ${
            courseData.Teacher && courseData.Teacher.User.dob
          }`}</Text>
        </View>
      </View>

      <Text
        style={{
          marginTop: 10,
          marginLeft: "auto",
          fontSize: 25,
          color: "green",
          fontWeight: "bold",
        }}
      >{`価格: $${courseData.price}`}</Text>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#0961f5",
          borderRadius: 5,
          alignItems: "center",
          marginTop: 50,
        }}
        onPress={() => enrollNow()}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          今すぐ登録
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboutScreen;
