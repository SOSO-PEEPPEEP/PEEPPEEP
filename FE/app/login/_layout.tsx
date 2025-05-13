import React from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'PF-Stardust': require('@/assets/fonts/PFstardust3.0.ttf'),
    'PF-Stardust-Bold': require('@/assets/fonts/PFstardust3.0Bold.ttf'),
    'PF-Stardust-ExtraBold': require('@/assets/fonts/PFstardust3.0ExtraBold.ttf'),
  });
  if (!fontsLoaded) return null;

  return (
      <Stack screenOptions={{
          headerShown: false,
          animation: 'none', // 애니메이션 제거
        }} 
      />
  );
}