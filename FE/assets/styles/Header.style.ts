import { StyleSheet } from "react-native";
import { COLORS } from '@/constants/Colors';

export const styles = StyleSheet.create({
    // 메뉴바
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: COLORS.blue,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderColor: COLORS.white,
    },
    title: {
        position: "absolute",
        fontSize: 36,
        fontWeight: "bold",
        color: COLORS.white
    },
    titleShadow1: {
        color: COLORS.purple,
        left: 2,
        top: 1,
    },
    titleShadow2: {
        color: COLORS.yellow,
        left: 4,
        top: 2,
    },

    // 메뉴바
    menuBarContainer: {
        backgroundColor: COLORS.gray,
        flexDirection:"row",
        gap:8,
        paddingHorizontal:12,
        paddingVertical:4
    },
    menuBarText: {
        color: COLORS.dark,
    },
    underline: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 11,
        height: 1,
        backgroundColor: COLORS.dark,
    }
});