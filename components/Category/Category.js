import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Cartegory = (props) => {
  return (
    <View
      style={styles.container}
      onPress={() => alert("Buy Now button pressed")}
    >
      <Image
        source={require("./N4.jpg")} //
        style={styles.categoryImage}
      />
      <Text style={styles.catvhegoryTitle}>{props.categoryTitle} category</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 10,
    marginBottom: 0,
  },
});

export default Cartegory;
