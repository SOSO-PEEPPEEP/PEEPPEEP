import React from 'react';
import { View, TouchableOpacity } from "react-native";
import GlobalText from '@/constants/GlobalText';
import { useRouter } from 'expo-router'; 
import { styles } from "@/styles/login.styles";

export default () => {
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