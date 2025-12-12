import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { img } from '../../constant/Img';
import { ms, s, verticalScale, vs } from 'react-native-size-matters';
import { hs } from '../../constant/Helper';
import { Colors } from '../../constant/Colors';

const NextButton = ({ onpress, number }) => {
  return (
    <TouchableOpacity onPress={onpress} style={styles.Nextbtn}>
      <LinearGradient
        colors={['#A0B4FF', '#4A5CF1']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.LinearGradient}
      >
        {/* {number === 2 ? (
          <Image source={img.MediumRound} style={styles.progressimg} />
        ) : number === 3 ? (
          <Image source={img.LargeRound} style={styles.progressimg} />
        ) : number === 4 ? (
          <Image source={img.ExtraLargeRound} style={styles.progressimg} />
        ) : (
          <Image source={img.SmallRound} style={styles.progressimg} />
        )} */}
        <Image source={img.RightArrow} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  progressimg: {
    // backgroundColor: 'red',
    position: 'absolute',
    width: hs(30),
    height: verticalScale(30),
    left: s(10),
    bottom: vs(8),
    resizeMode: 'contain',
  },

  Nextbtn: {
    backgroundColor: Colors.BlueLinear,
    height: verticalScale(45),
    width: s(50),
    borderRadius: ms(50),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: vs(45),
    right: hs(35),
    // marginTop: vs(712),
  },
  LinearGradient: {
    height: verticalScale(45),
    width: s(50),
    borderRadius: ms(50),
    justifyContent: 'center',
    alignItems: 'center',
  },

  outerline: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: s(5),
    height: verticalScale(45),
    width: s(50),
    borderRadius: ms(50),
    position: 'absolute',
    bottom: vs(45),
    right: hs(35),
    borderColor: 'red',
    borderWidth: 1,
  },
});
