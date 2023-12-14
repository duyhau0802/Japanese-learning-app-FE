// Message.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Message = ({ user, content, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.user}>{user}</Text>
        <Text>{content}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  user: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default Message;
