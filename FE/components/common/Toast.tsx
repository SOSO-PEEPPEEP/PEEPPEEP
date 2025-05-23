import { COLORS } from '@/constants/COLORS';
import GlobalText from '@/constants/GlobalText';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { rgba } from 'polished';

type ToastProps = {
  message: string;
  duration?: number;
  onHide: () => void;
  height: number;
};

const Toast: React.FC<ToastProps> = ({ message, duration = 1000, onHide, height }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let isActive = true;
    opacity.stopAnimation();
    opacity.setValue(0);

    const animation = Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(duration),
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]);

    animation.start(({ finished }) => {
      if (finished && isActive) { onHide(); }
    });

    return () => {
      isActive = false;
      animation.stop();
    };
  }, [message, duration, onHide]);

  if (!message) return null;

  return (
    <Animated.View
      style={[styles.toastContainer, { opacity, bottom: height }]}
    >
      <GlobalText style={styles.toastText}>{message}</GlobalText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    padding: 8,
    backgroundColor: rgba(COLORS.dark,0.7),
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  toastText: {
    color: COLORS.white,
    fontSize: 12,
  },
});

export default Toast;
