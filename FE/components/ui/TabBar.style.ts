import { StyleSheet } from "react-native";
import { COLORS } from '@/constants/COLORS';

export const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width:"100%",
        height: 12,
        backgroundColor: COLORS.blue,
        borderColor: COLORS.white,
        borderTopWidth: 3,
        borderLeftWidth: 3,
    },
});