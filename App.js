import React, { useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Signup from './Screens/Signup/Signup';
import Signin from './Screens/Signin/Signin';
import ToDoList from './Screens/ToDoList/ToDoList';

export default function App() {

  const [fontsLoaded] = useFonts({
    "Lexend-Light": require('./assets/fonts/Lexend-Light.ttf'),
    "Lexend-Regular": require('./assets/fonts/Lexend-Regular.ttf'),
    "Lexend-Bold": require('./assets/fonts/Lexend-Bold.ttf'),
  });
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }


  return (
    <View style={styles.appContainer} onLayout={onLayoutRootView}>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle="dark" />
        <ToDoList></ToDoList>
      {/* <Signin /> */}
      {/* <Signup /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
