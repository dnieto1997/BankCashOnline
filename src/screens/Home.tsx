import React, {useCallback, useState,useEffect} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Input, Product} from '../components/';
import {View,Text,StyleSheet,Image,ImageBackground}
  from 'react-native'
  import AsyncStorage from '@react-native-async-storage/async-storage';
 
import ClaveDinamica from './ClaveDinamica';


const Home = ({navigation}) => {
;

const {assets, colors, gradients, sizes} = useTheme();
const[user,setUser] =useState<string>('')

     
  useEffect(()=>{
    const obtenerToken =async () =>{
    try {
      const userstorage:any =await AsyncStorage.getItem('user') 
      setUser(userstorage)
    
   
    } catch (error) {
      console.log(error)
      
    }
    
    }
    obtenerToken()
    
    },[])
    
    const abona = () => {

      navigation.navigate('Abona')
    }

    const tarjeta = () => {

      navigation.navigate('Tarjeta')
    }

    

    const retira = () => {

      navigation.navigate('Retira')
    }

    
    const remesas = () => {

      navigation.navigate('Remesas')
    }

    const movimientos = () => {

      navigation.navigate('Movimientos')
    }
    const cambio = () => {

      navigation.navigate('CambiosDivisas')
    }

    const envia = () => {

      navigation.navigate('Envia')
    }


  return (
    <ImageBackground source={require('../assets/images/bg.jpeg')} style={{flex:1}}>
   
   
   <View style={{marginTop:'42%'}}>
    <Text style={styles.texto3}>{user}</Text>
    </View>

<View style={styles.contenedor1}>
   
   
<Text style={styles.texto} >Mi saldo </Text>
</View>
<View > 
<Text style={styles.texto2}>$18.000</Text>
</View>


<View style={styles.contenedor4}>
<View style={{margin:10}} >
  <View  >
  <Button onPress={() => abona()} > 
    <Image source={require('../assets/images/consigna.png')} style={styles.imagen1}/>
    <Text style={styles.texto4}>consigna</Text>
  </Button>
  </View>
  <View  style={{marginTop:15}}>
  <Button onPress={() => movimientos()} > 
    <Image source={require('../assets/images/movimientos.png')} style={styles.imagen1}/>
    <Text style={styles.texto4}>movimientos</Text>
  </Button>
  </View>
  
  
</View>

<View style={{margin:10}}>
  <View  >
  <Button onPress={()=>retira()} > 
    <Image source={require('../assets/images/transfiere.png')} style={styles.imagen1}/>
    <Text style={styles.texto4}>transfiere </Text>
  </Button>
  </View>
  <View  style={{marginTop:15}} >
  <Button onPress={()=>tarjeta()} > 
    <Image source={require('../assets/images/tarjeta.png')} style={styles.imagen1}/>
    <Text style={styles.texto4}>tarjeta virtual </Text>
  </Button>
  </View>
  
  
</View>

<View style={{marginTop:10,marginLeft:15}}>
  <View  >
  <Button onPress={()=>remesas()} > 
    <Image source={require('../assets/images/remesas.png')} style={styles.imagen1}/>
    <Text style={styles.texto4}>Remesas </Text>
  </Button>
  </View>
  <View  style={{marginTop:15}} >
  <Button onPress={()=>cambio()} > 
    <Image source={require('../assets/images/pago.png')} style={styles.imagen1}/>
    <Text style={styles.texto4}>pagos </Text>
  </Button>
  </View>
  
  
</View>

</View>
 


    
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
texto:{
  color:'black',
  textAlign:'center',
  textTransform:'uppercase',
  fontSize:20,
  fontWeight:'bold',
},
texto2:{
  color:'black',
  textAlign:'center',
  textTransform:'uppercase',
  fontSize:40,
  fontWeight:'bold',
},
texto3:{
  color:'#fff',
  textAlign:'center',
  textTransform:'uppercase',
  fontSize:25,
  fontWeight:'bold',
},
contenedor1:{
  marginTop:35
},
imagen1:{
  width:60,
  height:60,
  borderRadius:100,

},texto4:{
  color:'green',
  textAlign:'center',
  textTransform:'uppercase',
  fontSize:13,
  fontWeight:'bold',
},contenedor3:{
  width:180,
  height:60,
  borderRadius:10,
  shadowColor: "#000",
  backgroundColor:'#fff',
 

},
imagen:{
  width:20,
  height:20
}, contenedor4:{
  flexDirection:'row',
  marginTop:40
}

})
export default Home;
