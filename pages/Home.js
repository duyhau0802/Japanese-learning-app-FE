import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import Cartegory from "../components/Category/Category";
import CourseView from "../components/courseView/courseView";

const HomeScreen = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/teacher?limit=10"
        );
        setData(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchDataSearch = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/teacher");
        setDataSearch(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    fetchDataSearch();
  }, []);

  const handleViewDetail = (teacher) => {
    navigation.navigate("TeacherDetail", { teacherID: teacher });
  };

  useEffect(() => {
    if (searchKeyword) {
      const filtered = dataSearch.filter((teacher) =>
        (teacher.first_name + " " + teacher.last_name)
          .toLowerCase()
          .includes(searchKeyword.toLowerCase())
      );
      setFilteredTeachers(filtered);
    } else {
      setFilteredTeachers([]);
    }
  }, [searchKeyword, dataSearch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.content_wrap}>
          <View>
            <Text style={styles.title}>Hi, JOHN</Text>
            <Text style={styles.subTitle}>Let's start learning</Text>
          </View>
          <View style={styles.search}>
            <Icon name="bell" size={24} color="black" style={styles.icon} />
            <TextInput
              placeholder="Search"
              style={styles.searchInput}
              onChangeText={(text) => setSearchKeyword(text)}
            />
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.searchResult}>
          {searchKeyword && (
            <FlatList
              data={filteredTeachers}
              keyExtractor={(teacher) => teacher.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleViewDetail(item)}>
                  <View style={styles.searchItem}>
                    <View style={styles.infor}>
                      <Image
                        source={{ uri: item.avatar }} // Đường dẫn đến hình ảnh hồ sơ của giáo viên
                        style={styles.avatar}
                      />
                      <Text style={styles.teacherName}>
                        {item.first_name + " " + item.last_name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
        <View>
          <View style={styles.block}>
            <Text style={styles.header1}>Cartegory</Text>
            <View style={styles.row}>
              <Cartegory
                categoryTitle="N4"
                style={styles.categoryItem}
              ></Cartegory>
              <Cartegory
                categoryTitle="N4"
                style={styles.categoryItem}
              ></Cartegory>
              <Cartegory
                categoryTitle="N4"
                style={styles.categoryItem}
              ></Cartegory>
            </View>
          </View>
        </View>
        <FlatList
          data={searchKeyword ? [] : data}
          keyExtractor={(teacher) => teacher.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.teacherItem}>
              <View style={styles.infor}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <Text style={styles.teacherName}>
                  {item.first_name + " " + item.last_name}
                </Text>
              </View>
              <Text style={styles.teacherAge}>Email: {item.mail}</Text>
              <Text style={styles.teacherAddress}>
                Gender: {item.gender === "0" ? "Male" : "Female"}
              </Text>
              <TouchableOpacity
                onPress={() => handleViewDetail(item.id)}
                style={styles.detailButton}
              >
                <Text style={styles.buttonText}>View Detail</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2023 Learn Japanese</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    height: 150,
    backgroundColor: "#1640D6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  header1: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryItem: {
    width: "30%",
    marginBottom: 10,
  },
  content_wrap: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: "white",
  },
  subTitle: {
    fontSize: 16,
    color: "white",
  },
  search: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  icon: {
    marginRight: 10,
    color: "white",
  },
  searchInput: {
    width: 300,
    height: 30,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingLeft: 10,
    color: "white",
  },
  content: {
    flex: 1,
    padding: 10,
  },
  teacherItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  teacherName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  teacherAge: {
    fontSize: 16,
  },
  teacherAddress: {
    fontSize: 16,
  },
  footer: {
    height: 50,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 20,
  },
  detailButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
  filterButton: {
    backgroundColor: "green",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  searchResult: {
    maxHeight: 200, // Điều chỉnh độ cao tối đa
    backgroundColor: "white",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  searchItem: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infor: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  footer: {
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
});

export default HomeScreen;
