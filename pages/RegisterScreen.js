// screens/RegisterScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const navigation = useNavigation();

  const handleRegister = async (email, password, firstName, lastName, role) => {
    try {
      const res = await fetch("http://54.164.6.175:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          role: role.trim(),
        }),
      });
      const data = await res.json();
      if (data.success === true) {
        setTimeout(() => {
          navigation.navigate("Login");
        }, 2000);
      } else {
      }
    } catch (error) {
      // Xử lý lỗi đăng ký
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Fill your infomation below</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your role"
        value={role}
        onChangeText={(text) => setRole(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleRegister(email, password, firstName, lastName, role);
        }}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Màu nền màu trắng
    padding: 48,
    borderColor: "#3498db", // Màu xanh nhạt của đường viền
    borderWidth: 5, // Độ dày của đường viền
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#4d382c", // Màu chữ nâu đậm
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
    color: "#4d382c",
  },
  input: {
    height: 40,
    borderColor: "#4d382c", // Màu viền nâu đậm cho ô input
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: "100%",
    borderRadius: 20,
    color: "#4d382c", // Màu chữ nâu đậm
  },
  button: {
    backgroundColor: "#0961f5", // Màu nền xanh dương cho nút
    padding: 10,
    borderRadius: 8,
    width: "100%",
  },
  buttonText: {
    color: "#fff", // Màu chữ trắng
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
