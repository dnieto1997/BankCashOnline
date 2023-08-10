import React, {useCallback, useState,useEffect} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Input, Product} from '../components/';
import {View,Text,StyleSheet,Image}
  from 'react-native'
  import AsyncStorage from '@react-native-async-storage/async-storage';

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

    

    const retira = () => {

      navigation.navigate('Retira')
    }

    const cambio = () => {

      navigation.navigate('CambiosDivisas')
    }

    const envia = () => {

      navigation.navigate('Envia')
    }


  return (
    <View style={{backgroundColor:'#fff',flex:1}}>
    

    <View style={styles.contenedor1}>
   
    <Text style={styles.texto3}>{user}</Text>

</View >
<View style={styles.contenedor1}>
   
   
<Text style={styles.texto} >Mi saldo </Text>

</View>

<View >
   

<Text style={styles.texto2}>$1.000.000 </Text>
</View>

<View style={{flexDirection:'row',margin:30}}>
<View style={{margin:30}}>
  <View  >
  <Button onPress={() => abona()} > 
    <Image source={require('../assets/images/abono.png')} style={styles.imagen1}/>
    <Text style={styles.texto4}>Abona Dinero </Text>
  </Button>
  </View>
  <View style={{marginTop:20}}>
  <Button onPress={() => retira()} > 
    <Image source={require('../assets/images/retira.png')} style={styles.imagen1}/>
    <Text style={styles.texto4}>Retira Dinero </Text>
  </Button>
  </View>
 
</View>


  
 
<View  style={{margin:30}}>

<View >
  <Button onPress={() => envia()} > 
    <Image source={require('../assets/images/envia.png')} style={styles.imagen1}/>
    <Text style={styles.texto4}>Envia Dinero </Text>
  </Button>
 
</View>

<View  style={{marginTop:20}}>
  <Button onPress={() => cambio()} > 
    <Image source={require('../assets/images/cambio.png')} style={styles.imagen1}/>
    <Text style={styles.texto4}>Cambios de Divisas </Text>
  </Button>
 
</View>
</View>
</View>
    </View>
  );
};
const styles = StyleSheet.create({
texto:{
  color:'green',
  textAlign:'center',
  textTransform:'uppercase',
  fontSize:20,
  fontWeight:'bold',
},
texto2:{
  color:'black',
  textAlign:'center',
  textTransform:'uppercase',
  fontSize:30,
  fontWeight:'bold',
},
texto3:{
  color:'green',
  textAlign:'center',
  textTransform:'uppercase',
  fontSize:25,
  fontWeight:'bold',
},
contenedor1:{
  margin:20
},
imagen1:{
  width:60,
  height:60,
  borderRadius:100,
  backgroundColor:'#358C0F'
},texto4:{
  color:'green',
  textAlign:'center',
  textTransform:'uppercase',
  fontSize:13,
  fontWeight:'bold',
}

})
export default Home;
