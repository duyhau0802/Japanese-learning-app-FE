// MessageDetailScreen.js
import React, { useState } from 'react';
import { View, FlatList, TextInput, Button, StyleSheet, Text, Image } from 'react-native';

const MessageDetailScreen = ({ route }) => {
  const { currentUser, partnerUser } = route.params;

  const [messages, setMessages] = useState([
    { id: 1, sender: currentUser, content: 'こんにちは お元気ですか？' },
    { id: 2, sender: partnerUser, content: '大丈夫ありがとう！' },
    { id: 3, sender: currentUser, content: 'それは嬉しいですね！' },
    // Add more messages as needed
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { id: messages.length + 1, sender: currentUser, content: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[
            styles.messageContainer,
            item.sender === currentUser ? styles.currentUserMessage : styles.partnerMessage
          ]}>
            {item.sender === partnerUser && (
              <Image source={{ uri: partnerUser.avatar }} style={styles.avatar} />
            )}
            <View style={styles.messageContent}>
              <Text style={styles.messageText}>{item.content}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="メッセージを入力してください..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <Button title="送信" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
  },
  partnerMessage: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageContent: {
    maxWidth: '80%', // Giới hạn chiều rộng của tin nhắn
  },
  messageText: {
    color: 'black',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#E0E0E0', // Màu nền của tin nhắn
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 8,
  },
});

export default MessageDetailScreen;
