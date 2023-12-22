import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';
import Text from '../ui/Text';

const EditProfileButton = () => {
  const theme = useColorScheme() ?? 'dark';

  return (
    <Link href='/modals/profile/update/' asChild>
      <TouchableOpacity className='bg-secondaryLight dark:bg-secondaryDark h-10 w-[40%] flex flex-row items-center justify-center space-x-2 rounded-sm'>
        <Ionicons
          name='pencil-sharp'
          size={24}
          color={Colors[theme].headerText}
        />
        <Text header className='font-semibold'>
          Edit profile
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default EditProfileButton;
