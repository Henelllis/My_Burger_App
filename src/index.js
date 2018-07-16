import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider,  } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleWare from 'redux-saga';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import { logoutSaga } from './store/sagas/auth';


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose 
const reducers = combineReducers({
    burger:  burgerBuilderReducer,
    order : orderReducer,
    auth: authReducer
    });

const sagaMiddleWare = createSagaMiddleWare();

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk, sagaMiddleWare)) );

ReactDOM.render( <Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>
                , document.getElementById('root'));

registerServiceWorker();
