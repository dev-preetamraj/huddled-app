import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { View, useColorScheme } from 'react-native';
import Text from '../ui/Text';

const EditProfileButton = () => {
  const theme = useColorScheme() ?? 'dark';

  return (
    <Link href='/modals/profile/update-profile' className='mx-2'>
      <View className='bg-secondaryLight dark:bg-secondaryDark flex flex-row items-center space-x-1 p-2 rounded-sm'>
        <Ionicons
          name='pencil-sharp'
          size={24}
          color={Colors[theme].headerText}
        />
        <Text header className='font-semibold'>
          Edit profile
        </Text>
      </View>
    </Link>
  );
};

export default EditProfileButton;
