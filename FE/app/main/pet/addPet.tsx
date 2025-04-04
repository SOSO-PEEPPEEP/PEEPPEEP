import React, { useState, useEffect } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import { styles } from "@/styles/styles";
import { petstyles } from "@/styles/pet.styles";
import { useRouter } from 'expo-router'; 
import petImage from "@/assets/images/pet/egg/01.rabbit_egg.png";

export default function Index() {
    //font loading  
    const [fontsLoaded] = useFonts({
        'PF-Stardust': require('@/assets/fonts/PFstardust3.0.ttf'),
        'PF-Stardust-Bold': require('@/assets/fonts/PFstardust3.0Bold.ttf'),
        'PF-Stardust-ExtraBold': require('@/assets/fonts/PFstardust3.0ExtraBold.ttf'),
    });

  //peep Info
  const PEEPNAME = 'PEEPNAME';

  //버튼 페이지 이동
  const router = useRouter();

  const backButton = () => {
    router.push('/main/pet');
  };
  const addPetInfo = () => {
    router.push('/main/pet/addPetInfo');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainBody}>
        <View style={{width: '100%', height: '10%'}}></View>
        <View style={petstyles.pageTitle}>
            <View style={{width: '90%'}}><Text style={petstyles.pageTitleText}>PEEP 부화기</Text></View>
            <View style={{width: '10%', alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={backButton}>
                    <View style={{width: 20, height: 20, backgroundColor: '#000'}}></View>
                </TouchableOpacity>
            </View>
        </View>
        <View style={petstyles.addPeepBox}>
            <View style={petstyles.addPeepList}><Image style={{width: 200, height: 200}} source={petImage}></Image></View>
            <View style={petstyles.addPeepList}><Text style={petstyles.addPeepText}>어떤 PEEP이 나올까?</Text></View>
            <View style={petstyles.addPeepList}>
                <TouchableOpacity onPress={addPetInfo}>
                    <Text style={petstyles.addPeepTextShadow}>Click</Text>
                    <Text style={[petstyles.addPeepText, {color: '#C7CFFF'}]}>Click</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{width: '100%', height: '10%'}}></View>
      </View>
    </View>
  );
};