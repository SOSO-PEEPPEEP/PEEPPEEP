import { View, FlatList, TouchableOpacity } from 'react-native';
import GlobalText from '@/constants/GlobalText';
import Frame from '@/components/ui/Frame';
import { styles } from '../../../components/challenge/ChallengeList.styles';
import Margin from '@/components/ui/Margin';
import ChallengeListItem from '@/components/challenge/ChallengeListItem';
import { useRouter } from 'expo-router';
import CreateButton from '@/components/challenge/CreateButton';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/constants/env';

export default function ChallengeList() {
    const router = useRouter();

    interface ChallengeFromServer {
        challengeId: number;
        title: string;
        period: number;
        category: string;
        isBookmark: boolean;
    }
      
    const [challengeList, setChallengeList] = useState<ChallengeListProps[]>([]);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
            const response = await fetch(`${API_BASE_URL}/api/challenges/my`);
            const json = await response.json();
            const data = json.data;
        
            const parsedList: ChallengeListProps[] = data.map((item: ChallengeFromServer) => ({
                id: item.challengeId,
                title: item.title,
                period: item.period,
                category: item.category,
                isBookmark: false
            }));
        
            setChallengeList(parsedList);
            } catch (err) {
            console.error('챌린지 조회 실패:', err);
            }
        };
        
        fetchChallenges();
    }, []);
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
            onPress={() => router.push(`/main/challenge/detail?id=${item.id}`)}
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
                    data={challengeList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{paddingHorizontal:16}}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <Margin height={16}/>
            <TouchableOpacity
                onPress={() => router.push(`/main/challenge/create`)}
                activeOpacity={0.8}
                style={{ alignSelf: "center" }}
            >
                <CreateButton>NEW CHALLENGE</CreateButton>
            </TouchableOpacity>
            <Margin height={36}/>
        </Frame>
    );
}