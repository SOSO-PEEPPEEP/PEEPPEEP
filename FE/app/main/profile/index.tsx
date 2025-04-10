import React, { useState } from 'react';
import { View } from "react-native";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import Friend from "@/app/main/profile/friend/friend";
import Profile from '@/app/main/profile/profile';
import Frame from '@/components/ui/Frame';

export default function Index() {
  //font loading  
  const [fontsLoaded] = useFonts({
      'PF-Stardust': require('@/assets/fonts/PFstardust3.0.ttf'),
      'PF-Stardust-Bold': require('@/assets/fonts/PFstardust3.0Bold.ttf'),
      'PF-Stardust-ExtraBold': require('@/assets/fonts/PFstardust3.0ExtraBold.ttf'),
  });
  if (!fontsLoaded) return null;

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [isVisible_another, setIsVisible_another] = useState(false);
  const toggleVisibility_another = () => {
    setIsVisible_another(!isVisible_another);
  };

  return (
      <Frame>
        <Profile />
        {/* 친구 목록 */}
        <View style={{flex:1, width: '100%'}}>
            <Stack screenOptions={{
                headerShown: false,
                animation: 'none', // ← 애니메이션 제거
            }} />
            <Friend
                selectedTabIdx={selectedTabIdx}
                setSelectedTabIdx={setSelectedTabIdx}
            />
        </View>
        <View style={{height: 80, width: '100%'}}></View>
  </Frame>
  );
};