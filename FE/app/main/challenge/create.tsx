import { View } from 'react-native'
import Frame from '@/components/ui/Frame'
import GlobalText from '@/constants/GlobalText'
import Margin from '@/components/ui/Margin'
import { COLORS } from '@/constants/COLORS'

export default () => {
    return (
        <Frame>
            <GlobalText style={{fontSize:16, color:COLORS.gray}}>CHALLENGE CREATE</GlobalText>

            <Margin height={8}/>
        </Frame>
    )    
}