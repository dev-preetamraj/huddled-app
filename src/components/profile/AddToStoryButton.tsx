import { TouchableOpacity, useColorScheme } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Text from '../ui/Text';

const AddToStoryButton = () => {
  const theme = useColorScheme() ?? 'dark';
  return (
    <TouchableOpacity className='bg-primaryLight dark:bg-primaryDark flex flex-row items-center space-x-1 p-2 rounded-sm'>
      <Ionicons name='add' size={24} color={Colors[theme].headerText} />
      <Text header className='font-semibold'>
        Add to story
      </Text>
    </TouchableOpacity>
  );
};

export default AddToStoryButton;
