import { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import Frame from '@/components/ui/Frame';
import Profile from '@/app/main/profile/profile';
import Calendar from '@/components/challenge/ChallengeCalendar';
import GlobalText from '@/constants/GlobalText';
import Margin from '@/components/ui/Margin';
import BookmarkYellow from '@/assets/svgs/Bookmark_yellow.svg';
import { styles } from '@/components/challenge/ChallengeList.styles';

export default () => {
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
  
  const calendar = ChallengeDetailData.calendar;
  const completedDays = Object.values(calendar).filter(
    (value): value is number => value !== null
  ).length;

  // 화면 크기 변경에 따라 상단 MARGIN 값을 동적으로 업데이트(상단 margin 생성)
  const [AddMargin, setAddMargin] = useState(0);
  useEffect(() => {
      const { height } = Dimensions.get('window');
      const calculatedHeight = height >= 800 ? height * 0.2 : 40;
      setAddMargin(calculatedHeight);

      const handleResize = () => {
          const { height } = Dimensions.get('window');
          const updatedHeight = height >= 800 ? height * 0.2 : 40;
          setAddMargin(updatedHeight);
      };
      Dimensions.addEventListener('change', handleResize);
  }, []); 


  // const soundRef = useRef<Audio.Sound | null>(null);
  // useEffect(() => {
  //   const playBackgroundMusic = async () => {
  //     const { sound } = await Audio.Sound.createAsync(
  //       require('@/assets/audio/sound_background.wav'), // 앱 전체에서 반복 재생할 음악
  //       { isLooping: true } // 반복 재생
  //     );
  //     soundRef.current = sound;
  //     await sound.playAsync();
  //   };

  //   playBackgroundMusic();

  //   return () => {
  //     soundRef.current?.unloadAsync();
  //   };
  // }, []);

  return (
    <Frame>
      {/* 프로필 */}
      <Profile />
      <Margin height={16}/>

      {/* 챌린지 */}
      <View style={{flex: 1, }}>
        <View style={styles.titleContainer}>
            <GlobalText style={styles.titleShadow}>CHALLENGE</GlobalText>
            <GlobalText style={styles.title}>CHALLENGE</GlobalText>
            <Margin height={8}/>
            <GlobalText>{ChallengeDetailData.title}</GlobalText>
        </View>
        <Margin height={24}/>

        <ScrollView showsVerticalScrollIndicator={false}>
        <Calendar
            calendar={ChallengeDetailData.calendar}
            period={ChallengeDetailData.period}
        /> 
        </ScrollView>
      </View>
      <Margin height={8}/>
      <View style={{ width: '100%' , height: AddMargin, flexDirection: "row", justifyContent: 'center', alignItems: "center" }}> 
        <BookmarkYellow />
        <GlobalText style={styles.completedtext}>  연속 </GlobalText>
        <GlobalText style={styles.completedDays}>{completedDays}</GlobalText>
        <GlobalText style={styles.completedtext}>일째 달성 !  </GlobalText>
        <BookmarkYellow />
      </View>
      <Margin height={40}/>
    </Frame>
  );
}
