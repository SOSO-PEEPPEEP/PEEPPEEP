import { COLORS } from '@/constants/COLORS';
import GlobalText from '@/constants/GlobalText';
import { Modal, View, Pressable, Image } from 'react-native';
import Margin from '@/components/ui/Margin';
import { useRouter } from 'expo-router';

export default ({ visible, onClose }: { visible: boolean; onClose: () => void;}) => {
  const logo = require('@/assets/images/main/logo_x2.png');
    const router = useRouter();
    return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}>
        <View style={{
          backgroundColor: COLORS.bg,
          padding: 24,
          width: '80%',
        }}>
          <GlobalText style={{ fontSize: 20, fontWeight: 'bold', textAlign:'center', lineHeight:24}}>🎉 챌린지 결과 🎉</GlobalText>
          <Margin height={16}/>
          <GlobalText style={{textAlign:'center', lineHeight:20}}> 챌린지가 끝났습니다! 👏👏</GlobalText>
          <GlobalText style={{textAlign:'center'}}> 아래는 수행하신 데일리에 따른 보상입니다.</GlobalText>
          <Margin height={16}/>
          <View>
            <View style={{flexDirection:'row', justifyContent:"center", alignItems:"center"}}>
                <Image source={logo}/>
                <Margin width={4}/>
                <GlobalText>{`칫솔 X 1개`}</GlobalText>
            </View>
            <View style={{flexDirection:'row', justifyContent:"center", alignItems:"center"}}>
                <Image source={logo}/>
                <Margin width={4}/>
                <GlobalText>{`휴지 X 1개`}</GlobalText>
            </View>
            <View style={{flexDirection:'row', justifyContent:"center", alignItems:"center"}}>
                <Image source={logo}/>
                <Margin width={4}/>
                <GlobalText>{`샤워볼 X 1개`}</GlobalText>
            </View>
            <View style={{flexDirection:'row', justifyContent:"center", alignItems:"center"}}>
                <Image source={logo}/>
                <Margin width={4}/>
                <GlobalText>{`장난감 X 1개`}</GlobalText>
            </View>
            <View style={{flexDirection:'row', justifyContent:"center", alignItems:"center"}}>
                <Image source={logo}/>
                <Margin width={4}/>
                <GlobalText>{`빗 X 1개`}</GlobalText>
            </View>
          </View>
          <Margin height={16}/>
          <Pressable
            onPress={() => {
              onClose();
              router.push('/main/challenge');
            }}
            style={{
              flexDirection:'row',
              backgroundColor: COLORS.blue,
              padding: 8,
              alignSelf: 'center',
            }}
          >
            <Margin width={16}/>
            <GlobalText style={{ color: 'white', textAlign: 'center' }}>OK</GlobalText>
            <Margin width={16}/>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}