import React, { createContext, useState, useContext } from "react";

interface TabBarContextProps {
    selectedTabIdx: number;
    setSelectedTabIdx: (index: number) => void;
}

const TabBarContext = createContext<TabBarContextProps | undefined>(undefined);

export const TabBarProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedTabIdx, setSelectedTabIdx] = useState(2);

    return (
        <TabBarContext.Provider value={{ selectedTabIdx, setSelectedTabIdx }}>
            {children}
        </TabBarContext.Provider>
    );
};

export const useTabBar = () => {
    const context = useContext(TabBarContext);
    if (!context) {
        throw new Error("useTabBar must be used within a TabBarProvider");
    }
    return context;
};