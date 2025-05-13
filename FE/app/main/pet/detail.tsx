import { useState, useEffect  } from 'react';
import { View, Image, TouchableOpacity, Dimensions } from "react-native";
import Frame from '@/components/ui/Frame';
import EffectSound from '@/components/common/effectSound';
import VoiceSound from '@/components/common/voiceSound';
import GlobalText from '@/constants/GlobalText';
import { useRouter, useLocalSearchParams } from 'expo-router';
import back from "@/assets/images/icon/icon_back.png";
import { API_BASE_URL } from '@/constants/env';
import OutlinedShadowText from '@/constants/OutlinedShadowText';
import { COLORS } from '@/constants/COLORS';
import Margin from '@/components/ui/Margin';
import { petStyles } from "@/styles/pet.styles";
import { Growth } from '@/components/pet/util';
import iconFeed from "@/assets/images/icon/pet/icon_feed.png";
import iconPat from "@/assets/images/icon/pet/icon_pat.png";
import iconPlay from "@/assets/images/icon/pet/icon_play.png";
import iconShower from "@/assets/images/icon/pet/icon_shower.png";
import iconToilet from "@/assets/images/icon/pet/icon_toilet.png";

type PetDetailProps = {
  nickname: string;
  growth: Growth;
  image : string;
  affection: number;
};

export default () => {
  const router = useRouter();
  const {id} = useLocalSearchParams();

  const [petInfo, setPetInfo] = useState<PetDetailProps | null>(null);

  const [playEffect, setPlayEffect] = useState(false);
  const [voiceEffect, setVoiceEffect] = useState(false);

  const [ICONHeight, setICONHeight] = useState(0);
  const [ICONWidth, setICONWidth] = useState(0);

  useEffect(() => {
    const fetchPetDetail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/pets/${id}`);
        const json = await response.json();
        const data = json.data;
    
        setPetInfo(data);
      } catch (error) {
        console.error('펫 상세 조회 실패:', error);
      }
    };
    
    if (id) fetchPetDetail();
  }, [id]);

  useEffect(() => {
    const { height } = Dimensions.get('window');
    const { width } = Dimensions.get('window');
    const calculatedHeight = height <= 400 ? 36 : 48;
    const calculatedWidth = width <= 400 ? 36 : 48;
    setICONHeight(calculatedHeight);
    setICONWidth(calculatedWidth);

    const handleResize = () => {
        const { height } = Dimensions.get('window');
        const { width } = Dimensions.get('window');
        const updatedHeight = height <= 400 ? 36 : 48;
        const calculatedWidth = width <= 400 ? 36 : 48;
        setICONHeight(updatedHeight);
        setICONWidth(calculatedWidth);
    };
    Dimensions.addEventListener('change', handleResize);
  }, []); 
  
  if (!petInfo) {
    return (
      <Frame>
        <GlobalText>로딩 중...</GlobalText>
      </Frame>
    );
  }

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
        <GlobalText style={{textAlign: 'left', fontSize: 20,}}>PEEP 상태</GlobalText>
      </View>
      <Margin height={8}/>
      <View style={petStyles.addPeepInfoContainer}>
        <View>
          <View style={petStyles.addPeepInfoBoxShadow}></View>
          <View style={[petStyles.addPeepInfoBox, { backgroundColor: COLORS.blue }]}>
            <View style={petStyles.addPeepList}>
              <TouchableOpacity onPress={() => { setVoiceEffect(true); }} activeOpacity={1}>
                <Image style={{width: 150, height: 150}} source={{uri:petInfo.image}}></Image>
              </TouchableOpacity>
            </View>
            <OutlinedShadowText style={{fontSize:20}}>{petInfo.nickname}</OutlinedShadowText>
          </View>
        </View>
        <View style={{ width: '100%', flexDirection: "row", alignItems: "center",  justifyContent: "space-evenly"}}>
          <TouchableOpacity activeOpacity={1}><Image source={iconFeed} style={{ width: ICONWidth, height: ICONHeight,}}></Image></TouchableOpacity>
          <TouchableOpacity activeOpacity={1}><Image source={iconPat} style={{ width: ICONWidth, height: ICONHeight,}}></Image></TouchableOpacity>
          <TouchableOpacity activeOpacity={1}><Image source={iconPlay} style={{width: ICONWidth, height: ICONHeight,}}></Image></TouchableOpacity>
          <TouchableOpacity activeOpacity={1}><Image source={iconShower} style={{ width: ICONWidth, height: ICONHeight,}}></Image></TouchableOpacity>
          <TouchableOpacity activeOpacity={1}><Image source={iconToilet} style={{ width: ICONWidth, height: ICONHeight,}}></Image></TouchableOpacity>
        </View>
      </View>
      {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
      {voiceEffect && ( <VoiceSound onPlaybackEnd={() => setVoiceEffect(false)} />)}
    </Frame>
  );
};