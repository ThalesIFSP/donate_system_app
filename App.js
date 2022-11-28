import './src/config/ReactotronConfig';

import React from 'react';

import {SafeAreaView} from 'react-native';

import {Provider} from 'react-redux';
import {Routes} from './src/routes';
import store from './src/store';
import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
