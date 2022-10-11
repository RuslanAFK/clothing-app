import { persistStore } from 'redux-persist';
import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import { rootSaga } from './root-saga';
import { persistedReducer } from './root.reducer';


const sagaMiddleware = createSagaMiddleware();

const middleWares = [
    process.env.NODE_ENV !== 'production' && logger,
    sagaMiddleware
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composeEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);