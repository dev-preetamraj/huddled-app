import { DarkTheme, DefaultTheme } from '@/constants/themes';
import useApolloClient from '@/hooks/useApolloClient';
import { store } from '@/store';
import { ApolloProvider } from '@apollo/client';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ClerkProvider
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        tokenCache={tokenCache}
      >
        <StatusBar style='auto' />
        <RootLayoutNav />
      </ClerkProvider>
    </Provider>
  );
}

function RootLayoutNav() {
  const { isSignedIn, isLoaded } = useAuth();
  const theme = useColorScheme();
  const client = useApolloClient();

  if (isLoaded && !isSignedIn) {
    setTimeout(() => router.push('/auth/login'));
  }

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <ApolloProvider client={client}>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='auth' options={{ headerShown: false }} />
          <Stack.Screen name='modals' options={{ headerShown: false }} />
          <Stack.Screen
            name='oauth-native-callback'
            options={{ headerShown: false }}
          />
        </Stack>
      </ApolloProvider>
    </ThemeProvider>
  );
}
