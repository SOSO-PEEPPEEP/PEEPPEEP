import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import GlobalText from '@/constants/GlobalText';
import { petStyles } from "@/styles/pet.styles";
import GaugeBar from "@/components/ui/Gaugebar";
import { useRouter } from 'expo-router'; 
import Frame from '@/components/ui/Frame';
import EffectSound from '@/components/common/effectSound';
import VoiceSound from '@/components/common/voiceSound';
import iconPeepList from "@/assets/images/icon/icon_peepList.png";
import iconCollection from "@/assets/images/icon/icon_collection.png";
import iconRandomDraw from "@/assets/images/icon/icon_randomDraw.png";
import iconFeed from "@/assets/images/icon/pet/icon_feed.png";
import iconPat from "@/assets/images/icon/pet/icon_pat.png";
import iconPlay from "@/assets/images/icon/pet/icon_play.png";
import iconShower from "@/assets/images/icon/pet/icon_shower.png";
import iconToiolet from "@/assets/images/icon/pet/icon_toilet.png";
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming, } from 'react-native-reanimated';
import OutlinedShadowText from '@/constants/OutlinedShadowText';
import { COLORS } from '@/constants/COLORS';


export default function Index() {
  //peep Info
  const pets = [
    {
      id: 1,
      petType: "강아지",
      petGrade: "COMMON" as "COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGENDARY",
      petName: "강아지",
      petGrowth: '아직 알인 상태',
      affection: 60,
      petImage: require('@/assets/images/pet/egg/01.rabbit_egg.png'), // 필요 시 각각 다르게
    },
    {
      id: 2,
      petType: "고양이",
      petGrade: "RARE" as "COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGENDARY",
      petName: "고양이",
      petGrowth: '갓 태어난 PEEP',
      affection: 30,
      petImage: require('@/assets/images/pet/baby/02.rabbit_baby.png'), // 필요 시 각각 다르게
    },
    {
      id: 3,
      petType: "고양이",
      petGrade: "RARE" as "COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGENDARY",
      petName: "고양이",
      petGrowth: 'PEEP은 성장 중',
      affection: 98,
      petImage: require('@/assets/images/pet/youth/03.rabbit_youth.png'), // 필요 시 각각 다르게
    },
    {
      id: 4,
      petType: "고양이",
      petGrade: "RARE" as "COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGENDARY",
      petName: "고양이",
      petGrowth: '다 자란 PEEP',
      affection: 1,
      petImage: require('@/assets/images/pet/adult/04.rabbit_adult.png'), // 필요 시 각각 다르게
    },
  ]
  const [currentPetIndex, setCurrentPetIndex] = useState(3);
  const currentPet = pets[currentPetIndex];

  
  // 화면 크기 변경에 따라 특정 ICON 크기 동적으로 업데이트
  const [ICONHeight, setICONHeight] = useState(0);
  const [ICONWidth, setICONWidth] = useState(0);
  
  useEffect(() => {
      const { height } = Dimensions.get('window');
      const { width } = Dimensions.get('window');
      const calculatedHeight = width <= 400 ? 36 : 48;
      const calculatedWidth = width <= 400 ? 36 : 48;
      setICONHeight(calculatedHeight);
      setICONWidth(calculatedWidth);

      const handleResize = () => {
          const { height } = Dimensions.get('window');
          const { width } = Dimensions.get('window');
          const updatedHeight = width <= 400 ? 36 : 48;
          const calculatedWidth = width <= 400 ? 36 : 48;
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
      const calculatedHeight = height <= 700 ? 12 : 0;
      setAddMargin(calculatedHeight);

      const handleResize = () => {
          const { height } = Dimensions.get('window');
          const updatedHeight = height <= 700 ? 12 : 0;
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

  //소리 재생
  const [playEffect, setPlayEffect] = useState(false);
  const [voiceEffect, setVoiceEffect] = useState(false);

  //버튼 페이지 이동  
  const router = useRouter();
  const list = () => {
    router.push('/main/pet/list');
  };
  const collection = () => {
    router.push('/main/pet/collection');
  };
  const addPet = () => {
    router.push('/main/pet/addPet');
  };

  //room 바꾸기
  const petRoomList = [
    require('@/assets/images/test/img_room_01.png'),
    require('@/assets/images/test/img_room_02.png'),
    require('@/assets/images/test/img_room_03.png'),
    require('@/assets/images/test/img_room_04.png'),
    require('@/assets/images/test/img_room_05.png'),
    require('@/assets/images/test/img_room_06.png'),
  ];
  const [petRoom, setPetRoom] = useState(0);
  const changRoom = () => {
    const Room = (petRoom + 1) % petRoomList.length; // 순환 로직
    setPetRoom(Room);
  };


  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const rotation = useSharedValue(0);
  const scaleY = useSharedValue(1);
  const scaleX = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    const adjustedTranslateY = -50 * (scaleY.value - 1);
    return {
      transform: [
        { translateY: 50 },
        { rotate: `${rotation.value}deg` },
        { scaleY: scaleY.value },
        { scaleX: scaleX.value },
        { translateY: -50 },
        { translateY: adjustedTranslateY },
      ],
    };
  });
  const handlePress = () => {
    setVoiceEffect(true);
    if (currentPet.petGrowth === '아직 알인 상태') {
      rotation.value = withSequence(
        withTiming(-14, { duration: 100 }),
        withTiming(12, { duration: 100 }),
        withTiming(-10, { duration: 80 }),
        withTiming(8, { duration: 80 }),
        withTiming(-6, { duration: 40 }),
        withTiming(4, { duration: 40 }),
        withTiming(-2, { duration: 40 }),
        withTiming(0, { duration: 0 })
      );
    } else {
      scaleY.value = withSequence(
        withTiming(1.2, { duration: 100 }),
        withTiming(0.8, { duration: 100 }),
        withTiming(1.1, { duration: 100 }),
        withTiming(0.9, { duration: 100 }),
        withTiming(1, { duration: 80 }) 
      );
      scaleX.value = withSequence(
        withTiming(0.7, { duration: 100 }),
        withTiming(1.1, { duration: 100 }),
        withTiming(0.9, { duration: 100 }),
        withTiming(1, { duration: 100 }),
        withTiming(1, { duration: 80 }),
      );
    }
  };


  return (
      <Frame>
        <View style={[{width: '100%', height: AddMargin}]}></View>
        {/* PEEP 정보창 */}
        <View style={[petStyles.PEEPInfoBox, {marginBottom: 8}]}>
          <View style={{ flex: 1, padding: 10, justifyContent: 'flex-end'}}>            
            <View style={{justifyContent: 'flex-end', marginBottom: 4}}>
              <OutlinedShadowText style={{fontSize:24}}>{currentPet.petName}</OutlinedShadowText>
            </View>
            <View style={[{ flexDirection: "row", marginRight: 8, marginBottom: 4}]}>
              <GlobalText style={[petStyles.optionListText, {marginRight: 8}]}>성장도</GlobalText>
              <GlobalText style={[petStyles.optionListText, {backgroundColor: COLORS.blue, padding: 1}]}>{currentPet.petGrowth}</GlobalText>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", paddingRight: '10%'}}>
              <View style={[{marginRight: 8}]}><GlobalText style={petStyles.optionListText}>애정도</GlobalText></View>
              <View style={[{flex: 1,}]}><GaugeBar percentage={currentPet.affection} /></View>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", paddingRight: '10%'}}>
            </View>
            <View style={{ position: 'relative', width: '100%', height: 20}}></View>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
          <View style={{ flexDirection: "column"}}>
            <TouchableOpacity onPress={() => { setPlayEffect(true); list(); }} activeOpacity={1}> 
              <View style={[{justifyContent: 'center', alignItems: 'center', margin: 4}]}>
                <Image source={iconPeepList} style={{width: ICONWidth, height: ICONHeight }}></Image>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setPlayEffect(true); collection(); }} activeOpacity={1}> 
              <View style={[{justifyContent: 'center', alignItems: 'center', margin: 4}]}>
                <Image source={iconCollection} style={{width: ICONWidth, height: ICONHeight }}></Image>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setPlayEffect(true); addPet(); }} activeOpacity={1}> 
              <View style={[{justifyContent: 'center', alignItems: 'center', margin: 4}]}>
                <Image source={iconRandomDraw} style={{width: ICONWidth, height: ICONHeight }}></Image>
              </View>
            </TouchableOpacity>
          </View>
          </View>
        </View>
        <View style={[{height: Separator}]}></View>
        <View style={{ position: 'relative', width: '100%'}}>
            <ImageBackground source={petRoomList[petRoom]} style={[petStyles.PEEPRoom, { height: PEEPInfoBoxHeight }]} imageStyle={petStyles.PEEPRoomImg}>
            <TouchableOpacity onPress={handlePress} activeOpacity={1}>
              <AnimatedImage style={[petStyles.PEEPImg, animatedStyle]} source={currentPet.petImage} />
            </TouchableOpacity>
            </ImageBackground>
        </View>
        <View style={{width:'100%', height: 20, paddingRight: 8, marginTop: 4, marginBottom: 12, }}>
          <TouchableOpacity onPress={() => { setPlayEffect(true); changRoom(); }} activeOpacity={1}>
            <GlobalText style={{color: COLORS.gray, textAlign: 'right'}}>ROOM 변경</GlobalText>
          </TouchableOpacity>
        </View>

        <View style={[{height: Separator}]}></View>
        <View style={{ width: '100%', flexDirection: "row", alignItems: "center",  justifyContent: "space-evenly"}}>
          <TouchableOpacity activeOpacity={1}><Image source={iconFeed} style={{ width: ICONWidth, height: ICONHeight,}}></Image></TouchableOpacity>
          <TouchableOpacity activeOpacity={1}><Image source={iconPat} style={{ width: ICONWidth, height: ICONHeight,}}></Image></TouchableOpacity>
          <TouchableOpacity activeOpacity={1}><Image source={iconPlay} style={{width: ICONWidth, height: ICONHeight,}}></Image></TouchableOpacity>
          <TouchableOpacity activeOpacity={1}><Image source={iconShower} style={{ width: ICONWidth, height: ICONHeight,}}></Image></TouchableOpacity>
          <TouchableOpacity activeOpacity={1}><Image source={iconToiolet} style={{ width: ICONWidth, height: ICONHeight,}}></Image></TouchableOpacity>
        </View>

      {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
      {voiceEffect && ( <VoiceSound onPlaybackEnd={() => setVoiceEffect(false)} />)}
      </Frame>
  );
};

