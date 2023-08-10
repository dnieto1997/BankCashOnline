import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Abona, Articles, Components, Home, Profile, Register,Envia, Retira, CambiosDivisas} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';
import Login from '../screens/Login';
import Tarjeta from '../screens/Tarjeta';



const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack} initialRouteName='Login'>


<Stack.Screen
        name="Login"
        component={Login}
        options ={(navigation)=>({
       
          headerTitleAlign:'center', headerShown: false
       
       
            })}
      />


      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: t('navigation.home')}}
      />
      
      <Stack.Screen
        name="Abona"
        component={Abona}
        options={{title: t('navigation.abona')}}
      />

       <Stack.Screen
        name="Envia"
        component={Envia}
        options={{title: t('navigation.envia')}}
      />

      <Stack.Screen
        name="Retira"
        component={Retira}
        options={{title: t('navigation.retira')}}
      />

     <Stack.Screen
        name="CambiosDivisas"
        component={CambiosDivisas}
        options={{title: t('navigation.cambios')}}
      />



      <Stack.Screen
        name="Components"
        component={Components}
        options={screenOptions.components}
      />

      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{title: t('navigation.articles')}}
      />


      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

<Stack.Screen
        name="Tarjeta"
        component={Tarjeta}
     
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};