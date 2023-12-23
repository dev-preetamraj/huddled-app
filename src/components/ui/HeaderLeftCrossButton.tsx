import Colors from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';

const HeaderLeftCrossButton = () => {
  const theme = useColorScheme() ?? 'dark';
  return (
    <TouchableOpacity onPress={() => router.back()} className='mr-8'>
      <AntDesign name='close' color={Colors[theme].headerText} size={24} />
    </TouchableOpacity>
  );
};

export default HeaderLeftCrossButton;
