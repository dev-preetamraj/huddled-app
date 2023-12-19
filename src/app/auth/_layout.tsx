import React from 'react';
import { Stack, router } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

const AuthLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (isLoaded && isSignedIn) {
    setTimeout(() => router.push('/'));
  }
  return (
    <Stack>
      <Stack.Screen name='login' options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
