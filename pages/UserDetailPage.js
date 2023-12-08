// App.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import UserDetail from './../components/UserDetail/UserDetail';
import axios from 'axios';

const UserDetailPage = () => {
    const [currentUser, setCurrentUser] = useState([])
    useEffect(() => {
        const getCurrentUser = async () => {
          try {
            const token = document.cookie
              .split('; ')
              .find(row => row.startsWith('token='))
              .split('=')[1]
    
            const response = await axios.get(
              'http://localhost:4000/api/user/profile/me',
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            )
            setCurrentUser(response.data.user)
          } catch (error) {
            console.error(error)
          }
        }
        getCurrentUser()
      }, [])
  return (
    <SafeAreaView style={styles.container}>
      <UserDetail user={currentUser} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '30vh',
    justifyContent: 'center',
  },
});

export default UserDetailPage;
