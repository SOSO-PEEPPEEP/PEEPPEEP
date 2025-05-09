import React,  {useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "@/styles/profile.styles";
import GlobalText from '@/constants/GlobalText';
import EffectSound from '@/components/common/effectSound';

const friendRequests = [
    { id: 1, profileImg: require('@/assets/images/main/profile/img_proifile_02.png'), username: "@loveChu", nickname: "친구A입니다" },
    { id: 2, profileImg: require('@/assets/images/main/profile/img_proifile_03.png'), username: "@coolGuy", nickname: "친구B입니다" },
    { id: 3, profileImg: require('@/assets/images/main/profile/img_proifile_04.png'), username: "@happy123", nickname: "친구C입니다" },
    { id: 4, profileImg: require('@/assets/images/main/profile/img_proifile_02.png'), username: "@sunnyDay", nickname: "친구D입니다" },
    { id: 5, profileImg: require('@/assets/images/main/profile/img_proifile_03.png'), username: "@moonLight", nickname: "친구E입니다" },
    { id: 6, profileImg: require('@/assets/images/main/profile/img_proifile_04.png'), username: "@moonLight", nickname: "친구F입니다" },
];

export default () => {
    //소리 재생
    const [playEffect, setPlayEffect] = useState(false);

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 0 }} showsVerticalScrollIndicator={false}  showsHorizontalScrollIndicator={false}>
        <View>
          {/* 받은 요청 */}
          {friendRequests.map((friend) => (
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
                      <View style={styles.profileRequestbutton}>
                          <TouchableOpacity style={styles.profileRequestAccept} onPress={ () => setPlayEffect(true) }>
                              <GlobalText style={styles.buttonText}>수락</GlobalText>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.profileRequestReject} onPress={ () => setPlayEffect(true) }>
                              <GlobalText style={styles.buttonText}>거절</GlobalText>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
          ))}
          
        {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
        </View>
        </ScrollView>
    );
};
