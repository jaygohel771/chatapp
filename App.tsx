import { StyleSheet } from 'react-native';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <SafeAreaView style={styles.main}>
      <AppNavigator />
      <Toast />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
