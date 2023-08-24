import React, { useState, useEffect,useCallback } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ImageBackground,ToastAndroid,ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Block, Input, Switch, Modal, Text,Checkbox,Button } from '../components/';
import RNPickerSelect from 'react-native-picker-select';
import { useData, useTheme, useTranslation } from '../hooks/';
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';






const Abona = () => {

  interface IRegistration {
    country: string;
    city: string;
    address: string;
    postCode: string;
    amount: number;
    description:string;

  }
  interface IRegistrationValidation {
    country: boolean;
    city: boolean;
    address: boolean;
    postCode: boolean;
    amount: boolean;
    description:boolean;
    
  }
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    country: false,
    city: false,
    address: false,
    postCode: false,
    amount: false,
    description:false
    
    
  });
  const [registration, setRegistration] = useState<IRegistration>({
    country: '',
    city: '',
    address: '',
    postCode: '',
    amount: 0,
    description: '',
  });




  const { assets, colors, gradients, sizes } = useTheme();
  const [token, setToken] = useState<string>('')
  const [countries, setCountries] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [moneda, setMoneda] = useState('');
  const [checkout, setCheckout] = useState(undefined);


 



  useEffect(() => {
    const obtenerToken = async () => {
      try {
        const token: any = await AsyncStorage.getItem('token')

        setToken(token)


      } catch (error) {
        console.log(error)

      }

    }
    obtenerToken()

  },[])

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://62.72.19.116/api/country/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
           setCountries(data)
        
          
          
        
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [token]);


  const handleCountryChange = async (value:any) => {
    setSelectedCountry(value);
    setSelectedCountryCode(null);
    setCurrencies([]);

    const selectedCountryData:any = countries.find(country => country.countryCode === value);
    if (selectedCountryData) {
      setSelectedCountryCode(selectedCountryData.countryCode);
      fetchCountryDetails(selectedCountryData.countryCode);

   
    }
    
  };


  const handleCurrencyChange = async (value:any) => {

    setMoneda(value)

  };

  const fetchCountryDetails = async (countryCode:any) => {
    try {
      const response = await fetch(`http://62.72.19.116/api/country/${countryCode}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

 
        const data = await response.json();
        if (data.currencys && Array.isArray(data.currencys)) {
          setCurrencies(data.currencys);
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
      setCheckout(responseData.data)
      Linking.openURL(responseData.data)
      .catch((err) => console.error('Error al abrir el enlace: ', err));
     
    setCity('');
    setAddress('');
    setPostCode('');
    setAmount('');
    setDescription('');
    
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }

 

  };
 





  return (

    <ImageBackground source={require('../assets/images/bg.jpeg')} style={{ flex: 1 }}>
    
    <ScrollView>
    <View style={{marginTop:'70%',paddingHorizontal:30}}>


   
<RNPickerSelect
  placeholder={{ label: 'Selecciona un país...', value: null }}
  value={selectedCountry}
  onValueChange={handleCountryChange}
  items={countries && Array.isArray(countries) ? countries.map((country) => ({
    label: country.countryName,
    value: country.countryCode,
  })) : []}

/>


 
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

          
       
               <View>
              <Input 
                placeholder='City'
                style={styles.input1}
                onChangeText={setCity}
                value={city}
                color={colors.black}
                label='City'
                />
              </View>


              <View>
              <Input 
                placeholder='Address'
                style={styles.input1}
                onChangeText={setAddress}
                value={address}
                color={colors.black}
                label='Address'
                />
              </View>

              <View>
              <Input 
                placeholder='PostCode'
                style={styles.input1}
                onChangeText={setPostCode}
                value={postCode}
                color={colors.black}
                label='PostCode'
                
                
                />
              </View>
              <View>
              <Input 
                placeholder='Amount'
                style={styles.input1}
                onChangeText={setAmount}
                value={amount}
                color={colors.black}
                label='Amount'
                />
              </View>
         

        

                        <Button
                onPress={()=>handleSubmit()}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                color={colors.success}
                >
                <Text bold white transform="uppercase">
                 PAGAR
                </Text>
              </Button>

         
        </View>

    </ScrollView>
        

      
    
    </ImageBackground>

  );
};



const styles = StyleSheet.create({

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
  input1: {

    borderRadius:100

    
   
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