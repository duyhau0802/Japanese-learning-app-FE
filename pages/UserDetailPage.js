// App.js
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import UserDetail from "./../components/UserDetail/UserDetail";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const UserDetailPage = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getCurrentUser();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
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
        <UserDetail user={currentUser} />
      )}
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
