// MusicContext.tsx
import React, { createContext, useContext, useRef, useEffect } from 'react';
import { Audio } from 'expo-av';
import { backgroundMusicOptions } from '@/constants/musicOptions';

interface MusicContextType {
  setMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void; // 볼륨을 설정하는 메서드 추가
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const soundRef = useRef<Audio.Sound | null>(null);

  const playMusic = async () => {
    if (globalThis.__music_already_started__) return;

    const { source, settings } = backgroundMusicOptions;
    const { sound } = await Audio.Sound.createAsync(source, settings);
    soundRef.current = sound;
    await sound.playAsync();

    globalThis.__music_already_started__ = true;
  };

  const setMuted = async (muted: boolean) => {
    if (soundRef.current) {
      await soundRef.current.setIsMutedAsync(muted);
    }
  };

  const setVolume = async (volume: number) => {
    if (soundRef.current) {
      await soundRef.current.setVolumeAsync(volume / 100);
    }
  };

  useEffect(() => {
    playMusic();
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  return (
    <MusicContext.Provider value={{ setMuted, setVolume }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) throw new Error('useMusic must be used within MusicProvider');
  return context;
};
