import React from 'react';
import { View, Image, Pressable } from 'react-native';
import GlobalText from '@/constants/GlobalText';
import { petStyles } from '@/styles/pet.styles';
import BookmarkYellow from '@/assets/svgs/Bookmark_yellow.svg';
import BookmarkDark from '@/assets/svgs/Bookmark_dark.svg';
import { COLORS } from '@/constants/COLORS';
import Margin from '../ui/Margin';

type Growth = 'EGG' | 'BABY' | 'YOUTH' | 'ADULT';

type PetRank = 'COMMON' | 'RARE' | 'UNIQUE' | 'EPIC' | 'LEGENDARY';

interface Pet {
  id: number;
  nickname: string;
  growth: Growth;
  affection: number;
  type : string;
  rank : PetRank;
  image : string;
  isFavorite: boolean;
}

interface Props {
  pet: Pet;
  onFavoriteToggle: () => void;
}

const nameColor = (grade: PetRank) => {
  switch (grade) {
    case 'LEGENDARY': return COLORS.purple;
    case 'EPIC':      return COLORS.white;
    default:          return COLORS.dark;
  }
};
const bgColor = (grade: PetRank) => {
  switch (grade) {
    case 'LEGENDARY': return COLORS.pink;
    case 'EPIC':      return COLORS.yellow;
    case 'UNIQUE':    return COLORS.purple;
    case 'RARE':      return COLORS.green;
    default:          return COLORS.white;
  }
};

export default ({ pet, onFavoriteToggle }: Props) => {
  const getFavorite = () => {
    if (pet.isFavorite) return <BookmarkYellow />;
        return (
            <BookmarkDark />
    );
  };
  return (
    <View style={petStyles.petListBox}>
      <View style={petStyles.petListShadow} />
        <View style={[petStyles.petList, { backgroundColor: bgColor(pet.rank) }]}>
            <View style={petStyles.favorites}>
                <Pressable onPress={onFavoriteToggle}>
                    {getFavorite()}
                </Pressable>
            </View>
            <View style={petStyles.petImg}>
                <Image source={{ uri: pet.image }} style={{ width: 72, height: 72 }} />
            </View>
            <View style={petStyles.petData}>
                <GlobalText style={petStyles.petInfo}>
                    {pet.type} / {pet.rank.charAt(0)}
                </GlobalText>
                <GlobalText style={[petStyles.petName, { color: nameColor(pet.rank) }]}>
                    {pet.nickname}
                </GlobalText>
            <View style={petStyles.petStats}>
                <GlobalText style={petStyles.petStatsText}>성장도</GlobalText>
                <Margin width={8}/>
                <GlobalText style={petStyles.petStatsText}>{pet.growth}</GlobalText>
            </View>
            <View style={petStyles.petStats}>
                <GlobalText style={petStyles.petStatsText}>애정도</GlobalText>
                <Margin width={8}/>
                <GlobalText style={petStyles.petStatsText}>{pet.affection}</GlobalText>
            </View>
        </View>
      </View>
    </View>
  );
}
