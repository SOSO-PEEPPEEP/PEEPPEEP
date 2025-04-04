import React, { useState, useEffect } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import { styles } from "@/styles/styles";
import { petstyles } from "@/styles/pet.styles";
import { useRouter } from 'expo-router'; 
import petImage from "@/assets/images/pet/adult/04.rabbit_adult.png";
import Svg, { Polygon } from "react-native-svg";

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

  const FavoritesColor = (favorites: string) => {
    switch (favorites) {
      case "Y":
        return "#8787A3"; // 노랑색
      default:
        return "#FFFFFF"; // 기본값 (회색)
    }
  };

  const FavoritesCheck = () => (
    <Svg width="24" height="24" viewBox="0 0 100 100">
      <Polygon points="50,10 61,38 90,38 66,58 75,90 50,72 25,90 34,58 10,38 39,38"
        fill={FavoritesColor(favorites)} stroke={FavoritesColor(favorites)} stroke-width="10" strokeLinejoin="round" strokeLinecap="round"/>
    </Svg>
  );
   const FavoritesShadow = () => (
    <Svg width="24" height="24" viewBox="0 0 100 100">
      <Polygon points="50,10 61,38 90,38 66,58 75,90 50,72 25,90 34,58 10,38 39,38"
        fill="#8787A3" stroke="#8787A3"stroke-width="10" strokeLinejoin="round" strokeLinecap="round"/>
    </Svg>
  ); 
  const FavoritesChk = () => {
    setFavorites(prev => (prev === "Y" ? "N" : "Y"));
  };

  const router = useRouter();

  const backButton = () => {
    router.push('/main/pet');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainBody}>
        <View style={petstyles.pageTitle}>
            <View style={{width: '90%'}}><Text style={petstyles.pageTitleText}>보유한 PEEP 살펴보기</Text></View>
            <View style={{width: '10%', alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={backButton}>
                    <View style={{width: 20, height: 20, backgroundColor: '#000'}}></View>
                </TouchableOpacity>
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
                                    <View style={petstyles.favorites_non}>
                                        <FavoritesCheck />
                                    </View>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={petstyles.petImg}>
                        <Image style={{ width: 72, height: 72, }} source={petImage}></Image>
                    </View>
                    <View style={petstyles.petData}>
                        <View><Text style={petstyles.petInfo}>{petType} / {petGrade === "COMMON" ? "C" : petGrade === "RARE" ? "R" : petGrade === "UNIQUE" ? "U" : petGrade === "EPIC" ? "E" : petGrade === "LEGENDARY" ? "L" : ""}</Text></View>
                        {petGrade === "LEGENDARY" && (
                            <View style={{marginBottom: 8,}}>
                                <View><Text style={petstyles.petNameShadow00}>{petName}</Text></View>
                                <View><Text style={petstyles.petNameShadow01}>{petName}</Text></View>
                                <View><Text style={[petstyles.petName, { color: petListNameColor(petGrade) }]}>{petName}</Text></View>
                            </View>
                        )}
                        {petGrade === "EPIC" && (
                            <View style={{marginBottom: 8,}}>
                                <View><Text style={petstyles.petNameShadow00}>{petName}</Text></View>
                                <View><Text style={petstyles.petNameShadow01}>{petName}</Text></View>
                                <View><Text style={petstyles.petNameShadow02}>{petName}</Text></View>
                                <View><Text style={petstyles.petNameShadow03}>{petName}</Text></View>
                                <View><Text style={petstyles.petNameShadow04}>{petName}</Text></View>
                                <View><Text style={petstyles.petNameShadow05}>{petName}</Text></View>
                                <View><Text style={[petstyles.petName, { color: petListNameColor(petGrade) }]}>{petName}</Text></View>
                            </View>
                        )}
                        {petGrade !== "LEGENDARY" && petGrade !== "EPIC" && (
                            <View style={{marginBottom: 8,}}>
                                <View><Text style={[petstyles.petName, { color: petListNameColor(petGrade) }]}>{petName}</Text></View>
                            </View>
                        )}

                        <View style={petstyles.petStats}>
                            <Text style={[petstyles.petStatsText, {marginRight: 8}]}>성장도</Text>
                            <Text style={petstyles.petStatsText}>{petGrowth}</Text>
                        </View>
                        <View style={petstyles.petStats}>
                            <Text style={[petstyles.petStatsText, {marginRight: 8}]}>애정도</Text>
                            <Text style={petstyles.petStatsText}>{petAffection}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
      </View>
    </View>
  );
};