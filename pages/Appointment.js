import React, { useState } from 'react';
import moment from 'moment';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Appointment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: 'Appointment 1',
      startDate: '2023-05-18 15:26:00',
      endDate: '2023-05-18 16:26:00',
      attendees: [
        { id: 1, remoteImage: 'https://avatarfiles.alphacoders.com/286/286525.jpg' },
        { id: 2, remoteImage: 'https://th.bing.com/th/id/R.058aab5b7f290e62ad9a1cd2a511e4a7?rik=i%2faVYk5JceptAA&pid=ImgRaw&r=0' },
      ],
      backgroundColor: '#e2caf8',
      titleColor: '#8a2be2',
    },
    {
      id: 2,
      title: 'Appointment 2',
      startDate: '2023-05-19 15:26:00',
      endDate: '2023-05-19 16:26:00',
      attendees: [
        { id: 7, remoteImage: 'https://th.bing.com/th/id/OIP.VH8_W_0il5jRd7Zv8ow3UAHaFj?rs=1&pid=ImgDetMain' },
        { id: 8, remoteImage: 'https://th.bing.com/th/id/OIP.sc6RqPaqFujxqqfWnIMmYwAAAA?rs=1&pid=ImgDetMain' },
        { id: 9, remoteImage: 'https://4.bp.blogspot.com/-UmNgEMhVE7c/T7-eNCKR9vI/AAAAAAAAA_8/20sNRWKvkmQ/s1600/tasogare_otome_x_amnesia-03-yuuko-smile-light-happy-ghost.jpg' },
      ],
      backgroundColor: '#e2caf8',
      titleColor: '#8a2be2',
    },
    {
      id: 3,
      title: 'Appointment 3',
      startDate: '2024-1-12 12:45',
      endDate: '2024-1-12 15:55',
      attendees: [
        { id: 10, remoteImage: 'https://th.bing.com/th/id/OIP.sc6RqPaqFujxqqfWnIMmYwAAAA?rs=1&pid=ImgDetMain' },
        { id: 11, remoteImage: 'https://th.bing.com/th/id/OIP.VH8_W_0il5jRd7Zv8ow3UAHaFj?rs=1&pid=ImgDetMain' },
        { id: 12, remoteImage: 'https://4.bp.blogspot.com/-UmNgEMhVE7c/T7-eNCKR9vI/AAAAAAAAA_8/20sNRWKvkmQ/s1600/tasogare_otome_x_amnesia-03-yuuko-smile-light-happy-ghost.jpg  ' },
        { id: 13, remoteImage: 'https://yt3.ggpht.com/a/AGF-l7_gwAnNnMtvo952OY2F5E0UMOlQGgbAIFiYlQ=s900-c-k-c0xffffffff-no-rj-mo' },
        { id: 14, remoteImage: 'https://i.pinimg.com/originals/69/16/22/6916226f534ffc17748702e3194e3587.jpg' },
      ],
      backgroundColor: '#e2caf8',
      titleColor: '#8a2be2',
    },
    {
      id: 4,
      title: 'Appointment 4',
      startDate: '2023-12-07 11:45:00',
      endDate: '2023-12-07 14:45:00',
      attendees: [
        { id: 15, remoteImage: 'https://th.bing.com/th/id/OIP.gxEystxJOHsAXsrs1hqiFgHaGY?rs=1&pid=ImgDetMain' },
        { id: 17, remoteImage: 'https://th.bing.com/th/id/OIP.GctJ5_a7Ux819h0MSRRBfAHaHa?rs=1&pid=ImgDetMain' },
      ],
      backgroundColor: '#e2caf8',
      titleColor: '#8a2be2',
    },
    // Thêm fake appointment data tại đây
  ]);

  const renderAppointmentCard = ({ item }) => {

    const currentDateTime = moment();
    const startDateTime = moment(item.startDate, 'YYYY-MM-DD HH:mm:ss');
    const endDateTime = moment(item.endDate, 'YYYY-MM-DD HH:mm:ss');

    let status = '';

    if (currentDateTime.isBefore(startDateTime, 'second')) {
        status = 'Chưa bắt đầu';
    } else if (currentDateTime.isBetween(startDateTime, endDateTime, 'second')) {
        status = 'Đang diễn ra';
    } else if (currentDateTime.isAfter(endDateTime, 'second')) {
        status = 'Đã quá hạn';
    }
    const statusColors = {
      'Chưa bắt đầu': 'green',
      'Đang diễn ra': 'blue',
      'Đã quá hạn': 'red',
    };
  return (
    <View style={[styles.card, { backgroundColor: item.backgroundColor }]}>
      <Text style={[styles.cardTitle, { color: item.titleColor }]}>{item.title}</Text>
      <Text style={[styles.cardDate, styles.highlightedText, {color: statusColors[status] }]}>{status}</Text>
      <View style={styles.cardDates}>
        <Text style={styles.cardDate}>Start: {item.startDate}</Text>
      </View>
      <View style={styles.cardDates}>
        <Text style={styles.cardDate}>End: {item.endDate}</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.attendeesContainer}>
          {item.attendees.map((attendee) => (
            <Image key={attendee.id} source={{ uri: attendee.remoteImage }} style={styles.attendeeImage} />
          ))}
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

  const searchFilter = (item) => {
    const query = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(query);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enrolled Course Appointments</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={appointments.filter(searchFilter)}
        renderItem={renderAppointmentCard}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop:60,
  },
  listContainer:{
    paddingHorizontal:10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 2,
    borderRadius:5,
    borderColor:'#A9A9A9',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  card: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize:18,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  cardDates: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  cardDate: {
    color: '#888',
  },
  cardContent: {
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  attendeesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  attendeeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: -10,
    borderWidth:0.5,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    marginTop:15,
    backgroundColor: '#DCDCDC',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#00008B',
  },
  highlightedText: {
    fontWeight: 'bold',
  },
});

export default Appointment;
