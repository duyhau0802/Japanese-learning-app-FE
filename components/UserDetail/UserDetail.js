// UserProfileDetail.js
import React from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { axios } from "axios";

const UserDetail = ({ user }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            user.avatar && user.avatar.trim() !== ""
              ? user.avatar
              : "https://i.pinimg.com/564x/e6/4b/ec/e64beca1b9921925b59671bbf74b9837.jpg",
        }}
        style={styles.avatar}
      />
      <TextInput
        style={styles.name}
        value={`${user.first_name} ${user.last_name}`}
      />
      <TextInput style={styles.email} value={user.mail} />
      <TextInput
        style={styles.role}
        value={user.role === "student" ? "学生" : "教師"}
      />
      <TouchableOpacity
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: "#0961f5",
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          アップデート
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const handleUpdate = (user) => {
  // Handle update logic here
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  email: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    width: 300,
  },
  role: {
    fontSize: 18,
    textAlign: "center",
    color: "green",
  },
});

export default UserDetail;
