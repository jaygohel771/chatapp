import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { hs, vs } from '../../constant/Helper';
import { Fonts } from '../../constant/Fonts';
import { ms, s } from 'react-native-size-matters';
import InputBox from '../../comopnent/common/InputBox';
import { img } from '../../constant/Img';
import Button from '../../comopnent/common/Button';
import Toast from 'react-native-toast-message';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/FirebaseConfig';
import {
  NativeStackNavigationProp,
  NativeStackNavigatorProps,
} from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

type LoginScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'LoginScreen'
>;
const LoginScreen = () => {
  const [Email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const nav = useNavigation<LoginScreenProps>();

  const isValidEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };
  const LoginWithFirebase = async () => {
    try {
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

      await auth().signInWithEmailAndPassword(Email, password);
      Toast.show({
        type: 'success',
        text1: 'Login Successful!',
      });
      nav.navigate('ChatListScreen');
    } catch (error) {
      console.log('login fireabse error', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      style={styles.keyboardavoidingview}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.main}>
          <Text style={styles.title1}>Hey there,</Text>
          <Text style={styles.title2}>Welcome Back</Text>
          <View style={styles.inputboxConatiner}>
            <InputBox
              placeholderText={'Email'}
              icon={img.Message}
              boxstyle={undefined}
              secureTextEntry={undefined}
              onChangeText={setEmail}
            />
            <InputBox
              placeholderText={'password'}
              icon={img.Lock}
              boxstyle={undefined}
              secureTextEntry={true}
              onChangeText={setpassword}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotpasstext}>Forgot your password?</Text>
          </TouchableOpacity>
          <Button
            btnstyle={styles.btnlogin}
            text="Login"
            icon={img.Login}
            onpress={LoginWithFirebase}
          />

          <View style={styles.lineConatiner}>
            <View style={styles.line} />
            <Text style={styles.Ortxt}>Or</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socailbtbnConatiner}>
            <TouchableOpacity style={styles.googlebtn}>
              <Image source={img.google} style={styles.imggoogle} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.googlebtn}>
              <Image source={img.facebook} style={styles.imggoogle} />
            </TouchableOpacity>
          </View>

          <View style={styles.logintextConatiner}>
            <Text style={styles.alreadyHaveAccountText}>
              Don’t have an account yet?
            </Text>
            <TouchableOpacity onPress={() => nav.navigate('SignUpScreen')}>
              <Text style={styles.ClickAbleText}> Register </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: hs(30),
  },
  keyboardavoidingview: {
    flex: 1,
    backgroundColor: 'white',
  },
  title2: {
    textAlign: 'center',
    color: 'black',
    fontFamily: Fonts.bold,
    fontSize: ms(20),
    marginBottom: vs(30),
  },
  inputboxConatiner: {
    gap: vs(15),
  },

  title1: {
    textAlign: 'center',
    color: 'black',
    fontFamily: Fonts.regular,
    fontSize: ms(16),
    marginTop: vs(40),
  },
  forgotpasstext: {
    marginTop: vs(10),
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#ADA4A5',
    fontSize: ms(12),
    fontFamily: Fonts.medium,
  },
  btnlogin: {
    marginTop: vs(240),
  },
  lineConatiner: {
    gap: s(10),
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: vs(20),
    flexDirection: 'row',
  },
  line: {
    flex: 1,
    borderWidth: ms(0.5),
    borderColor: '#DDDADA',
  },
  Ortxt: {
    fontFamily: Fonts.interRegular,
    fontSize: ms(12),
  },
  socailbtbnConatiner: {
    marginTop: vs(20),
    flexDirection: 'row',
    gap: s(30),
    alignSelf: 'center',
  },
  googlebtn: {
    height: vs(50),
    width: vs(50),
    borderColor: '#DDDADA',
    borderWidth: ms(0.8),
    borderRadius: ms(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imggoogle: {
    height: vs(20),
    width: s(20),
    resizeMode: 'cover',
  },
  logintextConatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vs(30),
    marginBottom: vs(40),
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
});
