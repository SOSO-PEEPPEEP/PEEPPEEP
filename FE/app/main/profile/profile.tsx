import React from 'react';
import { View, Image } from "react-native";
import { useFonts } from 'expo-font';
import { styles } from "@/styles/profile.styles";
import GlobalText from '@/constants/GlobalText';
import Margin from '@/components/ui/Margin';

export default function Index() {
  //font loading  
  const [fontsLoaded] = useFonts({
      'PF-Stardust': require('@/assets/fonts/PFstardust3.0.ttf'),
      'PF-Stardust-Bold': require('@/assets/fonts/PFstardust3.0Bold.ttf'),
      'PF-Stardust-ExtraBold': require('@/assets/fonts/PFstardust3.0ExtraBold.ttf'),
  });
  if (!fontsLoaded) return null;

  //profile_Info
  const profileImg = require('@/assets/images/main/profile/img_proifile_01.png');
  const userId = '@loveChu';
  const nickname = '고양이입니다';
  const msg = '스트릿 출신 삼색이지만, 지금은 집사와 함께하는 동거 라이프하고 있어요. 츄르 챌린지 상시 모집 중!';
  const tag01 = '만1세';
  const tag02 = '개냥이';
  const tag03 = '꾹꾹이';

  return (
    <View>
    {/* 프로필 */}
        <View style={styles.profile}>
        <View>
          <Image style={styles.profileImg} source={profileImg} /></View>
        <View style={{flex: 1}}>
            <GlobalText style={styles.profileId}>{userId}</GlobalText>
            <Margin height={4}></Margin>
            <View>
            <GlobalText style={styles.profileNickname}>{nickname}</GlobalText>
            <GlobalText style={styles.profileNicknameshadow}>{nickname}</GlobalText>
            </View>
            <View style={styles.profileMessegeBox}>
            <GlobalText style={styles.profileMessege}>
                {msg}
            </GlobalText>
            </View>
            <View style={styles.profileTagList}>
            <GlobalText style={styles.profileTag}>#{tag01}</GlobalText>
            <GlobalText style={styles.profileTag}>#{tag02}</GlobalText>
            <GlobalText style={styles.profileTag}>#{tag03}</GlobalText>
            </View>
        </View>
        </View>
    </View>
  );
};