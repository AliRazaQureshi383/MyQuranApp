import React, { useEffect } from 'react';
import {View, StyleSheet, Image, TouchableOpacity, SafeAreaView, AsyncStorage} from 'react-native';
import LanguageView from './search_views/language.view'
import TranslateView from './search_views/translate.view'
import {LanguageProvider} from '../contexts/language.context'
import Logout from '../assets/images/navigation/logout.png'
import Favorited from '../assets/images/navigation/favorited.png'
import auth from '@react-native-firebase/auth';
import {     
  accountCreated,
  loggedIn,
  otherErrors,
} from '../consts/messages'

const Search = ({ route, navigation }) => {

  console.log('-------->',route);
  
  const logout = () => {
    auth()
    .signOut()
    .then(() => navigation.push('Login', {showPopUp: "LOGOUT"}))
    .catch(otherErrors());
  }

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity style={styles.optionsButton} onPress={() => navigation.push('Favorited')}>
        <Image source={ Favorited } style={styles.icon}/>
      </TouchableOpacity>
    ),
    // headerLeft: () => (
    //   <TouchableOpacity style={styles.optionsButton} onPress={logout}>
    //     <Image source={ Logout } style={styles.icon}/>
    //   </TouchableOpacity>
    // )
  })

  useEffect(() => {
    if(route.params?.showPopUp === "CREATED"){
        accountCreated();
    }
    if(route.params?.showPopUp === "LOGIN"){
        loggedIn();
    }
}, [route.params]);

  return (
    <LanguageProvider>
      <SafeAreaView style={styles.container}>
        {/* <LanguageView /> */}
        <TranslateView  route = {route}/>
      </SafeAreaView>
    </LanguageProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    paddingTop: 70,
    backgroundColor: 'white',
  },
  optionsButton: {
    padding: 16,
  },
  icon: {
    width: 24,
    height: 24,
  }

});

export default Search;
