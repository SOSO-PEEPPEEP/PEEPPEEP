import React, { useState, useEffect } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { styles } from "@/assets/styles/Styles";
import peepicon from './../assets/images/PEEP_LOGO_X2.png';
import exitbutton from './../assets/images/exit_button.png';
import HomeIcon from './../assets/images/Home_Icon.png';
import friendIcon from './../assets/images/friend_icon.png';
import calendarIcon from './../assets/images/calendar_icon.png';
import GaugeBar from "./Gaugebar";
import { Audio } from "expo-av";

export default function Index() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // 버튼 클릭 시 실행되는 함수
  async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./../assets/music/pika.mp3") // 📌 여기에 사용할 음원 파일을 넣으세요.
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log("오류 발생:", error);
    }
  }

  // 언마운트 시 사운드 정리
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);










    const [fontsLoaded] = useFonts({
      'PF stardust ExtraBold': require('./../assets/fonts/PFstardust-ExtraBold.ttf'),
    });
    // if(!fontsLoaded){return <AppLoading />}


  const PEEPNAME = 'PEEPNAME';

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
    <View style={styles.container}>
      <View style={styles.mainBody}>
        <View style={[{width: '100%', height: AddMargin}]}></View>
        {/* PEEP 정보창 */}
        <View style={[styles.PEEPInfoBox, {marginBottom: 8}]}>
          <View style={{ flex: 1, padding: 10, justifyContent: 'flex-end'}}>            
            <View style={{justifyContent: 'flex-end', marginBottom: 4}}>
              <View>
                <Text style={styles.peepName_01}>{PEEPNAME}</Text>
                <Text style={styles.peepName_02}>{PEEPNAME}</Text>
                <Text style={styles.peepName_03}>{PEEPNAME}</Text>
                <Text style={styles.peepName_04}>{PEEPNAME}</Text>
                <Text style={styles.peepName_05}>{PEEPNAME}</Text>
                <Text style={styles.peepName_06}>{PEEPNAME}</Text>
                <Text style={styles.peepName_07}>{PEEPNAME}</Text>
                <Text style={styles.peepName_08}>{PEEPNAME}</Text>
              </View>
            </View>
            <View style={[{ flexDirection: "row", marginRight: 8, marginBottom: 4}]}>
              <Text style={[styles.optionListText, {marginRight: 8}]}>성장도</Text>
              <Text style={[styles.optionListText, {backgroundColor: '#C7CFFF', padding: 1}]}>갓 태어난 PEEP</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", paddingRight: '10%'}}>
              <View style={[{marginRight: 8}]}><Text style={styles.optionListText}>애정도</Text></View>
              <View style={[{flex: 1,}]}><GaugeBar percentage={60} /></View>
            </View>
            <View style={{ position: 'relative', width: '100%', height: 20}}></View>
          </View>
          {/* <View>
            <Svg height="50" width="200">
              <SvgText fill="white" stroke="black" strokeWidth={1} fontFamily='PF stardust ExtraBold' fontSize={24} y={50}>
                {PEEPNAME}
              </SvgText>
            </Svg>
          </View> */}
          <View style={{justifyContent: 'flex-end'}}>
          <View style={{ flexDirection: "column"}}>
            <View style={[{backgroundColor: '#000', width: ICONWidth, height: ICONHeight, margin: 4}]}></View>
            <View style={[{backgroundColor: '#000', width: ICONWidth, height: ICONHeight, margin: 4}]}></View>
            <View style={[{backgroundColor: '#000', width: ICONWidth, height: ICONHeight, margin: 4}]}></View>
          </View>
          </View>
        </View>
        <View style={[{height: Separator}]}></View>
        <View style={{ position: 'relative', width: '100%'}}>
          <View style={styles.PEEPInfoMessage}>
            <Text style={[{fontFamily:'PF stardust ExtraBold', color: '#D9D9D9', textAlign: 'center'}]}>PEEP은 지금... 너 생각 중...</Text>
          </View>        
          <View style={[styles.PEEPRoom, {height: PEEPInfoBoxHeight}]}>
            <Image style={styles.PEEPImg} source={peepicon}></Image>
          </View>
        </View>
        <View style={[{height: Separator}]}></View>
        <View style={{alignItems: "center", flex: 1, paddingBottom: 16}}>
          <View style={{ flexDirection: "row", padding: 10 }}>
            <View style={[{backgroundColor: '#000', width: 55, height: 55, margin: 4}]}></View>
            <View style={[{backgroundColor: '#000', width: 55, height: 55, margin: 4}]}></View>
            <View style={[{backgroundColor: '#000', width: 55, height: 55, margin: 4}]}></View>
            <View style={[{backgroundColor: '#000', width: 55, height: 55, margin: 4}]}></View> 
            <View style={[{backgroundColor: '#000', width: 55, height: 55, margin: 4}]}></View> 
          </View>
        </View>

        <TouchableOpacity onPress={playSound} style={{ padding: 20, backgroundColor: "lightgray" }}>
        <Text>소리 재생 버튼</Text>
      </TouchableOpacity>







      </View>



    </View>
  );
};