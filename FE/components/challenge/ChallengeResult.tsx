import { COLORS } from '@/constants/COLORS';
import GlobalText from '@/constants/GlobalText';
import { Modal, View, Pressable, Image } from 'react-native';
import Margin from '@/components/ui/Margin';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from '@/constants/env';

type Props = {
  visible: boolean;
  items: { itemId: number; name: string; count: number }[];
  success: boolean;
  challengeUserId: number;
  onClose: () => void;
};

export default ({ visible, items, success, challengeUserId, onClose }: Props) => {
  const logo = require('@/assets/images/main/logo_x2.png');
  const router = useRouter();

  const handleOk = async () => {
    try {
      await fetch(
        `${API_BASE_URL}/api/challenges/${challengeUserId}/result`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' } }
      );
    } catch (e) {
      console.error('결산 API 호출 실패', e);
    } finally {
      onClose();
      router.push('/main/challenge');
    }
  };

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
          { !success
            ? ( // 실패했을 때
              <GlobalText style={{ textAlign:'center', lineHeight:20 }}>
                도전도 못하고 끝나버렸어요...{'\n'}다음에 더 열심히 해보세요!
              </GlobalText>
            )
            : ( // 성공했을 때
              <>
                <GlobalText style={{ textAlign:'center', lineHeight:20 }}>
                  챌린지가 끝났습니다! 👏👏
                </GlobalText>
                <GlobalText style={{ textAlign:'center' }}>
                  아래는 수행하신 데일리에 따른 보상입니다.
                </GlobalText>
                <Margin height={16}/>
                <View>
                  {items.map(item => (
                    <View key={item.itemId} style={{flexDirection:'row', justifyContent:"center", alignItems:"center"}}>
                      <Image
                        source={logo}
                      />
                      <Margin width={4}/>
                      <GlobalText>
                        {`${item.name} X ${item.count}`}
                      </GlobalText>
                    </View>
                  ))}
                </View>
              </>
            )
          }
          <Margin height={16}/>
          <Pressable
            onPress={handleOk}
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