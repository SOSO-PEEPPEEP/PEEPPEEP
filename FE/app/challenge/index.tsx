import { View } from 'react-native';
import GlobalText from '@/constants/GlobalText';
import Frame from '@/components/ui/Frame';
import { styles } from './index.style';

export default () => {
    return(
        <Frame>
            <View style={styles.titleContainer}>
                <GlobalText style={styles.titleShadow}>CHALLENGE</GlobalText>
                <GlobalText style={styles.title}>CHALLENGE</GlobalText>
            </View>
        </Frame>
    );
}