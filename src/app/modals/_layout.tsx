import { Stack } from 'expo-router';

const ModalsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='profile/update-bio'
        options={{
          title: 'Update bio',
        }}
      />
      <Stack.Screen
        name='profile/update-profile'
        options={{
          title: 'Update profile',
        }}
      />
    </Stack>
  );
};

export default ModalsLayout;
