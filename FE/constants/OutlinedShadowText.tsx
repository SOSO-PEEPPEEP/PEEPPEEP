import GlobalText from '@/constants/GlobalText';
import { COLORS } from '@/constants/COLORS';
import { View, StyleSheet, TextProps, TextStyle, StyleProp, Platform } from "react-native";
import { ReactNode } from "react";
import emojiRegex from 'emoji-regex';

interface OutlinedShadowTextProps extends TextProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

export default ({ children, style, ...props }: OutlinedShadowTextProps) => {
  const content = typeof children === 'string' ? children : String(children);
  const regex = emojiRegex();

  // 문자열을 이모지와 일반 텍스트로 분리
  const parts = [];
  let lastIndex = 0;
  for (const match of content.matchAll(regex)) {
    const idx = match.index!;
    if (idx > lastIndex) {
      parts.push({ text: content.slice(lastIndex, idx), isEmoji: false });
    }
    parts.push({ text: match[0], isEmoji: true });
    lastIndex = idx + match[0].length;
  }
  if (lastIndex < content.length) {
    parts.push({ text: content.slice(lastIndex), isEmoji: false });
  }

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

  const flattenedStyle = StyleSheet.flatten(style);
    const fontSize = flattenedStyle?.fontSize || 16;
    const dynamicLineHeight = Math.round(fontSize * 1.4);

  return (
    <View style={styles.container}>
      {parts.map((part, i) => {
        // 이모지는 일반 GlobalText
        if (part.isEmoji) {
          return (
            <GlobalText key={i} {...props} style={[styles.text, { lineHeight: dynamicLineHeight }, style]}>
              {part.text}
            </GlobalText>
          );
        }
        
        return (
          <View key={i} style={styles.wrapper}>
            {[
              { x: -1, y: -1 },
              { x: 1, y: 1 },
              { x: 1, y: -1 },
              { x: -1, y: 1 },
              { x: 2, y: 2 },
              { x: 2, y: 0 },
              { x: 0, y: 2 },
            ].map((off, idx) => (
              <GlobalText
                key={idx}
                {...props}
                style={[
                  styles.text,
                  style,
                  {
                    position: 'absolute',
                    color: COLORS.dark,
                    left: off.x,
                    top: off.y,
                  },
                ]}
              >
                {part.text}
              </GlobalText>
            ))}
            <GlobalText
              {...props}
              style={[styles.text, style, { color: 'white', zIndex: 1 }]}
            >
              {part.text}
            </GlobalText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap' },
  wrapper: { position: 'relative' },
  text: { fontSize: 16, fontWeight: 'bold' },
});