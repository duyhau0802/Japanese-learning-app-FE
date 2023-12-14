import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("Offline");
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const route = useRoute();
  const { price } = route.params;

  const handlePayment = async () => {
    try {
      const res = await axios.post(
        "http://54.164.6.175:3000/api/payment/",
        {
          amount: price,
          description: "Payment successfully !",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );
      alert("Payment successfully!");
    } catch (error) {
      alert("Payment failed!");
    }
    // Handle payment logic here (e.g., send data to server, confirm payment, ...)
    // console.log('Payment information:', {
    //   paymentMethod,
    //   firstName,
    //   lastName,
    //   cardNumber,
    //   expiryDate,
    //   cvc
    // })
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>コースのお支払い</Text>
        <View style={{ margin: 10, display: "flex", flexDirection: "row" }}>
          <Text style={{ fontSize: 30, fontWeight: 500 }}>価格:</Text>
          <Text style={{ fontSize: 30, color: "red", marginLeft: 10 }}>
            $ {price}
          </Text>
        </View>

        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setPaymentMethod("Offline")}
          >
            <View style={styles.radioCircle}>
              {paymentMethod === "Offline" && (
                <View style={styles.selectedRadioCircle} />
              )}
            </View>
            <Text
              style={{
                fontSize: 20,
                color: "#3559E0",
                fontWeight: "bold",
                marginLeft: 5,
              }}
            >
              オフライン
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setPaymentMethod("paypal")}
          >
            <View style={styles.radioCircle}>
              {paymentMethod === "paypal" && (
                <View style={styles.selectedRadioCircle} />
              )}
            </View>
            <Text
              style={{
                fontSize: 20,
                color: "#3559E0",
                fontWeight: "bold",
                marginLeft: 5,
              }}
            >
              PayPal
            </Text>
          </TouchableOpacity>
        </View>

        {paymentMethod === "Offline" && (
          <>
            {/* <TextInput
            style={styles.input}
            placeholder="Card Number"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={(text) => setCardNumber(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Expiry Date (MM/YY)"
            value={expiryDate}
            onChangeText={(text) => setExpiryDate(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="CVC"
            keyboardType="numeric"
            value={cvc}
            onChangeText={(text) => setCvc(text)}
          /> */}
          </>
        )}

        {paymentMethod === "paypal" && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="numeric"
              value={cvc}
              onChangeText={(text) => setCvc(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={cvc}
              onChangeText={(text) => setCvc(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={(text) => setCardNumber(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Expiry Date (MM/YY)"
              value={expiryDate}
              onChangeText={(text) => setExpiryDate(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="CVC"
              keyboardType="numeric"
              value={cvc}
              onChangeText={(text) => setCvc(text)}
            />
          </>
        )}
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "#0961f5",
            borderRadius: 5,
            alignItems: "center",
          }}
          onPress={() => handlePayment()}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Pay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    marginHorizontal: 40,
    marginVertical: 150,
    borderRadius: 30,
    borderColor: "#3498db",
  },
  content: {
    borderRadius: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  selectedRadioCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "auto",
  },
});

export default PaymentScreen;
