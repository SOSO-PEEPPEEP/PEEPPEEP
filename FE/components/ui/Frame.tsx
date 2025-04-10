import { ReactNode, useState, useEffect } from 'react'
import { View } from 'react-native'
import { styles } from './Frame.style';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av'
import { MusicProvider } from '@/constants/backgroundMusic';

interface FrameProps {
    children:ReactNode;
}

export default ({children}:FrameProps) => {
    useEffect(() => {
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: false,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: true,
      
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      }, []);  

    return(
        <View style={styles.frameContainer}>
        <MusicProvider>
            {children}
        </MusicProvider>
        </View>
    )
}