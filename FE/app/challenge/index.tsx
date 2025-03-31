import { View, FlatList } from 'react-native';
import GlobalText from '@/constants/GlobalText';
import Frame from '@/components/ui/Frame';
import { styles } from './index.style';
import Margin from '@/components/ui/Margin';
import ChallengeListItem from '@/components/challenge/ChallengeListItem';
import { COLORS } from '@/constants/COLORS';
import OutlinedShadowText from '@/constants/OutlinedShadowText';

export default function ChallengeList() {
    // 임시 데이터
    const ChallengeListData = [
        {
            title: "다이어리 꾸미기",
            period: 30,
            category: "취미",
            isBookmark: true
        },
        {
            title: "득근 챌린지",
            period: 15,
            category: "건강",
            isBookmark: false
        },
        {
            title: "바리바리바리스타공부하장",
            period: 7,
            category: "공부",
            isBookmark: false
        },
        {
            title: "목도리 뜨개질 도전!!",
            period: 3,
            category: "취미",
            isBookmark: false
        },
    ]

    //리스트
    interface ChallengeListProps {
        title: string;
        period: number;
        category: string;
        isBookmark: boolean;
      };

    const renderItem = ({ item }: { item: ChallengeListProps }) => (
        <View>
            <ChallengeListItem
                title={item.title}
                period={item.period}
                category={item.category}
                isBookmark={item.isBookmark}
            />
        </View>
    )
    const ItemSeparatorComponent = () => <Margin height={16} />

    return(
        <Frame>
            <View style={styles.titleContainer}>
                <GlobalText style={styles.titleShadow}>CHALLENGE</GlobalText>
                <GlobalText style={styles.title}>CHALLENGE</GlobalText>
            </View>
            <Margin height={24}/>
            <View style={{flex:1}}>
                <FlatList
                    data={ChallengeListData}
                    renderItem={renderItem}
                    keyExtractor={(_, index)=>index.toString()}
                    contentContainerStyle={{paddingHorizontal:16}}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    showsVerticalScrollIndicator={false}
                />
                <Margin height={16}/>
                <View style={{flexDirection:"row"}}>
                    <Margin width={64}/>
                    {/* 버튼 */}
                    <View style={{flex:1}}>
                        <View
                            style={{
                            backgroundColor: COLORS.dark,
                            height: 65,
                            marginTop: 1,
                            marginLeft: 1,
                            }}
                        />
                        <View style={styles.createButton} >
                            <OutlinedShadowText>NEW CHALLENGE</OutlinedShadowText>
                        </View>
                    </View>
                    <Margin width={64}/>
                </View>
                <Margin height={16}/>
            </View>
            <Margin height={48}/>
        </Frame>
    );
}