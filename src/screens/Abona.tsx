import React, { useState, useEffect } from 'react'
import { View,  TextInput, TouchableOpacity, StyleSheet,ImageBackground,Alert,ScrollView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Block, Button, Input, Switch, Modal,Text} from '../components/';
import RNPickerSelect from 'react-native-picker-select';
import { useData, useTheme, useTranslation } from '../hooks/';



interface CurrencyMap {
  [country: string]: string;
}

const Abona = () => {

  const { assets, colors, gradients, sizes } = useTheme();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  


  const handleDeposit = () => {
    if (!selectedCountry || !selectedCurrency || amount === '') {
      setMessage('Por favor, completa todos los campos');
    } else {
      const currency = selectedCurrency === 'USD' ? 'dólares' : getCurrencies()[selectedCountry];

      Alert.alert(
        'Confirmar Depósito',
        `¿Estás seguro de que deseas depositar ${amount} ${currency} en ${selectedCountry}?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Confirmar', onPress: performDeposit },
        ]
      );
    }
  };

  const performDeposit = () => {
    setMessage(`Has depositado ${amount} ${selectedCurrency} en ${selectedCountry}`);
  };

  const getCurrencies = (): CurrencyMap => {
    return {
      Colombia: 'pesos colombianos',
      Mexico: 'pesos mexicanos',
      // Agregar más países y monedas según sea necesario
    };
  };

  const data = [
    { label: 'Colombia', value: 'Colombia' },
    { label: 'México', value: 'Mexico' },
    // Agregar más países según sea necesario
  ];

  return (

    <ImageBackground source={require('../assets/images/bg.jpeg')} style={{flex:1}}>
    <View style={styles.container}>
      <Text style={styles.title}>Consignar Dinero</Text>
      <RNPickerSelect
        placeholder={{ label: 'Selecciona un país', value: null }}
        items={data}
        onValueChange={(value) => {
          setSelectedCountry(value);
          setSelectedCurrency(null); // Reseteamos la moneda al cambiar de país
        }}
        style={pickerSelectStyles}
        value={selectedCountry}
      />
      {selectedCountry && (
        <RNPickerSelect
          placeholder={{ label: 'Moneda', value: null }}
          items={getCurrenciesForCountry(selectedCountry)}
          onValueChange={(value) => setSelectedCurrency(value)}
          style={pickerSelectStyles}
          value={selectedCurrency}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Ingrese el monto"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleDeposit}>
        <Text style={styles.buttonText}>Consignar</Text>
      </TouchableOpacity>
      <Text style={styles.message}>{message}</Text>
    
    </View>
    </ImageBackground>
   
  );
};

const getCurrenciesForCountry = (country: string): { label: string; value: string }[] => {
  const currencyOptions = [
    { label: 'USD', value: 'USD' },
  ];

  if (country === 'Colombia') {
    return [
      { label: 'COP', value: 'COP' },
      ...currencyOptions,
    ];
  } else if (country === 'Mexico') {
    return [
      { label: 'MXN', value: 'MXN' },
      ...currencyOptions,
    ];
  } else {
    return [];
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop:60
  },
  scrollViewContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageBackground: {
    flex: 1
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
  message: {
    marginTop: 20,
    color: 'green',
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