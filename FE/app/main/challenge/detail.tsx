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

export default () => {
    const router = useRouter();
    const {id} = useLocalSearchParams();

    const [showResultModal, setShowResultModal] = useState(false);
    const [detail, setDetail] = useState<ChallengeDetailProps | null>(null);
    const [isBookmark, setIsBookmark] = useState(false);
    const [playEffect, setPlayEffect] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const fetchChallengeDetail = async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/api/challenges/${id}`);
            const json = await response.json();
            const data: ChallengeDetailProps = json.data;
      
            setDetail(data);
            setIsBookmark(data.isBookmark);
      
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

    const start = dayjs(detail.startAt);
    const today = dayjs();
    const diff = today.diff(start, 'day') + 1;
    const todayIndex = diff >= 1 && diff <= detail.period ? diff : null;
    const hasDoneToday = todayIndex !== null && detail.calendar[`day${todayIndex}`] != null;

    const toggleBookmark = async () => {
        try {
            await fetch(`${API_BASE_URL}/api/challenges/${id}/bookmark`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                });
            setIsBookmark(!isBookmark);
            setPlayEffect(true);
        } catch (error) {
            console.error('Bookmark API 호출 실패:', error);
        }
    };

    const getPeriodColor = () => {
        if (detail.period === 30) return COLORS.pink;
        if (detail.period === 15) return COLORS.yellow;
        if (detail.period === 7) return COLORS.blue;
        return COLORS.green;
    };

    const formatDate = (date: string) => {
        const [year, month, day] = date.split("-");
        return `${year.slice(2)}/${month}/${day}`;
    };
    
    const truncateText = (text: string, maxLines: number): string => {
        const lines = text.split('\n');
        if (lines.length > maxLines) {
          return lines.slice(0, maxLines).join('\n') + '\n▼';
        }
        else if (text.length > 100) {
            return text.substring(0, 100) + '\n▼';
        }
        return text;
    };
    const displayedContent = expanded ? detail.content : truncateText(detail.content, 4);

    return(
        <Frame>
            <GlobalText style={{fontSize:16, color:COLORS.gray}}>CHALLENGE</GlobalText>
            
            <Margin height={8}/>

            {/* 챌린지 제목 */}
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <OutlinedShadowText style={{fontSize:32}}>{detail.title}</OutlinedShadowText>
                <Margin width={8}/>
                <Pressable onPress={toggleBookmark}>
                    {isBookmark ? <BookmarkYellow /> : <BookmarkDark />}
                </Pressable>
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
                        {`${formatDate(detail.startAt)} ~ ${formatDate(detail.endAt)}`}
                    </GlobalText>
                </View>
                <LabelText style={{backgroundColor:COLORS.green}}>{`연속 ${detail.streakCount}일`}</LabelText>
            </View>

            <Margin height={8}/>

            {/* 챌린지 설명 */}
            <View style={{paddingHorizontal:4}}>
                <Pressable onPress={() => setExpanded(prev => !prev)}>
                    <SpeechBubble>
                        <GlobalText>
                            {displayedContent}
                        </GlobalText>
                    </SpeechBubble>
                </Pressable>
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
            {todayIndex && !hasDoneToday && (
            <TouchableOpacity
                onPress={() => {
                    setPlayEffect(true);
                    router.push(
                    `/main/challenge/daily/create?challengeId=${id}&day=${todayIndex}`
                    );
                }}
                activeOpacity={0.8}
                style={{ alignSelf: 'center' }}
                >
                <CreateButton>NEW DAILY</CreateButton>
                </TouchableOpacity>
            )}
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