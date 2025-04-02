import { View, FlatList, TouchableOpacity } from 'react-native';
import GlobalText from '@/constants/GlobalText';
import Frame from '@/components/ui/Frame';
import { styles } from '../../components/challenge/ChallengeList.styles';
import Margin from '@/components/ui/Margin';
import ChallengeListItem from '@/components/challenge/ChallengeListItem';
import OutlinedShadowText from '@/constants/OutlinedShadowText';
import { useRouter } from 'expo-router';
import CreateButton from '@/components/challenge/CreateButton';

export default function ChallengeList() {
    const router = useRouter();

    // 임시 데이터
    const ChallengeListData = [
        {
            id: 1,
            title: "다이어리 꾸미기",
            period: 30,
            category: "취미",
            isBookmark: true
        },
        {
            id: 2,
            title: "득근 챌린지",
            period: 15,
            category: "건강",
            isBookmark: false
        },
        {
            id: 3,
            title: "바리바리바리스타공부하장",
            period: 7,
            category: "공부",
            isBookmark: false
        },
        {
            id: 4,
            title: "목도리 뜨개질 도전!!",
            period: 3,
            category: "취미",
            isBookmark: false
        },
        {
            id: 1,
            title: "다이어리 꾸미기",
            period: 30,
            category: "취미",
            isBookmark: true
        },
        {
            id: 2,
            title: "득근 챌린지",
            period: 15,
            category: "건강",
            isBookmark: false
        },
        {
            id: 3,
            title: "바리바리바리스타공부하장",
            period: 7,
            category: "공부",
            isBookmark: false
        },
        {
            id: 4,
            title: "목도리 뜨개질 도전!!",
            period: 3,
            category: "취미",
            isBookmark: false
        },
        {
            id: 1,
            title: "다이어리 꾸미기",
            period: 30,
            category: "취미",
            isBookmark: true
        },
        {
            id: 2,
            title: "득근 챌린지",
            period: 15,
            category: "건강",
            isBookmark: false
        },
        {
            id: 3,
            title: "바리바리바리스타공부하장",
            period: 7,
            category: "공부",
            isBookmark: false
        },
        {
            id: 4,
            title: "목도리 뜨개질 도전!!",
            period: 3,
            category: "취미",
            isBookmark: false
        },
        {
            id: 1,
            title: "다이어리 꾸미기",
            period: 30,
            category: "취미",
            isBookmark: true
        },
        {
            id: 2,
            title: "득근 챌린지",
            period: 15,
            category: "건강",
            isBookmark: false
        },
        {
            id: 3,
            title: "바리바리바리스타공부하장",
            period: 7,
            category: "공부",
            isBookmark: false
        },
        {
            id: 4,
            title: "목도리 뜨개질 도전!!",
            period: 3,
            category: "취미",
            isBookmark: false
        },
        {
            id: 1,
            title: "다이어리 꾸미기",
            period: 30,
            category: "취미",
            isBookmark: true
        },
        {
            id: 2,
            title: "득근 챌린지",
            period: 15,
            category: "건강",
            isBookmark: false
        },
        {
            id: 3,
            title: "바리바리바리스타공부하장",
            period: 7,
            category: "공부",
            isBookmark: false
        },
        {
            id: 4,
            title: "목도리 뜨개질 도전!!",
            period: 3,
            category: "취미",
            isBookmark: false
        },
        {
            id: 1,
            title: "다이어리 꾸미기",
            period: 30,
            category: "취미",
            isBookmark: true
        },
        {
            id: 2,
            title: "득근 챌린지",
            period: 15,
            category: "건강",
            isBookmark: false
        },
        {
            id: 3,
            title: "바리바리바리스타공부하장",
            period: 7,
            category: "공부",
            isBookmark: false
        },
        {
            id: 4,
            title: "목도리 뜨개질 도전!!",
            period: 3,
            category: "취미",
            isBookmark: false
        },
    ]

    //리스트
    interface ChallengeListProps {
        id: number;
        title: string;
        period: number;
        category: string;
        isBookmark: boolean;
      };

    const renderItem = ({ item }: { item: ChallengeListProps }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push(`/challenge/detail?id=${item.id}`)}
        >
            <ChallengeListItem
                title={item.title}
                period={item.period}
                category={item.category}
                isBookmark={item.isBookmark}
            />
        </TouchableOpacity>
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
            </View>
            <Margin height={16}/>
            <TouchableOpacity activeOpacity={0.8} style={{ alignSelf: "center" }}>
                <CreateButton>NEW CHALLENGE</CreateButton>
            </TouchableOpacity>
            <Margin height={36}/>
        </Frame>
    );
}