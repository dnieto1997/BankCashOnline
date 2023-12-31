import React, { useState, useEffect } from 'react'
import {
  StyleSheet, View, Alert, Image, ImageBackground
} from 'react-native';

 import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Block, Button, Input, Switch, Modal, Text } from '../components/';
import { useData, useTheme, useTranslation } from '../hooks/';




const Login = ({ navigation }) => {
  const [usuario, guardarUsuario] = useState('')
  const [password, guardarPassword] = useState('')
  const { assets, colors, gradients, sizes } = useTheme();




  useEffect(() => {

    consumirApi()

  }, [])



  const register = () => {

    navigation.navigate('Register')
  }


  const consumirApi = async () => {


    try {


      const res = await fetch('http://62.72.19.116/api/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `${usuario}`,
          password: `${password}`,
        }),
      });

      const resJson = await res.json();
      const {account}=resJson
      console.log(resJson)

                if(resJson.message=='Invalid Credentials'){
                  mostrarAlerta()
                  return
                }else if(account.status=='Active'){
                  const token = resJson.token
                  const user = resJson.names
                  await AsyncStorage.setItem('token',token) 
                  await AsyncStorage.setItem('user',user) 
                  navigation.navigate('Home')
                  return
                }else if(account.status!='Active'){
                  inactive()
                  return
                }

    } catch (err) {
      console.log(err);
    }


  }




  const mostrarAlerta = () => {

    Alert.alert('Error', 'Usuario y contraseña incorrecta', [{ text: 'Ok' }])
  }

  const inactive = () => {

    Alert.alert('Error', 'Usuario Inactivo', [{ text: 'Ok' }])
  }





  return (

    <View style={{ flex: 1 }}>
      <ImageBackground source={require('../assets/images/bg2.jpeg')} style={{ flex: 1 }}>
        <View style={styles.contenedor}>

          <View style={{marginTop:'90%'}} >
            <View>
              <Input 
                placeholder='Email'
                style={styles.input1}
                onChangeText={guardarUsuario}
                value={usuario}
                color={colors.black}
                />
        </View>

            <View >
              <Input
                color={colors.black}
                placeholder='Password'
                style={styles.input2}
                onChangeText={guardarPassword}
                value={password}
                secureTextEntry={true} />

            </View>

    
          </View>
         <View style={{flexDirection:'row',marginRight:20, marginTop:30}}>
         
         
          <View >
              <Button
                onPress={() => consumirApi()}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.success}
        
              >
                <Text bold white transform="uppercase">
                  Ingresar
                </Text>
              </Button>
            </View>
          <View>
            <View>
              <Button
                onPress={() => register()}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.success}
              >
                <Text bold white transform="uppercase">
                  Registrarse
                </Text>
              </Button>
            </View>
          </View>
          </View>
        </View>
      </ImageBackground>
    </View>



  )
}


const styles = StyleSheet.create({

  input1: {

    backgroundColor: '#DAE1D7',
    borderRadius:100

    
   


  }, 
  input2: {
    
    backgroundColor: '#B1B8AD',
    marginTop:25,
    borderRadius:100


  }, imagen: {
    width: 260,
    height: 160,


  }, boton: {
    backgroundColor: '#C70039'

  }, btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase'


  },
  contenedor: {
    backgroundColor: 'transparent',
    marginTop: 60,
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 40
  }



})

export default Login
