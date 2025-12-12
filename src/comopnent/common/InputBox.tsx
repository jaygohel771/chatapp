import {
  EasingFunction,
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import { hs, ms, vs } from '../../constant/Helper';
import { img } from '../../constant/Img';
import { Colors } from '../../constant/Colors';

type InputBoxProps = {
  placeholderText?: string;
  icon?: ImageSourcePropType;
  boxstyle: ViewStyle;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  value: string;
  onSubmitEditing?: () => void;
};
const InputBox: React.FC<InputBoxProps> = ({
  placeholderText,
  icon,
  boxstyle,
  secureTextEntry,
  onChangeText,
  value,
  onSubmitEditing,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={[styles.box, boxstyle]}>
      <Image source={icon} style={styles.profileimg} />
      <TextInput
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholderText}
        style={styles.textinput}
        secureTextEntry={showPassword}
        placeholderTextColor={'#ADA4A5'}
        onChangeText={onChangeText}
        value={value}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.eyebutton}
          onPress={() => {
            setShowPassword(!showPassword);
          }}
        >
          <Image
            style={styles.eyeImg}
            source={showPassword ? img.Eye : img.HidePassword}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    height: vs(48),
    borderRadius: ms(14),
    borderColor: '#F7F8F8',
    borderWidth: ms(1),
    alignSelf: 'stretch',
    backgroundColor: '#F7F8F8',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: hs(15),
  },
  textinput: {
    color: 'black',
    flexGrow: 1,
    marginLeft: hs(10),
  },
  profileimg: {
    // backgroundColor: 'blue',
    height: vs(18),
    width: hs(18),
    resizeMode: 'contain',
    tintColor: Colors.grey,
  },
  eyebutton: {
    // backgroundColor: 'red',
    padding: vs(5),
  },
  eyeImg: {
    height: vs(18),
    width: hs(18),
    resizeMode: 'cover',
    tintColor: Colors.grey,
  },
  //   ADA4A5,
});
