// screens/LoginScreen.js

import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async (email, password) => {
    try {
      const res = await axios.post("http://54.164.6.175:3000/api/user/login", {
        email: email,
        password: password,
      });

      if (res.data.success) {
        await AsyncStorage.setItem("token", res.data.accessToken);
        Alert.alert("Login successfully !");
        setTimeout(() => {
          navigation.navigate("CourseDetail");
        }, 1000);
      } else {
        if (res.error.password) {
          Alert.alert(res.error.password.msg);
        } else if (res.error.email) {
          Alert.alert(res.error.email.msg);
        } else {
          Alert.alert("An error occurred during login.");
        }
      }
    } catch (error) {
      Alert.alert("Login failed, please try again !");
    }
  };
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <Text style={styles.subtitle}>Hi welcome back, you've been missed</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={!isPasswordVisible} // them xem mat khau
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleLogin(email, password);
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={styles.registerText}
        onPress={() => navigation.navigate("Register")}
      >
        Don't have an account? Register here.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Màu nền da nhẹ nhàng
    padding: 45,
    borderColor: "#3498db", // Màu xanh nhạt của đường viền
    borderWidth: 5, // Độ dày của đường viền
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
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
    borderRadius: 8,
    color: "#4d382c", // Màu chữ nâu đậm
  },
  button: {
    backgroundColor: "#0961f5", // Màu nền xanh dương cho nút
    padding: 10,
    borderRadius: 20,
    width: "100%",
  },
  buttonText: {
    color: "#fff", // Màu chữ trắng
    textAlign: "center",
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 16,
    color: "#0961f5", // Màu chữ xanh dương
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
