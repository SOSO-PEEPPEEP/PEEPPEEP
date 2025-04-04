import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router'; 
import { styles } from "@/styles/login.styles";

export default function Index() {
  //font loading
  const [fontsLoaded] = useFonts({
    'PF stardust ExtraBold': require('@/assets/fonts/PFstardust3.0ExtraBold.ttf'),
  });
  
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
        <Text style={styles.pageTitle}>계정 및 비밀번호 찾기</Text>
        <Text style={styles.pageTitle}>▼ 입력한 정보와 일치하는 계정 확인</Text>
        <Text style={[styles.pageTitle, {color: '#d3d3dd', padding: 10}]}>ID 출력 박스</Text>
        <TouchableOpacity style={styles.agreeButton} onPress={login}>
          <Text style={styles.buttonText}>로그인 하러 가기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomMargin}></View>
    </View>
  );
};