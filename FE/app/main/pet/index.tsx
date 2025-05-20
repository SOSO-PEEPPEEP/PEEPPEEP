import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Dimensions, TouchableOpacity, ImageBackground, NativeMethods } from "react-native";
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
import OutlinedShadowText from '@/constants/OutlinedShadowText';
import { COLORS } from '@/constants/COLORS';
import { Growth } from '@/components/pet/util';
import { API_BASE_URL } from '@/constants/env';
import Toast from '@/components/common/Toast';
import Margin from '@/components/ui/Margin';

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
  // 화면 크기 변경에 따라 특정 ICON 크기 동적으로 업데이트
  const [ICONHeight, setICONHeight] = useState(0);
  const [ICONWidth, setICONWidth] = useState(0);

  const [mainPetInfo, setMainPetInfo] = useState<PetDetail | null>(null);
  const [inventoryInfo, setInventoryInfo] = useState<Inventory[]>([]);
  const [toastMsg, setToastMsg] = useState('');
  const [toastKey, setToastKey] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
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
  
  useEffect(() => {
      const { height } = Dimensions.get('window');
      const { width } = Dimensions.get('window');
      const calculatedHeight = height <= 400 ? 36 : 48;
      const calculatedWidth = width <= 400 ? 36 : 48;
      setICONHeight(calculatedHeight);
      setICONWidth(calculatedWidth);

      const handleResize = () => {
          const { height } = Dimensions.get('window');
          const { width } = Dimensions.get('window');
          const updatedHeight = height <= 400 ? 36 : 48;
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

  const handlePress = () => {
    setVoiceEffect(true);
    if (mainPetInfo.growth === 'EGG') {
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

  const useItem = async (
    content: Inventory['content'],
    inventoryId: number,
    pageX: number,
    pageY: number
  ) => {
    const item = inventoryInfo.find(i => i.content === content)!;
    if (item.count < 1) {
      return showToast('아이템이 없습니다!', pageX, pageY);
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

  const showToast = (msg: string, x:number, y:number) => {
    setPos({x,y});
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
        <View style={[{width: '100%', height: AddMargin}]}></View>
        {/* PEEP 정보창 */}
        <View style={[petStyles.PEEPInfoBox, {marginBottom: 8}]}>
          <View style={{ flex: 1, padding: 10, justifyContent: 'flex-end'}}>            
            <View style={{justifyContent: 'flex-end', marginBottom: 4}}>
              <OutlinedShadowText style={{fontSize:24}}>{mainPetInfo.nickname}</OutlinedShadowText>
            </View>
            <View style={[{ flexDirection: "row", marginRight: 8, marginBottom: 4}]}>
              <GlobalText style={[petStyles.optionListText, {marginRight: 8}]}>성장도</GlobalText>
              <GlobalText style={[petStyles.optionListText, {backgroundColor: COLORS.blue, padding: 1}]}>{mainPetInfo.growth}</GlobalText>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", paddingRight: '10%'}}>
              <View style={[{marginRight: 8}]}><GlobalText style={petStyles.optionListText}>애정도</GlobalText></View>
              <View style={[{flex: 1,}]}><GaugeBar percentage={mainPetInfo.affection} /></View>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", paddingRight: '10%'}}>
            </View>
            <View style={{ position: 'relative', width: '100%', height: 20}}></View>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
          <View style={{ flexDirection: "column"}}>
            <TouchableOpacity onPress={() => { setPlayEffect(true); list(); }} activeOpacity={1}> 
              <View style={[{justifyContent: 'center', alignItems: 'center', margin: 4}]}>
                <Image source={iconPeepList} style={{width: ICONWidth, height: ICONHeight }} resizeMode="contain"></Image>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setPlayEffect(true); collection(); }} activeOpacity={1}> 
              <View style={[{justifyContent: 'center', alignItems: 'center', margin: 4}]}>
                <Image source={iconCollection} style={{width: ICONWidth, height: ICONHeight }} resizeMode="contain"></Image>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setPlayEffect(true); addPet(); }} activeOpacity={1}> 
              <View style={[{justifyContent: 'center', alignItems: 'center', margin: 4}]}>
                <Image source={iconRandomDraw} style={{width: ICONWidth, height: ICONHeight }} resizeMode="contain"></Image>
              </View>
            </TouchableOpacity>
          </View>
          </View>
        </View>
        <View style={[{height: Separator}]}></View>
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
                  btnRefs.current[content]?.measureInWindow(
                    (x, y, width, height) => {
                      const centerX = x + width / 2;
                      const toastY = y - height * 1.5;
                      useItem(content, item.inventoryId, centerX, toastY);
                    }
                  );
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

      {toastMsg !== '' && (
        <Toast
          key={toastKey}
          message={toastMsg}
          x={pos.x}
          y={pos.y}
          onHide={() => setToastMsg('')}
        />
      )}

      {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
      {voiceEffect && ( <VoiceSound onPlaybackEnd={() => setVoiceEffect(false)} />)}
      </Frame>
  );
};

