import React from 'react';
import { View, Image} from "react-native";
import { styles } from '@/styles/login.styles'
import GlobalText from '@/constants/GlobalText';
import Margin from '@/components/ui/Margin';
import errImg from '@/assets/images/main/img_error.png'


export default () => {
  return (
    <View style={styles.container}>
      <Image source={errImg}></Image>
      <Margin height={16}></Margin>
      <GlobalText>통신을 위해 공사 중 . . .</GlobalText>
    </View>
  );
};