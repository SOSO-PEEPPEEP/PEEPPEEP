import React, { useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import Frame from '@/components/ui/Frame';
import EffectSound from '@/components/common/effectSound';
import VoiceSound from '@/components/common/voiceSound';
import GlobalText from '@/constants/GlobalText';
import { petstyles } from "@/styles/pet.styles";
import { useRouter } from 'expo-router'; 
import petImage from "@/assets/images/pet/adult/04.rabbit_adult.png";
import back from "@/assets/images/icon/icon_back.png";

export default function Index() {
  //font loading  
  const [fontsLoaded] = useFonts({
      'PF-Stardust': require('@/assets/fonts/PFstardust3.0.ttf'),
      'PF-Stardust-Bold': require('@/assets/fonts/PFstardust3.0Bold.ttf'),
      'PF-Stardust-ExtraBold': require('@/assets/fonts/PFstardust3.0ExtraBold.ttf'),
  });
  if (!fontsLoaded) return null;

  const pets = [
    {
      id: 1,
      petType: "강아지",
      petGrade: "COMMON" as "COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGENDARY",
      petName: "PEEPNAME",
      image: petImage, // 필요 시 각각 다르게
    },
    {
      id: 2,
      petType: "강아지",
      petGrade: "RARE" as "COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGENDARY",
      petName: "PEEPNAME",
      image: petImage, // 필요 시 각각 다르게
    },
    {
      id: 3,
      petType: "강아지",
      petGrade: "UNIQUE" as "COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGENDARY",
      petName: "PEEPNAME",
      image: petImage, // 필요 시 각각 다르게
    },
    {
      id: 4,
      petType: "강아지",
      petGrade: "EPIC" as "COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGENDARY",
      petName: "PEEPNAME",
      image: petImage, // 필요 시 각각 다르게
    },
    {
      id: 5,
      petType: "강아지",
      petGrade: "LEGENDARY" as "COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGENDARY",
      petName: "PEEPNAME",
      image: petImage, // 필요 시 각각 다르게
    },
    {
      id: 6,
      petType: "강아지",
      petGrade: "LEGENDARY" as "COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGENDARY",
      petName: "PEEPNAME",
      image: petImage, // 필요 시 각각 다르게
    },
    {
      id: 7,
      petType: "강아지",
      petGrade: "LEGENDARY" as "COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGENDARY",
      petName: "PEEPNAME",
      image: petImage, // 필요 시 각각 다르게
    },
    {
      id: 8,
      petType: "강아지",
      petGrade: "LEGENDARY" as "COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGENDARY",
      petName: "PEEPNAME",
      image: petImage, // 필요 시 각각 다르게
    },
  ];

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

  //페이지 이동
  const [playEffect, setPlayEffect] = useState(false);
  const [voiceEffect, setVoiceEffect] = useState(false);

  const router = useRouter();
  const backButton = () => {
    router.push('/main/pet');
  };
  const collectionInfo = () => {
    router.push('/main/pet/collectionInfo');    
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
            <GlobalText style={petstyles.pageTitleText}>PEEP 도감</GlobalText>
          </View>
        </View>
        <ScrollView style={{width: '100%', paddingRight: 4, flex: 1,}} contentContainerStyle={{ paddingBottom: 0 }} showsVerticalScrollIndicator={false}  showsHorizontalScrollIndicator={false}>
            <View style={petstyles.collectionlist}>
            {pets.map((pets, index) => (
              <TouchableOpacity key={pets.id} onPress={() => { setVoiceEffect(true); collectionInfo(); }} activeOpacity={1}>
                  <View style={petstyles.collectioncard}>
                      <View style={petstyles.bookmark}></View>
                      <View style={petstyles.collections}>
                          <View style={[petstyles.collectionShadow]}> 
                          </View>
                          <View style={[petstyles.collection, {backgroundColor: petListBackgroundColor(pets.petGrade)}]}> 
                              <View style={petstyles.collectionPetImg}>
                                  <Image style={{ width: 72, height: 72, }} source={pets.image}></Image>
                              </View>
                              <View style={petstyles.collectionInfoBox}>
                                  <GlobalText style={[petstyles.collectionInfoText, {marginRight: 8}]}>{pets.petType} / {pets.petGrade === "COMMON" ? "C" : pets.petGrade === "RARE" ? "R" : pets.petGrade === "UNIQUE" ? "U" : pets.petGrade === "EPIC" ? "E" : pets.petGrade === "LEGENDARY" ? "L" : ""}</GlobalText>
                              </View>
                              <View style={petstyles.collectionNameBox}>
                                  <GlobalText style={[petstyles.collectionNameTextShadow01, {marginRight: 8}]}>{pets.petName}</GlobalText>
                                  <GlobalText style={[petstyles.collectionNameTextShadow02, {marginRight: 8}]}>{pets.petName}</GlobalText>
                                  <GlobalText style={[petstyles.collectionNameTextShadow03, {marginRight: 8}]}>{pets.petName}</GlobalText>
                                  <GlobalText style={[petstyles.collectionNameTextShadow04, {marginRight: 8}]}>{pets.petName}</GlobalText>
                                  <GlobalText style={[petstyles.collectionNameTextShadow05, {marginRight: 8}]}>{pets.petName}</GlobalText>
                                  <GlobalText style={[petstyles.collectionNameTextShadow06, {marginRight: 8}]}>{pets.petName}</GlobalText>
                                  <GlobalText style={[petstyles.collectionNameTextShadow07, {marginRight: 8}]}>{pets.petName}</GlobalText>
                                  <GlobalText style={[petstyles.collectionNameTextShadow08, {marginRight: 8}]}>{pets.petName}</GlobalText>
                                  <GlobalText style={[petstyles.collectionNameTextShadow09, {marginRight: 8}]}>{pets.petName}</GlobalText>
                                  <GlobalText style={[petstyles.collectionNameText, {marginRight: 8}]}>{pets.petName}</GlobalText>
                              </View>
                          </View>
                      </View>
                      <View style={{alignItems: 'center',}}>
                          <View style={petstyles.collectionentryNumber}>
                              <GlobalText style={petstyles.collectionentryNumberText}>No.01</GlobalText>
                          </View>
                      </View>
                  </View>  
              </TouchableOpacity>
            ))}

            {/* pet list가 홀수면 빈 카드 추가 */}
            {pets[pets.length - 1].id % 2 === 1 && (
                <View style={petstyles.collectioncard}>
                    <View style={[petstyles.bookmark, {backgroundColor: 'none'}]}></View>
                    <View style={petstyles.collections}>
                        <View style={[petstyles.collectionShadow, {backgroundColor: 'none', borderWidth: 0,}]}> 
                        </View>
                        <View style={[petstyles.collection, {backgroundColor: 'none', borderWidth: 0,}]}> 
                            <View style={petstyles.collectionInfoBox}>
                            </View>
                            <View style={petstyles.collectionNameBox}>
                            </View>
                        </View>
                    </View>
                    <View style={{alignItems: 'center',}}>
                        <View style={[petstyles.collectionentryNumber, {backgroundColor: 'none',}]}>
                        </View>
                    </View>
                </View>  
            )}
            </View>                           
        </ScrollView>
        <View style={{height: 40, width: '100%'}}></View>

    {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
    {voiceEffect && ( <VoiceSound onPlaybackEnd={() => setVoiceEffect(false)} />)}
    </Frame>
  );
};