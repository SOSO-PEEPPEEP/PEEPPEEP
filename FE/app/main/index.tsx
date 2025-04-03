import React, { useState, useEffect  } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { useFonts } from 'expo-font';
import { styles } from "@/assets/styles/Styles";

export default function Index() {
  //font loading
  const [fontsLoaded] = useFonts({
    'PF stardust ExtraBold': require('@/assets/fonts/PFstardust-ExtraBold.ttf'),
  });

  return (
    <View style={styles.container}>
    </View>
  );
};