import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { vs } from 'react-native-size-matters';
import { img } from '../../constant/Img';
import { createChatId, hs, ms } from '../../constant/Helper';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts } from '../../constant/Fonts';
import InputBox from '../../comopnent/common/InputBox';
import { useNavigation, useRoute } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import firestore from '@react-native-firebase/firestore';
import RNFS from 'react-native-fs';
import Modal from '../../constant/Modal';
import ModalBox from '../../constant/ModalBox';

type ChatScreenprops = NativeStackNavigationProp<
  RootStackParamList,
  'ChatScreen'
>;

const ChatScreen = () => {
  const [message, setMessage] = useState([]);
  const [writemsg, setwritemsg] = useState('');

  const nav = useNavigation<ChatScreenprops>();
  const route = useRoute();
  const { otherUserEmail, otherUserId, otherUserName, currentUserId } =
    route?.params;

  const chatId = createChatId(currentUserId, otherUserId);

  useEffect(() => {
    const checkChat = async () => {
      const chatdoc = firestore().collection('chats').doc(chatId);
      const chatdata = await chatdoc.get();
      if (!chatdata.exists()) {
        await chatdoc.set({
          users: [currentUserId, otherUserId],
          createdAt: Date.now(),
        });
      }
    };
    checkChat();
  }, [chatId, currentUserId, otherUserId]);

  useEffect(() => {
    const messagesRef = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'asc');

    const unsubscribe = messagesRef.onSnapshot(snapshot => {
      const allMsg = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessage(allMsg);
    });

    return () => unsubscribe();
  }, [chatId]);

  const ItemSeprater = () => {
    return <View style={styles.itemseprater} />;
  };

  const sendMessage = async () => {
    if (!writemsg.trim()) return;
    await firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        text: writemsg,
        senderId: currentUserId,
        receiverId: otherUserId,
        createdAt: Date.now(),
        image: '',
      });
    setwritemsg('');
  };

  const renderItem = (item: { id?: number; msg: any; type: any }) => {
    return (
      <LinearGradient
        colors={['#5B8BCD', '#4CBABB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.messageBox,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            alignSelf:
              item.senderId === currentUserId ? 'flex-end' : 'flex-start',
            borderBottomRightRadius: item.senderId === otherUserId ? 0 : ms(25),
            borderBottomLeftRadius:
              item.senderId === currentUserId ? 0 : ms(25),
          },
        ]}
      >
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={[
              styles.chatsimage,
              {
                alignSelf:
                  item.id === currentUserId ? 'flex-end' : 'flex-start',
              },
            ]}
          />
        ) : (
          ''
        )}
        <Text style={styles.txtmsg}> {item.text} </Text>
      </LinearGradient>
    );
  };

  const openPickerOptions = () => {
    console.log('ehhh open pic');
    Alert.alert('Select Option', 'Choose one', [
      {
        text: 'Choose Photo',
        onPress: pickImageFromGallery,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const pickImageFromGallery = () => {
    let options = {
      mediaType: 'photo',
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) return;
      if (response.errorCode) return;

      const uri = response.assets[0].uri;
      uploadImage(uri);
    });
  };

  const uploadImage = async uri => {
    try {
      console.log('ORIGINAL URI:', uri);

      // 1. Copy file to app document folder
      const newPath = `${RNFS.DocumentDirectoryPath}/${Date.now()}.jpg`;
      await RNFS.copyFile(uri, newPath);

      console.log('COPIED PATH:', newPath);

      // 2. Upload the copied file (newPath)
      const filename = newPath.substring(newPath.lastIndexOf('/') + 1);
      const reference = storage().ref(`chatImages/${filename}`);

      await reference.putFile(newPath); // IMPORTANT: upload newPath (NOT uri)

      const imageUrl = await reference.getDownloadURL();
      console.log('URL:', imageUrl);

      sendimage(imageUrl);
    } catch (error) {
      console.log('UPLOAD ERROR:', error);
      Alert.alert('Upload Failed', error.message);
    }
  };

  const sendimage = async (imageUrl: any) => {
    await firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        image: imageUrl,
        senderId: currentUserId,
        receiverId: otherUserId,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  };
  return (
    <View style={styles.main}>
      <LinearGradient
        colors={['#5B8BCD', '#4CBABB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerbox}
      >
        <TouchableOpacity
          onPress={() => {
            nav.goBack();
          }}
        >
          <Image source={img.back} style={styles.Rightimg} />
        </TouchableOpacity>
      </LinearGradient>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <View style={styles.chatscreeen}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={message}
              renderItem={({ item }) => renderItem(item)}
              ItemSeparatorComponent={ItemSeprater}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View style={styles.imgconatiner}>
            <Image style={styles.profilepic} source={img.boy} />
            <Text style={styles.username}>{otherUserName.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.messageView}>
          <View style={styles.sendMessageConatiner}>
            <TouchableOpacity
              style={styles.addImageButton}
              onPress={() => {
                openPickerOptions();
              }}
            >
              <Image source={img.plus} style={styles.plusimg} />
            </TouchableOpacity>
            <InputBox
              placeholderText="Type a message"
              boxstyle={styles.inputmessagebox}
              value={writemsg}
              onChangeText={setwritemsg}
            />
            <TouchableOpacity
              style={styles.addImageButton}
              onPress={() => {
                sendMessage();
              }}
            >
              <LinearGradient
                colors={['#5B8BCD', '#4CBABB']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.addImageButton}
              >
                <Image source={img.send} style={styles.sendimg} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  headerbox: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    paddingVertical: vs(30),
    paddingHorizontal: hs(15),
    backgroundColor: '#5E90CA',
  },
  Rightimg: {
    height: vs(20),
    width: vs(15),
    tintColor: '#FCFCFB',
    resizeMode: 'contain',
  },
  chatscreeen: {
    flex: 1,
    zIndex: 2,
    paddingTop: vs(70),
    paddingHorizontal: ms(10),
    marginTop: vs(60),
    backgroundColor: '#FDFDFD',
    borderTopLeftRadius: ms(25),
    borderTopRightRadius: ms(25),
  },
  imgconatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: vs(-30),
    alignSelf: 'center',
  },
  profilepic: {
    height: vs(65),
    width: hs(65),
    resizeMode: 'contain',
  },
  username: {
    fontFamily: Fonts.bold,
    fontSize: ms(12),
  },
  messageView: {
    // shadowOffset:
    // ,
    shadowColor: 'black',
    elevation: ms(15),
    paddingTop: vs(5),
    paddingHorizontal: hs(10),
    paddingBottom: vs(10),
    backgroundColor: '#FDFFFE',
  },
  sendMessageConatiner: {
    flexDirection: 'row',
    borderColor: 'blue',
    // borderWidth: 1,
    alignItems: 'center',
    gap: hs(8),
    marginBottom: vs(10),
  },
  plusimg: {
    height: vs(15),
    width: hs(20),
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  addImageButton: {
    height: vs(34),
    width: vs(34),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(50),
    backgroundColor: '#ECEBF0',
  },
  inputmessagebox: {
    backgroundColor: '#EBEAEE',
    flex: 1,
    height: vs(35),
    borderRadius: ms(50),
    paddingLeft: 0,
  },
  sendimg: {
    height: vs(15),
    width: hs(20),
    alignSelf: 'center',
    resizeMode: 'cover',
    tintColor: 'white',
  },
  messageBox: {
    alignSelf: 'flex-end',
    padding: vs(10),
    borderTopEndRadius: ms(10),
    borderTopLeftRadius: ms(25),
    borderTopRightRadius: ms(20),
  },
  chatsimage: {
    height: vs(150),
    width: hs(130),
    borderRadius: ms(12),
  },
  txtmsg: {
    fontSize: ms(16),
    lineHeight: vs(20),
    fontFamily: Fonts.interRegular,
    color: 'white',
  },
  itemseprater: {
    height: vs(15),
  },
});
