import React, { useCallback, useEffect, useState } from 'react';
import { Linking, Platform,ImageBackground,Alert,View} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { useData, useTheme, useTranslation } from '../hooks/';
import * as regex from '../constants/regex';
import { Block, Button, Input, Image, Text, Checkbox } from '../components/';

const isAndroid = Platform.OS === 'android';

interface IRegistration {
  name: string;
  lastname: string;
  numdoc: string;
  email: string;
  password: string;
  phone:string;
  agreed: boolean;
}
interface IRegistrationValidation {
  name: boolean;
  lastname: boolean;
  numdoc: boolean;
  email: boolean;
  password: boolean;
  phone:boolean;
  agreed: boolean;
}

const Register = () => {
  const { isDark } = useData();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    name: false,
    lastname: false,
    numdoc: false,
    email: false,
    password: false,
    phone: false,
    agreed: false
  });
  const [registration, setRegistration] = useState<IRegistration>({
    name: '',
    lastname: '',
    numdoc: '',
    email: '',
    password: '',
    phone: '',
    
    agreed: false
  });
  const { assets, colors, gradients, sizes } = useTheme();

  const handleChange = useCallback(
    (value) => {
      setRegistration((state) => ({ ...state, ...value }));
    },
    [setRegistration],
  );



  const handleSignUp = async () => {
    const registrationData = {
      names:registration.name,
      surnames:registration.lastname,
      numDocument:registration.numdoc,
      email:registration.email,
      password:registration.password,
      cellphone:registration.phone,
     
    };

    try {
      const response = await fetch('http://62.72.19.116/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const responseData = await response.json();
      console.log('Respuesta de la API:', responseData);

      if (response.ok) {
        Alert.alert('Registration Success', 'You have been successfully registered!', [
          { text: 'OK', onPress: () => navigation.navigate('Login') }, // Cambia 'Login' por el nombre correcto de tu pantalla de inicio de sesión
        ]);
      } else {
        // Manejo de errores si la API devuelve un error
      }

      // Aquí podrías mostrar un mensaje de éxito al usuario o redirigir a otra pantalla.
    } catch (error) {
      console.error('Error al registrar:', error);
      // Aquí podrías mostrar un mensaje de error al usuario.
    }
  }
  


  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(registration.name),
      email: regex.email.test(registration.email),
      password: regex.password.test(registration.password),
      lastname: regex.name.test(registration.lastname),
      numdoc: regex.numdoc.test(registration.numdoc),
      phone: regex.phone.test(registration.phone),
      agreed: registration.agreed,

   
    }));
  }, [registration, setIsValid]);

  return (

    <ImageBackground source={require('../assets/images/bg.jpeg')} style={{flex:1}}>

    <Block safe marginTop={sizes.xxl}>
      <Block paddingHorizontal={sizes.xs}>
        <Block flex={0} style={{ zIndex: 0 }}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            
            height={sizes.height * 0.4}>
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
                transform={[{ rotate: '180deg' }]}
              />
              <Text p white marginLeft={sizes.s}>
                {t('common.goBack')}
              </Text>
            </Button>

          
          </Image>
        </Block>

        <Block
          keyboard
          behavior={!isAndroid ? 'padding' : 'height'}
          marginTop={-(sizes.height * 0.2 - sizes.l)}>
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block
              blur
              flex={0}
              intensity={150}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}>

              <Block
                row
                flex={0}
                align="center"
                justify="center"
                marginBottom={sizes.sm}
                paddingHorizontal={sizes.xxl}>
                <Block
                  flex={0}
                  height={1}
                  width="50%"
                  end={[1, 0]}
                  start={[0, 1]}
                  gradient={gradients.divider}
                />

                <Block
                  flex={0}
                  height={1}
                  width="50%"
                  end={[0, 1]}
                  start={[1, 0]}
                  gradient={gradients.divider}
                />
              </Block>
              {/* form inputs */}
              <Block paddingHorizontal={sizes.sm}>
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label='Names'
                  placeholder='Names'
                  success={Boolean(registration.name && isValid.name)}
                  danger={Boolean(registration.name && !isValid.name)}
                  onChangeText={(value) => handleChange({ name: value })}
                  color={colors.black}
                />

                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label='Last Names'
                  placeholder='Last Names'
                  success={Boolean(registration.lastname && isValid.lastname)}
                  danger={Boolean(registration.lastname && !isValid.lastname)}
                  onChangeText={(value) => handleChange({ lastname: value })}
                  color={colors.black}
                />
                <Input
                   
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label='ID Number'
                  placeholder='ID Number'
                  success={Boolean(registration.numdoc && isValid.numdoc)}
                  danger={Boolean(registration.numdoc && !isValid.numdoc)}
                  onChangeText={(value) => handleChange({ numdoc: value })}
                  color={colors.black}
                />
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('common.email')}
                  keyboardType="email-address"
                  placeholder={t('common.emailPlaceholder')}
                  success={Boolean(registration.email && isValid.email)}
                  danger={Boolean(registration.email && !isValid.email)}
                  onChangeText={(value) => handleChange({ email: value })}
                  color={colors.black}
                />
                <Input
                  secureTextEntry
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('common.password')}
                  placeholder={t('common.passwordPlaceholder')}
                  onChangeText={(value) => handleChange({ password: value })}
                  success={Boolean(registration.password && isValid.password)}
                  danger={Boolean(registration.password && !isValid.password)}
                  color={colors.black}
                />


                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label='CellPhone'
                  placeholder='Cell Phone'
                  success={Boolean(registration.phone && isValid.phone)}
                  danger={Boolean(registration.phone && !isValid.phone)}
                  onChangeText={(value) => handleChange({ phone: value })}
                  color={colors.black}
           
                />

                
              </Block>
              {/* checkbox terms */}
              <Block row flex={0} align="center" paddingHorizontal={sizes.sm}>
                <Checkbox
                  marginRight={sizes.sm}
                  checked={registration?.agreed}
                  onPress={(value) => handleChange({ agreed: value })}
                />
                
              </Block>
              <Button
                onPress={handleSignUp}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                color={colors.success}
                disabled={Object.values(isValid).includes(false)}>
                <Text bold white transform="uppercase">
                  {t('common.signup')}
                </Text>
              </Button>
    
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
    
    </ImageBackground>
  );
};

export default Register;
