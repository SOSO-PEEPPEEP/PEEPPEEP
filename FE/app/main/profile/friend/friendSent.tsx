import React from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "@/styles/profile.styles";
import profileImg from '@/assets/images/proflieImg_00.jpg';

const sentRequests = [
  { id: 1, username: "@loveChu", nickname: "친구A입니다" },
  { id: 2, username: "@coolGuy", nickname: "친구B입니다" },
  { id: 3, username: "@happy123", nickname: "친구C입니다" },
  { id: 4, username: "@sunnyDay", nickname: "친구D입니다" },
  { id: 5, username: "@moonLight", nickname: "친구E입니다" },
  { id: 6, username: "@moonLight", nickname: "친구F입니다" },
];

export default function Index() {

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 0 }} showsVerticalScrollIndicator={false}  showsHorizontalScrollIndicator={false}>
        <View>
        {/* 보낸 요청 */}          
        {sentRequests.map((friend) => (
            <View key={friend.id} style={styles.friendprofile}>
                <View style={styles.friendProfileImgBoX}>
                    <Image style={styles.friendProfileImg} source={profileImg} />
                </View>
                <View style={styles.friendRequest}>
                    <Text style={styles.profileId}>{friend.username}</Text>
                    <View>
                        <Text style={styles.profileNickname}>{friend.nickname}</Text>
                        <Text style={styles.profileNicknameshadow}>{friend.nickname}</Text>
                    </View>
                    <View style={styles.friendRequestWaiting}>
                        <Text style={styles.friendRequestWaitingText}>친구요청에 대한 응답을 기다리는 중...</Text>
                    </View>
                </View>
            </View>
        ))}
        </View>
        </ScrollView>
    );
};
