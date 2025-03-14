import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    frameContainer: {
        flex: 1,
        backgroundColor: "#D3D3DD",
        padding: 4
    },
    container: {
        backgroundColor:"#F3F8FE",
        width: "100%", // 프레임 가로 크기
        height: "100%", // ✅ 최소 높이 설정 (내용 없어도 프레임 유지됨)
        borderWidth: 4, // 테두리 두께
        borderColor: "#A6A9D8", // 테두리 색상
        justifyContent: "center", // 내부 요소 가운데 정렬
        alignItems: "center",
        padding: 10, // 내부 여백
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
    }
});