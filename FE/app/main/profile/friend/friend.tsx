import React, { useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Animated } from "react-native";
import { useRouter, Router } from "expo-router";
import { useFonts } from 'expo-font';
import { styles } from "@/styles/profile.styles";
import FriendList from "@/app/main/profile/friend/friendList";
import FriendRequests from "@/app/main/profile/friend/friendRequests";
import FriendSent from "@/app/main/profile/friend/friendSent";

type ValidRoutes = Parameters<Router["push"]>[0];

interface TabButtonProps {
  routePath: ValidRoutes;
  isSelected: boolean;
  onPress: () => void;
  iconName: string;
}

interface TabBarProps {
  selectedTabIdx: number;
  setSelectedTabIdx: (index: number) => void;
}

export default function friend({ selectedTabIdx, setSelectedTabIdx }: TabBarProps) {
//font loading  
const [fontsLoaded] = useFonts({
    'PF-Stardust': require('@/assets/fonts/PFstardust3.0.ttf'),
    'PF-Stardust-Bold': require('@/assets/fonts/PFstardust3.0Bold.ttf'),
    'PF-Stardust-ExtraBold': require('@/assets/fonts/PFstardust3.0ExtraBold.ttf'),
});
if (!fontsLoaded) {
  return null; // 폰트 로딩이 안 됐다면 렌더링하지 않음
}
  
const imageMap: { [key: string]: any } = {
  FriendList: (
    <View style={[styles.friendButtons,
      selectedTabIdx === 0 && styles.selectFriendButtons,
    ]}>
        <Text style={[styles.friendButtonsText,
          selectedTabIdx === 0 && styles.selectFriendButtonsText,
        ]}>친구 목록</Text>
    </View>
  ),
  FriendRequests: (
    <View style={[styles.friendButtons,
      selectedTabIdx === 1 && styles.selectFriendButtons,
    ]}>
        <Text style={[styles.friendButtonsText,
          selectedTabIdx === 1 && styles.selectFriendButtonsText,
        ]}>받은 요청</Text>
    </View>
  ),
  FriendSent: (
    <View style={[styles.friendButtons,
      selectedTabIdx === 2 && styles.selectFriendButtons,
    ]}>
        <Text style={[styles.friendButtonsText,
          selectedTabIdx === 2 && styles.selectFriendButtonsText,
        ]}>보낸 요청</Text>
    </View>
  ),
};

const TabButton = ({ routePath, isSelected, onPress, iconName }: TabButtonProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        onPress();
        // router.push(routePath);
      }}
      style={styles.friendListButtons}
    >
      {imageMap[iconName]}
    </TouchableOpacity>
  );
};

  const tabs = [
    { path: "/FriendList", icon: "FriendList" },
    { path: "/FriendRequests", icon: "FriendRequests" },
    { path: "/FriendSent", icon: "FriendSent" },
  ] as const;

  return (
    <View style={{flex: 1}}>
        <View style={styles.friendContainer}>
        {tabs.map((tab, index) => (
            <View
            key={index}
            style={{
            flex: 1,
            flexDirection: 'row', // 수직 정렬
            alignItems: 'center', // 수평 가운데 정렬
            }}
        >
            <TabButton
            key={index}
            routePath={tab.path as ValidRoutes}
            isSelected={selectedTabIdx === index}
            onPress={() => setSelectedTabIdx(index)}
            iconName={tab.icon}
            />          
            {index < tabs.length - 1 && (
                <View style={styles.friendButtonsLine}></View>
            )}
            </View>
        ))}      
        </View>
        {/* 선택된 탭에 맞는 내용 표시 */}
        <View style={{ height: '100%', width: '100%' }}>
            {selectedTabIdx === 0 && <FriendList />}
            {selectedTabIdx === 1 && <FriendRequests />}
            {selectedTabIdx === 2 && <FriendSent />}
        </View>
    </View>
  );
}