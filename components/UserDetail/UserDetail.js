// UserProfileDetail.js
import React from 'react'
import { View, Image, TextInput, Button, StyleSheet } from 'react-native'

const UserDetail = ({ user }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            user.avatar === null
              ? 'https://i.pinimg.com/564x/e6/4b/ec/e64beca1b9921925b59671bbf74b9837.jpg'
              : user.avatar
        }}
        style={styles.avatar}
      />
      <TextInput
        style={styles.name}
        value={`${user.first_name} ${user.last_name}`}
      />
      <TextInput style={styles.email} value={user.mail} />
      {/* <TextInput style={styles.gender} value={'gender: ' + user.gender === null ? '': user.gender} /> */}
      <TextInput style={styles.role} value={user.role} />
      <Button title='Update' onPress={() => handleUpdate(user)} />
    </View>
  )
}

const handleUpdate = user => {
  // Handle update logic here
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  email: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    width: 300
  },
  role: {
    fontSize: 18,
    textAlign: 'center',
    color: 'green'
  }
})

export default UserDetail
