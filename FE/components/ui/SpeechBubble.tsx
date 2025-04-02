import GlobalText from '@/constants/GlobalText';
import { View,  StyleSheet, TextStyle } from "react-native";
import { ReactNode } from "react";
import { COLORS } from "@/constants/COLORS";

interface SpeechBubbleProps {
    children: ReactNode;
    textStyle?: TextStyle;
}  

export default ({ children, textStyle }: SpeechBubbleProps) => {
    const flattenedStyle = StyleSheet.flatten(textStyle);
    const fontSize = flattenedStyle?.fontSize || 16;
    const dynamicLineHeight = Math.round(fontSize * 1.4);

    return(
        <View>
            <View style={styles.containerShadow}>
                <GlobalText style={[styles.text, { lineHeight: dynamicLineHeight }, textStyle]}>{children}</GlobalText>
            </View>
            <View style={styles.container}>
                <GlobalText style={[styles.text, { lineHeight: dynamicLineHeight }, textStyle]}>{children}</GlobalText>
            </View>
        </View>
    );
}

const baseContainer = {
    borderColor: COLORS.dark,
    borderWidth: 1,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    padding: 12,
};

const styles = StyleSheet.create({
    container: {
        ...baseContainer,
        backgroundColor: COLORS.white,
    },
    containerShadow: {
        ...baseContainer,
        position: "absolute",
        backgroundColor: COLORS.dark,
        width:"100%",
        left:2,
        top:2
    },
    text: {
      textAlign: 'center',
    },
});