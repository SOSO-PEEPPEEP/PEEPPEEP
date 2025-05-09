import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Modal } from "react-native";
import GlobalText from '@/constants/GlobalText';
import { FONT } from '@/constants/FONT';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { styles } from "@/styles/login.styles";

export default () => {
  //회원가입 시 login 페이지 이동 또는 에러메세지 출력
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setverifyPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);  
  const [isChecked, setIsChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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
      setModalVisible(true); 
    }
  };

  const login = () => {
    router.push('/login');
    setModalVisible(false);
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
        <GlobalText style={styles.pageTitle}>회원가입</GlobalText>
        <TextInput style={[styles.inputBox, {fontFamily: FONT.default}]} placeholder="아이디" value={loginId} onChangeText={setLoginId} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent"></TextInput>
        <TextInput style={[styles.inputBox, {fontFamily: FONT.default}]} placeholder="패스워드" value={password} onChangeText={setPassword} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" secureTextEntry={true}></TextInput>
        <TextInput style={[styles.inputBox, {fontFamily: FONT.default}]} placeholder="패스워드 재입력" value={verifyPassword} onChangeText={setverifyPassword} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" secureTextEntry={true}></TextInput>
        <TextInput style={[styles.inputBox, {fontFamily: FONT.default}]} placeholder="닉네임" value={nickname} onChangeText={setNickname} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent"></TextInput>
        <View style={styles.msgBox}>
          <Checkbox style={styles.checkBox} value={isChecked} onValueChange={setCheckboxState} color={isChecked ? '#d3d3dd' : '#d3d3dd'}></Checkbox>
          <GlobalText style={styles.pageText}>개인정보취급방침 및 이용약관에 동의하며,{'\n'}회원가입을 진행합니다.</GlobalText>
        </View>
        {errorMsg  && (
          <View style={styles.msgBox}>
            <GlobalText style={styles.errorMsg}>{message}</GlobalText>
          </View>
        )}
        <TouchableOpacity style={styles.agreeButton} onPress={signUp}>
          <GlobalText style={styles.buttonText}>회원가입</GlobalText>
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
      {/* Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <GlobalText style={styles.pageText}>계정 생성에 성공하였습니다.</GlobalText>
            <TouchableOpacity style={[styles.agreeButton, {marginTop: 12, marginBottom: -8}]} onPress={login}>
              <GlobalText style={styles.buttonText}>PEEP과 통신하기</GlobalText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};