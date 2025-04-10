import React, { useEffect } from 'react';
import { Audio } from 'expo-av';

interface EffectSoundProps {
  onPlaybackEnd?: () => void;
  // volume: number;  // 음량을 prop으로 받음
}

const EffectSound = ({ onPlaybackEnd }: EffectSoundProps) => {
// const EffectSound = ({ onPlaybackEnd, volume }: EffectSoundProps) => {
  useEffect(() => {
    let sound: Audio.Sound;

    const playSound = async () => {
      const { sound: loadedSound } = await Audio.Sound.createAsync(
        require('@/assets/audio/sound_button_02.wav')
      );
      sound = loadedSound;

      // 음량 설정
      // sound.setVolumeAsync(volume / 100);  // 슬라이더 값은 0~100이므로 0~1로 변환

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          onPlaybackEnd?.();
        }
      });

      await sound.playAsync();
    };

    playSound();

    return () => {
      sound?.unloadAsync();
    };
  }, []);  // volume이 변경될 때마다 재생
  // }, [volume]);  // volume이 변경될 때마다 재생

  return null;
};

export default EffectSound;
