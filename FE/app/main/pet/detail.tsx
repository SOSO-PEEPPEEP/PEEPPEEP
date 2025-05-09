import { useState, useEffect  } from 'react';
import { View, Image, TouchableOpacity } from "react-native";
import Frame from '@/components/ui/Frame';
import EffectSound from '@/components/common/effectSound';
import VoiceSound from '@/components/common/voiceSound';
import GlobalText from '@/constants/GlobalText';
import { useRouter, useLocalSearchParams } from 'expo-router';
import back from "@/assets/images/icon/icon_back.png";
import { API_BASE_URL } from '@/constants/env';
import OutlinedShadowText from '@/constants/OutlinedShadowText';
import { COLORS } from '@/constants/COLORS';

export default () => {
  const router = useRouter();
  const {id} = useLocalSearchParams();

  const [playEffect, setPlayEffect] = useState(false);
  const [voiceEffect, setVoiceEffect] = useState(false);

  const backButton = () => {
    router.push('/main/pet/list');
  };

  return (
    <Frame>
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', }}>
        <TouchableOpacity onPress={() => { setPlayEffect(true); backButton(); }} activeOpacity={1}> 
          <View style={{width: 30, height: 30, marginRight: 8, alignItems: 'center', justifyContent: 'center', }}>
            <Image source={back} style={{width: 30, height: 30}}></Image>
          </View>
        </TouchableOpacity>
        <GlobalText style={{textAlign: 'left', fontSize: 20,}}>보유한 PEEP</GlobalText>
      </View>
      <GlobalText>디테일 페이지입니다.</GlobalText>
      {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
      {voiceEffect && ( <VoiceSound onPlaybackEnd={() => setVoiceEffect(false)} />)}
    </Frame>
  );
};