import { delay }from 'redux-saga';
import {  put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga ( action ) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
};

export function* checkAuthTimeoutSaga ( action ){
    console.log('[ LOGOUT TIME ] ' + action.payload.expTime)
    yield delay(action.payload.expTime * 1000);
    yield put(actions.logout());
};

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email:action.payload.email,
        password:action.payload.password,
        returnSecureToken:true
    }
    let url =  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBMfEes1aXTOr5JAklTKAGz8Xa4PDvwl6Y';
    if(!action.payload.isSignUp){
        url =  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBMfEes1aXTOr5JAklTKAGz8Xa4PDvwl6Y';
    }
    try{
        const response = yield axios.post( url,authData)
        console.log('[RESPONSE] : ' + response.data.expiresIn);
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate );
        yield localStorage.setItem('userId', response.data.localId );
        yield put (actions.authSuccess(response.data.idToken,response.data.localId));
        yield put (actions.checkAuthTimeout(response.data.expiresIn));
   }catch(error){
        yield put (actions.authFail(error.response.data.error));
    }
}
