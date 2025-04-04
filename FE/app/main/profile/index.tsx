import React, { useState } from 'react';
import { Text, View, Image } from "react-native";
import { useFonts } from 'expo-font';
<<<<<<< HEAD
import { styles } from "@/assets/styles/Styles";
=======
import { styles } from "@/styles/profile.styles";
>>>>>>> c41219e (♻️ [FE] Refactor: 합본)
import { TabBarProvider } from '@/context/TabBarContext';
import profileImg from '@/assets/images/proflieImg_00.jpg';
import { Stack } from 'expo-router';
import Friend from "@/app/main/profile/friend/friend";
<<<<<<< HEAD

export default function Index() {
  useFonts({
    'PF stardust ExtraBold': require('@/assets/fonts/PFstardust-ExtraBold.ttf'),
  });
=======
import Frame from '@/components/ui/Frame';

export default function Index() {
    //font loading  
    const [fontsLoaded] = useFonts({
        'PF-Stardust': require('@/assets/fonts/PFstardust3.0.ttf'),
        'PF-Stardust-Bold': require('@/assets/fonts/PFstardust3.0Bold.ttf'),
        'PF-Stardust-ExtraBold': require('@/assets/fonts/PFstardust3.0ExtraBold.ttf'),
    });
    if (!fontsLoaded) return null;
>>>>>>> c41219e (♻️ [FE] Refactor: 합본)

  //profile_Info
  const userId = '@loveChu';
  const nickName = '고양이입니다';
  const msg = '스트릿 출신 삼색이지만,지금은 집사와 함께하는 동거 라이프하고 있어요. 츄르 챌린지 상시 모집 중!';
  const tag01 = '만1세';
  const tag02 = '개냥이';
  const tag03 = '꾹꾹이';


  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [isVisible_another, setIsVisible_another] = useState(false);
  const toggleVisibility_another = () => {
    setIsVisible_another(!isVisible_another);
  };

  return (
<<<<<<< HEAD
    <View style={styles.container}>
      <View style={styles.mainBody}>
=======
      <Frame>
>>>>>>> c41219e (♻️ [FE] Refactor: 합본)
        {/* 프로필 */}
        <View style={styles.profile}>
          <View><Image style={styles.profileImg} source={profileImg} /></View>
          <View style={{flex: 1}}>
            <Text style={styles.profileId}>{userId}</Text>
            <View>
              <Text style={styles.profileNickname}>{nickName}</Text>
              <Text style={styles.profileNicknameshadow}>{nickName}</Text>
            </View>
            <View style={styles.profileMessegeBox}>
              <Text style={styles.profileMessege}>
                {msg}
              </Text>
            </View>
            <View style={styles.profileTagList}>
              <Text style={styles.profileTag}>#{tag01}</Text>
              <Text style={styles.profileTag}>#{tag02}</Text>
              <Text style={styles.profileTag}>#{tag03}</Text>
            </View>
          </View>
        </View>
        {/* 친구 목록 */}
        <View style={{flex:1, width: '100%'}}>
<<<<<<< HEAD
          <TabBarProvider>
=======
>>>>>>> c41219e (♻️ [FE] Refactor: 합본)
            <Stack screenOptions={{
                headerShown: false,
                animation: 'none', // ← 애니메이션 제거
            }} />
            <Friend
                selectedTabIdx={selectedTabIdx}
                setSelectedTabIdx={setSelectedTabIdx}
            />
<<<<<<< HEAD
          </TabBarProvider>
        </View>
      </View>
    </View>
=======
        </View>
        <View style={{height: 80, width: '100%'}}></View>
  </Frame>
>>>>>>> c41219e (♻️ [FE] Refactor: 합본)
  );
};