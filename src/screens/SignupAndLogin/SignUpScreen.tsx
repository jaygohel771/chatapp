import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Fonts } from '../../constant/Fonts';
import { img } from '../../constant/Img';
import { Colors } from '../../constant/Colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import InputBox from '../../comopnent/common/InputBox';
import Button from '../../comopnent/common/Button';
import { hs, ms } from '../../constant/Helper';
import { s, vs } from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import firestore, { doc, setDoc } from '@react-native-firebase/firestore';
type SignUpScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'SignUpScreen'
>;

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [check, setCheck] = useState(false);

  const nav = useNavigation<SignUpScreenProps>();

  const isValidEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSignUp = async () => {
    if (!Email.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Email is required',
      });
      return;
    } else if (!isValidEmail(Email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid email format',
        text2: 'Please enter a valid email like example@gmail.com',
      });
      return;
    } else if (!password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Password is required',
      });
      return;
    } else if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Weak Password',
        text2: 'Password must be at least 6 characters',
      });
    }
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        Email,
        password,
      );

      const user = userCredential.user;

      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          name: firstName + ' ' + LastName,
          email: Email,
          photoUrl: null,
          createdAt: firestore.FieldValue.serverTimestamp(), // better than new Date()
        });
      console.log('Login successful!');
      nav.navigate('LoginScreen');
    } catch (error) {
      console.log('login error', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardavoidingview}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
      >
        <View style={styles.main}>
          <Text style={styles.txttitle1}>Hey there,</Text>
          <Text style={styles.txttitle2}>Create an Account</Text>
          <InputBox
            onChangeText={setFirstName}
            value={firstName}
            placeholderText={'First Name'}
            icon={img.profile}
            boxstyle={styles.boxstyle}
            secureTextEntry={undefined}
          />
          <InputBox
            onChangeText={setLastName}
            value={LastName}
            placeholderText={'Last Name'}
            icon={img.profile}
            boxstyle={styles.boxstyle}
            secureTextEntry={undefined}
          />
          <InputBox
            onChangeText={setEmail}
            value={Email}
            placeholderText={'Email'}
            icon={img.Message}
            boxstyle={styles.boxstyle}
            secureTextEntry={undefined}
          />
          <InputBox
            onChangeText={setpassword}
            value={password}
            placeholderText={'Password'}
            icon={img.Lock}
            boxstyle={undefined}
            secureTextEntry={true}
          />

          <View style={styles.condtionContainer}>
            <TouchableOpacity
              onPress={() => {
                setCheck(!check);
              }}
            >
              <Image
                source={check ? img.CheckBox : img.EmptyBox}
                style={styles.imgchechbox}
              />
            </TouchableOpacity>
            <Text style={styles.txttearncondition}>
              By continuing you accept our
              <Text style={styles.underlinetxt}>Privacy Policy </Text> and
              <Text style={styles.underlinetxt}> Term of Use</Text>
            </Text>
          </View>

          <Button
            txtstyle={undefined}
            btnstyle={styles.btnstyle}
            text={'Register'}
            onpress={() => {
              handleSignUp();
            }}
          />

          <View style={styles.linecontainer}>
            <View style={styles.line} />
            <Text style={styles.txtOR}>Or</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.ggoleConatiner}>
            <TouchableOpacity style={styles.btngoogle}>
              <Image source={img.google} style={styles.imggoogle} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btngoogle}>
              <Image source={img.facebook} style={styles.imggoogle} />
            </TouchableOpacity>
          </View>

          <View style={styles.logintextConatiner}>
            <Text style={styles.alreadyHaveAccountText}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                nav.navigate('LoginScreen');
              }}
            >
              <Text style={styles.ClickAbleText}> Login </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  keyboardavoidingview: {
    backgroundColor: 'white',
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: hs(30),
  },
  txttitle1: {
    fontFamily: Fonts.regular,
    fontSize: ms(16),
    textAlign: 'center',
    lineHeight: vs(15),
    marginTop: vs(40),
  },
  txttitle2: {
    fontFamily: Fonts.bold,
    fontSize: ms(20),
    textAlign: 'center',
    marginTop: vs(5),
    marginBottom: vs(30),
    // lineHeight: vs(15),
  },

  boxstyle: {
    marginBottom: vs(15),
  },
  inputboxContainer: {
    gap: vs(15),
    flex: 1,
    alignSelf: 'stretch',
  },
  condtionContainer: {
    flexDirection: 'row',
    gap: hs(14),
    marginTop: vs(12),
    alignSelf: 'flex-start',
  },
  imgchechbox: {
    width: hs(18),
    height: vs(18),
    resizeMode: 'contain',
  },
  txttearncondition: {
    fontSize: ms(10),
    fontFamily: Fonts.regular,
    color: '#ADA4A5',
    marginRight: hs(40),
  },
  underlinetxt: {
    fontSize: ms(10),
    fontFamily: Fonts.regular,
    color: '#ADA4A5',
    textDecorationLine: 'underline',
  },
  btnstyle: {
    backgroundColor: Colors.BlueLinear,
    borderRadius: ms(99),
    alignSelf: 'stretch',
    marginTop: vs(60),
  },
  line: {
    borderColor: '#DDDADA',
    borderWidth: ms(1),
    flex: 1,
  },
  linecontainer: {
    gap: s(10),
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: vs(20),
    flexDirection: 'row',
  },
  txtOR: {
    color: 'black',
    fontSize: ms(12),
    fontFamily: Fonts.interRegular,
  },
  btngoogle: {
    alignSelf: 'center',
    height: vs(50),
    width: s(50),
    borderRadius: ms(14),
    borderColor: '#DDDADA',
    borderWidth: ms(0.8),
    marginTop: vs(15),
    shadowOpacity: ms(1),
    elevation: s(1),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imggoogle: {
    height: vs(20),
    width: s(20),
    resizeMode: 'cover',
  },
  ggoleConatiner: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    gap: s(30),
  },
  alreadyHaveAccountText: {
    fontFamily: Fonts.regular,
    fontSize: s(14),
    color: 'black',
    textAlign: 'center',
  },
  ClickAbleText: {
    fontFamily: Fonts.regular,
    fontSize: s(14),
    color: '#CA8EEE',
    textAlign: 'center',
    marginTop: vs(2),
  },
  logintextConatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vs(25),
  },
});
