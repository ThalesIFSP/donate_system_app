import Reactotron, {networking} from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';

if (__DEV__) {
  const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({
      host: Platform.OS === 'android' ? '10.0.2.2' : 'localhost',
      name: 'DONATESYSTEM',
    })
    .useReactNative({storybook: true})
    .use(networking({ignoreUrls: /\/(generate_204|symbolicate)$/}))
    .use(reactotronRedux())
    .use(sagaPlugin())
    .connect();

  console.tron = tron;
  tron.clear();
}

export default Reactotron;
