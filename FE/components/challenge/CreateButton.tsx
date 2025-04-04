import OutlinedShadowText from '@/constants/OutlinedShadowText'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { ReactNode } from "react";
import { COLORS } from '@/constants/COLORS';

interface CreateButtonProps {
    children: ReactNode;
    color?: string;
}  

export default ({ children, color }: CreateButtonProps) => {
    return(
        <View style={{ position: "relative" }}>
            {/* 그림자 */}
            <View style={styles.createButtonShadow} />
            {/* 버튼 */}
            <View style={[styles.createButton, { backgroundColor: color }]}>
                <OutlinedShadowText>{children}</OutlinedShadowText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    createButton: {
        backgroundColor: COLORS.pink,
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    createButtonShadow: {
        position: "absolute",
        top: 2,
        left: 2,
        backgroundColor: COLORS.dark,
        width: "100%",
        height: "100%",
    }
});