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

  //인증번호 인증 후 페이지 이동
  const [verificationCode, setverificationCode] = useState('');
  const [errorMsg, setErrorMsg] = useState(false); 
  
  const router = useRouter();

  const nextButton = () => {
    if(!verificationCode || verificationCode.length != 6){
      setErrorMsg(true);
    } else {
      setErrorMsg(false);
      router.push('/login/findAccount/findId');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}></View>
      <View style={styles.topMargin}></View>
      {/* contents */}
      <View style={styles.contents}>
        <Text style={styles.pageTitle}>계정 및 비밀번호 찾기</Text>
        <Text style={styles.pageTitle}>▼ 이메일로 전송된 인증번호 입력</Text>
        <TextInput style={styles.inputBox} value={verificationCode} onChangeText={setverificationCode} placeholder="인증번호 6자리 숫자 입력" placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" keyboardType="numeric"></TextInput>
        {errorMsg && (
          <View style={styles.msgBox}>
            <Text style={styles.errorMsg}>※ 인증번호 6자리 숫자를 입력해주세요.</Text>
          </View>
        )}
        <TouchableOpacity style={styles.nextButton} onPress={nextButton}>
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomMargin}></View>
    </View>
  );
};