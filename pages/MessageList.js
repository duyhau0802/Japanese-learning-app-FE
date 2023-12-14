// MessageListScreen.js
import React, { useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MessageListScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: 1, avatar: 'https://i.pinimg.com/236x/87/26/c0/8726c026e1bb1adb493fda4f1f5f327b.jpg', user: 'User 1', content: 'それは嬉しいですね！' },
    { id: 2, avatar: 'https://i.pinimg.com/236x/13/af/94/13af945404ed0e4153147b212a397434.jpg', user: 'User 2', content: '大丈夫ありがとう！' },
    // Add more messages as needed
  ]);

  const currentUser = { id: 1, name: 'User 1' }; // Thay thế bằng thông tin người dùng hiện tại của bạn

  const handlePressMessage = (partnerUser) => {
    navigation.navigate('MessageDetail', { currentUser, partnerUser });
  };

  const renderLastMessage = (message) => (
    <Text style={styles.lastMessage}>{message.content}</Text>
  );

  return (
    <View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.messageItem}
            onPress={() => handlePressMessage(item)}
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.messageContent}>
              <Text style={styles.userName}>{item.user}</Text>
              {renderLastMessage(item)}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    color: 'gray',
  },
});

export default MessageListScreen;
