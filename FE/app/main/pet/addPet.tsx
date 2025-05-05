import React, { useState, useEffect, useRef  } from 'react';
import { View, Image, TouchableOpacity } from "react-native";
import Frame from '@/components/ui/Frame';
import GlobalText from '@/constants/GlobalText';
import { petstyles } from "@/styles/pet.styles";
import { useRouter } from 'expo-router'; 
import EffectSound from '@/components/common/effectSound';
import VoiceSound from '@/components/common/voiceSound';
import TadaSound from '@/components/common/tadasound';
import back from "@/assets/images/icon/icon_back.png";
import addPetImage from "@/assets/images/main/img_randomDraw.png";

export default function Index() {
  //peep Info
  const PEEPNAME = 'PEEPNAME';

  //버튼 페이지 이동
  const [playEffect, setPlayEffect] = useState(false);
  const [voiceEffect, setVoiceEffect] = useState(false);
  const [tadaEffect, setVTadaEffect] = useState(false);
  
  const router = useRouter();
  const backButton = () => {
    router.push('/main/pet');
  };
  const addPetInfo = () => {
    router.push('/main/pet/addPetInfo');
  };

  return (
    <Frame>
        <View style={petstyles.pageTitle}>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', }}>
            <TouchableOpacity onPress={() => { setPlayEffect(true); backButton(); }} activeOpacity={1}> 
              <View style={{width: 30, height: 30, marginRight: 8, alignItems: 'center', justifyContent: 'center', }}>
                <Image source={back} style={{width: 30, height: 30}}></Image>
              </View>
            </TouchableOpacity>
            <GlobalText style={petstyles.pageTitleText}>PEEP 정보</GlobalText>
          </View>
        </View>
        <View style={petstyles.addPeepBox}>
            <View style={petstyles.addPeepList}><Image style={{width: 200, height: 200}} source={addPetImage}></Image></View>
            <View style={petstyles.addPeepList}><GlobalText style={petstyles.addPeepText}>어떤 PEEP이 나올까?</GlobalText></View>
            <View style={petstyles.addPeepList}>
              <TouchableOpacity onPress={() => { setVTadaEffect(true); addPetInfo(); }} activeOpacity={1}> 
                  <GlobalText style={petstyles.addPeepTextShadow}>Click</GlobalText>
                  <GlobalText style={[petstyles.addPeepText, {color: '#C7CFFF'}]}>Click</GlobalText>
              </TouchableOpacity>
            </View>
        </View>
        <View style={{width: '100%', height: '10%'}}></View>

    {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
    {voiceEffect && ( <VoiceSound onPlaybackEnd={() => setVoiceEffect(false)} />)}
    {tadaEffect && ( <TadaSound onPlaybackEnd={() => setVTadaEffect(false)} />)}
    </Frame>
  );
};