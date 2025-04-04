import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Modal } from "react-native";
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router'; 
import { styles } from "@/styles/login.styles";

export default function Index() {
  //font loading
  const [fontsLoaded] = useFonts({
    'PF stardust ExtraBold': require('@/assets/fonts/PFstardust3.0ExtraBold.ttf'),
  });

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
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}></View>
      <View style={styles.topMargin}></View>
      {/* contents */}
      <View style={styles.contents}>
        <Text style={styles.pageTitle}>계정 정보 수정</Text>
        <Text style={styles.pageTitle}>▼ 비밀번호 재설정</Text>
        <TextInput style={styles.inputBox} placeholder="패스워드" value={password} onChangeText={setPassword} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" secureTextEntry={true}></TextInput>
        <TextInput style={styles.inputBox} placeholder="패스워드 재입력" value={verifyPassword} onChangeText={setVerifyPassword} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent" secureTextEntry={true}></TextInput>
        {errorMsg && (
          <View style={styles.msgBox}>
            <Text style={styles.errorMsg}>{message}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.nextButton} onPress={nextButton}>
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomMargin}></View>
      {/* Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.pageText}>비밀번호가 성공적으로 변경되었습니다.</Text>
            <TouchableOpacity style={[styles.agreeButton, {marginTop: 12, marginBottom: -8}]} onPress={login}>
              <Text style={styles.buttonText}>로그인 하러 가기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};