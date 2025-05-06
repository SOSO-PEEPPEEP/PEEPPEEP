import React, { useState, useEffect, useRef  } from 'react';
import { View, Image, TouchableOpacity } from "react-native";
import Frame from '@/components/ui/Frame';
import EffectSound from '@/components/common/effectSound';
import VoiceSound from '@/components/common/voiceSound';
import GlobalText from '@/constants/GlobalText';
import { petStyles } from "@/styles/pet.styles";
import { useRouter } from 'expo-router';
import Svg, { Polygon } from "react-native-svg";
import back from "@/assets/images/icon/icon_back.png";
import petImageEgg from "@/assets/images/pet/egg/01.rabbit_egg.png";
import petImageBaby from "@/assets/images/pet/baby/02.rabbit_baby.png";
import petImageYouth from "@/assets/images/pet/youth/03.rabbit_youth.png";
import petImageAdult from "@/assets/images/pet/adult/04.rabbit_adult.png";

export default function Index() {
  
  //peep Info
  const petType = '강아지';
  const [petGrade, setPetGrade] = useState<"COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGENDARY">("EPIC");
  const petName = 'PEEPNAME';
  const petInfoMessage = '강아지는 우주를 좋아해요. 그래서 많은 우주에 대해서 알고 있어요. 당신이 우주라고 말을 꺼내면 강아지는 신나서 여기저기를 뛰어다닐지도 몰라요.';

  const petListBackgroundColor = (grade: "COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGENDARY") => {
    switch (grade) {
      case "LEGENDARY":
        return "#FFCDD9"; // 분홍색
      case "EPIC":
        return "#FFDBB7"; // 노랑색
      case "UNIQUE":
        return "#C7CFFF"; // 보라색
      case "RARE":
        return "#BFE1E0"; // 초록색
      default:
        return "#FFFFFF"; // 기본값 (흰색)
    }
  };

  //버튼 페이지 이동
  const [playEffect, setPlayEffect] = useState(false);
  const [voiceEffect, setVoiceEffect] = useState(false);

  const router = useRouter();
  const backButton = () => {
    router.push('/main/pet/collection');
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
        <View style={{width: '100%', height: 8,}}></View>
        <View style={petStyles.addPeepInfoContainer}>
            <View>
                <View style={petStyles.addPeepInfoBoxShadow}></View>
                <View style={[petStyles.addPeepInfoBox, { backgroundColor: petListBackgroundColor(petGrade) }]}>
                    <View style={petStyles.entryNumber}><GlobalText style={petStyles.entryNumberText}>No.01</GlobalText></View>
                    <View style={petStyles.addPeepList}>
                      <TouchableOpacity onPress={() => { setVoiceEffect(true); }} activeOpacity={1}>
                        <Image style={{width: 150, height: 150}} source={petImageAdult}></Image>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <GlobalText style={petStyles.addPeepNameTextShadow01}>{petName}</GlobalText>
                      <GlobalText style={petStyles.addPeepNameTextShadow02}>{petName}</GlobalText>
                      <GlobalText style={petStyles.addPeepNameTextShadow03}>{petName}</GlobalText>
                      <GlobalText style={petStyles.addPeepNameTextShadow04}>{petName}</GlobalText>
                      <GlobalText style={petStyles.addPeepNameTextShadow05}>{petName}</GlobalText>
                      <GlobalText style={petStyles.addPeepNameTextShadow06}>{petName}</GlobalText>
                      <GlobalText style={petStyles.addPeepNameTextShadow07}>{petName}</GlobalText>
                      <GlobalText style={petStyles.addPeepNameText}>{petName}</GlobalText>
                    </View>
                    <View style={petStyles.addPeepInfoListBox}>
                        <View style={petStyles.addPeepInfoList}>
                            <GlobalText style={petStyles.addPeepInfoText}>종류</GlobalText>
                            <GlobalText style={petStyles.addPeepInfoText}>등급</GlobalText>
                        </View>
                        <View style={petStyles.addPeepInfoList}>
                            <GlobalText style={petStyles.addPeepInfoText}>{petType}</GlobalText>
                            <GlobalText style={petStyles.addPeepInfoText}>{petGrade}</GlobalText>
                        </View>
                    </View>
                    <View style={petStyles.petInfoMessage}>
                        <GlobalText style={[petStyles.addPeepInfoText, {fontSize: 14}]}>
                            {petInfoMessage}
                        </GlobalText>
                    </View>
                </View>
            </View>
            <View style={petStyles.petGrowth}>
                <View><Image style={petStyles.petimg} source={petImageEgg}></Image></View>
                <View>
                    <Svg width="24" height="24" viewBox="0 0 24 24">
                        <Polygon points="6,4 18,12 6,20" fill="#D3D3DD" />
                    </Svg>
                </View>
                <View><Image style={petStyles.petimg} source={petImageBaby}></Image></View>
                <View>
                    <Svg width="24" height="24" viewBox="0 0 24 24">
                        <Polygon points="6,4 18,12 6,20" fill="#D3D3DD" />
                    </Svg>
                </View>
                <View><Image style={petStyles.petimg} source={petImageYouth}></Image></View>
                <View>
                    <Svg width="24" height="24" viewBox="0 0 24 24">
                        <Polygon points="6,4 18,12 6,20" fill="#D3D3DD" />
                    </Svg>
                </View>
                <View><Image style={petStyles.petimg} source={petImageAdult}></Image></View>
            </View>
        </View>
        <View style={{width: '100%', height: '10%'}}></View>

    {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
    {voiceEffect && ( <VoiceSound onPlaybackEnd={() => setVoiceEffect(false)} />)}
    </Frame>
  );
};