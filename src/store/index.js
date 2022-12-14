import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './ducks';
import sagas from './sagas';
import createSagaMiddleware from '@redux-saga/core';

const middlewares = [thunk];

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({sagaMonitor});

middlewares.push(sagaMiddleware);

const composer = __DEV__
  ? compose(applyMiddleware(...middlewares), console.tron.createEnhancer())
  : compose(applyMiddleware(...middlewares));

const store = createStore(reducers, composer);

sagaMiddleware.run(sagas);

export default store;
