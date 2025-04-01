import GlobalText from '@/constants/GlobalText';
<<<<<<< HEAD
import { View,  StyleSheet, TextStyle } from "react-native";
=======
import { View,  StyleSheet, ViewStyle, TextStyle } from "react-native";
>>>>>>> 3e4b679 (🎨 [FE] Design: 챌린지 디테일 80%)
import { ReactNode } from "react";
import { COLORS } from "@/constants/COLORS";

interface SpeechBubbleProps {
    children: ReactNode;
    textStyle?: TextStyle;
}  

export default ({ children, textStyle }: SpeechBubbleProps) => {
<<<<<<< HEAD
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
=======
    return(
        <View>
            <View style={styles.containerShadow}>
                <GlobalText style={[styles.text, textStyle]}>{children}</GlobalText>
            </View>
            <View style={styles.container}>
                <GlobalText style={[styles.text, textStyle]}>{children}</GlobalText>
>>>>>>> 3e4b679 (🎨 [FE] Design: 챌린지 디테일 80%)
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
<<<<<<< HEAD
      textAlign: 'center',
=======
      textAlign: 'center'
>>>>>>> 3e4b679 (🎨 [FE] Design: 챌린지 디테일 80%)
    },
});