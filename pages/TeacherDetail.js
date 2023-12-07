import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CourseList from '../components/CourseList/CourseList'

const TeacherDetail = () => {
  const teacherInfo = {
    name: 'John Hau',
    email: 'hau@gmail.com',
    experience: '200',
    detail_infor:
      'I am an experienced Japanese teacher with a passion for helping students improve their language skills',
    image: require('../components/Teacher/teacher.jpg'),
    jp_level:'N2',
    createdAt:'23/11/2023',
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
      <Image source={teacherInfo.image} style={styles.teacherImage} />
        <View style={styles.col}>
        <Text style={styles.teacherName}>{teacherInfo.name}</Text>
        <Text style={styles.teacherEmail}>{teacherInfo.email}</Text>
        </View>
      <Text style={styles.phoneSymbol}>✆</Text>
      <Text style={styles.messageSymbol}>💬</Text>
      </View>
      <View style={styles.h2}>Info</View>
      <View style={styles.row}>
        <View style={styles.col}> 
          <Text style={styles.h3}>Japanese level </Text>
          <Text style={styles.h4}>{teacherInfo.jp_level}</Text>
        </View>
        <View style={styles.col}> 
          <Text style={styles.h3}>Experience</Text>
          <Text style={styles.h4}>{teacherInfo.experience} years</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}> 
          <Text style={styles.h3}>Students</Text>
          <Text style={styles.h4}>150,000</Text>
        </View>
        <View style={styles.col}> 
          <Text style={styles.h3}>Start teaching at</Text>
          <Text style={styles.h4}>{teacherInfo.createdAt}</Text>
        </View>
      </View>
      <Text style={styles.h2}>
      About me
      </Text>
      <View style={styles.row}>
        <Text style={styles.TeacherDetail}>{teacherInfo.detail_infor}</Text>
      </View>

      <Text style={styles.h2}>
      My Courses
      </Text>
      <View style={styles.row}>
          <CourseList/>
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  h2 : {
    fontSize:23,
    marginTop:15,
  },
  h3 : {
    fontSize:12,
    color:'gray',
  },
  h4 : {
    fontSize:13,
    fontWeight:'600',
  },
  teacherImage: {
    width: 50,
    height: 50,
    borderRadius: 50, // To make it a circle
    margin:10,
    top:5,
  },
  teacherName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop:20,
      },
  teacherEmail : {
    fontSize: 12,
  },
  phoneSymbol :{
    fontSize: 30,
    margin:8,
  },
  messageSymbol:{
    fontSize: 22,
    margin:10,
  },
  TeacherDetail: {
    fontSize: 14,
    margin: 8,
  },
  row : {
    flexDirection: 'row',
    alignItems: "center",
  },
  col : {
    flex: 1,
    width: 20,
    padding: 10,
    marginBottom:10,
  }
});

export default TeacherDetail;
