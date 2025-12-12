import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { img } from '../../constant/Img';
import { hs, vs } from '../../constant/Helper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import auth from '@react-native-firebase/auth';

type Splashscreenprops = NativeStackNavigationProp<
  RootStackParamList,
  'SplashScreen'
>;

const SplashScreen = () => {
  const nav = useNavigation<Splashscreenprops>();
  useEffect(() => {
    setTimeout(() => {
      const unsubscribe = auth().onAuthStateChanged(user => {
        if (user) {
          nav.replace('ChatListScreen');
        } else {
          nav.replace('LoginScreen');
        }
      });

      return () => unsubscribe(); // cleanup
    }, 1000);
  }, [nav]);

  return (
    <LinearGradient colors={['#32405eff', '#1B2C5A']} style={styles.container}>
      <Image source={img.grouplogo} style={styles.logoimg} />
      {/* <Text>sfs</Text> */}
      <Image source={img.plane} style={styles.planimage} />
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoimg: {
    height: vs(300),
    width: hs(290),
    // backgroundColor: 'red',
    resizeMode: 'cover',
  },
  planimage: {
    position: 'absolute',
    height: vs(50),
    width: vs(55),
    bottom: vs(70),
    // marginTop: vs(80),
    resizeMode: 'contain',
    tintColor: '#61a1fcff',
  },
});
