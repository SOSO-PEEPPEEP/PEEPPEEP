import { StyleSheet } from "react-native";
import { COLORS } from '@/constants/COLORS';

export const styles = StyleSheet.create({
    titleContainer:{

    },
    title:{
        color: COLORS.yellow,
        fontWeight: "bold",
        fontSize: 32
    },
    titleShadow:{
        position: "absolute",
        color: COLORS.dark,
        fontWeight: "bold",
        fontSize: 32,
        left: 2,
        top: 2,
    },
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