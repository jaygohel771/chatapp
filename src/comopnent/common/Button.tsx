import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  Image,
} from 'react-native';
import React from 'react';
import { hs, ms, vs } from '../../constant/Helper';
import { Colors } from '../../constant/Colors';
import { Fonts } from '../../constant/Fonts';

type ButtonProps = {
  txtstyle: TextStyle;
  btnstyle: ViewStyle;
  onpress: () => void;
  text: string;
  icon?: ImageSourcePropType;
};

const Button: React.FC<ButtonProps> = ({
  txtstyle,
  btnstyle,
  onpress,
  text,
  icon,
}) => {
  return (
    <TouchableOpacity style={[styles.btn, btnstyle]} onPress={onpress}>
      {icon && <Image source={icon} style={styles.iconstyle} />}
      <Text style={[styles.txtbtn, txtstyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    gap: hs(12.5),
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: vs(15),
    borderRadius: ms(99),
    backgroundColor: Colors.BlueLinear,
  },
  txtbtn: {
    fontFamily: Fonts.bold,
    fontSize: ms(15),
    color: 'white',
  },
  iconstyle: {
    height: vs(20),
    width: vs(20),
    marginVertical: 'auto',
    // backgroundColor: 'red',
    resizeMode: 'contain',
  },
});
