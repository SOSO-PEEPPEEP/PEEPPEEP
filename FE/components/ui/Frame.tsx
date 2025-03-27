import { View } from 'react-native'
import { ReactNode } from 'react'
import { styles } from './Frame.style';

interface FrameProps {
    children:ReactNode;
}

export default ({children}:FrameProps) => {
    return(
        <View style={styles.frameContainer}>
            <View>{children}</View>
        </View>
    )
}