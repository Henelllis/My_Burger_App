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

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expTime) => {
    return dispatch =>{
        setTimeout( () => {
            dispatch(logout());
        }, expTime * 1000);
    }
}

export const auth = (email,password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        console.log('[AUTHDATA]',authData)
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBMfEes1aXTOr5JAklTKAGz8Xa4PDvwl6Y';
        if(!isSignUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBMfEes1aXTOr5JAklTKAGz8Xa4PDvwl6Y';
        }
        axios.post( url,authData)
        .then( response => {
            console.log('[SUCCESS]',response);
            dispatch(authSuccess(response.data));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(error => {
            console.log('[FAILED]', error);
            dispatch(authFail(error.response.data.error));
        });
    };
} ;

export const setAuthRedirectPath = (path) => {
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        payload:{path}
    }
};