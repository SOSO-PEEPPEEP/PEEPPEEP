import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Alert } from "react-native";
import Frame from '@/components/ui/Frame';
import GlobalText from '@/constants/GlobalText';
import { petStyles } from "@/styles/pet.styles";
import { useRouter } from 'expo-router'; 
import EffectSound from '@/components/common/effectSound';
import VoiceSound from '@/components/common/voiceSound';
import TadaSound from '@/components/common/tadaSound';
import back from "@/assets/images/icon/icon_back.png";
import addPetImage from "@/assets/images/main/img_randomDraw.png";
import { COLORS } from '@/constants/COLORS';
import { API_BASE_URL } from '@/constants/env';

export default () => {
  const router = useRouter();
  const [playEffect, setPlayEffect] = useState(false);
  const [voiceEffect, setVoiceEffect] = useState(false);
  const [tadaEffect, setTadaEffect] = useState(false);

  const createPet = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/pets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await res.json();

      if (!res.ok) {
        Alert.alert("펫 뽑기 실패", JSON.stringify(json));
        return;
      }

      setTadaEffect(true);
      const petId = json.data;
      router.push(`/main/pet/addPetInfo?id=${petId}`);
    } catch (err) {
      Alert.alert("네트워크 에러", err instanceof Error ? err.message : '알 수 없는 에러');
    }
  };
  
  const backButton = () => {
    setPlayEffect(true);
    router.push('/main/pet');
  };

  return (
    <Frame>
        <View style={petStyles.pageTitle}>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', }}>
            <TouchableOpacity onPress={() => { setPlayEffect(true); backButton(); }} activeOpacity={1}> 
              <View style={{width: 30, height: 30, marginRight: 8, alignItems: 'center', justifyContent: 'center', }}>
                <Image source={back} style={{width: 30, height: 30}}></Image>
              </View>
            </TouchableOpacity>
            <GlobalText style={petStyles.pageTitleText}>PEEP 정보</GlobalText>
          </View>
        </View>
        <View style={petStyles.addPeepBox}>
            <View style={petStyles.addPeepList}><Image style={{width: 200, height: 200}} source={addPetImage}></Image></View>
            <View style={petStyles.addPeepList}><GlobalText style={petStyles.addPeepText}>어떤 PEEP이 나올까?</GlobalText></View>
            <View style={petStyles.addPeepList}>
              <TouchableOpacity onPress={ createPet } activeOpacity={1}> 
                  <GlobalText style={petStyles.addPeepTextShadow}>Click</GlobalText>
                  <GlobalText style={[petStyles.addPeepText, {color: COLORS.blue}]}>Click</GlobalText>
              </TouchableOpacity>
            </View>
        </View>
        <View style={{width: '100%', height: '10%'}}></View>

    {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
    {voiceEffect && ( <VoiceSound onPlaybackEnd={() => setVoiceEffect(false)} />)}
    {tadaEffect && ( <TadaSound onPlaybackEnd={() => setTadaEffect(false)} />)}
    </Frame>
  );
};