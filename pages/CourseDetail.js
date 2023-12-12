import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import CourseDetail from "../components/CourseDetail/course_detail";
import CourseItem from "./../components/CourseItem/course_item";
import axios from "axios";

const CourseDetailPage = () => {
  const courses = [
    {
      id: 1,
      title: "React Native Course",
      description: "Learn React Native development.",
      price: "$99",
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      description: "Master the fundamentals of JavaScript.",
      price: "$49",
    },
    // Add more courses here
  ];
  const [selectedCourse, setSelectedCourse] = useState([]);

  const getCourse = async () => {
    try {
      const res = await axios.get("http://54.164.6.175:3000/api/course/0");
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
  };

  return (
    <View>
      {selectedCourse ? (
        <CourseDetail
          course={selectedCourse}
          onBackPress={() => setSelectedCourse(null)}
        />
      ) : (
        <FlatList
          data={courses}
          renderItem={({ item }) => (
            <CourseItem
              key={item.id}
              course={item}
              onViewDetails={handleViewDetails}
            />
          )}
        />
      )}
    </View>
  );
};

export default CourseDetailPage;
