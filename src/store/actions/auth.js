import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    };
} ;

export const authSuccess = (tokenId, userId) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        payload:{
            token:tokenId,
            userId:userId
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
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
};

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expTime) => {
    console.log('[EXP TIME]' + expTime)
    return {
        type:actionTypes.AUTH_CHECK_TIMEOUT,
        payload:{
            expTime: expTime
        }
    };
};

export const auth = (email,password, isSignUp) => {
    return {
        type: actionTypes.AUTH_USER,
        payload:{
            email,
            password,
            isSignUp
        }
    }
} ;

export const setAuthRedirectPath = (path) => {
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        payload:{path}
    }
};

export const authCheckState = () =>{
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()){
                dispatch(logout()); 
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                console.log('DO I GET HIT IN AUTH CHECK STATE');
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            } 
        }   
    };
}