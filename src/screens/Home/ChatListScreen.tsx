import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { createChatId, hs, ms, vs } from '../../constant/Helper';
import { Fonts } from '../../constant/Fonts';
import { img } from '../../constant/Img';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

import auth, { signOut } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ModalBox from '../../constant/ModalBox';

type ChatListScreenprops = NativeStackNavigationProp<
  RootStackParamList,
  'ChatListScreen'
>;

const ChatListScreen = () => {
  const [usersList, setUsersList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const nav = useNavigation<ChatListScreenprops>();

  useFocusEffect(
    useCallback(() => {
      const fetchUsers = async () => {
        try {
          const currentUser = auth().currentUser;
          if (!currentUser) {
            console.log('User not logged in');
            return;
          }

          // Fetch all users
          const snapshot = await firestore().collection('users').get();

          const allUsers = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Remove logged-in user
          const filtered = allUsers.filter(item => item.id !== currentUser.uid);

          const usersWithLastMessage = await Promise.all(
            filtered.map(async value => {
              const chatid = createChatId(currentUser.uid, value.id);
              let lastmesage = '';
              try {
                const messageSnap = await firestore()
                  .collection('chats')
                  .doc(chatid)
                  .collection('messages')
                  .orderBy('createdAt', 'desc')
                  .limit(1)
                  .get();

                if (!messageSnap.empty) {
                  const msg = messageSnap.docs[0].data();
                  if (msg.text) lastmesage = msg.text;
                  else if (msg.image) lastmesage = '📷 Image';
                }
              } catch (error) {
                console.log('last message error ', error);
              }
              return {
                ...value,
                lastmesage,
              };
            }),
          );
          console.log('statse', usersWithLastMessage);
          setUsersList(usersWithLastMessage);
        } catch (error) {
          console.log('Error fetching users:', error);
        }
      };

      fetchUsers();

      return () => console.log('close ');
    }, []),
  );

  const renderItem = (item: never) => {
    return (
      <TouchableOpacity
        style={styles.userchatconatiner}
        onPress={() => {
          nav.navigate('ChatScreen', {
            currentUserId: auth().currentUser?.uid,
            otherUserId: item.id, // THIS IS UIDs
            otherUserName: item.name,
            otherUserEmail: item.email,
          });
        }}
      >
        <Image source={img.boy} style={styles.imguser} />
        <View>
          <Text style={styles.usernmaetxt}>{item.name}</Text>
          <Text style={styles.mesaagetxt}>
            {item.lastmesage || 'No message yet'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const LogOut = async () => {
    try {
      await auth().signOut();
      console.log('log out ');
      nav.replace('LoginScreen');
    } catch (error) {
      console.log('log out error', error);
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.headertxt}>Conversations</Text>
        <TouchableOpacity
          style={styles.logoutbtn}
          onPress={() => [setShowModal(true)]}
        >
          <Image source={img.logoutimg} style={styles.logoutimg} />
        </TouchableOpacity>
        {showModal && (
          <ModalBox
            onpress={() => {
              LogOut();
            }}
            text="Log Out"
            cancelPress={() => setShowModal(false)}
          />
        )}
      </View>
      <View style={styles.chatlistConatiner}>
        <FlatList
          data={usersList}
          keyExtractor={item => item.id}
          // eslint-disable-next-line react/no-unstable-nested-components
          ItemSeparatorComponent={() => <View style={styles.sepraterview} />}
          renderItem={({ item }) => renderItem(item)}
        />
      </View>
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: ' #F7F9FC',
  },
  header: {
    flexDirection: 'row',
    right: 0,
    left: 0,
    height: vs(100),
    alignContent: 'center',
    backgroundColor: '#B7EBDA',
    position: 'absolute',
    justifyContent: 'space-between',
  },
  headertxt: {
    fontSize: ms(20),
    fontFamily: Fonts.semibold,
    textAlign: 'left',
    left: hs(25),
    top: vs(10),
    color: '#000000',
  },
  logoutbtn: { top: vs(10), marginRight: hs(20) },
  logoutimg: {
    height: vs(25),
    width: hs(40),
    // backgroundColor: 'red',
    resizeMode: 'contain',
  },
  chatlistConatiner: {
    flex: 1,
    marginTop: vs(50),
    backgroundColor: '#F7F9FC',
    borderTopLeftRadius: ms(35),
    borderTopRightRadius: ms(35),
    paddingHorizontal: ms(10),
    gap: vs(5),
    paddingVertical: vs(20),
  },
  userchatconatiner: {
    alignSelf: 'stretch',
    backgroundColor: '#BED7F2',
    flexDirection: 'row',
    gap: hs(20),
    paddingVertical: vs(10),
    paddingLeft: hs(30),
    borderRadius: ms(20),
  },
  imguser: {
    height: vs(60),
    width: vs(60),
    borderRadius: ms(50),
  },
  usernmaetxt: {
    fontSize: ms(15),
    fontFamily: Fonts.bold,
    color: 'black',
    lineHeight: vs(25),
  },
  mesaagetxt: {
    fontSize: ms(12),
    color: 'black',
    fontFamily: Fonts.regular,
  },
  sepraterview: {
    height: vs(10),
  },
});
