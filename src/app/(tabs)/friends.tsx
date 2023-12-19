import { View, Text } from 'react-native';
import React from 'react';
import Button from '@/components/ui/Button';
import { router } from 'expo-router';

const FriendsScreen = () => {
  return (
    <View>
      <Text>FriendsScreen</Text>
      <Button title='Home' className='mx-4' onPress={() => router.push('/')} />
    </View>
  );
};

export default FriendsScreen;
