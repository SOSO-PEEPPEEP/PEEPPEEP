import { View } from 'react-native';
import { useState } from 'react';
import { styles } from '@/constants/styles';
import Header from '@/components/ui/Header';
import { useFonts } from "expo-font";
import Frame from '@/components/ui/Frame';
import TabBar from '@/components/ui/TabBar';

export default function Index() {
  const [selectedTabIdx, setSelectedTabIdx] = useState(2);

  {/*폰트관리*/}
  const [fontsLoaded] = useFonts({
    "PF-Stardust": require("@/assets/fonts/PFstardust3.0.ttf"),
    "PF-Stardust-Bold": require("@/assets/fonts/PFstardust3.0Bold.ttf"),
    "PF-Stardust-ExtraBold": require("@/assets/fonts/PFstardust3.0ExtraBold.ttf")
  });

  if (!fontsLoaded) return null;
  
  return (
    <View style={styles.outerContainer}>
      <View style={{flex:1}}>
        <Header />
        <View style={{flex:1}}>
            <Frame>
                <></>
            </Frame>
        </View>
      </View>
      <TabBar 
        selectedTabIdx={selectedTabIdx}
        setSelectedTabIdx={setSelectedTabIdx}
      />
    </View>
  );
}
