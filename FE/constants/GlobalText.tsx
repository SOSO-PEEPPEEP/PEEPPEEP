import React from 'react';
import { Text, TextProps, TextStyle, StyleSheet } from "react-native";

export default ({ style, ...props }: TextProps) => {
    const textStyle = StyleSheet.flatten(style || {}) as TextStyle;
    const fontFamily =
    textStyle?.fontWeight === "bold" ? "PF-Stardust-ExtraBold" : "PF-Stardust-Bold";
    const { fontWeight, ...filteredStyle } = textStyle;

  return <Text {...props} style={[{ fontFamily }, filteredStyle ]} />;
}