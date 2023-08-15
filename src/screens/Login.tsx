import React, { useState, useEffect } from 'react'
import {
  StyleSheet, View,Alert,Image,ImageBackground
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Block, Button, Input, Switch, Modal, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';




const Login = ({navigation}) => {
  const [usuario, guardarUsuario] = useState('')
  const [password, guardarPassword] = useState('')
  const {assets, colors, gradients, sizes} = useTheme();




  useEffect(() => {

    consumirApi()

  }, [])


     
  const register = () => {

    navigation.navigate('Register')
  }


  const consumirApi = async () => {


    try {


      const res = await fetch('http://129.80.238.214:3000/api/auth/login/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: `${usuario}`,
          password: `${password}`,
        }),
      });


      const resJson = await res.json();
      const token = resJson.token
      console.log(token)
      

      const res2 = await fetch(
        'http://129.80.238.214:3000/api/menu',
        {
          method: 'GET',
          headers: {
            'x-token': `${token}`,
          }
        },
      );


      const { tipo, status } = await res2.json();
   



     if (status === 1 && tipo === "MA") {

        await AsyncStorage.setItem('token', token)
        await AsyncStorage.setItem('user', usuario)
        await AsyncStorage.setItem('password', password)

        navigation.navigate('Home')

      } else if (status === 1 && tipo === "TE") {
   
        await AsyncStorage.setItem('user', usuario)


        navigation.navigate('Home')
      
      }else if(resJson.msg=="Usuario/Password no son correctos"){
        mostrarAlerta()
      }

      return





    } catch (err) {
      console.log(err);
    }


  }




  const mostrarAlerta = () => {

    Alert.alert('Error', 'Usuario y contraseña incorrecta', [{ text: 'Ok' }])
  }







  return (
    
<View style={{flex:1}}>
<ImageBackground source={require('../assets/images/bg.jpeg')} style={{flex:1}}>
    <View style={styles.contenedor}>
 
<Image source={require('../assets/images/logo1.png')} style={styles.imagen} />  

<View style={{marginTop:30}}>
<View style={{marginBottom:20}}>
<Input  label="Email"
        placeholder='Email'
        style={styles.input}
        onChangeText={guardarUsuario}
        value={usuario} />
</View>

<View style={{marginBottom:20}}>
<Input 
color={colors.black}
         label="Password"
         placeholder='Password'
         style={styles.input}
         onChangeText={guardarPassword}
         value={password}
         secureTextEntry={true} />

</View>
     
<View style={{marginBottom:20}}>
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
              </View>

              <View>
                <View>
                  <Text>No tienes un usuario, Registrate?</Text>
                </View>
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
    </ImageBackground>
    </View>
   


  )
}


const styles = StyleSheet.create({

  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
    

  }, imagen: {
    width:260,
    height:80,
    
    
  }, boton: {
    backgroundColor: '#C70039'

  }, btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase'


  },
  contenedor:{
    backgroundColor:'#FFF',
    marginHorizontal:10,
    marginTop:30,
    borderRadius:20,
    paddingVertical:40,
    paddingHorizontal:40,
    transform: [{translateY:80}],
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5
}



})

export default Login
