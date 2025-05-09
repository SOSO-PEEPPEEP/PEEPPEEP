import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import Loading from '@/components/common/Loading';
import { useFonts } from 'expo-font';

export default () => {
  const [fontsLoaded] = useFonts({
      'PF-Stardust': require('@/assets/fonts/PFstardust3.0.ttf'),
      'PF-Stardust-Bold': require('@/assets/fonts/PFstardust3.0Bold.ttf'),
      'PF-Stardust-ExtraBold': require('@/assets/fonts/PFstardust3.0ExtraBold.ttf'),
  });

  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login'); // ✅ 라우터가 마운트된 후 이동
    }, 8000); // 딜레이

    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded) return null;

  return (
    <View style={{flex: 1}}>
      {/* <ActivityIndicator size="large" /> */}
      <Loading />
    </View>
  );
}