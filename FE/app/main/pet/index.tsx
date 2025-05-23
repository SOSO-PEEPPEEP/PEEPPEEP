import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, ImageBackground, NativeMethods, useWindowDimensions } from "react-native";
import GlobalText from '@/constants/GlobalText';
import { petStyles } from "@/styles/pet.styles";
import GaugeBar from "@/components/ui/GaugeBar";
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
import iconToilet from "@/assets/images/icon/pet/icon_toilet.png";
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming, } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import OutlinedShadowText from '@/constants/OutlinedShadowText';
import { COLORS } from '@/constants/COLORS';
import { Growth } from '@/components/pet/util';
import { API_BASE_URL } from '@/constants/env';
import Toast from '@/components/common/Toast';
import Margin from '@/components/ui/Margin';
import LabelText from '@/constants/LabelText';

type PetDetail = {
  petId: number;
  nickname: string;
  growth: Growth;
  affection: number;
  image : string;
};

type InventoryContent = 'FEED' | 'BATH' | 'PLAY' | 'PAT' | 'TOILET';

type Inventory = {
  content: InventoryContent;
  count: number;
  inventoryId: number;
  itemName: string;
}

type MeasurableRef = NativeMethods & {
  measureInWindow: (
    callback: (x: number, y: number, width: number, height: number) => void
  ) => void;
};

export default () => {
  // 화면 크기 변경에 따라 크기 동적으로 업데이트
  const { width, height } = useWindowDimensions();
  const ICONWidth  = width  <= 400 ? 36 : 48;
  const ICONHeight = height <= 400 ? 36 : 48;
  const PEEPInfoBoxHeight = height <= 850 ? height * 0.35 : 360;
  const Separator = height <= 850 ? 0 : 16
  const bottomPx = height * 0.1;

  const [mainPetInfo, setMainPetInfo] = useState<PetDetail | null>(null);
  const [inventoryInfo, setInventoryInfo] = useState<Inventory[]>([]);
  const [toastMsg, setToastMsg] = useState('');
  const [toastKey, setToastKey] = useState(0);
  const btnRefs = useRef<Record<string, MeasurableRef | null>>({});

  // 메인 펫 조회
  useEffect(() => {
    const fetchMainPet = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/pets/main`);
        const json = await res.json();
        setMainPetInfo(json.data);
      } catch (error) {
        console.error('메인 펫 조회 실패:', error);
      }
    };
    fetchMainPet();
  }, []);

  // 인벤토리 조회
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/pets/inventories`);
        const json = await res.json();
        setInventoryInfo(json.data);
      } catch (error) {
        console.error('인벤토리 조회 실패:', error);
      }
    };
    fetchInventory();
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
    router.push('/main/pet/lucky-draw');
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

  if (!mainPetInfo || !inventoryInfo) {
    return (
      <Frame>
        <GlobalText>로딩 중...</GlobalText>
      </Frame>
    );
  }

  function runSequence(
    shared: SharedValue<number>,
    frames: Array<[number, number]>
  ) {
    shared.value = withSequence(
      ...frames.map(([toValue, duration]) => withTiming(toValue, { duration }))
    );
  }

  const handlePress = () => {
    setVoiceEffect(true);

    if (mainPetInfo.growth === 'EGG') {
      runSequence(rotation, [
        [-14, 100],[12, 100],[-10,  80],[  8,  80],
        [ -6,  40],[  4,  40],[ -2,  40],[  0,   0],
      ]);
    } else {
      runSequence(scaleY, [
        [1.2, 100],[0.8, 100],[1.1, 100],[0.9, 100],[1.0,  80],
      ]);
      runSequence(scaleX, [
        [0.7, 100],[1.1, 100],[0.9, 100],[1.0, 100],[1.0,  80],
      ]);
    }
  };

  const useItem = async (
    content: Inventory['content'],
    inventoryId: number
  ) => {
    const item = inventoryInfo.find(i => i.content === content)!;
    if (mainPetInfo.growth === 'ADULT') {
      return showToast('어른 PEEP은 더 이상 돌봐주지 않아도 괜찮아요!');
    }
    if (item.count < 1) {
      return showToast('아이템이 없습니다!');
    }

    setInventoryInfo(cur =>
      cur.map(i =>
        i.inventoryId === inventoryId ? { ...i, count: i.count - 1 } : i
      )
    );

    // 실제 API 호출
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/pets/${mainPetInfo.petId}/interaction`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            inventoryId: inventoryId,
            count: 1,
          }),
        }
      );
      if (!res.ok) throw new Error(`상호작용 실패: ${res.status}`);
      const json = await res.json() as { status: number; message: string; data: PetDetail };
      setMainPetInfo(json.data);
    } catch (e) {
      setInventoryInfo(cur =>
        cur.map(i =>
          i.inventoryId === inventoryId ? { ...i, count: i.count + 1 } : i
        )
      );
      console.error('아이템 사용 실패', e);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastKey(prev => prev + 1);
  };

  const ICONS: { content: Inventory['content']; icon: any }[] = [
    { content: 'FEED',   icon: iconFeed },
    { content: 'PAT',    icon: iconPat },
    { content: 'PLAY',   icon: iconPlay },
    { content: 'BATH',   icon: iconShower },
    { content: 'TOILET', icon: iconToilet },
  ];

  return (
    <Frame>
      <View style={petStyles.PEEPInfoBox}>
        <View style={{ flex: 1 }}>
          {/* 타이틀 */}
          <View style={{height: '50%'}}>
            <GlobalText style={petStyles.titleShadow}>PEEP</GlobalText>
            <GlobalText style={petStyles.title}>PEEP</GlobalText>
          </View>
          {/* PEEP 정보창 */}
          <OutlinedShadowText style={{fontSize:28}}>{mainPetInfo.nickname}</OutlinedShadowText>
          <Margin height={4}/>
          <View style={{ flexDirection: "row"}}>
            <GlobalText style={petStyles.optionListText}>성장도</GlobalText>
            <Margin width={8}/>
            <LabelText style={{backgroundColor: COLORS.blue, fontSize: 14}}>{mainPetInfo.growth}</LabelText>
            <Margin width={8}/>
          </View>
          <Margin height={4}/>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <GlobalText style={petStyles.optionListText}>애정도</GlobalText>
            <Margin width={8}/>
            <View style={{flex: 1}}><GaugeBar percentage={mainPetInfo.affection}/></View>
          </View>
          <Margin height={20}/>
        </View>
        <Margin width={20}/>
        {/* 메뉴바 */}
        <View style={{justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => { setPlayEffect(true); list(); }} activeOpacity={1}> 
            <Image source={iconPeepList} style={{width: ICONWidth, height: ICONHeight }} resizeMode="contain"></Image>
          </TouchableOpacity>
          <Margin height={4}/>
          <TouchableOpacity onPress={() => { setPlayEffect(true); collection(); }} activeOpacity={1}> 
            <Image source={iconCollection} style={{width: ICONWidth, height: ICONHeight }} resizeMode="contain"></Image>
          </TouchableOpacity>
          <Margin height={4}/>
          <TouchableOpacity onPress={() => { setPlayEffect(true); addPet(); }} activeOpacity={1}> 
            <Image source={iconRandomDraw} style={{width: ICONWidth, height: ICONHeight }} resizeMode="contain"></Image>
          </TouchableOpacity>
          <Margin height={4}/>
        </View>
        <Margin height={8}/>
      </View>

      <View style={[{height: Separator}]}></View>

      {/* 메인 펫 */}
      <View style={{ position: 'relative', width: '100%'}}>
          <ImageBackground source={petRoomList[petRoom]} style={[petStyles.PEEPRoom, { height: PEEPInfoBoxHeight }]} imageStyle={petStyles.PEEPRoomImg}>
          <TouchableOpacity onPress={handlePress} activeOpacity={1}>
            <AnimatedImage style={[petStyles.PEEPImg, animatedStyle]} source={{uri:mainPetInfo.image}} />
          </TouchableOpacity>
          </ImageBackground>
      </View>
      <View style={{width:'100%', height: 20, paddingRight: 8, marginTop: 4, marginBottom: 12, }}>
        <TouchableOpacity onPress={() => { setPlayEffect(true); changRoom(); }} activeOpacity={1}>
          <GlobalText style={{color: COLORS.gray, textAlign: 'right'}}>ROOM 변경</GlobalText>
        </TouchableOpacity>
      </View>

      <View style={[{height: Separator}]}></View>

      {/* 아이템 목록 */}
      <View style={{ width: '100%', flexDirection: "row", alignItems: "center",  justifyContent: "space-evenly"}}>
        {ICONS.map(({ content, icon }) => {
          const item = inventoryInfo.find(i => i.content === content);
          return (
            <TouchableOpacity
              key={content}
              activeOpacity={1}
              ref={ref => (btnRefs.current[content] = ref)}
              onPress={() => {
                if (!item) return;
                btnRefs.current[content]?.measureInWindow(()=>{useItem(content, item.inventoryId);});
              }}
            >
              <Image
                source={icon}
                style={{ width: ICONWidth, height: ICONHeight }}
                resizeMode="contain"
              />
              <Margin height={4}/>
              <GlobalText
                style={{
                  color: COLORS.gray,
                  textAlign: 'center',
                }}
              >
                {item?.count ?? 0}개
              </GlobalText>
            </TouchableOpacity>
          );
        })}
      </View>
    
    {/* 아이템 사용 불가능 시 띄우는 토스트 */}
    {toastMsg !== '' && (
      <Toast
        key={toastKey}
        message={toastMsg}
        onHide={() => setToastMsg('')}
        height={bottomPx}
      />
    )}

    {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
    {voiceEffect && ( <VoiceSound onPlaybackEnd={() => setVoiceEffect(false)} />)}
    </Frame>
  );
};

