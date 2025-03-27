import { Text, TextProps, TextStyle, StyleSheet } from "react-native";
import { FONT } from './FONT';

export default ({ style, ...props }: TextProps) => {
    const textStyle = StyleSheet.flatten(style || {}) as TextStyle;
    const fontFamily = textStyle?.fontWeight === "bold" ? FONT.bold
    : textStyle?.fontWeight === "thin"? FONT.thin 
    : FONT.default;
    const { fontWeight, ...filteredStyle } = textStyle;

  return <Text {...props} style={[{ fontFamily }, filteredStyle ]} />;
}