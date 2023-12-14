// AboutScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios  from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useStripe } from '@stripe/stripe-react-native';

const AboutScreen = ({ courseData }) => {
  if (!courseData) {
    return;
  }
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isPayment,setIsPayment] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
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

  const enrollNow = async () => {
    console.log(courseData.price)
      try {
        const res = await axios.post(
          'http://54.164.6.175:3000/api/payment/',
          {
            amount: courseData.price*100,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
            }
          }
        )
        const initResponse = await initPaymentSheet({
          merchantDisplayName: 'ThanhHung',
          paymentIntentClientSecret: res.data.paymentIntent,
        });
        if (initResponse.error) {
          console.log(initResponse.error);
          alert('Something went wrong');
          return;
        }
        const paymentResponse = await presentPaymentSheet();
        if (paymentResponse.error) {
          alert(
            `Error code: ${paymentResponse.error.code}`,
            paymentResponse.error.message
          );
          return;
        }
        setIsPayment(true)
      } catch (error) {
        console.log(error)
      }
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

      {isPayment == false ? <Button title="Enroll now" onPress={enrollNow} /> : <Button title="Learn" onPress={enrollNow} />}
    </View>
  );
};

export default AboutScreen;
