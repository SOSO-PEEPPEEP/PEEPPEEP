import React, { useEffect, useRef } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { useRouter, Router } from "expo-router";
import { styles } from "@/assets/styles/Styles";


const imageMap: { [key: string]: any } = {
  Home: require("./../assets/images/calendar_icon.png"),
  Friend: require("./../assets/images/calendar_icon.png"),
  Calendar: require("./../assets/images/calendar_icon.png"),
};

type ValidRoutes = Parameters<Router["push"]>[0];

interface TabButtonProps {
  routePath: ValidRoutes;
  isSelected: boolean;
  onPress: () => void;
  iconName: string;
}

const TabButton = ({ routePath, isSelected, onPress, iconName }: TabButtonProps) => {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: isSelected ? 1.5 : 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [isSelected]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        onPress();
        router.push(routePath);
      }}
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Animated.Image
        source={imageMap[iconName]}
        style={{
          width: 45,
          height: 45,
          transform: [
            { scaleX: scaleAnim },
            { scaleY: scaleAnim },
            { translateY: Animated.multiply(scaleAnim, -5) },
          ],
        }}
      />
    </TouchableOpacity>
  );
};

interface TabBarProps {
  selectedTabIdx: number;
  setSelectedTabIdx: (index: number) => void;
}

export default function TabBar({ selectedTabIdx, setSelectedTabIdx }: TabBarProps) {
  const tabs = [
    { path: "/Login_Main", icon: "Home" },
    { path: "/", icon: "Calendar" },
    { path: "/profile", icon: "Home" },
    { path: "/PEEPMain", icon: "Home" },
    { path: "/main/profile", icon: "Calendar" },
  ] as const;

  return (
    <View style={styles.tabBarContainer}>
      {tabs.map((tab, index) => (
        <TabButton
          key={index}
          routePath={tab.path as ValidRoutes}
          isSelected={selectedTabIdx === index}
          onPress={() => setSelectedTabIdx(index)}
          iconName={tab.icon}
        />
      ))}
    </View>
  );
}