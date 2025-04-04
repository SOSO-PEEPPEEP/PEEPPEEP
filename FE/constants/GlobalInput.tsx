import { TextInput, TextInputProps } from 'react-native';
import { COLORS } from '@/constants/COLORS';
import { FONT } from './FONT';

export default function GlobalInput(props: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor={COLORS.gray}
      {...props}
      style={[
        {
          color: COLORS.dark,
          fontSize: 16,
          fontFamily: FONT.default,
        },
        props.style,
      ]}
    />
  );
}