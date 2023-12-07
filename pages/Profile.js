import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios'
const UserProfile = ({navigation}) => {
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

      const handleViewDetail = (user) => {
        navigation.navigate('UserDetailPage', { user });
      };
    return (
        <View style={{padding: 20, width: "100vw" }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Account</Text>
            <Image
                source={{ uri: currentUser.avatar === null
                    ? 'https://i.pinimg.com/564x/e6/4b/ec/e64beca1b9921925b59671bbf74b9837.jpg'
                    : currentUser.avatar}}
                style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20, alignSelf: 'center' }}
            />
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>{currentUser.first_name}</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Favorite</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={() => handleViewDetail(currentUser)}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Settings and Privacy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Help</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
};

export default UserProfile;
