import { View } from 'react-native';
import { styles } from '@/constants/styles';
import Header from '@/components/ui/Header';
import { useFonts } from "expo-font";
import Frame from '@/components/ui/Frame';

export default function Index() {
  const [fontsLoaded] = useFonts({
    "PF-Stardust": require("@/assets/fonts/PFstardust3.0.ttf"),
    "PF-Stardust-Bold": require("@/assets/fonts/PFstardust3.0Bold.ttf"),
    "PF-Stardust-ExtraBold": require("@/assets/fonts/PFstardust3.0ExtraBold.ttf")
  });

  if (!fontsLoaded) return null;
  
  return (
    <View style={styles.frameContainer}>
      <Header />
      <Frame>
        <></>
      </Frame>
    </View>
  );
}
