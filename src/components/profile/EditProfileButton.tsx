import { TouchableOpacity, useColorScheme } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Text from '../ui/Text';

const EditProfileButton = () => {
  const theme = useColorScheme() ?? 'dark';

  return (
    <TouchableOpacity className='bg-secondaryLight dark:bg-secondaryDark flex flex-row items-center space-x-1 p-2 rounded-sm mx-2'>
      <Ionicons
        name='pencil-sharp'
        size={24}
        color={Colors[theme].headerText}
      />
      <Text header className='font-semibold'>
        Edit profile
      </Text>
    </TouchableOpacity>
  );
};

export default EditProfileButton;
