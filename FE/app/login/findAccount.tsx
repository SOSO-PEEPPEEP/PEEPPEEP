import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput } from "react-native";
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

  //계정 및 비밀번호 찾기 시 다음 페이지 이동 또는 에러메세지 출력
  const [accountuserName, setAccountuserName] = useState('');
  const [accountEmail, setAcountEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const [findAccountErrorMsg, setFindAccountErrorMsg] = useState(false);  
  const [findPasswordErrorMsg, setFindPasswordErrorMsg] = useState(false);  
  const [findAccountByEmail, setFindAccountByEmail] = useState(true);
  const [findPasswordByEamil, setFindPasswordByEamil] = useState(false);
  
  const router = useRouter();

  const findAccount = () => {
    setFindAccountByEmail(!findAccountByEmail);
    setFindPasswordByEamil(!findPasswordByEamil);
    setFindAccountErrorMsg(false);
    setFindPasswordErrorMsg(false);
    setAccountuserName('');
    setAcountEmail('');
    setUserId('');
    setUserName('');
    setEmail('');
  };

  const findPassword = () => {
    setFindAccountByEmail(!findAccountByEmail);
    setFindPasswordByEamil(!findPasswordByEamil);
    setFindAccountErrorMsg(false);
    setFindPasswordErrorMsg(false);
    setUserId('');
    setUserName('');
    setEmail('');
  };

  const nextButton = () => {
    if (findAccountByEmail && (!accountuserName || !accountEmail)) {
      setFindAccountErrorMsg(true);
    } else if (findPasswordByEamil && (!userId || !username || !email)) {
      setFindPasswordErrorMsg(true);
    } else if(accountuserName && accountEmail) {
      setFindAccountErrorMsg(false);
      router.push('/login/findAccount/VerifyCodeId');
    } else if(userId && username && email) {
      setFindAccountErrorMsg(false);
      router.push('/login/findAccount/VerifyCodePw');
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
        {/* 계정 찾기 */}
          <TouchableOpacity onPress={findAccount}>
            <GlobalText style={styles.pageTitle}>
              {findAccountByEmail ? '▼ 가입했던 이메일로 인증하여 계정 찾기' : '▷ 가입했던 이메일로 인증하여 계정 찾기'}
            </GlobalText>
          </TouchableOpacity>
          {findAccountByEmail && (
            <View>
              <TextInput style={[styles.inputBox, {fontFamily: FONT.default}]} placeholder="이름" value={accountuserName} onChangeText={setAccountuserName} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" ></TextInput>
              <TextInput style={[styles.inputBox, {fontFamily: FONT.default}]} placeholder="이메일" value={accountEmail} onChangeText={setAcountEmail} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" ></TextInput>
            </View>
          )}
          {findAccountErrorMsg  && (
            <View style={styles.msgBox}>
              <GlobalText style={styles.errorMsg}>※ 입력 정보와 일치하는 계정이 존재하지 않습니다.</GlobalText>
            </View>
          )}
        {/* 비밀번호 찾기 */}
          <TouchableOpacity onPress={findPassword}>
            <GlobalText style={styles.pageTitle}>{findPasswordByEamil ? '▼ PASSWORD 찾기' : '▷ PASSWORD 찾기'}</GlobalText>
          </TouchableOpacity>
          {findPasswordByEamil && (
            <View>
              <TextInput style={[styles.inputBox, {fontFamily: FONT.default}]} value={userId} onChangeText={setUserId} placeholder="아이디" placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" ></TextInput>
              <TextInput style={[styles.inputBox, {fontFamily: FONT.default}]} value={username} onChangeText={setUserName} placeholder="이름" placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" ></TextInput>
              <TextInput style={[styles.inputBox, {fontFamily: FONT.default}]} value={email} onChangeText={setEmail} placeholder="이메일" placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" ></TextInput>
            </View>
          )}
          {findPasswordErrorMsg  && (
            <View style={styles.msgBox}>
              <GlobalText style={styles.errorMsg}>※ 입력 정보와 일치하는 계정이 존재하지 않습니다.</GlobalText>
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