import { Stack } from 'expo-router';
import { View, AppState, Platform, BackHandler } from 'react-native';
import { useFonts } from 'expo-font';
import { TabBarProvider } from '@/context/TabBarContext';
import Header from '@/components/ui/Header';
import TabBar from '@/components/ui/TabBar';
import { COLORS } from '@/constants/COLORS';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS !== "web") {
      // 앱 종료 기록
      const appStateSub = AppState.addEventListener("change", (state) => {
        if (state === "background") {
          AsyncStorage.setItem("appClosed", "true");
        }
      });

      // 안드로이드 뒤로가기 막기
      const backHandlerSub = BackHandler.addEventListener("hardwareBackPress", () => {
        return true;
      });

      return () => {
        appStateSub.remove();
        backHandlerSub.remove();
      };
    }
  }, []);

  const [fontsLoaded] = useFonts({
    'PF-Stardust': require('@/assets/fonts/PFstardust3.0.ttf'),
    'PF-Stardust-Bold': require('@/assets/fonts/PFstardust3.0Bold.ttf'),
    'PF-Stardust-ExtraBold': require('@/assets/fonts/PFstardust3.0ExtraBold.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <TabBarProvider>
      <View style={{
          flex: 1,
          backgroundColor: COLORS.gray,
          padding: 4
        }}>
        <Header />
        <Stack screenOptions={{
          headerShown: false,
          animation: 'none',
        }} />
        <TabBar/>
      </View>
    </TabBarProvider>
  );
}
