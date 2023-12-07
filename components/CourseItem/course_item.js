// CourseItem.js
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const CourseItemContainer = styled.View`
  flex: 1;
  margin: 10px;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const Description = styled.Text`
  font-size: 14px;
`;

const Price = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const CourseItem = ({ course, onViewDetails }) => {
  return (
    <TouchableOpacity onPress={() => onViewDetails(course)}>
      <CourseItemContainer>
        <Title>{course.title}</Title>
        <Price>{course.price}</Price>
      </CourseItemContainer>
    </TouchableOpacity>
  );
};

export default CourseItem;
