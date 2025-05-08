import { useState, useEffect  } from 'react';
import { View, Image, TouchableOpacity } from "react-native";
import Frame from '@/components/ui/Frame';
import EffectSound from '@/components/common/effectSound';
import VoiceSound from '@/components/common/voiceSound';
import GlobalText from '@/constants/GlobalText';
import { petStyles } from "@/styles/pet.styles";
import { useRouter, useLocalSearchParams } from 'expo-router';
import Svg, { Polygon } from "react-native-svg";
import back from "@/assets/images/icon/icon_back.png";
import { PetRank, getPetBgColor } from '@/components/pet/util';
import { API_BASE_URL } from '@/constants/env';
import OutlinedShadowText from '@/constants/OutlinedShadowText';
import { COLORS } from '@/constants/COLORS';

type PetCollectionDetailProps = {
  petCollectionId: number;
  name: string;
  petRank : PetRank;
  content: string;
  eggImage : string;
  babyImage : string;
  youthImage : string;
  adultImage : string;
  petType: string;
};

export default () => {
  const router = useRouter();
  const {id} = useLocalSearchParams();

  const [collectionInfo, setCollectionInfo] = useState<PetCollectionDetailProps | null>(null);

  const [playEffect, setPlayEffect] = useState(false);
  const [voiceEffect, setVoiceEffect] = useState(false);

  const backButton = () => {
    router.push('/main/pet/collection');
  };

  useEffect(() => {
    const fetchPetCollectionDetail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/pets/collections/${id}`);
        const json = await response.json();
        const data = json.data;
  
        setCollectionInfo(data);
      } catch (error) {
        console.error('챌린지 상세 조회 실패:', error);
      }
    };
  
    if (id) fetchPetCollectionDetail();
  }, [id]);

  if (!collectionInfo) {
    return (
      <Frame>
        <GlobalText>로딩 중...</GlobalText>
      </Frame>
    );
  }

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
        <View style={{width: '100%', height: 8,}}></View>
        <View style={petStyles.addPeepInfoContainer}>
            <View>
                <View style={petStyles.addPeepInfoBoxShadow}></View>
                <View style={[petStyles.addPeepInfoBox, { backgroundColor: getPetBgColor(collectionInfo.petRank) }]}>
                    <View style={petStyles.entryNumber}><GlobalText style={petStyles.entryNumberText}>No.{collectionInfo.petCollectionId}</GlobalText></View>
                    <View style={petStyles.addPeepList}>
                      <TouchableOpacity onPress={() => { setVoiceEffect(true); }} activeOpacity={1}>
                        <Image style={{width: 150, height: 150}} source={{uri:collectionInfo.adultImage}}></Image>
                      </TouchableOpacity>
                    </View>
                    <OutlinedShadowText style={{fontSize:20}}>{collectionInfo.name}</OutlinedShadowText>
                    <View style={petStyles.addPeepInfoListBox}>
                        <View style={petStyles.addPeepInfoList}>
                            <GlobalText style={petStyles.addPeepInfoText}>종류</GlobalText>
                            <GlobalText style={petStyles.addPeepInfoText}>등급</GlobalText>
                        </View>
                        <View style={petStyles.addPeepInfoList}>
                            <GlobalText style={petStyles.addPeepInfoText}>{collectionInfo.petType}</GlobalText>
                            <GlobalText style={petStyles.addPeepInfoText}>{collectionInfo.petRank}</GlobalText>
                        </View>
                    </View>
                    <View style={petStyles.petInfoMessage}>
                        <GlobalText style={[petStyles.addPeepInfoText, {fontSize: 14}]}>
                            {collectionInfo.content}
                        </GlobalText>
                    </View>
                </View>
            </View>
            <View style={petStyles.petGrowth}>
                <View><Image style={petStyles.petCollectionImg} source={{uri:collectionInfo.eggImage}}></Image></View>
                <View>
                    <Svg width="24" height="24" viewBox="0 0 24 24">
                      <Polygon points="6,4 18,12 6,20" fill={COLORS.gray} />
                    </Svg>
                </View>
                <View><Image style={petStyles.petCollectionImg} source={{uri:collectionInfo.babyImage}}></Image></View>
                <View>
                    <Svg width="24" height="24" viewBox="0 0 24 24">
                    <Polygon points="6,4 18,12 6,20" fill={COLORS.gray} />
                    </Svg>
                </View>
                <View><Image style={petStyles.petCollectionImg} source={{uri:collectionInfo.youthImage}}></Image></View>
                <View>
                    <Svg width="24" height="24" viewBox="0 0 24 24">
                      <Polygon points="6,4 18,12 6,20" fill={COLORS.gray} />
                    </Svg>
                </View>
                <View><Image style={petStyles.petCollectionImg} source={{uri:collectionInfo.adultImage}}></Image></View>
            </View>
        </View>
        <View style={{width: '100%', height: '10%'}}></View>

    {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
    {voiceEffect && ( <VoiceSound onPlaybackEnd={() => setVoiceEffect(false)} />)}
    </Frame>
  );
};