import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: "#D3D3DD",
        padding: 4
    },
    container: {
        backgroundColor: "#F3F8FE",
        width: "100%",
        height: "100%",
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderColor: "#8787A3",
        justifyContent: "center",
        padding: 10,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#C7CFFF",
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderColor: "#FFF",
    },
    title: {
        position: "absolute",
        fontSize: 36,
        fontWeight: "bold",
        color: "#FFF"
    },
    titleShadow1: {
        position: "absolute",
        color: "#9482CE",
        left: 2,
        top: 1,
    },
    titleShadow2: {
        position: "absolute",
        color: "#FFDBB7",
        left: 4,
        top: 2,
    },
    menuBarContainer: {
        backgroundColor:"#D3D3DD",
        flexDirection:"row",
        gap:8,
        paddingHorizontal:12,
        paddingVertical:4
    },
    menuBarText: {
        color: "#8787A3",
    },
    underline: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 11,
        height: 1,
        backgroundColor: "#8787A3",
    },
    tabBarContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width:"100%",
        height: 11,
        backgroundColor: "#C7CFFF",
        borderColor: "#FFF",
        borderTopWidth: 3,
        borderLeftWidth: 3,
    },
});