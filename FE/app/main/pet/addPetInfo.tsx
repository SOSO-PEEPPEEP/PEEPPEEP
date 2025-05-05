import React, { useState, useRef, useEffect } from 'react';
import { View, Image, TouchableOpacity, Animated } from "react-native";
import GlobalText from '@/constants/GlobalText';
import Frame from '@/components/ui/Frame';
import { petstyles } from "@/styles/pet.styles";
import { useRouter } from 'expo-router'; 
import petImage from "@/assets/images/pet/adult/04.rabbit_adult.png";

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
  const router = useRouter();

  const backButton = () => {
    router.push('/main/pet/addPet');
  };

  // Animated.Value로 크기 애니메이션 초기화
  const sizeAnim = useRef(new Animated.Value(0)).current;
  // 애니메이션 범위 설정
  const maxWidth = 310; // 최대 width 300
  const maxHeight = 380; // 최대 height 400
  const minWidth = 290; // 최대 width 300
  const minHeight = 370; // 최대 height 400

  useEffect(() => {
    // 애니메이션 실행
    Animated.timing(sizeAnim, {
      toValue: 1, // 최종 크기
      duration: 300, // 애니메이션 시간
      useNativeDriver: false, // 기본적으로 변화를 직접 처리할 때는 false
    }).start();
  }, []);

  return (
    <Frame>
        <View style={{width: '100%', height: '10%'}}></View>
        <View style={petstyles.addPeepInfoContainer}>     
            <TouchableOpacity onPress={backButton} activeOpacity={1} style={{width: maxWidth, height: maxHeight, alignItems: 'center', justifyContent: 'center',}}>
              <View>
              <Animated.View
                  style={[petstyles.addPeepInfoBoxShadow, {
                    width: sizeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [minWidth, maxWidth], // 크기 변화
                    }),
                    height: sizeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [minHeight, maxHeight], // 크기 변화
                    }),
                  }]}
              ></Animated.View>
              <Animated.View
                style={[petstyles.addPeepInfoBox, {
                  width: sizeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [minWidth, maxWidth], // 크기 변화
                  }),
                  height: sizeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [minHeight, maxHeight], // 크기 변화
                  }),
                  backgroundColor: petListBackgroundColor(petGrade),
                }]}
              >
              {/* <View style={petstyles.addPeepInfoBoxShadow}></View> */}
              {/* <View style={[petstyles.addPeepInfoBox, { backgroundColor: petListBackgroundColor(petGrade) }]}> */}
                <View style={petstyles.entryNumber}><GlobalText style={petstyles.entryNumberText}>No.01</GlobalText></View>
                <View style={petstyles.addPeepList}><Image style={{width: 150, height: 150}} source={petImage}></Image></View>
                <View>
                  <GlobalText style={petstyles.addPeepNameTextShadow01}>{petName}</GlobalText>
                  <GlobalText style={petstyles.addPeepNameTextShadow02}>{petName}</GlobalText>
                  <GlobalText style={petstyles.addPeepNameTextShadow03}>{petName}</GlobalText>
                  <GlobalText style={petstyles.addPeepNameTextShadow04}>{petName}</GlobalText>
                  <GlobalText style={petstyles.addPeepNameTextShadow05}>{petName}</GlobalText>
                  <GlobalText style={petstyles.addPeepNameTextShadow06}>{petName}</GlobalText>
                  <GlobalText style={petstyles.addPeepNameTextShadow07}>{petName}</GlobalText>
                  <GlobalText style={petstyles.addPeepNameText}>{petName}</GlobalText>
                </View>
                <View style={petstyles.addPeepInfoListBox}>
                    <View style={petstyles.addPeepInfoList}>
                        <GlobalText style={petstyles.addPeepInfoText}>종류</GlobalText>
                        <GlobalText style={petstyles.addPeepInfoText}>등급</GlobalText>
                    </View>
                    <View style={petstyles.addPeepInfoList}>
                        <GlobalText style={petstyles.addPeepInfoText}>{petType}</GlobalText>
                        <GlobalText style={petstyles.addPeepInfoText}>{petGrade}</GlobalText>
                    </View>
                </View>
                <View style={petstyles.petInfoMessage}>
                    <GlobalText style={[petstyles.addPeepInfoText, {fontSize: 14}]}>
                        {petInfoMessage}
                    </GlobalText>
                </View>
              </Animated.View>
              </View>
            </TouchableOpacity>
            <View style={petstyles.addPeepMessage}>
            <View style={petstyles.addPeepList}><GlobalText style={[petstyles.addPeepText, {fontSize: 20}]}>새로운 PEEP과의 인연이 생겼어요!</GlobalText></View>
            <View style={petstyles.addPeepList}>
                <View style={{width: '100%'}}><GlobalText style={[petstyles.addPeepTextShadow, {fontSize: 36,}]}> PEEP 등장 </GlobalText></View>
                <View style={{width: '100%'}}><GlobalText style={[petstyles.addPeepText, {fontSize: 36, color: '#C7CFFF'}]}> PEEP 등장 </GlobalText></View>
            </View>
        </View>
        </View>
        <View style={{width: '100%', height: '10%'}}></View>
    </Frame>
  );
};