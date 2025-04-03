import React from "react";
import GlobalText from '@/constants/GlobalText'
import { styles } from '@/assets/styles/Header.style'
import { Image, View } from 'react-native'

export default () => {
    return(
        <View style={{width: '100%' ,height: 44}}>
            {/*타이틀*/}
            <View style={styles.titleContainer}>
                <View style={{flexDirection:"row"}}>
                    <Image source={require("@/assets/images/PEEP_LOGO_X2.png")} />
                    <View>
                        <GlobalText style={[styles.title, styles.titleShadow2]}>peeppeep</GlobalText>
                        <GlobalText style={[styles.title, styles.titleShadow1]}>peeppeep</GlobalText>
                        <GlobalText style={styles.title}>peeppeep</GlobalText>
                    </View>
                </View>
                <View style={{paddingVertical:10, paddingHorizontal: 5}}>
                    <Image source={require("@/assets/images/exit_button.png")} />
                </View>
            </View>
            {/*메뉴바*/}
            <View style={styles.menuBarContainer}>
                <View>
                    <GlobalText style={styles.menuBarText}>Notify</GlobalText>
                    <View style={styles.underline} />
                </View>
                <View>
                    <GlobalText style={styles.menuBarText}>Info</GlobalText>
                    <View style={styles.underline} />
                </View>
                <View>
                    <GlobalText style={styles.menuBarText}>Help</GlobalText>
                    <View style={styles.underline} />
                </View>
            </View>
        </View>
    )
}