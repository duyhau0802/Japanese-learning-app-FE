// AboutScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStripe } from "@stripe/stripe-react-native";

const AboutScreen = ({ courseData, teacherID }) => {
  if (!courseData) {
    return;
  }
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
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
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      alert("Please login to enroll this course");
      navigation.navigate("Login");
      return;
    }
    console.log(courseData.price);
    try {
      const res = await axios.post(
        "http://54.164.6.175:3000/api/payment/",
        {
          amount: courseData.price * 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );
      const initResponse = await initPaymentSheet({
        merchantDisplayName: "ThanhHung",
        paymentIntentClientSecret: res.data.paymentIntent,
      });
      if (initResponse.error) {
        console.log(initResponse.error);
        alert("Something went wrong");
        return;
      }
      const paymentResponse = await presentPaymentSheet();
      if (paymentResponse.error) {
        // alert(
        //   `Error code: ${paymentResponse.error.code}`,
        //   paymentResponse.error.message
        // );
        return;
      }
      setIsPayment(true);
    } catch (error) {
      console.log(error);
    }
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

      {isPayment == false ? (
        <>
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
        </>
      ) : (
        <TouchableOpacity
          style={styles.SetAppointmentBtn}
          onPress={() =>
            navigation.navigate("SetAppointment", { teacherID: teacherID })
          }
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            予約を追加する
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  SetAppointmentBtn: {
    margin: 10,
    padding: 10,
    backgroundColor: "#0961f5",
    borderRadius: 5,
    alignItems: "center",
    width: 320,
  },
});

export default AboutScreen;
