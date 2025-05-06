import React, { useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import Frame from '@/components/ui/Frame';
import EffectSound from '@/components/common/effectSound';
import VoiceSound from '@/components/common/voiceSound';
import GlobalText from '@/constants/GlobalText';
import { petStyles } from "@/styles/pet.styles";
import { useRouter } from 'expo-router'; 
import petImage from "@/assets/images/pet/adult/04.rabbit_adult.png";
import back from "@/assets/images/icon/icon_back.png";

export default function Index() {

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
        <View style={petStyles.pageTitle}>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', }}>
            <TouchableOpacity onPress={() => { setPlayEffect(true); backButton(); }} activeOpacity={1}> 
              <View style={{width: 30, height: 30, marginRight: 8, alignItems: 'center', justifyContent: 'center', }}>
                <Image source={back} style={{width: 30, height: 30}}></Image>
              </View>
            </TouchableOpacity>
            <GlobalText style={petStyles.pageTitleText}>PEEP 도감</GlobalText>
          </View>
        </View>
        <ScrollView style={{width: '100%', paddingRight: 4, flex: 1,}} contentContainerStyle={{ paddingBottom: 0 }} showsVerticalScrollIndicator={false}  showsHorizontalScrollIndicator={false}>
            <View style={petStyles.collectionlist}>
            {pets.map((pets, index) => (
              <TouchableOpacity key={pets.id} onPress={() => { setVoiceEffect(true); collectionInfo(); }} activeOpacity={1}>
                  <View style={petStyles.collectioncard}>
                      <View style={petStyles.bookmark}></View>
                      <View style={petStyles.collections}>
                          <View style={[petStyles.collectionShadow]}> 
                          </View>
                          <View style={[petStyles.collection, {backgroundColor: petListBackgroundColor(pets.petGrade)}]}> 
                              <View style={petStyles.collectionPetImg}>
                                  <Image style={{ width: 72, height: 72, }} source={pets.image}></Image>
                              </View>
                              <View style={petStyles.collectionInfoBox}>
                                  <GlobalText style={[petStyles.collectionInfoText, {marginRight: 8}]}>{pets.petType} / {pets.petGrade === "COMMON" ? "C" : pets.petGrade === "RARE" ? "R" : pets.petGrade === "UNIQUE" ? "U" : pets.petGrade === "EPIC" ? "E" : pets.petGrade === "LEGENDARY" ? "L" : ""}</GlobalText>
                              </View>
                              <View style={petStyles.collectionNameBox}>
                                  <GlobalText style={[petStyles.collectionNameTextShadow01, {marginRight: 8}]}>{pets.petName}</GlobalText>
                                  <GlobalText style={[petStyles.collectionNameTextShadow02, {marginRight: 8}]}>{pets.petName}</GlobalText>
                                  <GlobalText style={[petStyles.collectionNameTextShadow03, {marginRight: 8}]}>{pets.petName}</GlobalText>
                                  <GlobalText style={[petStyles.collectionNameTextShadow04, {marginRight: 8}]}>{pets.petName}</GlobalText>
                                  <GlobalText style={[petStyles.collectionNameTextShadow05, {marginRight: 8}]}>{pets.petName}</GlobalText>
                                  <GlobalText style={[petStyles.collectionNameTextShadow06, {marginRight: 8}]}>{pets.petName}</GlobalText>
                                  <GlobalText style={[petStyles.collectionNameTextShadow07, {marginRight: 8}]}>{pets.petName}</GlobalText>
                                  <GlobalText style={[petStyles.collectionNameTextShadow08, {marginRight: 8}]}>{pets.petName}</GlobalText>
                                  <GlobalText style={[petStyles.collectionNameTextShadow09, {marginRight: 8}]}>{pets.petName}</GlobalText>
                                  <GlobalText style={[petStyles.collectionNameText, {marginRight: 8}]}>{pets.petName}</GlobalText>
                              </View>
                          </View>
                      </View>
                      <View style={{alignItems: 'center',}}>
                          <View style={petStyles.collectionentryNumber}>
                              <GlobalText style={petStyles.collectionentryNumberText}>No.01</GlobalText>
                          </View>
                      </View>
                  </View>  
              </TouchableOpacity>
            ))}

            {/* pet list가 홀수면 빈 카드 추가 */}
            {pets[pets.length - 1].id % 2 === 1 && (
                <View style={petStyles.collectioncard}>
                    <View style={[petStyles.bookmark, {backgroundColor: 'none'}]}></View>
                    <View style={petStyles.collections}>
                        <View style={[petStyles.collectionShadow, {backgroundColor: 'none', borderWidth: 0,}]}> 
                        </View>
                        <View style={[petStyles.collection, {backgroundColor: 'none', borderWidth: 0,}]}> 
                            <View style={petStyles.collectionInfoBox}>
                            </View>
                            <View style={petStyles.collectionNameBox}>
                            </View>
                        </View>
                    </View>
                    <View style={{alignItems: 'center',}}>
                        <View style={[petStyles.collectionentryNumber, {backgroundColor: 'none',}]}>
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