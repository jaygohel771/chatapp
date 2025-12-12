import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { hs, ms, vs } from './Helper';
import { Fonts } from './Fonts';

interface ModalProps {
  onpress: () => void;
  text: string;
  cancelPress: () => void;
}

const ModalBox = ({ onpress, text, cancelPress }: ModalProps) => {
  return (
    <Modal animationType="fade" transparent={true} style={styles.modal}>
      <Pressable style={styles.modal} onPress={cancelPress}>
        <View style={styles.modalView} onStartShouldSetResponder={() => true}>
          <Text style={styles.headerText}>Log Out?</Text>
          <Text style={styles.warmingtext}>Are you sure want to exit?</Text>

          <View style={styles.btnview}>
            <TouchableOpacity style={styles.logoutbtn} onPress={cancelPress}>
              <Text style={[styles.btntext, { color: '#0B4CA0' }]}>cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.logoutbtn, { backgroundColor: '#0B4CA0' }]}
              onPress={onpress}
            >
              <Text style={styles.btntext}>{text}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalBox;

const styles = StyleSheet.create({
  modalView: {
    borderRadius: ms(15),
    paddingVertical: vs(15),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: hs(30),
    backgroundColor: 'white',
    elevation: hs(30),
  },
  modal: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: ms(22),
    fontFamily: Fonts.semibold,
    color: '#4E83AF',
  },
  warmingtext: {
    color: 'grey',
    fontSize: ms(16),
    fontFamily: Fonts.interRegular,
  },
  btnview: {
    flexDirection: 'row',
    gap: hs(10),
  },
  logoutbtn: {
    marginTop: vs(20),
    height: vs(40),
    justifyContent: 'center',
    alignItems: 'center',
    width: hs(120),
    borderRadius: ms(25),
    backgroundColor: '#D8EBF7',
  },
  btntext: {
    fontFamily: Fonts.medium,
    color: 'white',
    textAlign: 'center',
  },
});
