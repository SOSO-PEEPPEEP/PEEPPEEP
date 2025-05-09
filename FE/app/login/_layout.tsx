import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
      <Stack screenOptions={{
          headerShown: false,
          animation: 'none', // 애니메이션 제거
        }} 
      />
  );
}