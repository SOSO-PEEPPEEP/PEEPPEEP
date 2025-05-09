import React from 'react';
import { View, Dimensions , Animated} from "react-native";
import { styles } from '@/styles/login.styles'
import GlobalText from '@/constants/GlobalText';
import logo from '@/assets/images/main/logo_x4.png';

const TEXT = "\n·\n·\n·";
const ARR = TEXT.split("\n");


export default () => {
  const ref_arr = React.useRef(Array.from({length: ARR.length}, () => new Animated.Value(0))).current;

  React.useEffect(() => {
    const timer = setInterval(()=>{
      const animations = ref_arr.map((item, Index)=>{
        return Animated.timing(item, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true
        });
      });
      Animated.stagger(100, animations).start(()=>{
        setTimeout(() => {
          const animations2 = ref_arr.map((item, index) => {
            return Animated.timing(item, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true
            });
          });
          Animated.stagger(100, animations2.reverse()).start()
        }, 1000);
      });
    }, 2000);
    return()=>{
      clearInterval(timer);
    }
  }, []);

  //애니메이팅
  const jumpAnim = React.useRef(new Animated.Value(0)).current;
  const screenHeight = Dimensions.get('window').height;
  const offsetY = screenHeight * 0.65;

  React.useEffect(() => {
    const jump = Animated.loop(
      Animated.sequence([
        Animated.delay(600),
        Animated.timing(jumpAnim, {
          toValue: -8, // 위로 점프
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(jumpAnim, {
          toValue: 0, // 다시 제자리
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    jump.start();
  
    return () => jump.stop(); // 컴포넌트 언마운트 시 정지
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}></View>
      <View style={styles.topMargin}></View>
      <View style={[styles.contents, { height: 100 }]}>
        <Animated.Image
          style={[
            styles.peepicon,
            { transform: [ { translateX: -45 } , { translateY: Animated.subtract(jumpAnim, 60) },] }
          ]}
          source={logo}
        />
        {/* <Image style={styles.peepicon} source={logo} />  */}
        <View style={styles.textbox}>
          <GlobalText style={styles.text1}>peeppeep</GlobalText>
          <GlobalText style={styles.text2}>peeppeep</GlobalText>
          <GlobalText style={styles.text3}>peeppeep</GlobalText>
        </View>
      </View>
      <View style={styles.bottomMargin}></View>
      <View style={styles.bottomOuterMargin}></View>
      <View>
        <View style={[{alignItems: 'center'}, styles.bottomContents]}>
        <View style={{flexDirection:"row", flexWrap:"wrap"}}>
        <GlobalText style={styles.bottomContentsText}>로딩 중</GlobalText>
          {ARR.map((item, index) => (
            <Animated.Text key={index} style={[{opacity:ref_arr[index]}, styles.bottomContentsText]}>{item} {index<ARR.length?" " : ""}</Animated.Text>
            ))}
        </View>
        </View>
      </View>
    {/* <VoiceSound /> */}
    </View>
  );
};