import { Text, TextProps } from "react-native";
import { useFonts } from "expo-font";

export default (props: TextProps) => {

    const [fontsLoaded] = useFonts({
        "PF-Stardust": require("@/assets/fonts/PFstardust3.0.ttf"),
    });

    if (!fontsLoaded) return null;
    return <Text {...props} style={[{ fontFamily: "PF-Stardust" }, props.style]} />;
}