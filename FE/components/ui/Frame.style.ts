import { StyleSheet } from "react-native";
import { COLORS } from '@/constants/COLORS';

export const styles = StyleSheet.create({
  frameContainer: {
    backgroundColor: COLORS.bg,
    width: "100%",
    height: "100%",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: COLORS.dark,
    justifyContent: "center",
    padding: 10,
  },
});