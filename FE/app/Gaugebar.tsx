import React from "react";
import { View, StyleSheet } from "react-native";

interface GaugeBarProps {
  percentage: number; // 0 ~ 100
  height?: number;
  color?: string;
}

const GaugeBar: React.FC<GaugeBarProps> = ({ percentage, height = 10, color = "#FFD5FF" }) => {
  return (
    <View style={[styles.container, { height }]}>
      <View style={[styles.bar, { width: `${percentage}%`, backgroundColor: color }]} />
      <View style={[styles.emptyBar, { width: `${100 - percentage}%`}]} />
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
    borderWidth: 2,
    borderColor: '#FFD5FF',
  },
  emptyBar : {
    height: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#8787A3',
  },
});

export default GaugeBar;