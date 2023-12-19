import { View, useColorScheme } from 'react-native';
import React from 'react';
import Text from '@/components/ui/Text';
import { SafeAreaView } from 'react-native-safe-area-context';
import SocialButton from '@/components/SocialButton';

const LoginScreen = () => {
  const theme = useColorScheme();
  return (
    <SafeAreaView className='flex-1'>
      <View className='flex space-y-2 my-10'>
        <Text className='text-center'>Login or Signup to continue</Text>
        <Text className='text-xl text-center font-semibold'>Huddled</Text>
      </View>
      <View className='mx-4 my-10'>
        <SocialButton provider='google' />
        <SocialButton provider='facebook' />
        <SocialButton provider='github' />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
