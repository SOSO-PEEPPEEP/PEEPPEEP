import { View } from 'react-native';
import { styles } from '@/constants/styles';
import GlobalText from '@/constants/GlobalText';

export default function App() {

  return (
    <View style={styles.container}>
      <GlobalText style={styles.title}>안녕요</GlobalText>
    </View>
  );
}
