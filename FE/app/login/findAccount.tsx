import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router'; 
import { styles } from "@/assets/styles/loginStyles";

export default function Index() {
  //font loading
  const [fontsLoaded] = useFonts({
    'PF stardust ExtraBold': require('@/assets/fonts/PFstardust-ExtraBold.ttf'),
  });

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

  return (
    <View style={styles.container}>
      <View style={styles.title}></View>
      <View style={styles.topMargin}></View>
      {/* contents */}
      <View style={styles.contents}>
        <Text style={styles.pageTitle}>계정 및 비밀번호 찾기</Text>
        {/* 계정 찾기 */}
          <TouchableOpacity onPress={findAccount}>
            <Text style={styles.pageTitle}>
              {findAccountByEmail ? '▼ 가입했던 이메일로 인증하여 계정 찾기' : '▷ 가입했던 이메일로 인증하여 계정 찾기'}
            </Text>
          </TouchableOpacity>
          {findAccountByEmail && (
            <View>
              <TextInput style={styles.inputBox} placeholder="이름" value={accountuserName} onChangeText={setAccountuserName} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" ></TextInput>
              <TextInput style={styles.inputBox} placeholder="이메일" value={accountEmail} onChangeText={setAcountEmail} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" ></TextInput>
            </View>
          )}
          {findAccountErrorMsg  && (
            <View style={styles.msgBox}>
              <Text style={styles.errorMsg}><Text>※ 입력 정보와 일치하는 계정이 존재하지 않습니다.</Text></Text>
            </View>
          )}
        {/* 비밀번호 찾기 */}
          <TouchableOpacity onPress={findPassword}>
            <Text style={styles.pageTitle}>{findPasswordByEamil ? '▼ PASSWORD 찾기' : '▷ PASSWORD 찾기'}</Text>
          </TouchableOpacity>
          {findPasswordByEamil && (
            <View>
              <TextInput style={styles.inputBox} value={userId} onChangeText={setUserId} placeholder="아이디" placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" ></TextInput>
              <TextInput style={styles.inputBox} value={username} onChangeText={setUserName} placeholder="이름" placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" ></TextInput>
              <TextInput style={styles.inputBox} value={email} onChangeText={setEmail} placeholder="이메일" placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" ></TextInput>
            </View>
          )}
          {findPasswordErrorMsg  && (
            <View style={styles.msgBox}>
              <Text style={styles.errorMsg}><Text>※ 입력 정보와 일치하는 계정이 존재하지 않습니다.</Text></Text>
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