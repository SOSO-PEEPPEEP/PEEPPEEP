import React, { useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { styles } from "@/styles/profile.styles";
import GlobalText from '@/constants/GlobalText';
import VoiceSound from '@/components/common/voiceSound';
import Margin from '@/components/ui/Margin';

export default function Index() {  

    //친구 Info
    const friends = [
        {
            id: 1,
            profileImg: require('@/assets/images/main/profile/img_proifile_02.png'),
            userId: "@loveChu",
            nickname: "친구A입니다",
            message: "스트릿 출신 삼색이지만,\n지금은 집사와 함께하는 동거 라이프하고 있어요. \n츄르 챌린지 상시 모집 중!",
            tags: ["만1세", "개냥이", "꾹꾹이"],
        },
        {
            id: 2,
            profileImg: require('@/assets/images/main/profile/img_proifile_03.png'),
            userId: "@coolGuy",
            nickname: "친구C입니다",
            message: "내용이 보입니다!",
            tags: ["#태그", "#태그", "#태그"],
        },
        {
            id: 3,
            profileImg: require('@/assets/images/main/profile/img_proifile_04.png'),
            userId: "@coolGuy",
            nickname: "친구D입니다",
            message: "내용이 보입니다!",
            tags: ["#태그", "#태그", "#태그"],
        },
        {
            id: 4,
            profileImg: require('@/assets/images/main/profile/img_proifile_02.png'),
            userId: "@coolGuy",
            nickname: "친구E입니다",
            message: "내용이 보입니다!",
            tags: ["#태그", "#태그", "#태그"],
        },
        {
            id: 5,
            profileImg: require('@/assets/images/main/profile/img_proifile_03.png'),
            userId: "@coolGuy",
            nickname: "친구F입니다",
            message: "내용이 보입니다!",
            tags: ["#태그", "#태그", "#태그"],
        },
    ].map((friend, index) => ({
        ...friend,
        isReversed: index % 2 !== 0, // index가 홀수면 true, 짝수면 false
    }));
    const [visibleStates, setVisibleStates] = useState<{ [key: number]: boolean }>({});
    const toggleVisibility = (id: number) => {
        setVisibleStates((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    //소리 재생
    const [voiceEffect, setVoiceEffect] = useState(false);

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 0 }} showsVerticalScrollIndicator={false}  showsHorizontalScrollIndicator={false}>
        <View>
        {friends.map((friend) => ( 
        <View key={friend.id} style={styles.friendprofile}>
            {/* 기본버전 isReversed: true */}
            {!friend.isReversed ? (<>
            <View style={styles.friendProfileImgBoX}>
                <Image style={styles.friendProfileImg} source={friend.profileImg} />
            </View>
            <View style={{ flex: 1 }}>
            <TouchableOpacity style={[styles.friendprofile, { width: "100%" }]} onPress={() => {toggleVisibility(friend.id)}} activeOpacity={1}>
                <View style={styles.friendprofileText}>
                    <GlobalText style={[styles.profileId, { color: "#8787A3" }]}>{friend.userId}</GlobalText>
                    <Margin height={4} />
                    <View>
                        <GlobalText style={styles.friendprofileNickname}>{friend.nickname}</GlobalText>
                        <GlobalText style={[styles.friendprofileNicknameshadow, { color: "#FFDBB7" }]}>
                            {friend.nickname}
                        </GlobalText>
                    </View>
                    <Margin height={2} />
                    {visibleStates[friend.id] && (<View><GlobalText style={{ color: "#8787A3", fontSize: 12, paddingLeft: 4, }}>
                        {friend.message} </GlobalText> 
                        <Margin height={4} /></View>)}
                    <Margin height={2} />
                    <FlatList data={friend.tags} renderItem={({ item }) => ( <GlobalText style={[styles.profileTag, { backgroundColor: "#FFCDD9" }]}>
                        {item} </GlobalText>)} horizontal={true} />
                </View>
                <View style={styles.friendprofileTextShadow}></View>
            </TouchableOpacity>
            </View>
                </>
            ) : (<>
            {/* 반전버전 isReversed: true */}
            <TouchableOpacity style={[styles.friendprofile, { flex: 1 }]} onPress={() => {toggleVisibility(friend.id)}} activeOpacity={1}>
                <View style={styles.friendprofileText_another}>
                    <GlobalText style={[styles.profileId, { color: "#8787A3" }]}>{friend.userId}</GlobalText>
                    <Margin height={4} />
                    <View>
                        <GlobalText style={styles.profileNickname}>{friend.nickname}</GlobalText>
                        <GlobalText style={[styles.profileNicknameshadow, { color: "#FFDBB7" }]}>
                            {friend.nickname}
                        </GlobalText>
                    </View>
                    <Margin height={2} />
                    {visibleStates[friend.id] && (<View><GlobalText style={{ color: "#8787A3", fontSize: 12, paddingLeft: 4, }}>
                        {friend.message} </GlobalText> 
                        <Margin height={4} /></View>)}
                    <Margin height={2} />
                    <View style={styles.profileTagList}>
                    {friend.tags.map((tag, index) => ( <GlobalText key={index} style={[styles.profileTag, { backgroundColor: "#FFCDD9" }]}>
                        {tag} </GlobalText>  ))}
                    </View>
                </View>
                <View style={styles.friendprofileTextShadow_another}></View>
            </TouchableOpacity>
            <View style={styles.profileImgBox_another}>
                <Image style={styles.friendProfileImg} source={friend.profileImg} />
            </View>
            </>
            )}
        </View>
        ))}
        
        {voiceEffect && ( <VoiceSound onPlaybackEnd={() => setVoiceEffect(false)} />)}
        </View>
        </ScrollView>
    );
};
