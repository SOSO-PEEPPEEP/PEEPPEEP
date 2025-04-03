import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { styles } from "@/assets/styles/loginStyles";

export default function Index() {
  //font loading
  const [fontsLoaded] = useFonts({
    'PF stardust ExtraBold': require('@/assets/fonts/PFstardust-ExtraBold.ttf'),
  });

  //회원가입 시 login 페이지 이동 또는 에러메세지 출력
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setverifyPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);  
  const [isChecked, setIsChecked] = useState(false);

  const router = useRouter();

  const setCheckboxState = () => {
    setIsChecked(!isChecked);
  };

  const signUp  = () => {
    if (!loginId || !password || !verifyPassword || !nickname) {
      setMessage('※ 회원가입에 필요한 정보들을 모두 입력해주세요.');
      setErrorMsg(true);
    } else if(password != verifyPassword) {
      setMessage('※ 입력된 두 비밀번호가 일치하지 않습니다.');
      setErrorMsg(true);
    } else if(!isChecked) {
      setMessage('※ 개인정보취급방침 및 이용 약관에 동의해주세요.');
      setErrorMsg(true);
    } else {
      setErrorMsg(false);
      router.push('/login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}></View>
      <View style={styles.topMargin}></View>
      {/* contents */}
      <View style={styles.contents}>
        <Text style={styles.pageTitle}>회원가입</Text>
        <TextInput style={styles.inputBox} placeholder="아이디" value={loginId} onChangeText={setLoginId} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent"></TextInput>
        <TextInput style={styles.inputBox} placeholder="패스워드" value={password} onChangeText={setPassword} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" secureTextEntry={true}></TextInput>
        <TextInput style={styles.inputBox} placeholder="패스워드 재입력" value={verifyPassword} onChangeText={setverifyPassword} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" secureTextEntry={true}></TextInput>
        <TextInput style={styles.inputBox} placeholder="닉네임" value={nickname} onChangeText={setNickname} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent"></TextInput>
        <View style={styles.msgBox}>
          <Checkbox style={styles.checkBox} value={isChecked} onValueChange={setCheckboxState} color={isChecked ? '#d3d3dd' : '#d3d3dd'}></Checkbox>
          <Text style={styles.pageText}>개인정보취급방침 및 이용약관에 동의하며,{'\n'}회원가입을 진행합니다.</Text>
        </View>
        {errorMsg  && (
          <View style={styles.msgBox}>
            <Text style={styles.errorMsg}>{message}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.agreeButton} onPress={signUp}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomMargin}></View>
    </View>
  );
};