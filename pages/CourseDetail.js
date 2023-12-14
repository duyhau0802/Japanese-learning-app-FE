// CourseDetail.js
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import LessonScreen from "../components/Lesson/Lesson";
import ReviewScreen from "../components/Review/Review";
import AboutScreen from "../components/About/About";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

const CourseDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { courseID } = route.params;
  const { teacherID } = route.params;
  const [currentTab, setCurrentTab] = useState("about");
  const [courseDetail, setCourseDetail] = useState([]);
  const [lessonList, setLessonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApiCourseDetail = async () => {
      const res = await axios.get(
        `http://54.164.6.175:3000/api/course/${courseID}`
      );
      setCourseDetail(res.data);
      setLessonList(res.data.Lesson);
      setIsLoading(false);
    };
    fetchApiCourseDetail();
  }, []);

  const renderContent = () => {
    switch (currentTab) {
      case "about":
        return <AboutScreen courseData={courseDetail} teacherID={teacherID}/>;
      case "lesson":
        return <LessonScreen lessonList={lessonList}/>;
      case "review":
        return <ReviewScreen />;
      default:
        return null;
    }
  };

  return (
    <View>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
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
                style={{
                  fontWeight: currentTab === "about" ? "bold" : "normal",
                }}
              >
                情報
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentTab("lesson")}>
              <Text
                style={{
                  fontWeight: currentTab === "lesson" ? "bold" : "normal",
                }}
              >
                レッスン
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentTab("review")}>
              <Text
                style={{
                  fontWeight: currentTab === "review" ? "bold" : "normal",
                }}
              >
                レビュー
              </Text>
            </TouchableOpacity>
          </View>
          {renderContent()}
        </ScrollView>
      )}
    </View>
  );
};

export default CourseDetail;
