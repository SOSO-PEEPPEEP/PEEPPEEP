import { COLORS } from '@/constants/COLORS';

export type Growth = 'EGG' | 'BABY' | 'YOUTH' | 'ADULT';

export type PetRank = 'COMMON' | 'RARE' | 'UNIQUE' | 'EPIC' | 'LEGENDARY';

export function nameColor(grade: PetRank) {
  switch (grade) {
    case 'LEGENDARY': return COLORS.purple;
    case 'EPIC':      return COLORS.white;
    default:          return COLORS.dark;
  }
};

export function bgColor(rank: PetRank) {
  switch (rank) {
    case 'LEGENDARY': return COLORS.pink;
    case 'EPIC':      return COLORS.yellow;
    case 'UNIQUE':    return COLORS.blue;
    case 'RARE':      return COLORS.green;
    default:          return COLORS.white;
  }
};