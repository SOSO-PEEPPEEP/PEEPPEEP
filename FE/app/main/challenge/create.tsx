import { ScrollView, View, Pressable, Modal, TouchableOpacity, Image } from 'react-native'
import Frame from '@/components/ui/Frame'
import GlobalText from '@/constants/GlobalText'
import Margin from '@/components/ui/Margin'
import { COLORS } from '@/constants/COLORS'
import SpeechBubble from '@/components/ui/SpeechBubble'
import { useState } from 'react';
import GlobalInput from '@/constants/GlobalInput'
import LabelText from '@/constants/LabelText'
import OutlinedShadowText from '@/constants/OutlinedShadowText'
import { format, addDays, addMonths, endOfMonth } from 'date-fns';
import { Calendar } from 'react-native-calendars';
import type { DateData } from 'react-native-calendars';
import CreateButton from '@/components/challenge/CreateButton'
import { useRouter } from 'expo-router'
import AddParticipant from '@/assets/svgs/Add_Participant.svg'

export default () => {
    const router = useRouter();

    const [title, setTitle] = useState('');

    const categories = ['건강', '취미', '공부', '절약', '애정', '기타'];
    const [category, setCategory] = useState(0);

    const periods = [3, 7, 15, 30];
    const [period, setPeriod] = useState(0);

    const isPublics = ['공개', '친구만', '비공개'];
    const [isPublic, setIsPublic] = useState(0);

    const [selectedFriends, setSelectedFriends] = useState<number[]>([]);

    const [showFriendModal, setShowFriendModal] = useState(false);

    const [startDate, setStartDate] = useState(addDays(new Date(), 1));
    const [showPicker, setShowPicker] = useState(false);
    const endDate = addDays(startDate, periods[period] - 1);

    const [content, setContent] = useState('');

    const handlePress = () => {
        setShowPicker(true);
    };

    type MarkedDate = {
        startingDay?: boolean;
        endingDay?: boolean;
        color?: string;
        textColor?: string;
        disabled?: boolean;
        disableTouchEvent?: boolean;
      };
      
      type MarkedDates = {
        [date: string]: MarkedDate;
      };

    const getMarkedDates = () => {
        const marked: MarkedDates = {};
        for (let i = 0; i < periods[period]; i++) {
            const date = format(addDays(startDate, i), 'yyyy-MM-dd');
            if (i === 0) {
                marked[date] = { startingDay: true, color: COLORS.green, textColor: COLORS.bg };
            } else if (i === periods[period] - 1) {
                marked[date] = { endingDay: true, color: COLORS.green, textColor: COLORS.bg };
            } else {
                marked[date] = { color: COLORS.green, textColor: COLORS.bg };
            }
        }
        return marked;
    };

    const participant = [
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
        },
    ]

    return (
        <Frame>
            <GlobalText style={{fontSize:16, color:COLORS.gray}}>CHALLENGE CREATE</GlobalText>

            <Margin height={8}/>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* 타이틀 */}
                <View style={{alignItems:'center'}}>
                    <OutlinedShadowText style={{fontSize:24}}>챌린지명</OutlinedShadowText>
                </View>
                <Margin height={8}/>
                <View style={{paddingHorizontal:4}}>
                    <SpeechBubble>
                            <GlobalInput
                                value={title}
                                onChangeText={setTitle}
                                placeholder="챌린지명을 입력해 주세요."
                                style={{ textAlign: 'center', width:"100%" }}
                            />
                    </SpeechBubble>
                </View>

                <Margin height={16}/>

                {/* 카테고리 */}
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <GlobalText style={{fontSize:20}}>카테고리</GlobalText>
                    <Margin width={16}/>
                    <View style={{ flex: 1 }}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                flexDirection: "row",
                                gap: 8,
                            }}
                        >
                            {categories.map((item, index) => (
                                <Pressable key={index} onPress={() => setCategory(index)}>
                                    <LabelText
                                        style={{
                                        backgroundColor: category === index ? COLORS.green : COLORS.gray,
                                        fontSize: 20
                                        }}
                                    >
                                        {'#' + item}
                                    </LabelText>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                <Margin height={16}/>

                {/* 데일리 */}
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <GlobalText style={{fontSize:20}}>데일리</GlobalText>
                    <Margin width={16}/>
                    <View style={{ flex: 1 }}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                flexDirection: "row",
                                gap: 8,
                            }}
                        >
                            {periods.map((item, index) => {
                                const getColor = () => {
                                    if (item === 3) return COLORS.green;
                                    if (item === 7) return COLORS.blue;
                                    if (item === 15) return COLORS.yellow;
                                    if (item === 30) return COLORS.pink;
                                    return COLORS.gray;
                                };

                                return(
                                    <Pressable key={index} onPress={() => setPeriod(index)}>
                                        <LabelText
                                            style={{
                                            backgroundColor: period === index ? getColor() : COLORS.gray,
                                            fontSize: 20
                                            }}
                                        >
                                            {item + 'day'}
                                        </LabelText>
                                    </Pressable>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>

                <Margin height={16}/>

                {/* 기간 */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <GlobalText style={{ fontSize: 20 }}>기간</GlobalText>
                    <Margin width={16} />
                    <Pressable onPress={handlePress}>
                        <SpeechBubble>
                            <GlobalText>{`${format(startDate, 'yyyy.MM.dd')} ~ ${format(endDate, 'yyyy.MM.dd')}`}</GlobalText>
                        </SpeechBubble>
                    </Pressable>
                </View>

                {/* 커스텀 달력 모달 */}
                <Modal visible={showPicker} transparent animationType="fade">
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        <View style={{ backgroundColor: COLORS.bg, padding: 20, width: '90%' }}>
                            <GlobalText style={{ fontSize: 16, textAlign: 'center', color:COLORS.blue }}>챌린지 기간을 선택하세요</GlobalText>
                            <Margin height={16}/>
                            <Calendar
                                onDayPress={(day: DateData) => {
                                    const selected = new Date(day.dateString);
                                    setStartDate(selected);
                                }}
                                markedDates={getMarkedDates()}
                                markingType="period"
                                minDate={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
                                maxDate={format(endOfMonth(addMonths(new Date(), 1)), 'yyyy-MM-dd')}
                                theme={{
                                    dayTextColor: COLORS.dark,
                                    selectedDayBackgroundColor: COLORS.green,
                                    todayTextColor: COLORS.pink,
                                    arrowColor: COLORS.green,
                                    calendarBackground: 'transparent',
                                }}
                                style={{
                                    backgroundColor: COLORS.bg
                                }}
                            />
                            <Margin height={16}/>
                            <Pressable
                                onPress={() => setShowPicker(false)}
                                style={{
                                    flexDirection:'row',
                                    backgroundColor: COLORS.blue,
                                    padding: 8,
                                    alignSelf: 'center',
                                }}
                            >
                                <Margin width={16}/>
                                <GlobalText style={{ color: 'white', textAlign: 'center' }}>OK</GlobalText>
                                <Margin width={16}/>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                <Margin height={16}/>

                {/* 설명 */}
                <GlobalText style={{fontSize:20}}>챌린지 설명</GlobalText>
                <Margin height={8}/>
                <View style={{paddingHorizontal:4}}>
                    <SpeechBubble>
                        <GlobalInput
                            value={content}
                            onChangeText={setContent}
                            placeholder="챌린지 설명을 작성해 주세요."
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

                <Margin height={16}/>

                {/* 공개 여부 */}
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <GlobalText style={{fontSize:20}}>공개 여부</GlobalText>
                    <Margin width={16}/>
                    <View style={{ flex: 1 }}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                flexDirection: "row",
                                gap: 8,
                            }}
                        >
                            {isPublics.map((item, index) => (
                                <Pressable key={index} onPress={() => setIsPublic(index)}>
                                    <LabelText
                                        style={{
                                        backgroundColor: isPublic === index ? COLORS.green : COLORS.gray,
                                        fontSize: 20
                                        }}
                                    >
                                        {item}
                                    </LabelText>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                <Margin height={16}/>

                {/* 친구 초대 */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <GlobalText style={{ fontSize: 20 }}>참여자</GlobalText>
                    <Margin width={16} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {participant
                        .filter((user) => selectedFriends.includes(user.id))
                        .slice(0, 4)
                        .map((user, index) => (
                            <View
                                key={user.id}
                                style={{
                                    marginLeft: index === 0 ? 0 : -18,
                                    borderRadius: 24,
                                    overflow: 'hidden',
                                    zIndex: 4 - index,
                                }}
                            >
                                <Image
                                    source={{ uri: user.image }}
                                    style={{ width: 48, height: 48 }}
                                />
                            </View>
                        ))}
                        {selectedFriends.length > 4 && (
                            <GlobalText style={{ fontSize: 16 }}> + {selectedFriends.length - 4}</GlobalText>
                        )}
                    </View>
                    <Margin width={16} />
                    <Pressable onPress={() => setShowFriendModal(true)}>
                        <AddParticipant />
                    </Pressable>
                </View>
            </ScrollView>

            <Modal
                visible={showFriendModal}
                transparent
                animationType="fade"
            >
                <View
                    style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    }}
                >
                    <View
                    style={{
                        width: '90%',
                        maxHeight: '70%',
                        backgroundColor: COLORS.bg,
                        padding: 20,
                    }}
                    >
                        <GlobalText style={{ fontSize: 16, textAlign: 'center', color:COLORS.blue}}>
                            함께 챌린지에 도전할 친구를 선택해 주세요
                        </GlobalText>

                        <Margin height={16}/>

                        <ScrollView>
                            {participant.map((user) => {
                                const isSelected = selectedFriends.includes(user.id);

                                return (
                                <Pressable
                                    key={user.id}
                                    onPress={() => {
                                    setSelectedFriends((prev) =>
                                        isSelected
                                        ? prev.filter((id) => id !== user.id)
                                        : [...prev, user.id]
                                    );
                                    }}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: 8,
                                        backgroundColor: isSelected ? COLORS.green : 'transparent',
                                    }}
                                >
                                    <Image
                                    source={{ uri: user.image }}
                                    style={{ width: 40, height: 40, borderRadius: 20 }}
                                    />
                                    <Margin width={12} />
                                    <GlobalText style={{ fontSize: 16, color: isSelected ? COLORS.bg : COLORS.dark }}>
                                    {user.nickname}
                                    </GlobalText>
                                </Pressable>
                                );
                            })}
                        </ScrollView>

                        <Margin height={16} />

                        <Pressable
                            onPress={() => setShowFriendModal(false)}
                            style={{
                            alignSelf: 'center',
                            backgroundColor: COLORS.blue,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            }}
                        >
                            <GlobalText style={{ color: COLORS.white }}>OK</GlobalText>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Margin height={16}/>

            {/* 생성 버튼 */}
            <TouchableOpacity
                onPress={() => router.push(`/main/challenge`)}
                activeOpacity={0.8}
                style={{ alignSelf: "center" }}
            >
                <CreateButton>NEW CHALLENGE</CreateButton>
            </TouchableOpacity>

            <Margin height={36}/>
        </Frame>
    )
}