import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import '@/global.css';

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
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
