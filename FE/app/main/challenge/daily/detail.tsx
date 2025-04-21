import { View, ScrollView, Image, TouchableOpacity, Alert, Dimensions } from 'react-native'
import Frame from '@/components/ui/Frame'
import EffectSound from '@/components/common/effectSound';
import GlobalText from '@/constants/GlobalText'
import Margin from '@/components/ui/Margin'
import { COLORS } from '@/constants/COLORS'
import OutlinedShadowText from '@/constants/OutlinedShadowText'
import CreateButton from '@/components/challenge/CreateButton'
import { useRouter, useLocalSearchParams } from 'expo-router'
import SpeechBubble from '@/components/ui/SpeechBubble'
import { useState, useEffect } from 'react'
import DeleteConfirm from '@/components/challenge/DeleteConfirm'
import { API_BASE_URL } from '@/constants/env';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'
import dayjs from 'dayjs';

type DailyDetailProps = {
    day: number;
    content: string;
    picture: string;
    challengeUserId: number;
    createdAt: string;
};

const windowWidth = Dimensions.get('window').width

export default () => {
    const router = useRouter();
    const {id} = useLocalSearchParams();

    const [daily, setDaily] = useState<DailyDetailProps | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [playEffect, setPlayEffect] = useState(false);
    const [imgLoading, setImgLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchDaily = async () => {
          try {
            const res = await fetch(`${API_BASE_URL}/api/challenges/daily/${id}`);
            const json = await res.json();
            setDaily(json.data);
          } catch (e) {
            console.error('데일리 상세 조회 실패', e);
          }
        };
        fetchDaily();
    }, [id]);

    if (!daily) {
        return (
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <GlobalText>로딩 중...</GlobalText>
          </View>
        );
    }

    const today = dayjs().format('YYYY-MM-DD');
    const canDelete = daily.createdAt === today;

    const handleDeleteConfirm = async () => {
        setPlayEffect(true);
        try {
          const res = await fetch(
            `${API_BASE_URL}/api/challenges/daily/${id}`,
            { method: 'DELETE' }
          )
          if (!res.ok) {
            const err = await res.json();
            Alert.alert('삭제 실패', err.message || '다시 시도해주세요.');
            return;
          }
          router.push(`/main/challenge/detail?id=${daily.challengeUserId}`);
        } catch (e) {
          Alert.alert('네트워크 에러', e instanceof Error ? e.message : String(e));
        } finally {
          setShowDeleteModal(false);
        }
    }
    
    return (
        <Frame>
            <GlobalText style={{fontSize:16, color:COLORS.gray}}>DAILY</GlobalText>
            
            <Margin height={8}/>

            <View style={{alignItems:'center'}}>
                <Image source={require("@/assets/images/main/Stamp_Success_X2.png")}/>
            </View>

            <Margin height={8}/>

            {/* 데일리 */}
            <View style={{alignItems:'center'}}>
                <OutlinedShadowText style={{fontSize:32}}>{`DAY${daily.day}`}</OutlinedShadowText>
            </View>

            <Margin height={16}/>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* 사진 영역 */}
                <View style={{marginTop: 1, marginLeft: 1, height: 251, backgroundColor: COLORS.dark,}}>
                    
                    {imgLoading && (
                        <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        shimmerColors={[COLORS.bg, COLORS.white, COLORS.bg]}
                        duration={1500}
                        style={{width: windowWidth - 2, height: 250,}}
                    />
                    )}
                    <Image
                        source={{ uri: daily.picture }}
                        resizeMode="cover"
                        style={{position: 'absolute', top: 0, left: 0, right: 2, height: 250,}}
                        onLoad={() => setImgLoading(false)}
                        onError={() => setImgLoading(false)}
                    />
                </View>

                <Margin height={16}/>

                {/* 데일리 설명 */}
                <View style={{paddingHorizontal:4}}>
                    <SpeechBubble>
                        <GlobalText>{daily.content}</GlobalText>
                    </SpeechBubble>
                </View>

                <Margin height={8}/>
            </ScrollView>

            <Margin height={16}/>
            
            {/* 데일리 챌린지 삭제/취소 버튼 */}
            <View style={{flexDirection:"row", alignSelf: "center"}}>
                {canDelete && (
                    <>
                        <TouchableOpacity
                            onPress={() => {
                                setPlayEffect(true)
                                setShowDeleteModal(true)
                            }}
                            activeOpacity={0.8}
                        >
                        <CreateButton>DELETE</CreateButton>
                        </TouchableOpacity>
                        <Margin width={16} />
                    </>
                )}

                <TouchableOpacity
                    onPress={() => {{
                        setPlayEffect(true);
                        router.back();
                    }}}
                    activeOpacity={0.8}
                    style={{ alignSelf: "center" }}
                >
                    <CreateButton color={COLORS.blue}>OK</CreateButton>
                </TouchableOpacity>
            </View>

            <Margin height={36}/>

            <DeleteConfirm
                visible={showDeleteModal}
                onCancel={() => {
                    setPlayEffect(true);
                    setShowDeleteModal(false);
                }}
                onConfirm={handleDeleteConfirm}
            />
        {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
        </Frame>
    )    
}