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
    </Stack>
  );
};

export default ModalsLayout;
