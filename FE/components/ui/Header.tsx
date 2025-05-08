import React, { useState, useEffect } from 'react';
import GlobalText from '@/constants/GlobalText'
import { styles } from './Header.style'
import { Image, View, TouchableOpacity, Animated, Modal } from 'react-native'
import Margin from './Margin';

export default () => {
    const logo_default = require('@/assets/images/main/logo_x2.png');
    const logo_sleep = require('@/assets/images/main/logo_sleep_x4.png');
    const logo_full = require('@/assets/images/main/logo_full_x2.png');
    const exit_button = require('@/assets/images/main/exit_button.png');

    const [logo, setLogo] = useState(logo_default);
    const [jumpValue] = useState(new Animated.Value(0));
    const [notifymodalVisible, setNotifymodalVisible] = useState<boolean>(false);
    const [viewmodalVisible, setViewModalVisible] = useState<boolean>(false);
    const [infomodalVisible, setInfoModalVisible] = useState<boolean>(false);
    const [helpmodalVisible, setHelpModalVisible] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLogo(logo_sleep);
        }, 60000);

        return () => clearTimeout(timer);
    }, [logo]);

    const wakeUP = () => {
        if (logo === logo_sleep) {
            setLogo(logo_default);  

            Animated.sequence([
                Animated.timing(jumpValue, {
                    toValue: -13,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(jumpValue, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                }),
            ]).start();       
        }
    }

    const Notify = () => {
        if(notifymodalVisible){
            setNotifymodalVisible(false); 
        } else {
            setNotifymodalVisible(true); 
        } 
    }

    const view = () => {
        if(viewmodalVisible){
            setViewModalVisible(false); 
        } else {
            setViewModalVisible(true); 
        } 
    }

    const info = () => {
        if(infomodalVisible){
            setInfoModalVisible(false); 
        } else {
            setInfoModalVisible(true); 
        } 
    }

    const help = () => {
        if(helpmodalVisible){
            setHelpModalVisible(false); 
        } else {
            setHelpModalVisible(true); 
        } 
    }

    return(
        <View>
            {/*타이틀*/}
            <View style={styles.titleContainer}>
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={wakeUP} activeOpacity={1}>                        
                        <Animated.Image 
                            style={{
                                width: 44, 
                                height: 44, 
                                transform: [{ translateY: jumpValue }],
                            }} 
                            source={logo} 
                        />
                        {/* <Image source={logo} style={{width: 44, height: 44,}} /> */}
                    </TouchableOpacity>
                    <View>
                        <GlobalText style={[styles.title, styles.titleShadow2]}>peeppeep</GlobalText>
                        <GlobalText style={[styles.title, styles.titleShadow1]}>peeppeep</GlobalText>
                        <GlobalText style={styles.title}>peeppeep</GlobalText>
                    </View>
                </View>
                <View style={{paddingVertical:10, paddingHorizontal: 5}}>
                    <Image source={exit_button} style={{width: 32, height: 32,}} />
                </View>
            </View>
            {/*메뉴바*/}
            <View style={styles.menuBarContainer}>
                <View>
                    <TouchableOpacity onPress={Notify} activeOpacity={1}>
                        <GlobalText style={styles.menuBarText}>Notify</GlobalText>
                        <View style={styles.underline} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={view} activeOpacity={1}>
                        <GlobalText style={styles.menuBarText}>View</GlobalText>
                        <View style={styles.underline} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={info} activeOpacity={1}>
                        <GlobalText style={styles.menuBarText}>Info</GlobalText>
                        <View style={styles.underline} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={help} activeOpacity={1}>
                        <GlobalText style={styles.menuBarText}>Help</GlobalText>
                        <View style={styles.underline} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* NOTICE Modal */}
            <TouchableOpacity onPress={Notify} activeOpacity={1}>
                <Modal animationType="fade" transparent={true} visible={notifymodalVisible} onRequestClose={() => setNotifymodalVisible(false)}>
                    <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <GlobalText>임시 윈도우 : NOTIFY</GlobalText>
                    </View>
                    </View>
                </Modal>
            </TouchableOpacity>
            {/* VIEW Modal */}
            <TouchableOpacity onPress={view} activeOpacity={1}>
                <Modal animationType="fade" transparent={true} visible={viewmodalVisible} onRequestClose={() => setViewModalVisible(false)}>
                    <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={logo_full} style={{width: 44, height: 44, tintColor: '#8787a3'}} />
                        <GlobalText style={{textAlign: 'center'}}>{'-------------------------------'}</GlobalText>
                        <Margin height={16}></Margin>
                        <GlobalText style={{textAlign: 'center'}}>{'< 외계 생명체 PEEP >'}</GlobalText>
                        <Margin height={16}></Margin>
                        <GlobalText style={{textAlign: 'center'}}>
                            우주를 여행하는 생명체는{'\n'}
                            어떠한 이유에서인지 어느 날 알이 되어,{'\n'}
                            특별한 존재 'PEEP'으로 탄생한다고 해요.{'\n\n'}
                            쉿! 이건 아는 사람들만 아는 이야기예요.{'\n\n'}
                            그래요. 당신은 PEEP에 대해 알고 있는{'\n'} 
                            얼마 되지 않는 존재랍니다.{'\n\n'}
                            그러니 부디 PEEP을 보살펴주세요. {'\n'}
                            사랑과 관심만이 그들을 자랄 수 있게 하니까요.{'\n\n'}
                            {/* PEEP의 존재에 대해서는 밝혀지지 않은 게 많답니다.{'\n'} */}
                        </GlobalText>
                    </View>
                    </View>
                </Modal>
            </TouchableOpacity>
            {/* INFO Modal */}
            <TouchableOpacity onPress={info} activeOpacity={1}>
                <Modal animationType="fade" transparent={true} visible={infomodalVisible} onRequestClose={() => setInfoModalVisible(false)}>
                    <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={logo_full} style={{width: 44, height: 44,tintColor: '#8787a3'}} />
                        <Margin height={16}></Margin>
                        {/* <GlobalText style={{textAlign: 'center'}}>{'< 제작자 >\n\nSOSO'}</GlobalText> */}
                        <GlobalText style={{textAlign: 'center'}}>{'< 제작자 > \n \n Ori \nSong'}</GlobalText>
                        <Margin height={16}></Margin>
                        <GlobalText style={{textAlign: 'center'}}>{'-------------------------------'}</GlobalText>
                        <Margin height={16}></Margin>
                        <GlobalText style={{textAlign: 'center'}}>{'< 출처 >\n\nFONT by 피나타\n~ 스타더스트 Stardust ~'}</GlobalText>
                        <Margin height={16}></Margin>
                        <GlobalText style={{textAlign: 'center'}}>{'BGM by @Pixverses\n~ A Lonely Cherry Tree ~\n\nSFX by @vsoundvsound\n~ Retro Sound Effects ~'}</GlobalText>
                    </View>
                    </View>
                </Modal>
            </TouchableOpacity>
            {/* HELP Modal */}
            <TouchableOpacity onPress={help} activeOpacity={1}>
                <Modal animationType="fade" transparent={true} visible={helpmodalVisible} onRequestClose={() => setHelpModalVisible(false)}>
                    <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={logo_full} style={{width: 44, height: 44,tintColor: '#8787a3'}} />
                        <Margin height={16}></Margin>
                        <GlobalText>임시 윈도우 : HELP</GlobalText>
                    </View>
                    </View>
                </Modal>
            </TouchableOpacity>
        </View>
    )
}