import React, { useState, useEffect } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import { styles } from "@/styles/styles";
import { petstyles } from "@/styles/pet.styles";
import { useRouter } from 'expo-router'; 
import petImage from "@/assets/images/pet/adult/04.rabbit_adult.png";

export default function Index() {
    //font loading  
    const [fontsLoaded] = useFonts({
        'PF-Stardust': require('@/assets/fonts/PFstardust3.0.ttf'),
        'PF-Stardust-Bold': require('@/assets/fonts/PFstardust3.0Bold.ttf'),
        'PF-Stardust-ExtraBold': require('@/assets/fonts/PFstardust3.0ExtraBold.ttf'),
    });
  //peep Info
  const petType = '강아지';
  const [petGrade, setPetGrade] = useState<"COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGENDARY">("EPIC");
  const petName = 'PEEPNAME';
  const petGrowth = '갓 태어난 PEEP';
  const petAffection = '80%';
  const [favorites, setFavorites] = useState<"Y" | "N">("Y");
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
  const router = useRouter();

  const backButton = () => {
    router.push('/main/pet/addPet');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainBody}>
        <View style={{width: '100%', height: '10%'}}></View>
        <View style={petstyles.addPeepInfoContainer}>
            <View>
                <TouchableOpacity onPress={backButton}>
                <View style={petstyles.addPeepInfoBoxShadow}></View>
                <View style={[petstyles.addPeepInfoBox, { backgroundColor: petListBackgroundColor(petGrade) }]}>
                    <View style={petstyles.entryNumber}><Text style={petstyles.entryNumberText}>No.01</Text></View>
                    <View style={petstyles.addPeepList}><Image style={{width: 200, height: 200}} source={petImage}></Image></View>
                    <View style={petstyles.addPeepInfoListBox}>
                        <View style={petstyles.addPeepInfoList}>
                            <Text style={petstyles.addPeepInfoText}>이름</Text>
                            <Text style={petstyles.addPeepInfoText}>종류</Text>
                            <Text style={petstyles.addPeepInfoText}>등급</Text>
                        </View>
                        <View style={petstyles.addPeepInfoList}>
                            <Text style={petstyles.addPeepInfoText}>{petName}</Text>
                            <Text style={petstyles.addPeepInfoText}>{petType}</Text>
                            <Text style={petstyles.addPeepInfoText}>{petGrade}</Text>
                        </View>
                    </View>
                    <View style={petstyles.petInfoMessage}>
                        <Text style={[petstyles.addPeepInfoText, {fontSize: 14}]}>
                            {petInfoMessage}
                        </Text>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
            <View style={petstyles.addPeepMessage}>
            <View style={petstyles.addPeepList}><Text style={[petstyles.addPeepText, {fontSize: 20}]}>새로운 PEEP과의 인연이 생겼어요!</Text></View>
            <View style={petstyles.addPeepList}>
                <View style={{width: '100%'}}><Text style={[petstyles.addPeepTextShadow, {fontSize: 36,}]}> PEEP 등장 </Text></View>
                <View style={{width: '100%'}}><Text style={[petstyles.addPeepText, {fontSize: 36, color: '#C7CFFF'}]}> PEEP 등장 </Text></View>
            </View>
        </View>
        </View>
        <View style={{width: '100%', height: '10%'}}></View>
      </View>
    </View>
  );
};