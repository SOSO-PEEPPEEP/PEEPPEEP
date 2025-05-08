import React, { useState, useRef, useEffect } from 'react';
import { View, Image, TouchableOpacity, Animated } from "react-native";
import GlobalText from '@/constants/GlobalText';
import Frame from '@/components/ui/Frame';
import { petStyles } from "@/styles/pet.styles";
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import OutlinedShadowText from '@/constants/OutlinedShadowText';
import { COLORS } from '@/constants/COLORS';
import { PetRank, getPetBgColor } from '@/components/pet/util';
import { API_BASE_URL } from '@/constants/env';

type PetInfo = {
  petCollectionId: number;
  name: string;
  petRank: PetRank;
  content: string;
  eggImage: string;
  petType: string;
};

export default () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [petInfo, setPetInfo] = useState<PetInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const petCollectionId = Number(id);
  
  useEffect(() => {
    if (!petCollectionId) return;
    fetch(`${API_BASE_URL}/api/pets/lucky-draw/${petCollectionId}`)
      .then(res => res.json())
      .then(json => {
        setPetInfo(json.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [petCollectionId]);

  const sizeAnim = useRef(new Animated.Value(0)).current;
  const maxWidth = 310;
  const maxHeight = 380;
  const minWidth = 290;
  const minHeight = 370;

  useEffect(() => {
    Animated.timing(sizeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  if (loading) {
    return (
      <Frame>
        {/* <ActivityIndicator size="large" color={COLORS.blue} style={{ marginTop: 50 }} /> */}
        <GlobalText>로딩중...</GlobalText>
      </Frame>
    );
  }

  if (!petInfo) {
    return (
      <Frame>
        <GlobalText>펫 정보를 불러올 수 없습니다.</GlobalText>
      </Frame>
    );
  }

  const backButton = () => {
    router.back();
  };

  return (
    <Frame>
      <View style={{width: '100%', height: '10%'}}></View>
      <View style={petStyles.addPeepInfoContainer}>     
        <TouchableOpacity onPress={backButton} activeOpacity={1} style={{width: maxWidth, height: maxHeight, alignItems: 'center', justifyContent: 'center',}}>
          <View>
            <Animated.View
              style={[petStyles.addPeepInfoBoxShadow, {
                width: sizeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [minWidth, maxWidth],
                }),
                height: sizeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [minHeight, maxHeight],
                }),
              }]}
            ></Animated.View>
            <Animated.View
              style={[petStyles.addPeepInfoBox, {
                width: sizeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [minWidth, maxWidth],
                }),
                height: sizeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [minHeight, maxHeight],
                }),
                backgroundColor: getPetBgColor(petInfo.petRank),
              }]}
            >
              <View style={petStyles.entryNumber}><GlobalText style={petStyles.entryNumberText}>NO.{petInfo.petCollectionId}</GlobalText></View>
              <View style={petStyles.addPeepList}><Image style={{width: 150, height: 150}} source={{uri:petInfo.eggImage}}></Image></View>
              <OutlinedShadowText style={{fontSize: 20}}>{petInfo.name}</OutlinedShadowText>
              <View style={petStyles.addPeepInfoListBox}>
                <View style={petStyles.addPeepInfoList}>
                  <GlobalText style={petStyles.addPeepInfoText}>종류</GlobalText>
                  <GlobalText style={petStyles.addPeepInfoText}>등급</GlobalText>
                </View>
                <View style={petStyles.addPeepInfoList}>
                  <GlobalText style={petStyles.addPeepInfoText}>{petInfo.petType}</GlobalText>
                  <GlobalText style={petStyles.addPeepInfoText}>{petInfo.petRank}</GlobalText>
                </View>
              </View>
              <View style={petStyles.petInfoMessage}>
                <GlobalText style={[petStyles.addPeepInfoText, {fontSize: 14}]}>
                    {petInfo.content}
                </GlobalText>
              </View>
            </Animated.View>
          </View>
        </TouchableOpacity>
        <View style={petStyles.addPeepMessage}>
          <View style={petStyles.addPeepList}><GlobalText style={[petStyles.addPeepText, {fontSize: 20}]}>새로운 PEEP과의 인연이 생겼어요!</GlobalText></View>
          <View style={petStyles.addPeepList}>
            <View style={{width: '100%'}}><GlobalText style={[petStyles.addPeepTextShadow, {fontSize: 36,}]}> PEEP 등장 </GlobalText></View>
            <View style={{width: '100%'}}><GlobalText style={[petStyles.addPeepText, {fontSize: 36, color: COLORS.blue}]}> PEEP 등장 </GlobalText></View>
          </View>
        </View>
      </View>
      <View style={{width: '100%', height: '10%'}}></View>
    </Frame>
  );
};