import { View, ScrollView, Image, TouchableOpacity } from 'react-native'
import Frame from '@/components/ui/Frame'
import EffectSound from '@/components/common/effectSound';
import GlobalText from '@/constants/GlobalText'
import Margin from '@/components/ui/Margin'
import { COLORS } from '@/constants/COLORS'
import OutlinedShadowText from '@/constants/OutlinedShadowText'
import CreateButton from '@/components/challenge/CreateButton'
import { useRouter } from 'expo-router'
import SpeechBubble from '@/components/ui/SpeechBubble'
import { useState } from 'react'
import DeleteConfirm from '@/components/challenge/DeleteConfirm'

export default () => {
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const daily={
        image:"https://pbs.twimg.com/tweet_video_thumb/EKX8jXwUUAA4AIx.jpg",
        content:"오늘양치질개열심히햇습니다요후훗훗"
    }

    //소리 효과
    const [playEffect, setPlayEffect] = useState(false);
    
    return (
        <Frame>
            <GlobalText style={{fontSize:16, color:COLORS.gray}}>DAILY</GlobalText>
            
            <Margin height={8}/>

            <View style={{alignItems:'center'}}>
                <Image source={require("@/assets/images/main/Stamp_Success_X2.png")}/>
            </View>

            <Margin height={8}/>

            {/* 데일리 */}
            <View style={{alignItems:'center'}}>
                <OutlinedShadowText style={{fontSize:32}}>DAY17</OutlinedShadowText>
            </View>

            <Margin height={16}/>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* 사진 첨부 */}
                <View style={{backgroundColor:COLORS.dark, marginTop:1, marginLeft:1, height:173}}/>
                <Image
                    source={{ uri: daily.image }}
                    resizeMode="cover"
                    style={{
                        height:172, position: "absolute", top: 0, left: 0, right: 2
                    }}
                />

                <Margin height={16}/>

                {/* 데일리 설명 */}
                <View style={{paddingHorizontal:4}}>
                    <SpeechBubble>
                        <GlobalText>{daily.content}</GlobalText>
                    </SpeechBubble>
                </View>
            </ScrollView>

            <Margin height={16}/>
            
            {/* 데일리 챌린지 삭제/취소 버튼 */}
            <View style={{flexDirection:"row", alignSelf: "center"}}>
                <TouchableOpacity
                    onPress={() => {
                        setShowDeleteModal(true)
                    }}
                    activeOpacity={0.8}
                    style={{ alignSelf: "center" }}
                >
                    <CreateButton>DELETE</CreateButton>
                </TouchableOpacity>

                <Margin width={16}/>

                <TouchableOpacity
                    onPress={() => {{
                        router.push('/main/challenge/detail');
                        setPlayEffect(true);
                    }}}
                    activeOpacity={0.8}
                    style={{ alignSelf: "center" }}
                >
                    <CreateButton color={COLORS.blue}>CANCEL</CreateButton>
                </TouchableOpacity>
            </View>

            <Margin height={36}/>

            <DeleteConfirm
                visible={showDeleteModal}
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={() => {
                    setShowDeleteModal(false);
                }}
            />
        {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
        </Frame>
    )    
}