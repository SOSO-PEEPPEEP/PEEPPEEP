import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import Header from '@/layout/Header';
import { TabBarProvider } from '@/context/TabBarContext';
import { styles } from "@/assets/styles/Styles";
import TabBar from "@/layout/TabBar";

export default function RootLayout() {
  const [selectedTabIdx, setSelectedTabIdx] = useState(2);

  const [fontsLoaded] = useFonts({
    'PF stardust ExtraBold': require('@/assets/fonts/PFstardust-ExtraBold.ttf'),
  });

  return (
    <TabBarProvider>
        <View style={styles.outerContainer}>
          <Header />
            <Stack screenOptions={{
                headerShown: false,
                animation: 'none', // ← 애니메이션 제거
            }} />
            <TabBar
                selectedTabIdx={selectedTabIdx}
                setSelectedTabIdx={setSelectedTabIdx}
            />
        </View>
      </TabBarProvider>
  );
}