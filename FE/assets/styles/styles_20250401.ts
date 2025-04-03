// import { StyleSheet } from 'react-native';

// // export const styles = StyleSheet.create({
// export const getStyles = (fontLoaded: boolean) =>     
//     StyleSheet.create({

//     outerContainer: {
//         flex: 1,
//         backgroundColor: "#D3D3DD",
//         padding: 4,
//     },
//     tabBarContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         width:"100%",
//         height: 12,
//         backgroundColor: "#C7CFFF",
//         borderColor: "#FFF",
//         borderTopWidth: 3,
//         borderLeftWidth: 3,
//     },
//     titleContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         backgroundColor: "#C7CFFF",
//         borderTopWidth: 3,
//         borderLeftWidth: 3,
//         borderColor: "#FFF",
//     },
//     menuBarContainer: {
//         backgroundColor:"#D3D3DD",
//         flexDirection:"row",
//         gap:8,
//         paddingHorizontal:12,
//         paddingVertical:4
//     },
//     menuBarText: {
//         color: "#8787A3",
//     },    underline: {
//         position: "absolute",
//         bottom: 0,
//         left: 0,
//         width: 11,
//         height: 1,
//         backgroundColor: "#8787A3",
//     },
//     titleShadow1: {
//         position: "absolute",
//         color: "#9482CE",
//         left: 2,
//         top: 1,
//     },
//     titleShadow2: {
//         position: "absolute",
//         color: "#FFDBB7",
//         left: 4,
//         top: 2,
//     },








//     friendContainer: {
//         flexDirection: "row",
//         marginTop: 12,
//     },
//     container:{       
//         flex: 1, 
//         justifyContent: 'center',
//         alignItems: 'center',
//         flexDirection: 'column',
//     },
//     title:{
//         backgroundColor: '#c7cfff',
//         width: 334,
//         height: 59,
//         borderColor: '#fff',
//         borderLeftWidth: 3,
//         borderTopWidth: 3,
//     },
//     top_margin:{
//         backgroundColor: '#f3f8fe',
//         width: 334,
//         height: 38,
//         borderColor: '#8787a3',
//         borderTopWidth: 2,
//         borderLeftWidth: 4,
//         borderRightWidth: 4,
//     },
//     contents_box:{
//         width: 334,
//         backgroundColor: '#f3f8fe',
//         borderColor: '#8787a3',
//         borderLeftWidth: 4,
//         borderRightWidth: 4,
//         alignItems: 'center',
//     },
//     bottom_margin:{
//         backgroundColor: '#f3f8fe',
//         width: 334,
//         height: 16,
//         borderColor: '#8787a3',
//         borderBottomWidth: 2,
//         borderLeftWidth: 4,
//         borderRightWidth: 4,
//     },
//     Loding_bottom_margin:{
//         backgroundColor: '#f3f8fe',
//         width: 334,
//         height: 38,
//         borderColor: '#8787a3',
//         borderBottomWidth: 2,
//         borderLeftWidth: 4,
//         borderRightWidth: 4,
//     },
//     bottom_outer_margin:{
//         width: 334,
//         height: 12,
//     },
//     bottom_contents_box:{
//         width: 334,
//         height: 38,
//     },
//     bottom_contents: {
//         fontFamily: 'PF stardust ExtraBold',
//         color: '#8787a3',
//         fontSize: 14,
//         textAlign: 'center',
//         position: 'relative',
//     },


//     //공통_Contents
//     pageTitle:{
//         fontFamily: 'PF stardust ExtraBold',
//         color: '#8787a3',
//         fontSize: 14,
//         textAlign: 'left',
//         width: 284,
//         marginBottom: 8,
//     },
//     pageText:{
//         fontFamily: 'PF stardust ExtraBold',
//         color: '#8787a3',
//         fontSize: 14,
//         textAlign: 'left',
//         marginBottom: 4,
//         // width: 284,
//     },
//     Input_box: {
//         fontFamily: 'PF stardust ExtraBold',
//         color: '#8787a3',
//         fontSize: 14,
//         textAlign: 'left',
//         backgroundColor: '#fff',
//         width: 284,
//         height: 45,
//         borderColor: '#8787a3',
//         borderWidth: 1,
//         marginBottom: 8,
//         padding: 10,
//     },
//     Msg_box:{
//         width: 284,
//         flexDirection: 'row',
//         marginBottom: 8,
//         justifyContent: 'center',
//         position: 'relative',
//     },
//     checkbox: {
//         marginRight: 10,
//     },
//     agreeButton: {
//         backgroundColor: '#BfE1E0',
//         width: 172,
//         height: 36,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 8,
//     },    
//     disagreeButton: {
//         backgroundColor: '#BfE1E0',
//         width: 172,
//         height: 36,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 8,
//     },    
//     nextButton: {
//         backgroundColor: '#ffdbb7',
//         width: 172,
//         height: 36,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 8,
//     },
//     ButtonText: {
//         fontFamily: 'PF stardust ExtraBold',
//         color: '#8787A3',
//         fontSize: 14,
//         textAlign: 'center',
//     },


//     //Loding
//     peepicon: {
//         height: 90,
//         width: 90,
//         position: 'absolute',
//         justifyContent: 'center',
//         alignItems: 'center',
//         top: '50%',
//         left: '50%',
//         transform: [{ translateX: -45 }, { translateY: '-60%' }],
//     },
//     textbox:{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'relative',
//         transform: [{ translateY: '20%' }],
//     },
//     text1: { //보라
//         color: '#ffdbb7',
//         fontFamily: 'PF stardust ExtraBold',
//         fontSize: 36,
//         position: 'absolute',
//         transform: [{ translateX: 3 }, { translateY: 2 }],
//     },
//     text2: { //노랑
//         color: '#9482ce',
//         fontFamily: 'PF stardust ExtraBold',
//         fontSize: 36,
//         position: 'absolute',
//         transform: [{ translateX: 1 }, { translateY: 1 }],
//     },
//     text3: { //하양
//         color: '#fff',
//         fontFamily: 'PF stardust ExtraBold',
//         fontSize: 36,
//         position: 'absolute',
//         transform: [{ translateX: -1 }, { translateY: 0 }],
//     },


//     //Main_Header
//     header: {
//         backgroundColor: '#c7cfff',
//         width: '100%',
//         height: 64,
//         top: 4,
//         borderColor: '#fff',
//         borderLeftWidth: 3,
//         borderTopWidth: 3,
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingLeft: 8,
//         paddingRight: 8,
//         paddingBottom: 12,
//     },
//     headericon: {
//         height: 44,
//         width: 44,
//         marginRight: 4,
//     },
//     mainTitle: {
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'center',
//     },
//     exitbutton: {
//         paddingTop: 4,
//         height: 48,
//         width: 48,
//     },
//     optionList: {
//         width: '100%',
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#d3d3dd',
//         height: 24,
//         fontFamily: 'PF stardust ExtraBold',
//     },
//     optionListFirstLetter: {
//         fontFamily: 'PF stardust ExtraBold',
//         color: '#8787A3',
//         textAlign: 'left',
//         paddingLeft: 12,
//     },
//     optionListText: {
//         fontFamily: 'PF stardust ExtraBold',
//         color: '#8787A3',
//         textAlign: 'left',
//     },
//     mainBody: {
//         flex: 1,
//         width: '100%',
//         minHeight: '100%',
//         height: 734,
//         borderWidth: 3,
//         borderColor: '#8787A3',
//         backgroundColor: '#F3F8FE',
//         paddingTop: 12,
//         paddingLeft: 24,
//         paddingRight: 24,
//         paddingBottom: 12,
//     },
//     MainIcon:{
//         width: 72,
//         height: 72,
//         marginLeft: 8,
//         marginRight: 8,
//     },
//     SubIcon:{
//         width: 48,
//         height: 48,
//         marginLeft: 8,
//         marginRight: 8,
//     },
//     icon: {
//         alignItems: 'flex-end',
//         position: 'absolute',
//         flexDirection: 'row',
//         bottom: 8,
//         width: '100%',
//         justifyContent: 'center',
//     },
//     footer: {
//         backgroundColor: '#c7cfff',
//         width: '100%',
//         height: 14,
//         borderColor: '#fff',
//         borderLeftWidth: 3,
//         borderTopWidth: 3,
//         bottom: 4,
//         marginTop: 4,
//     },


//     //User
//     profile: {
//         flexDirection: 'row', // 이미지와 텍스트를 가로로 배치
//         alignItems: 'center', // 세로로 중앙 정렬
//         marginBottom: 4,
//     },
//     profileImgBoX:{
//         alignSelf: 'flex-start',    
//         borderRadius: 54 / 2,
//         // borderRadius: '100%',
//         width: 54,
//         height: 54,
//         backgroundColor: '#fff',
//         marginRight: 4,
//     },
//     profileImg: {
//         width: '100%',
//         height: '100%',
//         borderRadius: 54 / 2,
//         // borderRadius: '100%',
//     },
//     profileImgBox_another: {
//         alignSelf: 'flex-start',  
//         borderRadius: 54 / 2,
//         // borderRadius: '100%',
//         width: 54,
//         height: 54,
//         backgroundColor: '#fff',
//         flexDirection: 'column',
//         marginLeft: 8,
//     },
//     profileText: {
//         flex: 1,
//     },
//     profileId: {
//         color: '#D3D3DD',
//         fontFamily: 'PF stardust ExtraBold',
//         fontSize: 12,
//     },
//     profileNickname: {
//         color: '#9482CE',
//         fontFamily: 'PF stardust ExtraBold',
//         fontSize: 20,
//         position: 'absolute',
//         transform: [{ translateX: 1 }, { translateY: 1 }],
//     },
//     profileNicknameshadow: {
//         color: '#CED5FF',
//         fontFamily: 'PF stardust ExtraBold',
//         fontSize: 20,
//         transform: [{ translateX: 0 }, { translateY: 0 }],
//     },
//     profileTagList: {
//         flexDirection: 'row',
//     },
//     profileTag: {
//         fontSize: 12,
//         color: '#fff',
//         fontFamily: 'PF stardust ExtraBold',
//         backgroundColor: '#BFE1E0',
//         marginRight: 4,
//         marginTop: 4,
//         padding: 2,
//     },
//     profileMessegeBox: {
//         backgroundColor: '#fff',
//         height: 60,
//         borderColor: '#8787A3',
//         borderWidth: 1,
//         borderTopEndRadius: 10,
//         borderBottomLeftRadius: 10,
//         borderBottomRightRadius: 10,
//         // shadowColor: '#8787A3',
//         // shadowOffset: { width: 3, height: 2 }, // 그림자의 위치 (x, y)
//         padding: 8,
//         justifyContent: 'center',
//         position: 'relative',
//         zIndex: 2,
//     },
//     profileMessegeBoxShadow: {
//         width: '100%',
//         height: '100%',
//         backgroundColor: '#8787A3',
//         borderColor: '#8787A3',
//         borderWidth: 1,
//         borderTopEndRadius: 10,
//         borderBottomLeftRadius: 10,
//         borderBottomRightRadius: 10,
//         marginRight: 8,
//         position: 'absolute',
//         top: 2,
//         left: 3,
//         zIndex: 1,
//     },
//     profileMessege: {
//         color: '#8787A3',
//         fontFamily: 'PF stardust ExtraBold',
//         fontSize: 12,
//         overflow: 'hidden'
//     },
//     //시안B
//     profileImgBox_B: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 100 / 2,
//         // borderRadius: '100%',
//         width: 100,
//         height: 100,
//         backgroundColor: '#fff',
//         flexDirection: 'column',
//         marginRight: 4,
//     },
//     profileImg_B: {
//         width: '100%',
//         height: '100%',
//         borderRadius: 100 / 2,
//         // borderRadius: '100%',
//     },
//     profileMessegeBox_B: {
//         height: 52,
//         padding: 8,
//     },
//     profileMessege_B:{
//         fontFamily: 'PF stardust ExtraBold',
//         color: '#8787A3',
//         marginLeft: -4,
//         fontSize: 12,
//     },
//     profileTag_B: {
//         fontSize: 12,
//         color: '#fff',
//         fontFamily: 'PF stardust ExtraBold',
//         backgroundColor: '#BFE1E0',
//         marginRight: 4,
//         padding: 2,
//     },


//     friendListButtons: {
//         alignItems: 'center',
//         flex: 1,
//         flexDirection: 'row',
//         marginBottom: 12,
//     },
//     friendButtons: {
//         backgroundColor: '#8787A3',
//         flex: 1,
//         justifyContent: 'center',
//         borderColor: '#8787A3',
//         borderTopWidth: 1,
//         borderLeftWidth: 1,
//         borderRightWidth: 1,
//         borderTopLeftRadius: 10,
//         borderTopRightRadius: 10,
//         height: 30,
//     },
//     selectFriendButtons:{
//         backgroundColor: 'none',
//     },
//     friendButtonsText: {
//         fontFamily: 'PF stardust ExtraBold',
//         fontSize: 14,
//         color: '#fff',
//         textAlign: 'center',
//     },
//     selectFriendButtonsText:{
//         color: '#8787A3'
//     },
//     friendButtonsLine: {
//         marginBottom: 12,
//         height: 30,
//         borderColor: '#8787A3',
//         borderBottomWidth: 1,
//         width: 4,
//     },
//     friendprofile: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 8,
//     },
//     friendprofileText: {
//         backgroundColor: '#BFE1E0',
//         flex: 1,
//         borderColor: '#8787A3',
//         borderWidth: 1,
//         borderTopEndRadius: 10,
//         borderBottomLeftRadius: 10,
//         borderBottomRightRadius: 10,
//         // shadowColor: '#8787A3',
//         // shadowOffset: { width: 3, height: 2 }, // 그림자의 위치 (x, y)
//         padding: 8,
//         position: 'relative',
//         zIndex: 2,
//     },
//     friendprofileTextShadow:{
//         width: '100%',
//         height: '100%',
//         backgroundColor: '#8787A3',
//         borderColor: '#8787A3',
//         borderWidth: 1,
//         borderTopEndRadius: 10,
//         borderBottomLeftRadius: 10,
//         borderBottomRightRadius: 10,
//         marginRight: 8,
//         position: 'absolute',
//         top: 2,
//         left: 3,
//         zIndex: 1,
//     },
//     friendprofileText_another: {
//         backgroundColor: '#CED5FF',
//         flex: 1,
//         borderColor: '#8787A3',
//         borderWidth: 1,
//         borderTopStartRadius: 10,
//         borderBottomLeftRadius: 10,
//         borderBottomRightRadius: 10,
//         // shadowColor: '#8787A3',
//         // shadowOffset: { width: 3, height: 2 }, // 그림자의 위치 (x, y)
//         padding: 8,
//         position: 'relative',
//         zIndex: 2,
//     },
//     friendprofileTextShadow_another: {
//         width: '100%',
//         height: '100%',
//         backgroundColor: '#8787A3',
//         borderColor: '#8787A3',
//         borderWidth: 1,
//         borderTopStartRadius: 10,
//         borderBottomLeftRadius: 10,
//         borderBottomRightRadius: 10,
//         marginRight: 8,
//         position: 'absolute',
//         top: 2,
//         left: 3,
//         zIndex: 1,
//     },
//     friendRequest: {
//         backgroundColor: '#fff',
//         flex: 1,
//         borderColor: '#8787A3',
//         borderWidth: 1,
//         borderTopEndRadius: 10,
//         borderBottomLeftRadius: 10,
//         borderBottomRightRadius: 10,
//         shadowColor: '#8787A3',
//         shadowOffset: { width: 3, height: 2 }, // 그림자의 위치 (x, y)
//         padding: 8,
//     },
//     profileRequestbutton: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 8,
//     },
//     profileRequestAccept: {
//         width: '30%',
//         minWidth: 104,
//         height: 24,
//         backgroundColor: '#BFE1E0',
//         fontFamily: 'PF stardust ExtraBold',
//         color: '#8787A3',
//         marginLeft: 4,
//         marginRight: 4,
//         justifyContent: 'center',
//     },
//     profileRequestReject: {
//         width: '30%',
//         minWidth: 104,
//         height: 24,
//         backgroundColor: '#FFCDD9',
//         fontFamily: 'PF stardust ExtraBold',
//         color: '#8787A3',
//         marginLeft: 4,
//         marginRight: 4,
//         justifyContent: 'center',
//     },
//     friendRequestWaiting: {
//         width: '100%',
//         flexDirection: 'row',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         marginTop: 8,
//         marginLeft: 4,
//     },
//     friendRequestWaitingText: {
//         textAlign: 'left',
//         fontFamily: 'PF stardust ExtraBold',
//         fontSize: 12,
//         color: '#8787A3',
//     },

//     //PEEP_MAIN
//     PEEPInfoBox: {
//         flexDirection: 'row', 
//         minHeight: 120, 
//         maxHeight: 200, 
//         height: '24%', 
//         justifyContent: 'flex-end' 
//     },
//     peepName_01: {
//         fontFamily: 'PF stardust ExtraBold',
//         color: "#8787A3",
//         fontSize: 24,
//         // textShadowColor: '#8787A3',  // 테두리 색상
//         // textShadowOffset: { width: 1, height: 1},  // 그림자(테두리)의 위치
//         position: 'absolute',
//         top: 1,                // 화면 상단에 배치
//         left: 1,
//     },
//     peepName_02: {
//         fontFamily: 'PF stardust ExtraBold',
//         color: "#8787A3",
//         fontSize: 24,
//         // textShadowColor: '#8787A3',  // 테두리 색상
//         // textShadowOffset: { width: -1, height: -1},  // 그림자(테두리)의 위치
//         position: 'absolute',
//         top: -1,                // 화면 상단에 배치
//         left: -1,
//     },
//     peepName_03: {
//         fontFamily: 'PF stardust ExtraBold',
//         color: "#8787A3",
//         fontSize: 24,
//         // textShadowColor: '#8787A3',  // 테두리 색상
//         // textShadowOffset: { width: -1, height: 1},  // 그림자(테두리)의 위치
//         position: 'absolute',
//         top: -1,                // 화면 상단에 배치
//         left: 1,
//     },
//     peepName_04: {
//         fontFamily: 'PF stardust ExtraBold',
//         color: "#8787A3",
//         fontSize: 24,
//         // textShadowColor: '#8787A3',  // 테두리 색상
//         // textShadowOffset: { width: 1, height: -1},  // 그림자(테두리)의 위치
//         position: 'absolute',
//         top: 1,                // 화면 상단에 배치
//         left: -1,
//     },
//     peepName_05: {
//         fontFamily: 'PF stardust ExtraBold',
//         color: "#8787A3",
//         fontSize: 24,
//         // textShadowColor: '#8787A3',  // 테두리 색상
//         // textShadowOffset: { width: 2, height: 2},  // 그림자(테두리)의 위치
//         position: 'absolute',
//         top: 2,                // 화면 상단에 배치
//         left: 2,
//     },
//     peepName_06: {
//         fontFamily: 'PF stardust ExtraBold',
//         color: "#8787A3",
//         fontSize: 24,
//         // textShadowColor: '#8787A3',  // 테두리 색상
//         // textShadowOffset: { width: 0, height: 2},  // 그림자(테두리)의 위치
//         position: 'absolute',
//         top: 2,                // 화면 상단에 배치
//         left: 0,
//     },
//     peepName_07: {
//         fontFamily: 'PF stardust ExtraBold',
//         color: "#8787A3",
//         fontSize: 24,
//         position: 'absolute',
//         top: 0,                // 화면 상단에 배치
//         left: 2,
//     },    
//     peepName_08: {
//         fontFamily: 'PF stardust ExtraBold',
//         color: "#fff",
//         fontSize: 24,
//     },
//     PEEPInfoMessage: {
//         width:  200,
//         height: 56,
//         backgroundColor: '#fff',
//         borderWidth: 3,
//         borderColor: '#B1ADCA',
//         position: 'absolute',
//         justifyContent: 'center',
//         zIndex: 1,
//         top: -20,
//         left: -8,
//     },
//     PEEPRoom: {
//         width: '100%',
//         backgroundColor: '#D9D9D9',
//         position: 'relative',
//         justifyContent: 'flex-end', // 이미지가 바닥에 위치하도록 함
//         alignItems: 'center', // 이미지가 수평으로 가운데 정렬되도록 설정 (선택사항)
//         paddingBottom: 12
//     },
//     PEEPImg:{
//         width: 240,
//         height: 240,
//     },

// });