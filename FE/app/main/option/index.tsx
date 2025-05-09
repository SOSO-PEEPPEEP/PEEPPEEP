import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Animated } from "react-native";
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router'; 
import Frame from '@/components/ui/Frame';
import { useFonts } from 'expo-font';
import { styles } from "@/styles/styles";
import GlobalText from '@/constants/GlobalText';
import { petStyles } from "@/styles/pet.styles";
import Margin from '@/components/ui/Margin';
import EffectSound from '@/components/common/effectSound';

export default () => {
  //소리 재생
  const [playEffect, setPlayEffect] = useState(false);

  //profile_Info
  const profileImg = require('@/assets/images/main/profile/img_proifile_01.png');
  const userId = '@loveChu';
  const nickname = '고양이입니다';

  const [isOn, setIsOn] = useState(true);
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOn ? 0 : 80,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOn]);

  const toggleSwitch = () => {
    setIsOn((prev) => !prev);
  };
  
  const [notifyOn, setNotifyOn] = useState<boolean>(false);

  const notify = () => {
    setPlayEffect(true);
    setNotifyOn(prevState => !prevState);
  };

  const router = useRouter();
  
  // NewPassword 라우터 이동 함수
  const NewPassword = () => {
    setPlayEffect(true); 
    setTimeout(() => {
      router.push('/login/findAccount/newPassword');
    }, 200); 
  };

  const editAccount = () => {
    setPlayEffect(true);
    router.push('/main/option/editAccount');
  };
  const login = () => {
    setPlayEffect(true); 
    setTimeout(() => {
    router.push('/login');
  }, 200); 
  };
  const deleteAccount = () => {
    setPlayEffect(true); 
  };

  const [bgmVolume, setBgmVolume] = useState<number>(50);
  const [sfxVolume, setSfxVolume] = useState<number>(50);

  return (
    <Frame>
      <View style={{width: '100%', height: 8}}></View>
      <View style={[petStyles.pageTitle, {height: 30}]}>
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', }}>
          <GlobalText style={petStyles.pageTitleText}>시스템 설정</GlobalText>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 0 }} showsVerticalScrollIndicator={false}  showsHorizontalScrollIndicator={false}>
        <Margin height={16} />
        <View style={{flexDirection: 'row',  alignItems: 'center',}}><GlobalText style={{marginRight: 12, }}>음량 설정</GlobalText></View>
        <Margin height={16} />
        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', }}>
          <View style={{flex: 1,  alignItems: 'center', marginLeft: 8,}}><GlobalText style={{marginRight: 40, }}>배경음</GlobalText></View>
          <Slider
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={bgmVolume}
            onValueChange={setBgmVolume}
            thumbTintColor="#BfE1E0"
            minimumTrackTintColor="#BfE1E0"
            maximumTrackTintColor="#D3D3DD"
            style={{ width: 160}}
          />
        </View>
        <Margin height={16} />
        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', }}>
          <View style={{flex: 1,  alignItems: 'center', marginLeft: 8,}}><GlobalText style={{marginRight: 40, }}>효과음</GlobalText></View>
          <Slider
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={sfxVolume}
            onValueChange={setSfxVolume}
            thumbTintColor="#BfE1E0"
            minimumTrackTintColor="#BfE1E0"
            maximumTrackTintColor="#D3D3DD"
            style={{ width: 160}}
          />
        </View>
        <Margin height={24} />
        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', }}>
          <View style={{flexDirection: 'row',  alignItems: 'center',}}><GlobalText style={{marginRight: 12, }}>알림 설정</GlobalText>
            <TouchableWithoutFeedback onPress={notify}>
              <View style={[styles.optionButton, { backgroundColor: notifyOn ? '#BfE1E0' : '#FFCDD9',}]}>
                <GlobalText style={styles.buttonText}>{notifyOn ? 'ON' : 'OFF'}</GlobalText>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{flexDirection: 'row',  alignItems: 'center',}}><GlobalText style={{marginRight: 12, }}>언어 설정</GlobalText>
            <TouchableOpacity activeOpacity={1}>
              <View style={[styles.optionButton, { backgroundColor: '#BfE1E0'}]}>
                <GlobalText style={styles.buttonText}>한국어</GlobalText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Margin height={24} />
        <GlobalText style={{textAlign: 'center'}}>{'-------------------------------'}</GlobalText>
        <Margin height={24} />
        <View style={{flexDirection: 'row', alignItems: 'center',}}><GlobalText style={{marginRight: 12, }}>계정 설정</GlobalText></View>
        <Margin height={16} />
        <View style={{ width: '100%', alignItems: 'center',}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Image source={profileImg} style={[styles.profileImg, {width: 60, height: 60, backgroundColor: '#fff'}]}/>
            <Margin height={16} />
            <View>
              <GlobalText style={styles.profileId}>{userId}</GlobalText>
              <View>
                <GlobalText style={styles.profileNickname}>{nickname}</GlobalText>
                <GlobalText style={styles.profileNicknameshadow}>{nickname}</GlobalText>
              </View>
            </View>
          </View>
          <Margin height={16} />
          <TouchableOpacity style={styles.agreeButton} onPress={NewPassword} activeOpacity={1}>
            <GlobalText style={styles.buttonText}>비밀번호 변경</GlobalText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={editAccount} activeOpacity={1}>
            <GlobalText style={styles.buttonText}>회원 정보 수정</GlobalText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.disagreeButton} onPress={login} activeOpacity={1}>
            <GlobalText style={styles.buttonText}>로그아웃</GlobalText>
          </TouchableOpacity>
          <Margin height={24} />
          <GlobalText style={{textAlign: 'center'}}>{'-------------------------------'}</GlobalText>
          <Margin height={24} />
          <TouchableOpacity onPress={deleteAccount} activeOpacity={1}>
            <GlobalText style={{color: '#ff9b9b'}}>회원 탈퇴</GlobalText>
          </TouchableOpacity>
        </View>
        <Margin height={8} />
      </ScrollView>
      <Margin height={40} />
  {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
  {/* {playEffect && ( <EffectSound volume={sfxVolume} onPlaybackEnd={() => setPlayEffect(false)} />)} */}
  </Frame>
  );
};