import React from 'react'
import {
  StyleSheet, View,Alert,Image,ImageBackground
} from 'react-native';

import {Block, Button, Input,  Text, Checkbox} from '../components/';
import {useNavigation} from '@react-navigation/core';
import {useData, useTheme, useTranslation} from '../hooks/';



const Remesas = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, gradients, sizes} = useTheme();

  return (

    <ImageBackground source={require('../assets/images/bg.jpeg')} style={{flex:1}}> 
          <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                width={10}
                height={18}
                color={colors.white}
                source={assets.arrow}
                transform={[{rotate: '180deg'}]}
              />
              <Text p white marginLeft={sizes.s}>
                {t('common.goBack')}
              </Text>
            </Button>
    <View> 
    <Text>remesas</Text>
        
       </View>
       </ImageBackground>
  )
}

export default Remesas