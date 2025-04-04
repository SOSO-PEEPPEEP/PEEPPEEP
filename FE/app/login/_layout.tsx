import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [selectedTabIdx, setSelectedTabIdx] = useState(2);

  const [fontsLoaded] = useFonts({
    'PF stardust ExtraBold': require('@/assets/fonts/PFstardust3.0ExtraBold.ttf'),
  });

  return (
      <Stack screenOptions={{
          headerShown: false,
          animation: 'none', // 애니메이션 제거
        }} 
      />
  );
}