// CourseDetail.js
import React, { useEffect, useState } from "react";
import { ScrollView, Image, TouchableOpacity, View, Text } from "react-native";
import LessonScreen from "../components/Lesson/Lesson";
import ReviewScreen from "../components/Review/Review";
import AboutScreen from "../components/About/About";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

const CourseDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { courseID } = route.params;
  const [currentTab, setCurrentTab] = useState("about");
  const [courseDetail, setCourseDetail] = useState([]);

  const courseData = {
    title: "Japanese Language Course",
    rating: 4.5,
    description: "This is a comprehensive Japanese language course.",
    instructor: {
      name: "John Doe",
      avatar:
        "https://i.pinimg.com/564x/95/31/4c/95314cf75cae13c00f709e87f4d973af.jpg",
      japaneseLevel: "N2",
      experience: "5 years",
      dob: "January 1, 1980",
    },
    price: 99.99,
  };

  useEffect(() => {
    const fetchApiCourseDetail = async () => {
      const res = await axios.get(
        `http://54.164.6.175:3000/api/course/${courseID}`
      );
      setCourseDetail(res.data);
      console.log(res.data);
    };
    fetchApiCourseDetail();
  }, []);

  const renderContent = () => {
    switch (currentTab) {
      case "about":
        return <AboutScreen courseData={courseDetail} />;
      case "lesson":
        return <LessonScreen />;
      case "review":
        return <ReviewScreen />;
      default:
        return null;
    }
  };

  return (
    <ScrollView>
      <Image
        source={{
          uri: "https://i.pinimg.com/564x/97/dc/67/97dc671151968f2547321ff39d632f3c.jpg",
        }}
        style={{ width: "100%", height: 200 }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity onPress={() => setCurrentTab("about")}>
          <Text
            style={{ fontWeight: currentTab === "about" ? "bold" : "normal" }}
          >
            About
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentTab("lesson")}>
          <Text
            style={{ fontWeight: currentTab === "lesson" ? "bold" : "normal" }}
          >
            Lesson
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentTab("review")}>
          <Text
            style={{ fontWeight: currentTab === "review" ? "bold" : "normal" }}
          >
            Review
          </Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </ScrollView>
  );
};

export default CourseDetail;
