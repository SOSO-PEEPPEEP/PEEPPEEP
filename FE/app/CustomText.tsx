import React from 'react';
import { Text, TextProps } from 'react-native';

const CustomText: React.FC<TextProps> = ({ children, style, ...props }) => {
	return (
		<Text style={[{ fontFamily: 'PFstardust-ExtraBold' }, style]} {...props}>
			{children}
		</Text>
	);
};

export default CustomText;
