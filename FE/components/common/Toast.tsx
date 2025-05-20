import { COLORS } from '@/constants/COLORS';
import GlobalText from '@/constants/GlobalText';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

type ToastProps = {
  message: string;
  duration?: number;
  onHide: () => void;
  x: number;
  y: number;
};

const Toast: React.FC<ToastProps> = ({ message, duration = 2000, onHide, x, y }) => {
  const [toastWidth, setToastWidth] = useState(0);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(duration),
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => onHide());
  }, [message]);

  if (!message) return null;

  return (
    <Animated.View
      onLayout={e => {
        const { width } = e.nativeEvent.layout;
        setToastWidth(width);
      }}
      style={[styles.toastContainer, { opacity, top: y, left: x-toastWidth/2 }]}
    >
      <GlobalText style={styles.toastText}>{message}</GlobalText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    padding: 8,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  toastText: {
    color: COLORS.pink,
    fontSize: 12,
  },
});

export default Toast;
