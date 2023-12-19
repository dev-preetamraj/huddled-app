import { View, TouchableOpacity, useColorScheme } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { cva, VariantProps } from 'class-variance-authority';
import Text from './ui/Text';
import { useWarmUpBrowser } from '@/hooks/warmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import { router } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

const socialButtonProps = cva(
  'flex flex-row items-center justify-between p-4 rounded-md mt-6',
  {
    variants: {
      provider: {
        google: 'bg-red-800',
        facebook: 'bg-blue-900',
        github: 'bg-gray-900',
      },
    },
  }
);

type Props = VariantProps<typeof socialButtonProps>;

const SocialButton: React.FC<Props> = ({ provider }) => {
  useWarmUpBrowser();
  const theme = useColorScheme();

  const { startOAuthFlow } = useOAuth({ strategy: `oauth_${provider!}` });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.push('/');
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return (
    <TouchableOpacity
      className={socialButtonProps({ provider })}
      onPress={onPress}
    >
      <View className='flex flex-row items-center space-x-2'>
        <Ionicons
          name={provider ? `md-logo-${provider}` : 'md-logo-google'}
          size={24}
          color={Colors[theme ?? 'dark'].text}
        />
        <Text className='text-lg'>
          Continue with{' '}
          {provider &&
            provider?.substring(0, 1).toUpperCase() + provider?.substring(1)}
        </Text>
      </View>
      <Ionicons
        name='arrow-forward'
        size={24}
        color={Colors[theme ?? 'dark'].text}
      />
    </TouchableOpacity>
  );
};

export default SocialButton;
