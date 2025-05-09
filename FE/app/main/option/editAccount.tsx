import React, { useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from 'expo-router'; 
import Frame from '@/components/ui/Frame';
import { FONT } from '@/constants/FONT';
import { styles } from "@/styles/styles";
import GlobalText from '@/constants/GlobalText';
import { petStyles } from "@/styles/pet.styles";
import Margin from '@/components/ui/Margin';
import * as ImagePicker from 'expo-image-picker';
import EffectSound from '@/components/common/effectSound';

export default () => {
  //소리 재생
  const [playEffect, setPlayEffect] = useState(false);

  //profile_Info
  const profileImg = require('@/assets/images/main/profile/img_proifile_01.png');
  const userId = '@loveChu';
  const userNickName = '고양이입니다';
  const msg = '스트릿 출신 삼색이지만, 지금은 집사와 함께하는 동거 라이프하고 있어요. 츄르 챌린지 상시 모집 중!';
  const tag01 = '만1세';
  const tag02 = '개냥이';
  const tag03 = '꾹꾹이';
  const [nickname, setNickname] = useState(userNickName);
  const [messege, setMessege] = useState(msg);
  const [newTag01, seNewtag01] = useState(tag01);
  const [newTag02, seNewtag02] = useState(tag02);
  const [newTag03, seNewtag03] = useState(tag03);

  const router = useRouter();
  const edit = () => {
    setPlayEffect(true);
    router.push('/main/option');
  };

//   이미지 첨부
  const [imageUri, setImageUri] = useState<string | null>(null);
  const pickImage = async () => {
    setPlayEffect(true);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('갤러리 접근 권한이 필요합니다.');
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
    }
  };

    //기본 프로필 이미지
    const defaultProfileImgList = [
        require('@/assets/images/main/profile/img_proifile_01.png'),
        require('@/assets/images/main/profile/img_proifile_02.png'),
        require('@/assets/images/main/profile/img_proifile_03.png'),
        require('@/assets/images/main/profile/img_proifile_04.png'),
    ];
    const [defaultProfileImg, setDefaultProfileImg] = useState(0);
    const changeDefaultProfileImg = () => {
        const newProfileImgIndex = (defaultProfileImg + 1) % defaultProfileImgList.length;
        setDefaultProfileImg(newProfileImgIndex);
        setImageUri(defaultProfileImgList[newProfileImgIndex]);
    };
  return (
    <Frame>
        <View style={{width: '100%', height: 8}}></View>
        <View style={[petStyles.pageTitle, {height: 30}]}>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', }}>
            <GlobalText style={petStyles.pageTitleText}>회원 정보 수정</GlobalText>
          </View>
        </View>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 0 }} showsVerticalScrollIndicator={false}  showsHorizontalScrollIndicator={false}>
        <View style={{ width: '100%', alignItems: 'center',}}>
            <View style={{alignItems: 'center', }}>
                <TouchableOpacity onPress={pickImage} activeOpacity={1}>
                    {imageUri?(
                        <Image
                            source={{ uri: imageUri }}
                            resizeMode="cover"
                            style={styles.profileImg}
                        />
                    ):(
                        <Image source={profileImg} style={styles.profileImg}/>
                    )
                    }
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={changeDefaultProfileImg} activeOpacity={1}>
                    <GlobalText>기본 프로필로 변경하기</GlobalText>
                </TouchableOpacity> */}
                <Margin height={16} />
                <View>
                    <GlobalText style={[styles.profileId, {textAlign: 'center'}]}>{userId}</GlobalText>
                </View>
                <Margin height={16} />
                <View>
                    <GlobalText>닉네임</GlobalText>
                    <Margin height={8} />
                    <TextInput style={[styles.inputBox, {fontFamily: FONT.default}]} placeholder="소개글" value={nickname} onChangeText={setNickname} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent"></TextInput>
                    <Margin height={8} />
                    <GlobalText>한줄 소개</GlobalText>
                    <Margin height={8} />
                    <TextInput style={[styles.inputBox, {fontFamily: FONT.default, height: 80}]} placeholder="소개글" value={messege} onChangeText={setMessege} multiline={true} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent"></TextInput>
                    <Margin height={8} />
                    <GlobalText>해시 태그</GlobalText>
                    <Margin height={8} />
                    <TextInput style={[styles.inputBox, {fontFamily: FONT.default}]} placeholder="태그" value={newTag01} onChangeText={seNewtag01} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent"></TextInput>
                    <TextInput style={[styles.inputBox, {fontFamily: FONT.default}]} placeholder="태그" value={newTag02} onChangeText={seNewtag02} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent"></TextInput>
                    <TextInput style={[styles.inputBox, {fontFamily: FONT.default}]} placeholder="태그" value={newTag03} onChangeText={seNewtag03} placeholderTextColor="#d3d3dd" underlineColorAndroid="transparent"></TextInput>
                </View>
                <Margin height={16} />
                <View>
                    <TouchableOpacity style={styles.agreeButton} onPress={edit} activeOpacity={1}>
                        <GlobalText style={styles.buttonText}>정보 수정하기</GlobalText>
                    </TouchableOpacity>
                </View>
                <Margin height={8} />
            </View>
        </View>
        </ScrollView>
        <Margin height={40} />
  {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
  </Frame>
  );
};