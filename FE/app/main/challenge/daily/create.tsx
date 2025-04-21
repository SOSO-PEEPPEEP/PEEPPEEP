import { View, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, Modal } from 'react-native'
import Frame from '@/components/ui/Frame'
import EffectSound from '@/components/common/effectSound';
import GlobalText from '@/constants/GlobalText'
import Margin from '@/components/ui/Margin'
import { COLORS } from '@/constants/COLORS'
import OutlinedShadowText from '@/constants/OutlinedShadowText'
import CreateButton from '@/components/challenge/CreateButton'
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router'
import { useState, useEffect } from 'react'
import SpeechBubble from '@/components/ui/SpeechBubble'
import GlobalInput from '@/constants/GlobalInput'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { API_BASE_URL } from '@/constants/env';

export default () => {
    const router = useRouter();
    const navigation = useNavigation();
    const { challengeId, day } = useLocalSearchParams<{
        challengeId: string;
        day: string;
    }>();

    const [content, setContent] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [playEffect, setPlayEffect] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inputHeight, setInputHeight] = useState(40);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
          if (isSubmitting) {
            e.preventDefault()
          }
        })
        return unsubscribe
    }, [navigation, isSubmitting])

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

        if (result.canceled || result.assets.length === 0) return

        const asset = result.assets[0]
        const uri = asset.uri

        const info = await FileSystem.getInfoAsync(uri, { size: true })
        if (!info.exists || typeof info.size !== 'number') {
        Alert.alert('오류', '파일 정보를 가져올 수 없습니다.')
        return
        }
        
        const MAX_BYTES = 10 * 1024 * 1024
        if (info.size > MAX_BYTES) {
        Alert.alert(
            '파일이 너무 커요! 💦',
            '10MB 이하의 이미지만 첨부할 수 있습니다.'
        )
        return
        }

        setImageUri(uri)
    };

    const MAX_LINES = 20;

    const handleContentChange = (text: string) => {
        const lines = text.split('\n');
        if (lines.length > MAX_LINES) {
            setContent(lines.slice(0, MAX_LINES).join('\n'));
        } else {
            setContent(text);
        }
    };

    const createDaily = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const formData = new FormData();
      
        formData.append('day', day);
        formData.append('content', content);
        formData.append('picture', {
          uri: imageUri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        } as any);
      
        try {
          const response = await fetch(`${API_BASE_URL}/api/challenges/${challengeId}/daily`, {
            method: 'POST',
            body: formData,
          });
      
          if (response.ok) {
            setPlayEffect(true);
            router.push(`/main/challenge/detail?id=${challengeId}`);
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
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Frame>
            {/* Modal 로딩 인디케이터 (뒤 UI 터치 차단) */}
            <Modal transparent visible={isSubmitting}>
                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    justifyContent: 'center',
                    alignItems: 'center',}}
                >
                    <ActivityIndicator size="large" color={COLORS.green} />
                    <Margin height={8}/>
                    <GlobalText style={{color: COLORS.white,}}>생성 중…</GlobalText>
                </View>
            </Modal>
            <GlobalText style={{fontSize:16, color:COLORS.gray}}>DAILY CREATE</GlobalText>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Margin height={8}/>

                <View style={{alignItems:'center'}}>
                    <Image source={require("@/assets/images/main/Stamp_NotAttempted_X2.png")}/>
                </View>

                <Margin height={8}/>

                {/* 데일리 */}
                <View style={{alignItems:'center'}}>
                    <OutlinedShadowText style={{fontSize:32}}>{`DAY${day}`}</OutlinedShadowText>
                </View>

                <Margin height={16}/>

            
                {/* 사진 첨부 */}
                <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
                    <View style={{backgroundColor:COLORS.dark, marginTop:1, marginLeft:1, height:251}}/>
                    {imageUri?(
                        <Image
                        source={{ uri: imageUri }}
                        resizeMode="cover"
                        style={{
                            backgroundColor:COLORS.green, height:250, position: "absolute", top: 0, left: 0, right: 2
                        }}
                      />
                    ):(
                        <View style={{backgroundColor:COLORS.green, alignItems:"center", justifyContent:'center', height:250, position: "absolute", top: 0, left: 0, right: 2}}>
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
                            onChangeText={handleContentChange}
                            placeholder="데일리 챌린지에 대해 작성해보는 공간입니다."
                            multiline
                            maxLength={300}
                            onContentSizeChange={(e) =>
                                setInputHeight(e.nativeEvent.contentSize.height)
                            }
                            style={{
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                width: '100%',
                                height: inputHeight,
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
                disabled={!content.trim() || !imageUri}
                style={{ alignSelf: "center", opacity: (isSubmitting || !content.trim() || !imageUri) ? 0.5 : 1 }}
            >
                <CreateButton>NEW DAILY</CreateButton>
            </TouchableOpacity>

            <Margin height={36}/>
            {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
        </Frame>
    )
}