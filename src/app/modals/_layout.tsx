import HeaderLeftCrossButton from '@/components/ui/HeaderLeftCrossButton';
import { Stack } from 'expo-router';

const ModalsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='profile/update/index'
        options={{
          title: 'Update profile',
          headerLeft: () => <HeaderLeftCrossButton />,
        }}
      />
      <Stack.Screen
        name='profile/update/update-bio'
        options={{
          title: 'Update bio',
          headerLeft: () => <HeaderLeftCrossButton />,
        }}
      />
      <Stack.Screen
        name='profile/update/update-username'
        options={{
          title: 'Username',
          headerLeft: () => <HeaderLeftCrossButton />,
        }}
      />
      <Stack.Screen
        name='profile/update/update-gender'
        options={{
          title: 'Gender',
          headerLeft: () => <HeaderLeftCrossButton />,
        }}
      />
      <Stack.Screen
        name='profile/update/update-relationship'
        options={{
          title: 'Relationship',
          headerLeft: () => <HeaderLeftCrossButton />,
        }}
      />
      <Stack.Screen
        name='person/discover'
        options={{
          title: 'Discover people',
        }}
      />
      <Stack.Screen
        name='person/sent-requests'
        options={{
          title: 'Sent requests',
        }}
      />
      <Stack.Screen name='profile/detail/[userId]' />
    </Stack>
  );
};

export default ModalsLayout;
