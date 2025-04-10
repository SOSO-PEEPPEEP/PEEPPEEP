import GlobalText from '@/constants/GlobalText';
import { COLORS } from '@/constants/COLORS';
import { View, StyleSheet, TextProps, TextStyle, StyleProp } from "react-native";

interface LabelTextProps extends TextProps {
  children: string;
  style?: StyleProp<TextStyle>;
}

export default ({ children, style, ...props }: LabelTextProps) => {
  return (
    <View>
        <GlobalText {...props} style={[styles.text, style]}>{children}</GlobalText>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 2,
    color:COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: COLORS.gray
  },
});