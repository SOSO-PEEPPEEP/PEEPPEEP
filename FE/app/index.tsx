import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import Loading from '@/components/common/Loading';

export default function Index() {

  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login'); // ✅ 라우터가 마운트된 후 이동
    }, 8000); // 딜레이

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* <ActivityIndicator size="large" /> */}
      <Loading />
    </View>
  );
}