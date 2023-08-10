import React, { useState, useEffect } from 'react'
import {
  StyleSheet, View,Alert,Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Block, Button, Input, Switch, Modal, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';


const Abona = () => {
  return (
   <View style={{backgroundColor:'#fff',flex:1}}> 

   
<View style={{margin:30}}> 
<Input  label="Nombre"
        placeholder='Nombre'
       />
</View>
     <View style={{margin:30}}> 
<Input  label="Cuanto vas Abonar"
        placeholder='Monto'
       />
</View>

<View style={{margin:30}}> 
<Input  label="Numero de Cuenta"
        placeholder='Cuenta'
       />
</View>


<View style={{marginTop:20}}>
  <Button /* onPress={() => retira()}  */> 
    <Image source={require('../assets/images/retira.png')} style={styles.imagen1}/>
    <Text style={styles.texto4}>Abona Dinero </Text>
  </Button>
  </View>
    
   </View>
  )
}
const styles = StyleSheet.create({
 
  imagen1:{
    width:60,
    height:60,
    borderRadius:100,
    backgroundColor:'#358C0F'
  },texto4:{
    color:'black',
    textAlign:'center',
    textTransform:'uppercase',
    fontSize:13,
    fontWeight:'bold',
  }
  
  })
export default Abona