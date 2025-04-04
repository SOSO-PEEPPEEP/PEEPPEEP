import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import GlobalText from '@/constants/GlobalText';
import OutlinedShadowText from '@/constants/OutlinedShadowText';
import LabelText from '@/constants/LabelText';
import Frame from '@/components/ui/Frame';
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

export default () => {
    const router = useRouter();
    const {id} = useLocalSearchParams();
    
    // 임시 데이터
    const ChallengeDetailData = {
        title: "양치질하기 챌린지",
        content: "올해는 치과의사쌤한테 혼나지 말아봐요~🪥🫧\n모두 아자아자 파이팅!!👀",
        period: 30,
        startAt: "2025-03-01",
        endAt: "2025-04-03",
        category: "건강",
        strikeCount: 7,
        isBookmark: false,
        isCompleted: true,
        calendar: {
            day1: 1,
            day2: 2,
            day3: 3,
            day4: 0,
            day5: 4,
            day6: 5,
            day7: 6,
            day8: 7,
            day9: 8,
            day10: 9,
            day11: 10,
            day12: null,
            day13: null,
            day14: null,
            day15: null,
            day16: null,
            day17: null,
            day18: null,
            day19: null,
            day20: null,
            day21: null,
            day22: null,
            day23: null,
            day24: null,
            day25: null,
            day26: null,
            day27: null,
            day28: null,
            day29: null,
            day30: null
        },
        participant: [
            {
                id: 1,
                nickname: "짱구",
                image: "https://pbs.twimg.com/media/DFgrLkaUwAA3UBS.jpg"
            },
            {
                id: 2,
                nickname: "햇살",
                image: "https://cafe24.poxo.com/ec01/jbloom20/HOvhRhvOk+Cp2KY4JuusAnntDlnXR3anZjopRQ92tJMeHcBK+bceYwGcsYVWaWCgtY91XBZzlP7g2JPnxIUjXQ==/_/web/product/big/202410/f66fef2cb16e682d861e4a0ca9bd4866.jpg"
            },
            {
                id: 3,
                nickname: "쿠로미",
                image: "https://i.pinimg.com/736x/0a/35/da/0a35daba84215fc84d81d1349db8064e.jpg"
            },
            {
                id: 4,
                nickname: "키키",
                image: "https://i.pinimg.com/236x/9d/0a/e0/9d0ae024a598f9b0169a2f27741efdc3.jpg"
            }
        ]
    }

    type ChallengeDetailProps = {
        title: string;
        content: string;
        period: number;
        startAt: string;
        endAt: string;
        category: string;
        strikeCount: number;
        isBookmark: boolean;
        isCompleted: boolean;
        calendar: DailyStatus;
        participant: User[];
    };
      
    type DailyStatus= {
        [key: `day${number}`]: number | null;
    };

    type User = {
        id: number;
        nickname: string;
        image: string;
    };

    const [showResultModal, setShowResultModal] = useState(false);

    useEffect(() => {
    const today = dayjs().format('YYYY-MM-DD');
    if (!ChallengeDetailData.isCompleted && today > ChallengeDetailData.endAt) {
        setShowResultModal(true);
    }
    }, []);

    const getPeriodColor = () => {
        if (ChallengeDetailData.period === 30) return COLORS.pink;
        if (ChallengeDetailData.period === 15) return COLORS.yellow;
        if (ChallengeDetailData.period === 7) return COLORS.blue;
        return COLORS.green;
    };

    const [isBookmark, setIsBookmark] = useState(ChallengeDetailData.isBookmark);

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

    return(
        <Frame>
            <GlobalText style={{fontSize:16, color:COLORS.gray}}>CHALLENGE</GlobalText>
            
            <Margin height={8}/>

            {/* 챌린지 제목 */}
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <OutlinedShadowText style={{fontSize:32}}>{ChallengeDetailData.title}</OutlinedShadowText>
                {getBookmark()}
            </View>

            <Margin height={16}/>
            
            <ScrollView
                showsVerticalScrollIndicator={false}
            >

            {/* 챌린지 정보 */}
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <View style={{flexDirection:"row"}}>
                    <LabelText style={{backgroundColor:getPeriodColor()}}>{`${ChallengeDetailData.period}day`}</LabelText>
                    <Margin width={16}/>
                    <LabelText style={{backgroundColor:COLORS.gray}}>{`#${ChallengeDetailData.category}`}</LabelText>
                </View>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <LabelText style={{backgroundColor:COLORS.green}}>참여자</LabelText>
                    <Margin width={8}/>
                    <GlobalText>{`${ChallengeDetailData.participant.length}명`}</GlobalText>
                    <Margin width={8}/>
                    <View style={{ flexDirection: "row" }}>
                        {ChallengeDetailData.participant.slice(0, 4).map((user, index) => (
                            <View
                                key={user.id}
                                style={{
                                    marginLeft: index === 0 ? 0 : -4,
                                    borderRadius: 8,
                                    overflow: "hidden",
                                    zIndex: 4 - index,
                                  }}
                            >
                                <Image
                                    source={{ uri: user.image }}
                                    style={{
                                        width: 16,
                                        height: 16,
                                    }}
                                />
                            </View>
                        ))}
                        {ChallengeDetailData.participant.length > 4 && (
                            <GlobalText>+{ChallengeDetailData.participant.length - 4}</GlobalText>
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
                        {`${formatDate(ChallengeDetailData.startAt)}~${formatDate(ChallengeDetailData.endAt)}`}
                    </GlobalText>
                </View>
                <LabelText style={{backgroundColor:COLORS.green}}>{`연속 ${ChallengeDetailData.strikeCount}일`}</LabelText>
            </View>

            <Margin height={8}/>

            {/* 챌린지 설명 */}
            <View style={{paddingHorizontal:4}}>
                <SpeechBubble>{ChallengeDetailData.content}</SpeechBubble>
            </View>

            <Margin height={16}/>

            {/* 챌린지 캘린더 */}
            <ChallengeCalendar
                calendar={ChallengeDetailData.calendar}
                period={ChallengeDetailData.period}
            />

            </ScrollView>

            <Margin height={16}/>

            {/* 데일리 챌린지 생성 버튼 */}
            <TouchableOpacity
                onPress={() => router.push('/main/challenge/daily/create')}
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
        </Frame>
    );
}