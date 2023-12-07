// App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import HomeScreen from "./pages/Home"; // Thêm import này
import TeacherDetail from "./pages/TeacherDetail";
import CallScreen from "./pages/CallScreen";
import PaymentScreen from "./pages/PaymentScreen";
import AppointmentScreen from "./pages/Appointment";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Appointment"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#3498db",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          // component={CallScreen}
          // component={PaymentScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="TeacherDetail"
          component={TeacherDetail}
          options={{ title: "TeacherDetail" }}

          // name="Appointment"
          // component={AppointmentScreen}
          // options={{ title: "Appointment" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
