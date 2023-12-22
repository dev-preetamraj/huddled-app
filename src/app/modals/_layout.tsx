import { Stack } from 'expo-router';

const ModalsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='profile/update/index'
        options={{
          title: 'Update profile',
        }}
      />
      <Stack.Screen
        name='profile/update/update-bio'
        options={{
          title: 'Update bio',
        }}
      />
      <Stack.Screen
        name='profile/update/update-username'
        options={{
          title: 'Username',
        }}
      />
      <Stack.Screen
        name='person/discover'
        options={{
          title: 'Discover people',
        }}
      />
      <Stack.Screen name='profile/detail/[userId]' />
    </Stack>
  );
};

export default ModalsLayout;
