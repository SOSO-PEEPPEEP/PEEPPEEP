import { StyleSheet } from "react-native";
import { COLORS } from '@/constants/COLORS';

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
        color: COLORS.white,
        paddingTop: 4,
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
        gap:12,
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
    },


    //Modal
    modalContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)' 
    },
    modalContent: {
        width: '100%', 
        height: 380 , 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // backgroundColor: '#f3f8fe',
        justifyContent: 'center', 
        alignItems: 'center',
        borderColor: '#8787a3',
        borderWidth: 4,
    },
});