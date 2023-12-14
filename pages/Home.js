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

import Cartegory from "../components/Category/Category";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const route = useRoute();
  const { isUserLoggedIn } = route.params ? route.params : false;
  const navigation = useNavigation();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [isLogin, setIsLogin] = useState(isUserLoggedIn);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axios.get(
          "http://54.164.6.175:3000/api/user/profile/me",
          {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
          }
        );
        const token = await AsyncStorage.getItem("token");
        console.log("Token",token);
        if (res.data.success === true) {
          setIsLogin(true);
          setCurrentUser(res.data.user);
        } else {
          setIsLogin(false);
          setCurrentUser([]);
        }
      } catch (error) {
        setIsLogin(false);
        // console.error(error.message);
      }
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://54.164.6.175:3000/api/teacher?limit=10"
        );
        setData(res.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchDataSearch = async () => {
      try {
        const res = await axios.get("http://54.164.6.175:3000/api/teacher");
        setDataSearch(res.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    fetchDataSearch();
  }, []);

  const handleViewDetail = (teacher) => {
    navigation.navigate("TeacherDetail", { teacherID: teacher.id });
  };

  useEffect(() => {
    if (searchKeyword) {
      const filtered = dataSearch.filter((teacher) => {
        const fullName = `${teacher.first_name} ${teacher.last_name}`.toLowerCase();
        const level = teacher.Teacher_Detail.jp_level.toLowerCase();
  
        // Check if the searchKeyword matches either name or level
        return fullName.includes(searchKeyword.toLowerCase()) || level.includes(searchKeyword.toLowerCase());
      });
  
      setFilteredTeachers(filtered);
    } else {
      setFilteredTeachers([]);
    }
  }, [searchKeyword, dataSearch]);
  
  const handleViewProfile = (user) => {
    // Thực hiện chuyển hướng đến trang profile với thông tin của user
    navigation.navigate("UserProfile", { user });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.content_wrap}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.subTitle}>学習を始めましょう</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isUserLoggedIn ? (
                <View>
                  <TouchableOpacity
                    onPress={() => handleViewProfile(currentUser)}
                  >
                    <Image
                      source={{
                        uri:
                          currentUser.avatar === ""
                            ? "https://i.pinimg.com/564x/e6/4b/ec/e64beca1b9921925b59671bbf74b9837.jpg"
                            : currentUser.avatar,
                      }}
                      style={styles.currentUserAvatar}
                    />
                  </TouchableOpacity>
                  <Text style={styles.title}>{currentUser.first_name}</Text>
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <View style={styles.search}>
            <Icon name="bell" size={24} color="black" style={styles.icon} />
            <TextInput
              placeholder="探す。。。"
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
              <Text style={styles.teacherAge}>日本語のレベル: {item.Teacher_Detail.jp_level}</Text>
              {/* <Text style={styles.teacherAge}>Email: {item.mail}</Text>
              <Text style={styles.teacherAddress}>
                Gender: {item.gender === "0" ? "Male" : "Female"}
              </Text> */}
              <TouchableOpacity
                onPress={() => handleViewDetail(item)}
                style={styles.detailButton}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  詳細を見る
                </Text>
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
    backgroundColor: "#0961f5",
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
  currentUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  categoryItem: {
    width: "30%",
    marginBottom: 10,
  },
  content_wrap: {
    padding: 10,
    width: "100%",
  },
  title: {
    fontSize: 20,
    color: "white",
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  search: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    color: "black",
  },
  icon: {
    marginRight: 10,
    color: "white",
  },
  searchInput: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingLeft: 10,
    color: "black",
    backgroundColor: "white",
    fontSize: 18,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  teacherItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    margin: 10,
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
    backgroundColor: "#4CB9E7",
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
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
    maxHeight: 200,
    backgroundColor: "white",
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
