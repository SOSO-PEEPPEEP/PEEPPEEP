import React, { useState } from 'react';
import { View, Image, ScrollView, TextInput } from "react-native";
import { styles } from "@/styles/profile.styles";
import { FONT } from '@/constants/FONT';
import GlobalText from '@/constants/GlobalText';
import { COLORS } from '@/constants/COLORS';

const sentRequests = [
  { id: 1, profileImg: require('@/assets/images/main/profile/img_proifile_02.png'), username: "@loveChu", nickname: "친구A입니다" },
  { id: 2, profileImg: require('@/assets/images/main/profile/img_proifile_03.png'), username: "@coolGuy", nickname: "친구B입니다" },
  { id: 3, profileImg: require('@/assets/images/main/profile/img_proifile_04.png'), username: "@happy123", nickname: "친구C입니다" },
  { id: 4, profileImg: require('@/assets/images/main/profile/img_proifile_02.png'), username: "@sunnyDay", nickname: "친구D입니다" },
  { id: 5, profileImg: require('@/assets/images/main/profile/img_proifile_03.png'), username: "@moonLight", nickname: "친구E입니다" },
  { id: 6, profileImg: require('@/assets/images/main/profile/img_proifile_04.png'), username: "@moonLight", nickname: "친구F입니다" },
];

export default function Index() {
    const [query, setQuery] = useState('');

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 0 }} showsVerticalScrollIndicator={false}  showsHorizontalScrollIndicator={false}>
        <View>
            <TextInput
                style={[styles.search, {fontFamily: FONT.default}]}
                placeholder="ID 입력하세요"
                placeholderTextColor={COLORS.gray}
                value={query}
                onChangeText={setQuery}
                returnKeyType="search"
            />
        </View>
        <View>
        {/* 보낸 요청 */}          
        {sentRequests.map((friend) => (
            <View key={friend.id} style={styles.friendprofile}>
                <View style={styles.friendProfileImgBoX}>
                    <Image style={styles.friendProfileImg} source={friend.profileImg} />
                </View>
                <View style={styles.friendRequest}>
                    <GlobalText style={styles.profileId}>{friend.username}</GlobalText>
                    <View>
                        <GlobalText style={styles.profileNickname}>{friend.nickname}</GlobalText>
                        <GlobalText style={styles.profileNicknameshadow}>{friend.nickname}</GlobalText>
                    </View>
                    <View style={styles.friendRequestWaiting}>
                        <GlobalText style={styles.friendRequestWaitingText}>친구요청에 대한 응답을 기다리는 중...</GlobalText>
                    </View>
                </View>
            </View>
        ))}
        </View>
        </ScrollView>
    );
};
