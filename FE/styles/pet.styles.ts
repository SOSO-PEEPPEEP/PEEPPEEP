import { COLORS } from '@/constants/COLORS';
import { StyleSheet } from 'react-native';

export const petStyles = StyleSheet.create({
    title:{
        color: COLORS.pink,
        fontWeight: "bold",
        fontSize: 32
    },
    titleShadow:{
        position: "absolute",
        fontWeight: "bold",
        fontSize: 32,
        left: 2,
        top: 2,
    }, 
    PEEPInfoBox: {
        width: '100%',
        flexDirection: 'row', 
        minHeight: 120, 
        maxHeight: 200,
    },
    PEEPRoom: {
        width: '100%',
        backgroundColor: COLORS.blue,
        position: 'relative',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: COLORS.blue,
        borderRadius: 10,
    },
    PEEPRoomImg: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    PEEPImg:{
        width: 140,
        height: 140,
        marginBottom: 24,
    },
    optionListText: {
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
        color: COLORS.dark,
        textAlign: 'left',
        fontSize: 20,
    },
    petListBox: {
        width: '100%',
        marginBottom: 12,
    },
    petList:{
        height: 102,
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
        backgroundColor: COLORS.dark,
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
        fontSize: 20,
    },
    petName: {
        fontSize: 20,
    },
    petStats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    petStatsText: {
        color: COLORS.dark,
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
        marginVertical: 4,
    },
    addPeepText: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    addPeepTextShadow: {
        fontWeight: 'bold',
        fontSize: 24,
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
        width: 310,
        height: 380,
        backgroundColor: COLORS.dark,
        borderColor: COLORS.dark,
        borderWidth: 2,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        position: 'absolute',
        top: 2,
        left: 3,
    },
    addPeepInfoBox: {
        width: 310,
        height: 380,
        alignItems: 'center', 
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 24,
        backgroundColor: COLORS.white,
        borderColor: COLORS.dark,
        borderWidth: 2,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    entryNumber: {
        width: 120,
        height: 24,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginTop: 12,
        backgroundColor: COLORS.white,
    },
    entryNumberText:{
        textAlign: 'center',
        fontSize: 20,
    },
    addPeepNameText:{
        color: COLORS.white,
        fontSize: 20,
        textAlign: 'left',
        marginBottom: 4,
    },
    addPeepInfoText: {
        fontSize: 16,
        textAlign: 'left',
    },
    addPeepMessage:{
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 10,
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
    petInfoMessage: {
        width: 270,
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 16,
        marginBottom: 16,
    },

    //collection
    collectionList: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap', 
    },
    collectionCard: {
        justifyContent: 'center',
        marginRight: 4,
        marginLeft: 4,
    },
    collections: {
        width: '100%',
        marginBottom: 4,
    },
    bookmark: {
        width: 44,
        height: 8,
        backgroundColor: COLORS.dark,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    collection: {
        alignItems: 'center', 
        justifyContent: 'center',
        width: 132,
        height: 160,
        borderWidth: 1,
        borderColor: COLORS.dark,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        position: 'absolute',
        top: 4,
        left: 8,
        padding: 12,
    },
    collectionShadow: {
        width: 136,
        height: 164,
        borderWidth: 1,
        backgroundColor: COLORS.dark,
        borderColor: COLORS.dark,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    collectionPetImg: {
        alignItems: 'center', 
        justifyContent: 'center',
        width: '100%',
        height: '70%',
        marginBottom: 12,
    },
    collectionInfoBox:{
        width: '100%',
        textAlign: 'left',
        marginBottom: 2,
    },
    collectionInfoText: {
        fontSize: 10,
    },
    collectionNameBox:{
        width: '100%',
        textAlign: 'left',
    },
    collectionNameText: {
        color: COLORS.white,
    },
    collectionEntryNumber: {
        justifyContent: 'center',
        backgroundColor: COLORS.blue,
        width : 80,
        height: 16,
        marginBottom: 8,
    },
    collectionEntryNumberText: {
        color: COLORS.white,
        fontSize: 12,
        textAlign: 'center',
    },

    //petCollectionInfo
    petGrowth: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
        height: 60,
        width: '100%',
    },
    petCollectionImg:{
        width: 52,
        height: 52,
    },
});