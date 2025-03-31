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
        setSelectedTabIdxState(Number(savedIdx));
        const tabRoutes = ["/", "/challenge"] as const;
        router.push(tabRoutes[Number(savedIdx)]);
      }
    }
  };
  loadTabIdx();
}, []);

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
