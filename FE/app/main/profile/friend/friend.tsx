import React, { useState } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { Router } from "expo-router";
import { styles } from "@/styles/profile.styles";
import GlobalText from '@/constants/GlobalText';
import EffectSound from '@/components/common/effectSound';
import FriendList from "@/app/main/profile/friend/friendList";  // 추가
import FriendRequests from "@/app/main/profile/friend/friendRequests";  // 추가
import FriendSent from "@/app/main/profile/friend/friendSent";  // 추가

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

export default function riend({ selectedTabIdx, setSelectedTabIdx }: TabBarProps) {
  
const imageMap: { [key: string]: any } = {
  FriendList: (
    <View style={[styles.friendButtons,
      selectedTabIdx === 0 && styles.selectFriendButtons,
    ]}>
        <GlobalText style={[styles.friendButtonsText,
          selectedTabIdx === 0 && styles.selectFriendButtonsText,
        ]}>친구 목록</GlobalText>
    </View>
  ),
  FriendRequests: (
    <View style={[styles.friendButtons,
      selectedTabIdx === 1 && styles.selectFriendButtons,
    ]}>
        <GlobalText style={[styles.friendButtonsText,
          selectedTabIdx === 1 && styles.selectFriendButtonsText,
        ]}>받은 요청</GlobalText>
    </View>
  ),
  FriendSent: (
    <View style={[styles.friendButtons,
      selectedTabIdx === 2 && styles.selectFriendButtons,
    ]}>
        <GlobalText style={[styles.friendButtonsText,
          selectedTabIdx === 2 && styles.selectFriendButtonsText,
        ]}>보낸 요청</GlobalText>
    </View>
  ),
};

const TabButton = ({ routePath, isSelected, onPress, iconName }: TabButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        onPress();
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

  //소리 재생
  const [playEffect, setPlayEffect] = useState(false);

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
            onPress={() => { setSelectedTabIdx(index);  setPlayEffect(true); }}
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
      
    {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
    </View>
  );
}