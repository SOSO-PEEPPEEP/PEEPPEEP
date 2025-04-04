// components/ui/DeleteConfirmModal.tsx
import { Modal, View, Pressable, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/COLORS';
import GlobalText from '@/constants/GlobalText';
import Margin from '../ui/Margin';
import { useRouter } from 'expo-router';

interface DeleteConfirmModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default ({ visible, onCancel, onConfirm }: DeleteConfirmModalProps) => {
  const router = useRouter();
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <GlobalText style={styles.text}>데일리 챌린지를 삭제하시겠습니까?</GlobalText>
          <Margin height={8}/>
          <GlobalText style={{textAlign: 'center'}}>해당 데일리를 삭제하면 복구가 되지 않습니다.</GlobalText>
          <GlobalText style={{textAlign: 'center'}}>금일 완료했던 스탬프도 사라지니 주의하시길 바랍니다.</GlobalText>
          <Margin height={24}/>
          <View style={styles.buttonContainer}>
            <Pressable 
                onPress={() => {
                    onConfirm();
                    router.replace('/main/challenge/detail');
                }}
                style={[styles.button, { backgroundColor: COLORS.pink }]}>
              <GlobalText style={styles.buttonText}>OK</GlobalText>
            </Pressable>
            <Pressable onPress={onCancel} style={[styles.button, { backgroundColor: COLORS.blue }]}>
              <GlobalText style={styles.buttonText}>CANCEL</GlobalText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: COLORS.bg,
    padding: 24,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: COLORS.pink,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});
