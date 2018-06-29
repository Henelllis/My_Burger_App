import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    };
} ;

export const authSuccess = (authData) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        payload:{
            authData
        }
    };
};


export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        payload:{
            error
        }
    };
};

export const auth = (email,password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        console.log('[AUTHDATA]',authData)
        axios.post('',authData)
        .then( response => {
            console.log('[SUCCESS]',response);
            dispatch(authSuccess(response.data));
        })
        .catch(error => {
            console.log('[FAILED]', error);
            dispatch(authFail(error));
        });
    };
} ;