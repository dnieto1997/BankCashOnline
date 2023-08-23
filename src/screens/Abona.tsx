import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ToastAndroid,Alert,Button} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Block, Input, Switch, Modal, Text } from '../components/';
import RNPickerSelect from 'react-native-picker-select';
import { useData, useTheme, useTranslation } from '../hooks/';
import Clipboard from '@react-native-clipboard/clipboard';





const Abona = () => {

  const { assets, colors, gradients, sizes } = useTheme();

  const [token, setToken] = useState<string>('')
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const [moneda, setMoneda] = useState('');
  const [checkout, setCheckout] = useState('');

  useEffect(() => {
    const obtenerToken = async () => {
      try {
        const token: any = await AsyncStorage.getItem('token')

        setToken(token)


        console.log(token)


      } catch (error) {
        console.log(error)

      }

    }
    obtenerToken()

  }, [])

  

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://62.72.19.116/api/country', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

   
        const data = await response.json();
        setCountries(data);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCountryChange = async (value) => {
    setSelectedCountry(value);
    setSelectedCountryCode(null);
    setCurrencies([]);

    const selectedCountryData = countries.find(country => country.countryCode === value);
    if (selectedCountryData) {
      setSelectedCountryCode(selectedCountryData.countryCode);
      fetchCountryDetails(selectedCountryData.countryCode);

   
    }
    
  };

  const handleCurrencyChange = async (value) => {

    setMoneda(value)
    console.log('Moneda seleccionada:', value);
  };

  const fetchCountryDetails = async (countryCode) => {
    try {
      const response = await fetch(`http://62.72.19.116/api/country/${countryCode}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.currencys && Array.isArray(data.currencys)) {
          setCurrencies(data.currencys);
        }
      } else {
        console.error('Error fetching country details');
      }
    } catch (error) {
      console.error('Error fetching country details:', error);
    }
  };

  const handleSubmit = async () => {
    let formattedAmount = parseFloat(amount);
    if (selectedCountry !== 'CO' && selectedCountry !== 'PE') {
      formattedAmount *= 100;
    }

    // Construir el objeto de datos para la solicitud
    const data = JSON.stringify({
      country: selectedCountry,
      city: city,
      address: address,
      postCode: postCode,
      currency: moneda,
      amount: formattedAmount,
      language: 'ES',
      description: description,
    });


    console.log("todo los datos",data)
    try {
      const response = await fetch('http://62.72.19.116/api/transactions/collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      const responseData = await response.json();
      setCheckout(responseData)
      console.log(responseData)
    
    
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };
 

  const checkoutHasValue = checkout !== undefined && checkout !== null && checkout !== '';
  return (

    <ImageBackground source={require('../assets/images/bg.jpeg')} style={{ flex: 1 }}>
      <View style={styles.container}>
      <View>
      <Text>Selecciona un país:</Text>
      <RNPickerSelect
        placeholder={{ label: 'Selecciona un país...', value: null }}
        value={selectedCountry}
        onValueChange={handleCountryChange}
        items={countries.map((country) => ({
          label: country.countryName,
          value: country.countryCode,
        }))}
      />

      {currencies.length > 0 && (
        <View>
           <RNPickerSelect
  placeholder={{ label: 'Selecciona una moneda...', value: null }}
  onValueChange={handleCurrencyChange}
  items={
    (selectedCountry === 'CO')
      ? currencies
        .filter(currency => currency !== 'USD')
        .map(currency => ({
          label: currency,
          value: currency,
        }))
      : (selectedCountry === 'PE')
      ? [
          {
            label: 'SOL',
            value: 'PEN',
          },
        ]
      : currencies.map(currency => ({
          label: currency,
          value: currency,
        }))
  }
/>

<Text>City:</Text>
              <TextInput
                value={city}
                onChangeText={setCity}
                style={styles.input}
              />

              <Text>Address:</Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                style={styles.input}
              />

              <Text>Post Code:</Text>
              <TextInput
                value={postCode}
                onChangeText={setPostCode}
                style={styles.input}
              />

              <Text>Amount:</Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                style={styles.input}
                
              />

              <Text>Description:</Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.input}
              />

              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>

        



        </View>
      )}


    </View>
      </View>
    </ImageBackground>

  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 60,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
  },
});

export default Abona