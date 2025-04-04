import React from 'react';
import { Text, View, Image, Animated} from "react-native";
import { useFonts } from 'expo-font';
import { styles } from '@/styles/login.styles'
import peepicon from '@/assets/images/PEEP_LOGO_X4.png';

const TEXT = "/n·/n·/n·";
const ARR = TEXT.split("/n");


export default function Index() {
    //font loading  
    const [fontsLoaded] = useFonts({
        'PF-Stardust': require('@/assets/fonts/PFstardust3.0.ttf'),
        'PF-Stardust-Bold': require('@/assets/fonts/PFstardust3.0Bold.ttf'),
        'PF-Stardust-ExtraBold': require('@/assets/fonts/PFstardust3.0ExtraBold.ttf'),
    });

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

  return (
    <View style={styles.container}>
      <View style={styles.title}></View>
      <View style={styles.topMargin}></View>
      <View style={[styles.contents, { height: 100 }]}>
        <Image style={styles.peepicon} source={peepicon} /> 
        <View style={styles.textbox}>
          <Text style={styles.text1}>peeppeep</Text>
          <Text style={styles.text2}>peeppeep</Text>
          <Text style={styles.text3}>peeppeep</Text>
        </View>
      </View>
      <View style={styles.bottomMargin}></View>
      <View style={styles.bottomOuterMargin}></View>
      <View>
        <View style={[{alignItems: 'center'}, styles.bottomContents]}>
        <View style={{flexDirection:"row", flexWrap:"wrap"}}>
        <Text style={styles.bottomContentsText}>로딩 중</Text>
          {ARR.map((item, index) => (
            <Animated.Text key={index} style={[{opacity:ref_arr[index]}, styles.bottomContentsText]}>{item} {index<ARR.length?" " : ""}</Animated.Text>
            ))}
        </View>
        </View>
      </View>
    </View>
  );
};