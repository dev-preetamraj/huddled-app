import LogoutIconButton from '@/components/LogoutIconButton';
import Colors from '@/constants/Colors';
import useServerUser from '@/hooks/useServerUser';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Image, useColorScheme } from 'react-native';

export default function TabLayout() {
  const theme = useColorScheme();
  const { serverUser } = useServerUser();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme ?? 'dark'].primary,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Huddled',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home-outline' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='friends'
        options={{
          title: 'Friends',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='person-outline' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='chat'
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='chatbox-outline' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='notifications'
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='notifications-outline' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => {
            if (serverUser) {
              return (
                <Image
                  source={{ uri: serverUser?.profilePicture! }}
                  className='w-6 h-6 rounded-full'
                />
              );
            }
            return (
              <Ionicons
                name='person-circle-outline'
                color={color}
                size={size}
              />
            );
          },
          headerRight: () => <LogoutIconButton />,
        }}
      />
    </Tabs>
  );
}
