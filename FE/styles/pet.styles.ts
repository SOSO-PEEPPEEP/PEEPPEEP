import { StyleSheet } from 'react-native';

export const petstyles = StyleSheet.create({  
    PEEPInfoBox: {
        width: '100%',
        flexDirection: 'row', 
        minHeight: 120, 
        maxHeight: 200, 
        height: '24%', 
        justifyContent: 'flex-end' 
    },
    peepName_01: {
        fontFamily: 'PF stardust ExtraBold',
        color: "#8787A3",
        fontSize: 24,
        position: 'absolute',
        top: 1,                // 화면 상단에 배치
        left: 1,
    },
    peepName_02: {
        fontFamily: 'PF stardust ExtraBold',
        color: "#8787A3",
        fontSize: 24,
        position: 'absolute',
        top: -1,                // 화면 상단에 배치
        left: -1,
    },
    peepName_03: {
        fontFamily: 'PF stardust ExtraBold',
        color: "#8787A3",
        fontSize: 24,
        position: 'absolute',
        top: -1,                // 화면 상단에 배치
        left: 1,
    },
    peepName_04: {
        fontFamily: 'PF stardust ExtraBold',
        color: "#8787A3",
        fontSize: 24,
        position: 'absolute',
        top: 1,                // 화면 상단에 배치
        left: -1,
    },
    peepName_05: {
        fontFamily: 'PF stardust ExtraBold',
        color: "#8787A3",
        fontSize: 24,
        position: 'absolute',
        top: 2,                // 화면 상단에 배치
        left: 2,
    },
    peepName_06: {
        fontFamily: 'PF stardust ExtraBold',
        color: "#8787A3",
        fontSize: 24,
        position: 'absolute',
        top: 2,                // 화면 상단에 배치
        left: 0,
    },
    peepName_07: {
        fontFamily: 'PF stardust ExtraBold',
        color: "#8787A3",
        fontSize: 24,
        position: 'absolute',
        top: 0,                // 화면 상단에 배치
        left: 2,
    },    
    peepName_08: {
        fontFamily: 'PF stardust ExtraBold',
        color: "#fff",
        fontSize: 24,
    },
    PEEPInfoMessage: {
        width:  200,
        height: 56,
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: '#B1ADCA',
        position: 'absolute',
        justifyContent: 'center',
        zIndex: 1,
        top: -20,
        left: -8,
    },
    PEEPRoom: {
        width: '100%',
        backgroundColor: '#D9D9D9',
        position: 'relative',
        justifyContent: 'flex-end', // 이미지가 바닥에 위치하도록 함
        alignItems: 'center', // 이미지가 수평으로 가운데 정렬되도록 설정 (선택사항)
        paddingBottom: 12
    },
    PEEPImg:{
        width: 240,
        height: 240,
    },
    optionListText: {
        fontFamily: 'PF stardust ExtraBold',
        color: '#8787A3',
        textAlign: 'left',
    },


    //List
    pageTitle:{
        width: '100%',
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    pageTitleText: {
        fontFamily: 'PF stardust ExtraBold',
        color: '#8787A3',
        textAlign: 'left',
        fontSize: 20,
    },
    petListBox: {
        width: '100%',
        marginBottom: 12,
    },
    petList:{
        height: 102,
        backgroundColor: '#000',
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    petListShadow: {
        width: '100%',
        height: 102,
        backgroundColor: '#8787A3',
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 2,
        left: 3,
    },
    favorites: {
        width: '10%',
        alignItems: 'flex-start',
        height: '100%',
    },
    favorites_non: {
    },
    favorites_check: {
    },
    favorites_shadow: {
        position: 'absolute',
        top: -2,
        left: -1,
    },
    petImg: {
        width: '30%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    petData: {
        width: '60%',
    },
    petInfo: {
        fontFamily: 'PF stardust ExtraBold',
        color: '#8787A3',
        fontSize: 20,
    },
    petNameShadow00: {
        fontFamily: 'PF stardust ExtraBold',
        color: '#8787A3',
        fontSize: 20,
        position: 'absolute',
        top: 2,
        left: 2,
    },
    petNameShadow01: {
        fontFamily: 'PF stardust ExtraBold',
        color: '#8787A3',
        fontSize: 20,
        position: 'absolute',
        top: 2,
        left: 1,
    },
    petNameShadow02: {
        fontFamily: 'PF stardust ExtraBold',
        color: '#8787A3',
        fontSize: 20,
        position: 'absolute',
        top: -1,
        left: 1,
    },
    petNameShadow03: {
        fontFamily: 'PF stardust ExtraBold',
        color: '#8787A3',
        fontSize: 20,
        position: 'absolute',
        top: -1,
        left: -1,
    },
    petNameShadow04: {
        fontFamily: 'PF stardust ExtraBold',
        color: '#8787A3',
        fontSize: 20,
        position: 'absolute',
        top: 1,
        left: 1,
    },
    petNameShadow05: {
        fontFamily: 'PF stardust ExtraBold',
        color: '#8787A3',
        fontSize: 20,
        position: 'absolute',
        top: 1,
        left: -1,
    },
    petName: {
        fontFamily: 'PF stardust ExtraBold',
        fontSize: 20,
    },
    petStats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    petStatsText: {
        fontFamily: 'PF stardust ExtraBold',
        color: '#8787A3',
        fontSize: 12,
    },


    //addPeep
    addPeepBox: { 
        flex: 1, 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginVertical: 20,
    },
    addPeepList:{
        marginVertical: 8,
    },
    addPeepText: {
        fontFamily: 'PF stardust ExtraBold',
        color: '#8787A3',
        fontSize: 20,
    },
    addPeepTextShadow: {
        fontFamily: 'PF stardust ExtraBold',
        color: '#8787A3',
        fontSize: 20,
        position: 'absolute',
        top: -1,
        left: 1,
    },

    //addPeepInfo
    addPeepInfoContainer: { 
        flex: 1,
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginVertical: 20,
    },
    addPeepInfoBoxShadow:{
        width: 300,
        height: 400,
        backgroundColor: '#8787A3',
        
        borderColor: '#8787A3',
        borderWidth: 2,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        position: 'absolute',
        top: 2,
        left: 3,
    },
    addPeepInfoBox: {
        width: 300,
        height: 400,
        alignItems: 'center', 
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 24,
        backgroundColor: '#fff',
        
        borderColor: '#8787A3',
        borderWidth: 2,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    entryNumber: {
        width: 92,
        height: 24,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginTop: 12,
        backgroundColor: '#fff',
    },
    entryNumberText:{
        fontFamily: 'PF stardust ExtraBold',
        color: '#8787A3',
        textAlign: 'center',
        fontSize: 20,
    },
    addPeepInfoText: {
        fontFamily: 'PF stardust ExtraBold',
        color: '#8787A3',
        fontSize: 16,
        textAlign: 'left',
    },
    addPeepMessage:{
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 20,
    },
    addPeepInfoListBox: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'center',
    },
    addPeepInfoList: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        flexDirection: 'column',
        marginRight: 12,
        marginBottom: 4,
    },
    petInfoMessage:{
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 16,
        marginBottom: 16,
    },

});