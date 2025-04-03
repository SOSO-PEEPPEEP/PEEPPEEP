import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router'; 
import { styles } from "@/styles/login.styles";

export default function Index() {
  //font loading
  const [fontsLoaded] = useFonts({
    'PF stardust ExtraBold': require('@/assets/fonts/PFstardust3.0ExtraBold.ttf'),
  });

  //로그인 시 main 페이지 이동 또는 에러메세지 출력
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg , setErrorMsg] = useState(false);

  const router = useRouter();

  const login = () => {
    if (!loginId || !password) {
      setErrorMsg(true);
    } else {
      setErrorMsg(false);
      router.push('/main');
    }
  };

  //계정 관련 페이지 연결
  const signUp = () => {
      router.push('/login/signUp');
  };
  const findAccount = () => {
      router.push('/login/findAccount');
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}></View>
      <View style={styles.topMargin}></View>
      {/* contents */}
      <View style={styles.contents}>
        <Text style={styles.pageTitle}>로그인</Text>
        <TextInput style={styles.inputBox} placeholder="아이디" value={loginId} onChangeText={setLoginId} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" ></TextInput>
        <TextInput style={styles.inputBox} placeholder="패스워드" value={password} onChangeText={setPassword} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" secureTextEntry={true}></TextInput>
        {errorMsg  && (
          <View style={styles.msgBox}>
            <Text style={styles.errorMsg}>※ 아이디와 패스워드를 입력해주세요.</Text>
          </View>
        )}
        <TouchableOpacity style={styles.agreeButton} onPress={login}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomMargin}></View>
      <View style={styles.bottomOuterMargin}></View>
      {/* 계정 관련 페이지 연결 */}
      <View>
        <View style={styles.bottomContents}>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity onPress={() => ""}>
              <Text style={styles.bottomContentsText}>소셜 로그인</Text>
            </TouchableOpacity>
            <Text style={styles.bottomContentsText}> / </Text>
            <TouchableOpacity onPress={signUp}>
              <Text style={styles.bottomContentsText}>회원가입</Text>
            </TouchableOpacity>
            <Text style={styles.bottomContentsText}> / </Text>
            <TouchableOpacity onPress={findAccount}>
              <Text style={styles.bottomContentsText}>아이디 및 패스워드 찾기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};