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
import BookmarkYellow from '@/assets/svgs/Bookmark_yellow.svg';
import BookmarkDark from '@/assets/svgs/Bookmark_dark.svg';

export default function Index() {
  //font loading  
  const [fontsLoaded] = useFonts({
      'PF-Stardust': require('@/assets/fonts/PFstardust3.0.ttf'),
      'PF-Stardust-Bold': require('@/assets/fonts/PFstardust3.0Bold.ttf'),
      'PF-Stardust-ExtraBold': require('@/assets/fonts/PFstardust3.0ExtraBold.ttf'),
  });
  if (!fontsLoaded) return null;

  //peep Info
  const petType = '강아지';
  const [petGrade, setPetGrade] = useState<"COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGENDARY">("COMMON");
  const petName = 'PEEPNAME';
  const petGrowth = '갓 태어난 PEEP';
  const petAffection = '80%';
  const [favorites, setFavorites] = useState<"Y" | "N">("Y");

  const petListNameColor = (grade: "COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGENDARY") => {
    switch (grade) {
      case "LEGENDARY":
        return "#C7CFFF"; // 보라색
      case "EPIC":
        return "#fff"; // 하얀색
      default:
        return "#8787A3"; // 기본값 (회색)
    }
  };

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

  const FavoritesCheck = () => (
    <BookmarkYellow />
    // <Svg width="24" height="24" viewBox="0 0 100 100">
    //   <Polygon points="50,10 61,38 90,38 66,58 75,90 50,72 25,90 34,58 10,38 39,38"
    //     fill={FavoritesColor(favorites)} stroke={FavoritesColor(favorites)} stroke-width="10" strokeLinejoin="round" strokeLinecap="round"/>
    // </Svg>
  );
   const FavoritesShadow = () => (
    <BookmarkDark />
    // <Svg width="24" height="24" viewBox="0 0 100 100">
    //   <Polygon points="50,10 61,38 90,38 66,58 75,90 50,72 25,90 34,58 10,38 39,38"
    //     fill="#8787A3" stroke="#8787A3"stroke-width="10" strokeLinejoin="round" strokeLinecap="round"/>
    // </Svg>
  ); 
  const FavoritesChk = () => {
    setFavorites(prev => (prev === "Y" ? "N" : "Y"));
  };

  //페이지 이동
  const [playEffect, setPlayEffect] = useState(false);

  const router = useRouter();
  const backButton = () => {
    router.push('/main/pet');
  };

  return (
    <Frame>
        <View style={[petstyles.pageTitle, {height: 30}]}>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', }}>
            <TouchableOpacity onPress={() => { setPlayEffect(true); backButton(); }} activeOpacity={1}> 
              <View style={{width: 30, height: 30, marginRight: 8, alignItems: 'center', justifyContent: 'center', }}>
                <Image source={back} style={{width: 30, height: 30}}></Image>
              </View>
            </TouchableOpacity>
            <GlobalText style={petstyles.pageTitleText}>보유한 PEEP</GlobalText>
          </View>
        </View>
        <ScrollView style={{width: '100%', paddingRight: 4}}>
            <View style={[petstyles.petListBox]}> 
                <View style={[petstyles.petListShadow]}></View>
                <View style={[petstyles.petList, { backgroundColor: petListBackgroundColor(petGrade) }]}>
                    <View style={petstyles.favorites}>
                        <TouchableOpacity onPress={FavoritesChk}>
                            {favorites === "Y" && (
                                <View>
                                    <View style={petstyles.favorites_non}>
                                        <FavoritesCheck />
                                    </View>
                                </View>
                            )}
                            {favorites === "N" && (
                                <View>
                                    <View style={petstyles.favorites_shadow}>
                                        <FavoritesShadow />
                                    </View>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={petstyles.petImg}>
                        <Image style={{ width: 72, height: 72, }} source={petImage}></Image>
                    </View>
                    <View style={petstyles.petData}>
                        <View><GlobalText style={petstyles.petInfo}>{petType} / {petGrade === "COMMON" ? "C" : petGrade === "RARE" ? "R" : petGrade === "UNIQUE" ? "U" : petGrade === "EPIC" ? "E" : petGrade === "LEGENDARY" ? "L" : ""}</GlobalText></View>
                        {petGrade === "LEGENDARY" && (
                            <View style={{marginBottom: 8,}}>
                                <View><GlobalText style={petstyles.petNameShadow00}>{petName}</GlobalText></View>
                                <View><GlobalText style={petstyles.petNameShadow01}>{petName}</GlobalText></View>
                                <View><GlobalText style={[petstyles.petName, { color: petListNameColor(petGrade) }]}>{petName}</GlobalText></View>
                            </View>
                        )}
                        {petGrade === "EPIC" && (
                            <View style={{marginBottom: 8,}}>
                                <View><GlobalText style={petstyles.petNameShadow00}>{petName}</GlobalText></View>
                                <View><GlobalText style={petstyles.petNameShadow01}>{petName}</GlobalText></View>
                                <View><GlobalText style={petstyles.petNameShadow02}>{petName}</GlobalText></View>
                                <View><GlobalText style={petstyles.petNameShadow03}>{petName}</GlobalText></View>
                                <View><GlobalText style={petstyles.petNameShadow04}>{petName}</GlobalText></View>
                                <View><GlobalText style={petstyles.petNameShadow05}>{petName}</GlobalText></View>
                                <View><GlobalText style={[petstyles.petName, { color: petListNameColor(petGrade) }]}>{petName}</GlobalText></View>
                            </View>
                        )}
                        {petGrade !== "LEGENDARY" && petGrade !== "EPIC" && (
                            <View style={{marginBottom: 8,}}>
                                <View><GlobalText style={[petstyles.petName, { color: petListNameColor(petGrade) }]}>{petName}</GlobalText></View>
                            </View>
                        )}

                        <View style={petstyles.petStats}>
                            <GlobalText style={[petstyles.petStatsText, {marginRight: 8}]}>성장도</GlobalText>
                            <GlobalText style={petstyles.petStatsText}>{petGrowth}</GlobalText>
                        </View>
                        <View style={petstyles.petStats}>
                            <GlobalText style={[petstyles.petStatsText, {marginRight: 8}]}>애정도</GlobalText>
                            <GlobalText style={petstyles.petStatsText}>{petAffection}</GlobalText>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>

    {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
    </Frame>
  );
};