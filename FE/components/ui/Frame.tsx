import { View } from 'react-native'
import { ReactNode } from 'react'
import { styles } from '@/constants/styles'

interface FrameProps {
    children:ReactNode;
}

export default ({children}:FrameProps) => {
    return(
        <View style={styles.container}>
            <View>{children}</View>
        </View>
    )
}