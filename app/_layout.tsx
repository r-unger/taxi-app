import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import '@/global.css';

// imports for the ClerkProvider
import { tokenCache } from '@/lib/cache'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
// not needed here
// import { Slot } from 'expo-router'

// for the ClerkProvider
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
if (!publishableKey) {
  throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    'Asap-Bold': require('../assets/fonts/Asap-Bold.ttf'),
    'Asap-ExtraBold': require('../assets/fonts/Asap-ExtraBold.ttf'),
    'Asap-ExtraLight': require('../assets/fonts/Asap-ExtraLight.ttf'),
    'Asap-Light': require('../assets/fonts/Asap-Light.ttf'),
    'Asap-Medium': require('../assets/fonts/Asap-Medium.ttf'),
    'Asap': require('../assets/fonts/Asap-Regular.ttf'),
    'Asap-SemiBold': require('../assets/fonts/Asap-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
