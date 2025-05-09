import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Animated } from "react-native";
import { useRouter } from 'expo-router'; 
import { styles } from "@/styles/login.styles";
import GlobalText from '@/constants/GlobalText';
import VoiceSound from '@/components/common/voiceSound';
import { FONT } from '@/constants/FONT';
import logo_disconnect from '@/assets/images/main/logo_sleep_x4.png';
import logo_connect from '@/assets/images/main/logo_x4.png';

export default () => {
  //로그인 시 main 페이지 이동 또는 에러메세지 출력
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg , setErrorMsg] = useState(false);

  //소리재생
  const [voiceEffect, setVoiceEffect] = useState(false);

  //로그인
  const router = useRouter();

  const login = async () => {
    if (!loginId || !password) {
      setErrorMsg(true);
    } else{
      setErrorMsg(false);
      await playJumpAnimation();
      setTimeout(() => {
        router.push('/main');
      }, 1800);
    }
  };

  //계정 관련 페이지 연결
  const errorPage = () => {
      router.push('/error');
  };
  const signUp = () => {
      router.push('/login/signUp');
  };
  const findAccount = () => {
      router.push('/login/findAccount');
  };

  //애니메이팅
  const jumpValue = useState(new Animated.Value(0))[0];
  const [logo, setLogo] = useState(logo_disconnect);
  const playJumpAnimation = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      setLogo(logo_connect);
      setVoiceEffect(true);
      Animated.sequence([
        Animated.timing(jumpValue, {
          toValue: -10,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start(() => resolve());
    });
  };

  return (
    <View style={styles.container}>
      <Animated.Image 
        style={{ height: 90, width: 90, transform: [{ translateY: Animated.subtract(jumpValue, -10) },] }} 
        source={logo} 
      />
      <View style={styles.title}></View>
      <View style={styles.topMargin}></View>
      {/* contents */}
      <View style={styles.contents}>
        <GlobalText style={styles.pageTitle}>로그인</GlobalText>
        <TextInput style={[styles.inputBox, {fontFamily: FONT.default}]} placeholder="아이디" value={loginId} onChangeText={setLoginId} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" ></TextInput>
        <TextInput style={[styles.inputBox, {fontFamily: FONT.default}]} placeholder="패스워드" value={password} onChangeText={setPassword} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" secureTextEntry={true}></TextInput>
        {errorMsg  && (
          <View style={styles.msgBox}>
            <GlobalText style={styles.errorMsg}>※ 아이디와 패스워드를 입력해주세요.</GlobalText>
          </View>
        )}
        <TouchableOpacity style={styles.agreeButton} onPress={() => { login(); }}>
          <View style={{ flex:1, justifyContent: 'center', }}><GlobalText style={styles.buttonText}>PEEP 통신</GlobalText></View>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomMargin}></View>
      <View style={styles.bottomOuterMargin}></View>
      {/* 계정 관련 페이지 연결 */}
      <View>
        <View style={styles.bottomContents}>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity onPress={errorPage}>
              <GlobalText style={styles.bottomContentsText}>소셜 로그인</GlobalText>
            </TouchableOpacity>
            <GlobalText style={styles.bottomContentsText}> / </GlobalText>
            <TouchableOpacity onPress={signUp}>
              <GlobalText style={styles.bottomContentsText}>회원가입</GlobalText>
            </TouchableOpacity>
            <GlobalText style={styles.bottomContentsText}> / </GlobalText>
            <TouchableOpacity onPress={findAccount}>
              <GlobalText style={styles.bottomContentsText}>아이디 및 패스워드 찾기</GlobalText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    {voiceEffect && ( <VoiceSound onPlaybackEnd={() => { setVoiceEffect(false); }} />)}
    </View>
  );
};