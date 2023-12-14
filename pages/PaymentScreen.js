import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvc, setCvc] = useState('')

  let amount = 55000
  let name = 'Thanh Hung'
  let course = 'Kaiwa basic'

  const handlePayment = async () => {
    try {
      const res = await axios.post(
        'http://54.164.6.175:3000/api/payment/',
        {
          amount,
          name,
          description: course
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
          }
        }
      )
      alert('Payment successfully!')
    } catch (error) {
      alert('Payment failed!')
    }
    // Handle payment logic here (e.g., send data to server, confirm payment, ...)
    console.log('Payment information:', {
      paymentMethod,
      firstName,
      lastName,
      cardNumber,
      expiryDate,
      cvc
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Course Payment</Text>
        <View style={{ margin: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 500 }}>Price:</Text>
              <Text style={{ fontSize: 18, color: 'red' }}>{amount}</Text>
            </View>
            <View style={{ margin: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 500 }}>Course:</Text>
              <Text style={{ fontSize: 18, color: 'blue' }}>{course}</Text>
            </View>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setPaymentMethod('creditCard')}
          >
            <View style={styles.radioCircle}>
              {paymentMethod === 'creditCard' && (
                <View style={styles.selectedRadioCircle} />
              )}
            </View>
            <Text>Credit Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setPaymentMethod('paypal')}
          >
            <View style={styles.radioCircle}>
              {paymentMethod === 'paypal' && (
                <View style={styles.selectedRadioCircle} />
              )}
            </View>
            <Text>PayPal</Text>
          </TouchableOpacity>
        </View>

        {paymentMethod === 'creditCard' && (
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

        {paymentMethod === 'paypal' && (
          <>
            <TextInput
              style={styles.input}
              placeholder='Phone Number'
              keyboardType='numeric'
              value={cvc}
              onChangeText={text => setCvc(text)}
            />
            <TextInput
              style={styles.input}
              placeholder='Email'
              value={cvc}
              onChangeText={text => setCvc(text)}
            />
            <TextInput
              style={styles.input}
              placeholder='Card Number'
              keyboardType='numeric'
              value={cardNumber}
              onChangeText={text => setCardNumber(text)}
            />
            <TextInput
              style={styles.input}
              placeholder='Expiry Date (MM/YY)'
              value={expiryDate}
              onChangeText={text => setExpiryDate(text)}
            />
            <TextInput
              style={styles.input}
              placeholder='CVC'
              keyboardType='numeric'
              value={cvc}
              onChangeText={text => setCvc(text)}
            />
          </>
        )}
        <Button title='Pay' onPress={handlePayment} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 25,
    borderColor: '#3498db',
    borderRadius: 5
  },
  content: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  selectedRadioCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'black'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 250
  }
})

export default PaymentScreen
