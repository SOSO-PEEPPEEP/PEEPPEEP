import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput } from "react-native";
import GlobalText from '@/constants/GlobalText';
import { FONT } from '@/constants/FONT';
import { useRouter } from 'expo-router'; 
import { styles } from "@/styles/login.styles";

export default () => {
  //인증번호 인증 후 페이지 이동
  const [verificationCode, setverificationCode] = useState('');
  const [errorMsg, setErrorMsg] = useState(false); 
  
  const router = useRouter();

  const nextButton = () => {
    if(!verificationCode || verificationCode.length != 6){
      setErrorMsg(true);
    } else {
      setErrorMsg(false);
      router.push('/login/findAccount/newPassword');
    }
  };
  
  const backButton = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}></View>
      <View style={styles.topMargin}></View>
      {/* contents */}
      <View style={styles.contents}>
        <GlobalText style={styles.pageTitle}>계정 및 비밀번호 찾기</GlobalText>
        <GlobalText style={styles.pageTitle}>▼ 이메일로 전송된 인증번호 입력</GlobalText>
        <TextInput style={[styles.inputBox, {fontFamily: FONT.default}]} placeholder="인증번호 6자리 숫자 입력" value={verificationCode} onChangeText={setverificationCode} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" keyboardType="numeric"></TextInput>
        {errorMsg && (
          <View style={styles.msgBox}>
            <GlobalText style={styles.errorMsg}>※ 인증번호 6자리 숫자를 입력해주세요.</GlobalText>
          </View>
        )}
        <TouchableOpacity style={styles.nextButton} onPress={nextButton}>
          <GlobalText style={styles.buttonText}>다음</GlobalText>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomMargin}></View>
      <View style={styles.bottomOuterMargin}></View>
      <View>
        <View style={styles.bottomContents}>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity onPress={backButton}>
              <GlobalText style={styles.bottomContentsText}>로그인 창으로 돌아가기</GlobalText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};