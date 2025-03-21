import React, { useEffect, useRef } from "react";
import { styles } from '@/constants/styles';
import { View, TouchableOpacity, Image, Animated } from 'react-native';

const imageMap: { [key: string]: any } = {
    "Home": require("@/assets/images/Home_icon_X2.png"),
    "Friend": require("@/assets/images/Friend_icon_X2.png"),
    "Calendar": require("@/assets/images/Calendar_icon_X2.png"),
};

interface tabButtonProps {
    isSelected: boolean;
    onPress: () => void;
    iconName: string;
}

const TabButton = ({ isSelected, onPress, iconName }: tabButtonProps) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: isSelected ? 1.75 : 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    }, [isSelected]);

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
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
                        { translateY: Animated.multiply(scaleAnim, -4) },
                    ],
                }}
            />
        </TouchableOpacity>
    );
};

interface tabBarProps {
    selectedTabIdx: number;
    setSelectedTabIdx: (index: number) => void;
}

export default ({ selectedTabIdx, setSelectedTabIdx }: tabBarProps) => {
    return (
        <View style={styles.tabBarContainer}>
            {["Friend", "Calendar", "Home", "Friend", "Calendar"].map((icon, index) => (
                <TabButton
                    key={index}
                    isSelected={selectedTabIdx === index}
                    onPress={() => setSelectedTabIdx(index)}
                    iconName={icon}
                />
            ))}
        </View>
    );
};
