import GlobalText from '@/constants/GlobalText';
import { COLORS } from '@/constants/COLORS';
import { View, StyleSheet } from "react-native";

export default ({ text, color }: { text: string, color: string }) => {
  return (
    <View>
        <GlobalText style={[styles.text, {backgroundColor:color}]}>{text}</GlobalText>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 2,
    color:COLORS.white,
    fontSize: 14,
    fontWeight: "bold",
  },
});