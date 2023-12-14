// UserProfileDetail.js
import React, { useState } from "react";
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
  const [editedMail, setEditedMail] = useState(user.mail);
  const [editedGender, setEditedGender] = useState(user.gender === '0' ? '男性' : '女性');

  const handleMailChange = (text) => {
    setEditedMail(text);
  };

  const handleGenderChange = (text) => {
    setEditedGender(text);
  }
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
      <TextInput
        style={styles.role}
        value={user.role === "student" ? "学生" : "教師"}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>メール:</Text>
        <TextInput style={styles.input} value={user.mail} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>性別:</Text>
        <TextInput style={styles.input} value={user.gender == "0" ? "男性" : "女性"} />
      </View>
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
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    width: 300,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "bold",
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
  input: {
    fontSize: 16,
    marginBottom: 10,
    width: 300,
    marginLeft: 10,
  },
  role: {
    fontSize: 18,
    textAlign: "center",
    color: "green",
  },
});

export default UserDetail;
