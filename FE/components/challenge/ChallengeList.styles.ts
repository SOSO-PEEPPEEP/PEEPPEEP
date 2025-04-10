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
    completedtext:{
        color: COLORS.dark,
        fontSize: 20,
    },
    completedDays:{
        color: COLORS.purple,
        fontSize: 32,
    },
});