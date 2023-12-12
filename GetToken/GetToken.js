import AsyncStorage from "@react-native-async-storage/async-storage";

async function GetToken() {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      // Token tồn tại, bạn có thể sử dụng nó cho các yêu cầu API khác
      return token;
    } else {
      console.log("Token not found");
    }
  } catch (error) {
    console.error("Error reading token from AsyncStorage:", error);
  }
}

export default GetToken;
