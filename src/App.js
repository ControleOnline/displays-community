import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routers';
import AsyncStorage from '@react-native-async-storage/async-storage';
window.localStorage = AsyncStorage;
import {api} from "@controleonline/quasar-common-ui/src/api";
window.api = api;



export default function App() {
  return (
      <NavigationContainer>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'#1B5587'}
        /> 
        <Routes />
      </NavigationContainer>
  );
}