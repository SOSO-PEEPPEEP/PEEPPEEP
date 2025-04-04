import { StyleSheet } from "react-native";
import { COLORS } from '@/constants/COLORS';

export const styles = StyleSheet.create({
  frameContainer: {
    backgroundColor: COLORS.bg,
    width: "100%",
    flex: 1,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: COLORS.dark,
    padding: 24,
  },
});