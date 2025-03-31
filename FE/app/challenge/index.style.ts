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
        height: 64,
        position: "absolute",
        top: 0,
        left: 0,
        right: 2,
        backgroundColor: COLORS.pink,
        justifyContent: "center",
        alignItems: "center",
      },
});