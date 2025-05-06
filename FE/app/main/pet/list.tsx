import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, FlatList } from "react-native";
import Frame from '@/components/ui/Frame';
import EffectSound from '@/components/common/effectSound';
import GlobalText from '@/constants/GlobalText';
import { petStyles } from "@/styles/pet.styles";
import { useRouter } from 'expo-router'; 
import back from "@/assets/images/icon/icon_back.png";
import { API_BASE_URL } from '@/constants/env';
import PetListItem from '@/components/pet/PetListItem';
import Margin from '@/components/ui/Margin';

type Growth = 'EGG' | 'BABY' | 'YOUTH' | 'ADULT';

type PetRank = 'COMMON' | 'RARE' | 'UNIQUE' | 'EPIC' | 'LEGENDARY';
interface PetFromServer {
  petId: number;
  nickname: string;
  growth: Growth;
  affection: number;
  petType : string;
  petRank : PetRank;
  image : string;
  isFavorite: boolean;
}

interface PetListProps {
  id: number;
  nickname: string;
  growth: Growth;
  affection: number;
  type : string;
  rank : PetRank;
  image : string;
  isFavorite: boolean;
}


export default () => {
  const [playEffect, setPlayEffect] = useState(false);
  const router = useRouter();

  const backButton = () => {
    router.push('/main/pet');
  };

  const [petList, setPetList] = useState<PetListProps[]>([]);

  useEffect(() => {
      const fetchPets = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/pets/my`);
          const json = await response.json();
          const data = json.data;
  
          const parsedList: PetListProps[] = data.map((item: PetFromServer) => ({
            id: item.petId,
            nickname: item.nickname,
            growth: item.growth,
            affection: item.affection,
            type : item.petType,
            rank : item.petRank,
            image : item.image,
            isFavorite: item.isFavorite,
          }));
  
          setPetList(parsedList);
        } catch (err) {
          console.error('펫 조회 실패:', err);
        }
      };
  
      fetchPets();
  }, []);

  const toggleFavoriteForPet = async (petId: number, currentState: boolean) => {
    try {
      await fetch(`${API_BASE_URL}/api/pets/${petId}/favorite`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setPetList(prevList =>
        prevList.map(item => {
          if (item.id === petId) {
            return { ...item, isFavorite: !currentState };
          } else {
            return !currentState ? { ...item, isFavorite: false } : item;
          }
        })
      );
      setPlayEffect(true);
    } catch (error) {
      console.error('Favorite API 호출 실패:', error);
    }
  };

  const renderItem = ({ item }: { item: PetListProps }) => (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setPlayEffect(true);
          router.push(`/main/pet`);
        }}
      >
        <PetListItem
          pet={item}
          onFavoriteToggle={() => toggleFavoriteForPet(item.id, item.isFavorite)}
        />
      </TouchableOpacity>
  );

  const ItemSeparatorComponent = () => <Margin height={16} />;

  return (
    <Frame>
      <View style={[petStyles.pageTitle, {height: 30}]}>
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', }}>
          <TouchableOpacity onPress={() => { setPlayEffect(true); backButton(); }} activeOpacity={1}> 
            <View style={{width: 30, height: 30, marginRight: 8, alignItems: 'center', justifyContent: 'center', }}>
              <Image source={back} style={{width: 30, height: 30}}></Image>
            </View>
          </TouchableOpacity>
          <GlobalText style={petStyles.pageTitleText}>보유한 PEEP</GlobalText>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={petList}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          ItemSeparatorComponent={ItemSeparatorComponent}
          showsVerticalScrollIndicator={false}
        />
      </View>
      
    {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
    </Frame>
  );
};