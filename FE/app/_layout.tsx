import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { TabBarProvider } from '@/context/TabBarContext';
import Header from '@/components/ui/Header';
import TabBar from '@/components/ui/TabBar';
import { COLORS } from '@/constants/COLORS';

export default function RootLayout() {

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
