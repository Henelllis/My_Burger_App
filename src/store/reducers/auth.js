import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const intialState={
    token:null,
    userid:null,
    error:null,
    loading:false,
    authRedirectPath:'/',
}

const authStart = (state, action) => {
    return updateObject(state, {error:null,loading:true });

}

const authSuccess = (state, action) => {
    return updateObject(state, {token:action.payload.token,
                                userid:action.payload.userId,
                                error:null,
                                loading:false 
                            });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error:action.payload.error,
        loading:false 
    });
} 

const authLogout = (state,action) => {
    return updateObject(state, {
        token:null,
        userid: null
    });
}

const setAuthPathRedirect= (state ,action) =>{
    return updateObject(state, {authRedirectPath: action.payload.path})
}

const reducer = (state=intialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:  return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthPathRedirect(state, action);
        default: return state; 
    }
}

export default reducer;