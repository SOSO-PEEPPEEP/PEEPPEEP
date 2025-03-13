import { Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { styles } from '@/constants/styles';

export default function App() {
  const [fontsLoaded] = useFonts({
    "PF-Stardust": require("@/assets/fonts/PFstardust3.0.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>안녕요</Text>
    </View>
  );
}
