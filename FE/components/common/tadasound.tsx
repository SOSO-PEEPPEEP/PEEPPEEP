import React, { useEffect } from 'react';
import { Audio } from 'expo-av';

interface EffectSoundProps {
  onPlaybackEnd?: () => void;
}

const EffectSound = ({ onPlaybackEnd }: EffectSoundProps) => {
  useEffect(() => {
    let sound: Audio.Sound;

    const playSound = async () => {
      const { sound: loadedSound } = await Audio.Sound.createAsync(
        require('@/assets/audio/sound_tada_01.wav')
      );
      sound = loadedSound;

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
  }, []);

  return null;
};

export default EffectSound;
