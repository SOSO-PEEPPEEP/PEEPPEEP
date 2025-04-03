import React, { useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useFonts } from 'expo-font';
import { styles } from "@/assets/styles/Styles";
import profileImg from '@/assets/images/proflieImg_00.jpg';

export default function Index() {  
    //font loading  
    const [fontsLoaded] = useFonts({
    'PF stardust ExtraBold': require('@/assets/fonts/PFstardust-ExtraBold.ttf'),
    });

    //친구 Info
    const friend_userId = '@loveChu';
    const friend_nickName = '친구A입니다';
    const friend_msg = '스트릿 출신 삼색이지만,\n지금은 집사와 함께하는 동거 라이프하고 있어요. \n츄르 챌린지 상시 모집 중!';
    const friend_tag01 = '만1세';
    const friend_tag02 = '개냥이';
    const friend_tag03 = '꾹꾹이';
    const friendTags = [friend_tag01, friend_tag02, friend_tag03];

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    
    const [isVisible_another, setIsVisible_another] = useState(false);
    const toggleVisibility_another = () => {
        setIsVisible_another(!isVisible_another);
    };

    return (
        <View>
            {/* original */}
          <View style={styles.friendprofile}>
            {/* 친구 프로필 이미지 */}
            <View style={styles.friendProfileImgBoX}><Image style={styles.friendProfileImg} source={profileImg} /></View>
            <View style={{flex: 1}}>
                <TouchableOpacity style={[styles.friendprofile, {width:'100%'}]} onPress={toggleVisibility} activeOpacity={1}>
                <View style={styles.friendprofileText}>
                    <Text style={[styles.profileId, {color: '#8787A3'}]}>{friend_userId}</Text>
                    <View>
                        <Text style={styles.friendprofileNickname}>{friend_nickName}</Text>
                        <Text style={[styles.friendprofileNicknameshadow, {color: '#FFDBB7'}]}>{friend_nickName}</Text>
                    </View>
                    <View>
                        {isVisible && 
                            <Text style={{fontFamily:'PF stardust ExtraBold', color:'#8787A3', fontSize: 12, padding: 4, marginBottom: 4,}}>{friend_msg}</Text>
                        }
                    </View>
                    <FlatList
                        data={friendTags}
                        renderItem={({ item }) => (
                            <Text style={[styles.profileTag, { backgroundColor: "#FFCDD9" }]}>
                            {item}
                            </Text>
                        )}
                        horizontal={true}
                    />
                    </View>
                    <View style={styles.friendprofileTextShadow}></View>
                </TouchableOpacity>
            </View>
          </View>
          {/* another */}
          <View style={styles.friendprofile}>
            <TouchableOpacity style={[styles.friendprofile, {flex: 1}]} onPress={toggleVisibility_another} activeOpacity={1}>
              <View style={styles.friendprofileText_another}>
                    <Text style={[styles.profileId, {color: '#8787A3'}]}>@loveChu</Text>
                    <View>
                    <Text style={styles.profileNickname}>친구B입니다</Text>
                    <Text style={[styles.profileNicknameshadow, {color: '#FFDBB7'}]}>친구B입니다</Text>
                    </View>
                    <View>
                    {isVisible_another && <Text style={{fontFamily:'PF stardust ExtraBold', color:'#8787A3', fontSize: 12, padding: 4}}>내용이 보입니다!</Text>}
                    </View>
                    <View style={[styles.profileTagList]}>
                    <Text style={[styles.profileTag, {backgroundColor: '#FFCDD9'}]}>#태그</Text>
                    <Text style={[styles.profileTag, {backgroundColor: '#FFCDD9'}]}>#태그</Text>
                    <Text style={[styles.profileTag, {backgroundColor: '#FFCDD9'}]}>#태그</Text>
                    </View>
              </View>
              <View style={styles.friendprofileTextShadow_another}></View>
            </TouchableOpacity>
            <View style={styles.profileImgBox_another}><Image style={styles.friendProfileImg} source={profileImg} /></View>
          </View>
        </View>
    );
};
