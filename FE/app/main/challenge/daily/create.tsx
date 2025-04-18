import { View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import Frame from '@/components/ui/Frame'
import EffectSound from '@/components/common/effectSound';
import GlobalText from '@/constants/GlobalText'
import Margin from '@/components/ui/Margin'
import { COLORS } from '@/constants/COLORS'
import OutlinedShadowText from '@/constants/OutlinedShadowText'
import CreateButton from '@/components/challenge/CreateButton'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import SpeechBubble from '@/components/ui/SpeechBubble'
import GlobalInput from '@/constants/GlobalInput'
import * as ImagePicker from 'expo-image-picker'
import { API_BASE_URL } from '@/constants/env';

export default () => {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const pickImage = async () => {
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
    
    const router = useRouter();

    const [content, setContent] = useState('');

    //소리 효과
    const [playEffect, setPlayEffect] = useState(false);

    const createDaily = async () => {
        const formData = new FormData();
      
        formData.append('day', '4');
        formData.append('content', content);
        formData.append('picture', {
          uri: imageUri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        } as any);
      
        try {
          const response = await fetch(`${API_BASE_URL}/api/challenges/15/daily`, {
            method: 'POST',
            body: formData,
          });
      
          if (response.ok) {
            setPlayEffect(true);
            router.push('/main/challenge/detail');
          } else {
            const errData = await response.json();
            Alert.alert("데일리 생성 실패", JSON.stringify(errData));
          }
        } catch (error) {
          if (error instanceof Error) {
            Alert.alert("네트워크 에러", error.message);
          } else {
            Alert.alert("알 수 없는 에러", "문제가 발생했습니다.");
          }
        }
    };

    return (
        <Frame>
            <GlobalText style={{fontSize:16, color:COLORS.gray}}>DAILY CREATE</GlobalText>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Margin height={8}/>

                <View style={{alignItems:'center'}}>
                    <Image source={require("@/assets/images/main/Stamp_NotAttempted_X2.png")}/>
                </View>

                <Margin height={8}/>

                {/* 데일리 */}
                <View style={{alignItems:'center'}}>
                    <OutlinedShadowText style={{fontSize:32}}>DAY17</OutlinedShadowText>
                </View>

                <Margin height={16}/>

            
                {/* 사진 첨부 */}
                <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
                    <View style={{backgroundColor:COLORS.dark, marginTop:1, marginLeft:1, height:173}}/>
                    {imageUri?(
                        <Image
                        source={{ uri: imageUri }}
                        resizeMode="cover"
                        style={{
                            backgroundColor:COLORS.green, height:172, position: "absolute", top: 0, left: 0, right: 2
                        }}
                      />
                    ):(
                        <View style={{backgroundColor:COLORS.green, alignItems:"center", justifyContent:'center', height:172, position: "absolute", top: 0, left: 0, right: 2}}>
                        <View>
                            <Image source={require('@/assets/images/main/Add_Daily_Image_dark.png')} style={{position:'absolute',width:60, height:60,left:-1,top:-1}}/>
                            <Image source={require('@/assets/images/main/Add_Daily_Image_white.png')} style={{width:60, height:60}}/>
                        </View>
                        <GlobalText style={{color:COLORS.white, fontSize:12}}>사진을 첨부해서 기록을 남기세요!</GlobalText>
                        </View>
                    )
                    }
                </TouchableOpacity>

                <Margin height={16}/>

                {/* 데일리 설명 */}
                <View style={{paddingHorizontal:4}}>
                    <SpeechBubble>
                        <GlobalInput
                            value={content}
                            onChangeText={setContent}
                            placeholder="데일리 챌린지에 대해 작성해보는 공간입니다."
                            multiline
                            numberOfLines={4}
                            maxLength={300}
                            style={{
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                width: '100%',
                                height: 100,
                            }}
                        />
                    </SpeechBubble>
                </View>
            </ScrollView>

            <Margin height={16}/>
            
            {/* 데일리 챌린지 생성 버튼 */}
            <TouchableOpacity
                onPress={() => createDaily()}
                activeOpacity={0.8}
                style={{ alignSelf: "center" }}
            >
                <CreateButton>NEW DAILY</CreateButton>
            </TouchableOpacity>

            <Margin height={36}/>
        {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
        </Frame>
    )
}