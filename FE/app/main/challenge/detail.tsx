import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import GlobalText from '@/constants/GlobalText';
import OutlinedShadowText from '@/constants/OutlinedShadowText';
import LabelText from '@/constants/LabelText';
import Frame from '@/components/ui/Frame';
import EffectSound from '@/components/common/effectSound';
import { COLORS } from '@/constants/COLORS';
import Margin from '@/components/ui/Margin';
import BookmarkYellow from '@/assets/svgs/Bookmark_yellow.svg';
import BookmarkDark from '@/assets/svgs/Bookmark_dark.svg';
import SpeechBubble from '@/components/ui/SpeechBubble';
import ChallengeCalendar from '@/components/challenge/ChallengeCalendar';
import CreateButton from '@/components/challenge/CreateButton';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ChallengeResult from '@/components/challenge/ChallengeResult';
import { API_BASE_URL } from '@/constants/env';

export default () => {
    const router = useRouter();
    const {id} = useLocalSearchParams();

    type ChallengeDetailProps = {
        title: string;
        content: string;
        period: number;
        startAt: string;
        endAt: string;
        streakCount: number;
        isBookmark: boolean;
        isCompleted: boolean;
        category: string;
        participants: User[];
        calendar: DailyStatus;
    };
      
    type DailyStatus= {
        [key: `day${number}`]: number | null;
    };

    type User = {
        userId: number;
        profilePicture: string;
        role: string;
    };

    const [showResultModal, setShowResultModal] = useState(false);
    const [detail, setDetail] = useState<ChallengeDetailProps | null>(null);
    const [isBookmark, setIsBookmark] = useState(false);

    useEffect(() => {
        const fetchChallengeDetail = async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/api/challenges/${id}`);
            const json = await response.json();
            const data: ChallengeDetailProps = json.data;
      
            setDetail(data);
      
            const today = dayjs().format('YYYY-MM-DD');
            if (!data.isCompleted && today > data.endAt) {
              setShowResultModal(true);
            }
          } catch (error) {
            console.error('챌린지 상세 조회 실패:', error);
          }
        };
      
        if (id) fetchChallengeDetail();
    }, [id]);

    if (!detail) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <GlobalText>로딩 중...</GlobalText>
          </View>
        );
      }

    const getPeriodColor = () => {
        if (detail.period === 30) return COLORS.pink;
        if (detail.period === 15) return COLORS.yellow;
        if (detail.period === 7) return COLORS.blue;
        return COLORS.green;
    };

    const getBookmark = () => {
        return (
            <Pressable
                onPress={() => {
                    if (!isBookmark) {
                        setIsBookmark(true);
                    }
                }}
            >
                {isBookmark ? <BookmarkYellow /> : <BookmarkDark />}
            </Pressable>
        );
    };

    const formatDate = (date: string) => {
        const [year, month, day] = date.split("-");
        return `${year.slice(2)}/${month}/${day}`;
    };

    //소리 효과
    const [playEffect, setPlayEffect] = useState(false);

    return(
        <Frame>
            <GlobalText style={{fontSize:16, color:COLORS.gray}}>CHALLENGE</GlobalText>
            
            <Margin height={8}/>

            {/* 챌린지 제목 */}
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <OutlinedShadowText style={{fontSize:32}}>{detail.title}</OutlinedShadowText>
                {getBookmark()}
            </View>

            <Margin height={16}/>
            
            <ScrollView
                showsVerticalScrollIndicator={false}
            >

            {/* 챌린지 정보 */}
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <View style={{flexDirection:"row"}}>
                    <LabelText style={{backgroundColor:getPeriodColor()}}>{`${detail.period}day`}</LabelText>
                    <Margin width={16}/>
                    <LabelText style={{backgroundColor:COLORS.gray}}>{`#${detail.category}`}</LabelText>
                </View>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <LabelText style={{backgroundColor:COLORS.green}}>참여자</LabelText>
                    <Margin width={8}/>
                    <GlobalText>{`${detail.participants.length}명`}</GlobalText>
                    <Margin width={8}/>
                    <View style={{ flexDirection: "row" }}>
                        {detail.participants.slice(0, 4).map((user, index) => (
                            <View
                                key={user.userId}
                                style={{
                                    marginLeft: index === 0 ? 0 : -4,
                                    borderRadius: 8,
                                    overflow: "hidden",
                                    zIndex: 4 - index,
                                  }}
                            >
                                <Image
                                    source={{ uri: user.profilePicture }}
                                    style={{
                                        width: 16,
                                        height: 16,
                                    }}
                                />
                            </View>
                        ))}
                        {detail.participants.length > 4 && (
                            <GlobalText>+{detail.participants.length - 4}</GlobalText>
                        )}
                    </View>
                </View>
            </View>

            <Margin height={8}/>

            {/* 챌린지 기간 */}
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <LabelText style={{backgroundColor: COLORS.green}}>기간</LabelText>
                    <Margin width={8}/>
                    <GlobalText>
                        {`${formatDate(detail.startAt)}~${formatDate(detail.endAt)}`}
                    </GlobalText>
                </View>
                <LabelText style={{backgroundColor:COLORS.green}}>{`연속 ${detail.streakCount}일`}</LabelText>
            </View>

            <Margin height={8}/>

            {/* 챌린지 설명 */}
            <View style={{paddingHorizontal:4}}>
                <SpeechBubble>{detail.content}</SpeechBubble>
            </View>

            <Margin height={16}/>

            {/* 챌린지 캘린더 */}
            <ChallengeCalendar
                calendar={detail.calendar}
                period={detail.period}
            />

            </ScrollView>

            <Margin height={16}/>

            {/* 데일리 챌린지 생성 버튼 */}
            <TouchableOpacity
                onPress={() => { router.push('/main/challenge/daily/create'); setPlayEffect(true); }}
                activeOpacity={0.8}
                style={{ alignSelf: "center" }}
            >
                <CreateButton>NEW DAILY</CreateButton>
            </TouchableOpacity>

            <Margin height={36}/>

            {/* 챌린지 결산 모달 */}
            <ChallengeResult
                visible={showResultModal}
                onClose={() => setShowResultModal(false)}
            />
        {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
        </Frame>
    );
}