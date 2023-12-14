import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import hearerIcon from '../assets/CallScreen/headPhone.png';
import chatIcon from '../assets/CallScreen/chat.png';
import endIcon from '../assets/CallScreen/endCall.png';
import micIcon from '../assets/CallScreen/mic.png';
import cameraIcon from '../assets/CallScreen/camera.png';

const CallScreen = ({ route }) => {
  const { callerName } = route.params;
  const onMuteHeadphone = () => {};
  const onMuteMic = () => {};
  const onEndCall = () => {};
  const onToggleCamera = () => {};
  const onOpenChat = () => {};
  return (
    <View style={styles.container}>
        <View style={styles.callScreen}>
          
          <Text style={styles.callerInfo}>{callerName} is calling...</Text>

          {/* Caller's videoContainer */}
          <View style={styles.callerVideoContainer}>
            
          </View>
          
        </View>
        {/* Các nút điều khiển */}
        <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={onMuteHeadphone}>
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
    alignItems: 'center',
    backgroundColor:"#3498db", // Màu nền trùng vs màu tiêu đề
  },
  callerVideoContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 100,
    height: 140,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth:1.5,
    borderColor:"black",
    backgroundColor:"white",  // màu nền màu trắng
  },
  callScreen : {
    height:570,
    width:350,
    borderRadius:50,
    justifyContent: 'center',
    borderWidth:2,
    borderColor:"black", 
    backgroundColor:"white",  // màu nền màu trắng
  },
  callerInfo: {
    fontSize: 20,
    textAlign: 'center'
  },
  controls: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    bottom:10,
  },
  controlButton: {
    marginHorizontal: 5,
  },
  btnIcon:{
    borderRadius:50,
    width: 50, 
    height: 50, 
  },
});

export default CallScreen;
