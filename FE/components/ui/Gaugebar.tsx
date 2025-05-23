import { COLORS } from '@/constants/COLORS';
import React from "react";
import { View, StyleSheet } from "react-native";

interface GaugeBarProps {
  percentage: number; // 0 ~ 100
  height?: number;
  color?: string;
}

const GaugeBar: React.FC<GaugeBarProps> = ({ percentage, height = 10, color = COLORS.lilac }) => {
  return (
    <View style={[styles.container, { height }]}>
      {percentage > 0 && <View style={[styles.bar, { width: `${percentage}%`, backgroundColor: color }]} />}
      {percentage < 100 && <View style={[styles.emptyBar, { width: `${100 - percentage}%` }, percentage <= 0 && { borderLeftWidth: 1 }]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
    flexDirection: 'row',
  },
  bar: {
    height: "100%",
    borderWidth: 1,
    borderColor: COLORS.lilac,
  },
  emptyBar : {
    height: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.dark,
  },
});

export default GaugeBar;