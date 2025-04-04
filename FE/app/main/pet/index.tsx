import React, { useState, useEffect } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import { petstyles } from "@/styles/pet.styles";
import petImage from "@/assets/images/pet/egg/01.rabbit_egg.png";
import GaugeBar from "@/components/ui/Gaugebar";
import { useRouter } from 'expo-router'; 
import Frame from '@/components/ui/Frame';

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

    const list = () => {
    router.push('/main/pet/list');
    };
    const addPet = () => {
    router.push('/main/pet/addPet');
    };


    // 화면 크기 변경에 따라 특정 ICON 크기 동적으로 업데이트
    const [ICONHeight, setICONHeight] = useState(0);
    const [ICONWidth, setICONWidth] = useState(0);
    useEffect(() => {
        const { height } = Dimensions.get('window');
        const { width } = Dimensions.get('window');
        const calculatedHeight = height <= 850 ? 40 : 44;
        const calculatedWidth = width <= 850 ? 40 : 44;
        setICONHeight(calculatedHeight);
        setICONWidth(calculatedWidth);

        const handleResize = () => {
            const { height } = Dimensions.get('window');
            const { width } = Dimensions.get('window');
            const updatedHeight = height <= 850 ? 40 : 44;
            const calculatedWidth = width <= 850 ? 40 : 44;
            setICONHeight(updatedHeight);
            setICONWidth(calculatedWidth);
        };
        Dimensions.addEventListener('change', handleResize);
    }, []); 

    // 화면 크기 변경에 따라 PEEPInfoBoxHeight 값을 동적으로 업데이트
    const [PEEPInfoBoxHeight, setPEEPInfoBoxHeight] = useState(0);
    useEffect(() => {
        const { height } = Dimensions.get('window');
        const calculatedHeight = height <= 850 ? height * 0.4 : 360;
        setPEEPInfoBoxHeight(calculatedHeight);

        const handleResize = () => {
            const { height } = Dimensions.get('window');
            const updatedHeight = height <= 850 ? height * 0.4 : 360;
            setPEEPInfoBoxHeight(updatedHeight);
        };
        Dimensions.addEventListener('change', handleResize);
    }, []);

    // 화면 크기 변경에 따라 상단 MARGIN 값을 동적으로 업데이트(상단 margin 생성)
    const [AddMargin, setAddMargin] = useState(0);
    useEffect(() => {
        const { height } = Dimensions.get('window');
        const calculatedHeight = height <= 700 ? 16 : 0;
        setAddMargin(calculatedHeight);

        const handleResize = () => {
            const { height } = Dimensions.get('window');
            const updatedHeight = height <= 700 ? 16 : 0;
            setAddMargin(updatedHeight);
        };
        Dimensions.addEventListener('change', handleResize);
    }, []); 
    // 화면 크기 변경에 따라 Separator 값을 동적으로 업데이트(구분선 생성)
    const [Separator, setPEEPInfoBoxSeparator] = useState(0);
    useEffect(() => {
        const { height } = Dimensions.get('window');
        const calculatedHeight = height <= 850 ? 0 : 16;
        setPEEPInfoBoxSeparator(calculatedHeight);

        const handleResize = () => {
            const { height } = Dimensions.get('window');
            const updatedHeight = height <= 850 ? 0 : 16;
            setPEEPInfoBoxSeparator(updatedHeight);
        };
        Dimensions.addEventListener('change', handleResize);
    }, []);
  

  return (
      <Frame>
        <View style={[{width: '100%', height: AddMargin}]}></View>
        {/* PEEP 정보창 */}
        <View style={[petstyles.PEEPInfoBox, {marginBottom: 8}]}>
          <View style={{ flex: 1, padding: 10, justifyContent: 'flex-end'}}>            
            <View style={{justifyContent: 'flex-end', marginBottom: 4}}>
              <View>
                <Text style={petstyles.peepName_01}>{PEEPNAME}</Text>
                <Text style={petstyles.peepName_02}>{PEEPNAME}</Text>
                <Text style={petstyles.peepName_03}>{PEEPNAME}</Text>
                <Text style={petstyles.peepName_04}>{PEEPNAME}</Text>
                <Text style={petstyles.peepName_05}>{PEEPNAME}</Text>
                <Text style={petstyles.peepName_06}>{PEEPNAME}</Text>
                <Text style={petstyles.peepName_07}>{PEEPNAME}</Text>
                <Text style={petstyles.peepName_08}>{PEEPNAME}</Text>
              </View>
            </View>
            <View style={[{ flexDirection: "row", marginRight: 8, marginBottom: 4}]}>
              <Text style={[petstyles.optionListText, {marginRight: 8}]}>성장도</Text>
              <Text style={[petstyles.optionListText, {backgroundColor: '#C7CFFF', padding: 1}]}>갓 태어난 PEEP</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", paddingRight: '10%'}}>
              <View style={[{marginRight: 8}]}><Text style={petstyles.optionListText}>애정도</Text></View>
              <View style={[{flex: 1,}]}><GaugeBar percentage={60} /></View>
            </View>
            <View style={{ position: 'relative', width: '100%', height: 20}}></View>
          </View>

          <View style={{justifyContent: 'flex-end'}}>
          <View style={{ flexDirection: "column"}}>
            <TouchableOpacity onPress={list}>
              <View style={[{backgroundColor: '#000', width: ICONWidth, height: ICONHeight, margin: 4}]}></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={addPet}>
              <View style={[{backgroundColor: '#000', width: ICONWidth, height: ICONHeight, margin: 4}]}></View>
            </TouchableOpacity>
            <View style={[{backgroundColor: '#000', width: ICONWidth, height: ICONHeight, margin: 4}]}></View>
          </View>
          </View>
        </View>
        <View style={[{height: Separator}]}></View>
        <View style={{ position: 'relative', width: '100%'}}>
          <View style={petstyles.PEEPInfoMessage}>
            <Text style={[{fontFamily:'PF stardust ExtraBold', color: '#D9D9D9', textAlign: 'center'}]}>PEEP은 지금... 너 생각 중...</Text>
          </View>        
          <View style={[petstyles.PEEPRoom, {height: PEEPInfoBoxHeight}]}>
            <Image style={petstyles.PEEPImg} source={petImage}></Image>
          </View>
        </View>
        <View style={[{height: Separator}]}></View>
        <View style={{alignItems: "center", flex: 1, width: '100%', paddingBottom: 16}}>
          <View style={{ flexDirection: "row", padding: 10,  }}>
            <View style={[{backgroundColor: '#000', width: 55, height: 55, margin: 4}]}></View>
            <View style={[{backgroundColor: '#000', width: 55, height: 55, margin: 4}]}></View>
            <View style={[{backgroundColor: '#000', width: 55, height: 55, margin: 4}]}></View>
            <View style={[{backgroundColor: '#000', width: 55, height: 55, margin: 4}]}></View> 
            <View style={[{backgroundColor: '#000', width: 55, height: 55, margin: 4}]}></View> 
          </View>
        </View>
      </Frame>
  );
};