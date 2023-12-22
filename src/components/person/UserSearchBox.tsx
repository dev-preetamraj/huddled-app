import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

const UserSearchBox = () => {
  const theme = useColorScheme() ?? 'dark';

  return (
    <View className='border-b border-primaryLight dark:border-primaryDark py-2 m-4 flex flex-row items-center justify-between space-x-2'>
      <TextInput
        placeholder='Type name, username or email...'
        placeholderTextColor={Colors[theme].text}
        cursorColor={Colors[theme].primary}
        className='flex-1 text-textLight dark:text-textDark'
      />
      <TouchableOpacity>
        <Ionicons name='search' size={24} color={Colors[theme].headerText} />
      </TouchableOpacity>
    </View>
  );
};

export default UserSearchBox;
