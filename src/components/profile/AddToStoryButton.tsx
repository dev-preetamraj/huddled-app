import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';
import Text from '../ui/Text';

const AddToStoryButton = () => {
  const theme = useColorScheme() ?? 'dark';
  return (
    <TouchableOpacity className='bg-primaryLight dark:bg-primaryDark h-10 w-[40%] flex flex-row items-center justify-center space-x-2 rounded-sm'>
      <Ionicons name='add' size={24} color={Colors[theme].headerText} />
      <Text header className='font-semibold'>
        Add to story
      </Text>
    </TouchableOpacity>
  );
};

export default AddToStoryButton;
