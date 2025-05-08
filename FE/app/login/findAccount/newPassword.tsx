import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Modal } from "react-native";
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

  // 페이지 이동 또는 메세지 출력
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [errorMsg , setErrorMsg] = useState(false);
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
    
  const router = useRouter();

  const nextButton = () => {
    if(!password || !verifyPassword){
      setErrorMsg(true);
      setMessage('※ 새로운 비밀번호를 설정해주세요.');
    }else if (password !== verifyPassword) {
      setErrorMsg(true);
      setMessage('※ 입력된 두 비밀번호가 일치하지 않습니다.');
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
        <GlobalText style={styles.pageTitle}>계정 정보 수정</GlobalText>
        <GlobalText style={styles.pageTitle}>▼ 비밀번호 재설정</GlobalText>
        <TextInput style={[styles.inputBox, {fontFamily: FONT.default}]} placeholder="패스워드" value={password} onChangeText={setPassword} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" secureTextEntry={true}></TextInput>
        <TextInput style={[styles.inputBox, {fontFamily: FONT.default}]} placeholder="패스워드 재입력" value={verifyPassword} onChangeText={setVerifyPassword} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" secureTextEntry={true}></TextInput>
        {errorMsg && (
          <View style={styles.msgBox}>
            <GlobalText style={styles.errorMsg}>{message}</GlobalText>
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
      {/* Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <GlobalText style={styles.pageText}>비밀번호가 성공적으로 변경되었습니다.</GlobalText>
            <TouchableOpacity style={[styles.agreeButton, {marginTop: 12, marginBottom: -8}]} onPress={login}>
              <GlobalText style={styles.buttonText}>통신 시도하기</GlobalText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};