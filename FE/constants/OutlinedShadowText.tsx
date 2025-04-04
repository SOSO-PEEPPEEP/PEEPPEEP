import GlobalText from '@/constants/GlobalText';
import { COLORS } from '@/constants/COLORS';
import { View, StyleSheet, TextProps, TextStyle, StyleProp, Platform } from "react-native";
import { ReactNode } from "react";

interface OutlinedShadowTextProps extends TextProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

export default ({ children, style, ...props }: OutlinedShadowTextProps) => {
  // Web: textShadow 사용
  if (Platform.OS === "web") {
    return (
      <GlobalText
        {...props}
        style={[
          styles.text,
          style,
          {
            color: "white",
            textShadow: "1px 1px 0px "+ COLORS.dark,
          } as any,
        ]}
      >
        {children}
      </GlobalText>
    );
  }

  return (
    <View>
      {/* 테두리용 및 그림자 */}
      {[
        // 테두두리
        { x: -1, y: -1 },
        { x: 1, y: 1 },
        { x: 1, y: -1 },
        { x: -1, y: 1 },
        // 그림자
        { x: 2, y: 2},
        { x: 2, y: 0},
        { x: 0, y: 2}
      ].map((offset, idx) => (
        <GlobalText
          key={idx}
          {...props}
          style={[
            styles.text,
            style,
            {
              position: "absolute",
              color: COLORS.dark,
              left: offset.x,
              top: offset.y,
            },
          ]}
        >
          {children}
        </GlobalText>
      ))}

      {/* 본문 */}
      <GlobalText {...props} style={[styles.text, style, { color: "white", zIndex:1}]}>{children}</GlobalText>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});