import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { useRouter, Router } from "expo-router";
import { styles } from './TabBar.style';
import { useTabBar } from "@/context/TabBarContext";
import EffectSound from '@/components/common/effectSound';

const imageMap: { [key: string]: any } = {
  Peep: require("@/assets/images/icon/icon_peep.png"),
  Peep_none: require("@/assets/images/icon/icon_peep_none.png"),
  Calendar: require("@/assets/images/icon/icon_calendar.png"),
  Calendar_none: require("@/assets/images/icon/icon_calendar_none.png"),
  Main: require("@/assets/images/icon/icon_main.png"),
  Main_none: require("@/assets/images/icon/icon_main_none.png"),
  Friend: require("@/assets/images/icon/icon_friend.png"),
  Friend_none: require("@/assets/images/icon/icon_friend_none.png"),
  Option: require("@/assets/images/icon/icon_setting.png"),
  Option_none: require("@/assets/images/icon/icon_setting_none.png"),
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

export default function TabBar() {
  const { selectedTabIdx, setSelectedTabIdx } = useTabBar();

  const tabs = [
    { path: "/main/pet", icon: "Peep" },
    { path: "/main/challenge", icon: "Calendar" },
    { path: "/main", icon: "Main" },
    { path: "/main/profile", icon: "Friend" },
    { path: "/main/option", icon: "Option" },
  ] as const;

  //소리 재생
  const [playEffect, setPlayEffect] = useState(false);
  
  return (
    <View style={styles.tabBarContainer}>
    {tabs.map((tab, index) => {
      const isSelected = selectedTabIdx === index;

      const iconName = isSelected ? tab.icon : `${tab.icon}_none`;

      return (
        <TabButton
          key={index}
          routePath={tab.path as ValidRoutes}
          isSelected={isSelected}
          onPress={() => {
            setSelectedTabIdx(index);
            setPlayEffect(true);
          }}
          iconName={iconName}
        />
      );
    })}
      
    {playEffect && ( <EffectSound  onPlaybackEnd={() => setPlayEffect(false)} />)}
    </View>
  );
}