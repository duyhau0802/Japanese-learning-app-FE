import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import hearerIcon from "../assets/CallScreen/headPhone.png";
import chatIcon from "../assets/CallScreen/chat.png";
import endIcon from "../assets/CallScreen/endCall.png";
import micIcon from "../assets/CallScreen/mic.png";
import cameraIcon from "../assets/CallScreen/camera.png";
import { Camera } from "expo-camera";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const CallScreen = ({ route }) => {
  const navigation = useNavigation();
  const { callerName } = route.params;
  const onMuteHeadphone = () => {
    Alert.alert("Mute headphone");
  };
  const onMuteMic = () => {
    Alert.alert("Mute microphone");
  };
  const onEndCall = () => {
    navigation.goBack();
  };
  const onToggleCamera = () => {
    Alert.alert("Recoding video");
  };
  const onOpenChat = () => {
    Alert.alert("Open chat");
  };

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestMicrophonePermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraFlip = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.callScreen}>
        <Text style={styles.callerInfo}>{callerName} is calling...</Text>

        {/* Caller's videoContainer */}
        <View style={styles.callerVideoContainer}>
          <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "column-reverse",
              }}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleCameraFlip}
              >
                <AntDesign name="reload1" size={20} style={{marginBottom: 5}} color="white" />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      </View>
      {/* Các nút điều khiển */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={onMuteHeadphone}
        >
          <Image source={hearerIcon} style={styles.btnIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={onMuteMic}>
          <Image source={micIcon} style={styles.btnIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={onEndCall}>
          <Image source={endIcon} style={styles.btnIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={onToggleCamera}>
          <Image source={cameraIcon} style={styles.btnIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={onOpenChat}>
          <Image source={chatIcon} style={styles.btnIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#3498db", // Màu nền trùng vs màu tiêu đề
  },
  callerVideoContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 100,
    height: 140,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "black",
    backgroundColor: "white", // màu nền màu trắng
  },
  callScreen: {
    height: 570,
    width: 350,
    borderRadius: 50,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white", // màu nền màu trắng
  },
  callerInfo: {
    fontSize: 20,
    textAlign: "center",
  },
  controls: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    bottom: 10,
  },
  controlButton: {
    marginHorizontal: 5,
  },
  btnIcon: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});

export default CallScreen;