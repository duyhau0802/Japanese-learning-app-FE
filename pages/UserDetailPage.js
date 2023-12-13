// App.js
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import UserDetail from "./../components/UserDetail/UserDetail";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const UserDetailPage = () => {
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
  return (
    <SafeAreaView style={styles.container}>
      <UserDetail user={currentUser} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "auto",
    justifyContent: "center",
  },
});

export default UserDetailPage;
