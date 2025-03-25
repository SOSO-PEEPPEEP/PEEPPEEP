import { View } from 'react-native';
import GlobalText from '@/constants/GlobalText';
import Frame from '@/components/ui/Frame';

export default () => {
    return(
        <Frame>
            <GlobalText style={{textAlign:'center'}}>챌린지목록페이지</GlobalText>
        </Frame>
    );
}