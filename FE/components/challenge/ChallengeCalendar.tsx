import React, { useState } from 'react';
import { View, Image, StyleSheet, Pressable } from "react-native";
import { useRouter } from 'expo-router';
import EffectSound from '@/components/common/effectSound';

interface ChallengeCalendarProps {
  calendar: { [key: `day${number}`]: number | null };
  period: number;
}

export default ({ calendar, period }: ChallengeCalendarProps) => {
  const router = useRouter();
  const calendarArray = Object.values(calendar);

  // period에 따른 row, col 계산
  const getGridStructure = () => {
    if (period === 3) return { rows: 1, cols: [3] };
    if (period === 7) return { rows: 2, cols: [3, 4] }; 
    if (period === 15) return { rows: 3, cols: [5, 5, 5] };
    if (period === 30) return { rows: 6, cols: Array(6).fill(5) };
    return { rows: 0, cols: [] };
  };

  const { cols } = getGridStructure();

  const getStatusImage = (value: number | null) => {
    if (value === null)
      return require("@/assets/images/main/Stamp_NotAttempted_X2.png");
    if (value === 0)
      return require("@/assets/images/main/Stamp_Failed_X2.png");
    return require("@/assets/images/main/Stamp_Success_X2.png");
  };

  let index = 0;

  //소리 재생
  const [playEffect, setPlayEffect] = useState(false);
  const [voiceEffect, setVoiceEffect] = useState(false);

  return (
    <View style={styles.wrapper}>
        {Array.isArray(cols) &&
        cols.map((colCount, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
                {Array.from({ length: colCount }).map((_, colIndex) => {
                    const value = calendarArray[index];
                    index++;
                    return (
                      <View key={colIndex} style={styles.cell}>
                        {value !== undefined && (
                          <Pressable
                            disabled={value === null || value === 0}
                            onPress={() => {
                              if (value !== null && value !== 0) {
                                setPlayEffect(true);
                                router.push(`/main/challenge/daily/detail?id=${value}`);
                              };
                            }}
                          >
                            <Image
                              source={getStatusImage(value)}
                              style={styles.image}
                            />
                          </Pressable>
                        )}
                      </View>
                    );
                })}
            </View>
        ))}
    {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  cell: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 48,
    height: 48,
  },
});
