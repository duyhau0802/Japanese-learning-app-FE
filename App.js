// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./pages/Home"; // Thêm import này
import TeacherDetail from "./pages/TeacherDetail";
import CallScreen from "./pages/CallScreen";
import PaymentScreen from "./pages/PaymentScreen";
import AppointmentScreen from "./pages/Appointment";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import Course from "./pages/Course";
import SetAppoinmentScreen from "./pages/SetApointment";
import CourseDetailScreen from "./pages/CourseDetail";
import UserProfile from "./pages/Profile";
import UserDetailPage from "./pages/UserDetailPage";
import CourseDetail from "./pages/CourseDetail";
import LessonDetail from "./pages/LessonDetail";
import MessageListScreen from "./pages/MessageList";
import MessageDetailScreen from "./pages/MessageDetail";
import { StripeProvider } from '@stripe/stripe-react-native';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
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
        />
        <Stack.Screen
          name="Appointment"
          component={AppointmentScreen}
          options={{ title: "Appointment" }}
        />
        <Stack.Screen
          name="CourseDetail"
          component={CourseDetailScreen}
          options={{ title: "CourseDetail" }}
        />
        <Stack.Screen
          name="Call"
          component={CallScreen}
          options={{ title: "Call" }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ title: "Payment" }}
        />
        <Stack.Screen
          name="SetAppointment"
          component={SetAppoinmentScreen}
          options={{ title: "SetAppointment" }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ title: "User Profile" }}
        />
        <Stack.Screen
          name="UserDetailPage"
          component={UserDetailPage}
          options={{ title: "User Detail" }}
        />
        <Stack.Screen name="LessonDetail" component={LessonDetail} />
        <Stack.Screen name="MessageList" component={MessageListScreen} />
        <Stack.Screen name="MessageDetail" component={MessageDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;