import React from 'react';
import { View, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import GlobalText from '@/constants/GlobalText';
import { FONT } from '@/constants/FONT';
import { useRouter } from 'expo-router'; 
import { styles } from "@/styles/login.styles";

export default function Index() {
  //font loading  
  const [fontsLoaded] = useFonts({
      'PF-Stardust': require('@/assets/fonts/PFstardust3.0.ttf'),
      'PF-Stardust-Bold': require('@/assets/fonts/PFstardust3.0Bold.ttf'),
      'PF-Stardust-ExtraBold': require('@/assets/fonts/PFstardust3.0ExtraBold.ttf'),
  });
  if (!fontsLoaded) return null;
  
  const router = useRouter();

  const login = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}></View>
      <View style={styles.topMargin}></View>
      {/* contents */}
      <View style={styles.contents}>
        <GlobalText style={styles.pageTitle}>계정 및 비밀번호 찾기</GlobalText>
        <GlobalText style={styles.pageTitle}>▼ 입력한 정보와 일치하는 계정 확인</GlobalText>
        <GlobalText style={[styles.pageTitle, {color: '#d3d3dd', padding: 10}]}>ID 출력 박스</GlobalText>
        <TouchableOpacity style={styles.agreeButton} onPress={login}>
          <GlobalText style={styles.buttonText}>PEEP과 통신하기</GlobalText>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomMargin}></View>
    </View>
  );
};