import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

interface TabBarContextProps {
  selectedTabIdx: number;
  setSelectedTabIdx: (index: number) => void;
}

const TabBarContext = createContext<TabBarContextProps | undefined>(undefined);

export const TabBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedTabIdx, setSelectedTabIdxState] = useState(2);
  const router = useRouter();

  const setSelectedTabIdx = (index: number) => {
    setSelectedTabIdxState(index);
    AsyncStorage.setItem("selectedTabIdx", index.toString());
  };

useEffect(() => {
  const loadTabIdx = async () => {
    const appClosed = await AsyncStorage.getItem("appClosed");

    if (appClosed === "true") {
      await AsyncStorage.removeItem("appClosed");
      setSelectedTabIdxState(2);
    } else {
      // 새로고침 → 기존값 복구
      const savedIdx = await AsyncStorage.getItem("selectedTabIdx");
      if (savedIdx !== null) {
        const idx = Number(savedIdx);
        if (selectedTabIdx !== idx) {  // ✅ 중복 푸시 방지
          setSelectedTabIdxState(idx);
          const tabRoutes = [
            "/main/pet", 
            "/main/challenge", 
            "/main", 
            "/main/profile", 
            "/main/option"
          ] as const;
          if (idx >= 0 && idx < tabRoutes.length) {
            router.replace(tabRoutes[idx]);  // ✅ push 대신 replace 사용
          }
        }
      }
    }
  };
  loadTabIdx();
}, [selectedTabIdx]);

  return (
    <TabBarContext.Provider value={{ selectedTabIdx, setSelectedTabIdx }}>
      {children}
    </TabBarContext.Provider>
  );
};

export const useTabBar = () => {
  const context = useContext(TabBarContext);
  if (!context) {
    throw new Error("useTabBar는 반드시 TabBarProvider 내부에서 사용해야 합니다.");
  }
  return context;
};
