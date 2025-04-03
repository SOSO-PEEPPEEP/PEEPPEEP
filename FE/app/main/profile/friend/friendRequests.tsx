import React from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
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
    );
};
