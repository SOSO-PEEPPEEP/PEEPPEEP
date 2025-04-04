import React from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
<<<<<<< HEAD
import { useFonts } from 'expo-font';
import { styles } from "@/assets/styles/Styles";
import profileImg from '@/assets/images/proflieImg_00.jpg';

export default function Index() {

    const [fontsLoaded] = useFonts({
        'PF stardust ExtraBold': require('@/assets/fonts/PFstardust-ExtraBold.ttf'),
    });
    // if(!fontsLoaded){return <AppLoading />}

    return (
        <View>
        {/* 받은 요청 */}
          <View style={styles.friendprofile}>
          <View style={styles.friendProfileImgBoX}><Image style={styles.friendProfileImg} source={profileImg} /></View>
            <View style={styles.friendRequest}>
              <Text style={styles.profileId}>@loveChu</Text>
              <View>
                <Text style={styles.profileNickname}>친구A입니다</Text>
                <Text style={styles.profileNicknameshadow}>친구A입니다</Text>
              </View>
              <View style={styles.profileRequestbutton}>
                <TouchableOpacity style={styles.profileRequestAccept}>
                  <Text style={styles.buttonText}>수락</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileRequestReject}>
                  <Text style={styles.buttonText}>거절</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
=======
import { styles } from "@/styles/profile.styles";
import profileImg from '@/assets/images/proflieImg_00.jpg';

const friendRequests = [
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
          {/* 받은 요청 */}
          {friendRequests.map((friend) => (
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
                      <View style={styles.profileRequestbutton}>
                          <TouchableOpacity style={styles.profileRequestAccept}>
                              <Text style={styles.buttonText}>수락</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.profileRequestReject}>
                              <Text style={styles.buttonText}>거절</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
          ))}
        </View>
        </ScrollView>
>>>>>>> c41219e (♻️ [FE] Refactor: 합본)
    );
};
