import Button from '@/components/ui/Button';
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

const FriendsScreen = () => {
  return (
    <View className='flex-1'>
      <View className='m-4'>
        <Button
          title='Discover more...'
          onPress={() => router.push('/modals/person/discover')}
        />
      </View>
    </View>
  );
};

export default FriendsScreen;
