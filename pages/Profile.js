import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserProfile = () => {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axios.get(
          "http://54.164.6.175:3000/api/user/profile/me",
          {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
          }
        );
        setCurrentUser(res.data.user);
      } catch (error) {
        console.error(error);
      }
    };
    getCurrentUser();
  }, []);
  const handleLogout = () => {
    navigation.navigate("Home");
    AsyncStorage.setItem("token", "");
  };

  const handleViewDetail = (user) => {
    navigation.navigate("UserDetailPage", { user });
  };
  return (
    <View style={{ padding: 20, width: "auto" }}>
      <Image
        source={{
          uri:
            currentUser.avatar && currentUser.avatar.trim() !== ""
              ? currentUser.avatar
              : "https://i.pinimg.com/564x/e6/4b/ec/e64beca1b9921925b59671bbf74b9837.jpg",
        }}
        style={{
          width: 150,
          height: 150,
          borderRadius: 1000,
          marginBottom: 20,
          alignSelf: "center",
        }}
      />

      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        {currentUser.first_name + " " + currentUser.last_name}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Appointment")}
      >
        <Text style={styles.buttonText}>予約</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={() => handleViewDetail(currentUser)}
        >
          プロファイル編集
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
        <Text style={styles.buttonText}>ログアウト</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
};

export default UserProfile;
