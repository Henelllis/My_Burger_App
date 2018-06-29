import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const intialState={
    token:null,
    userid:null,
    error:null,
    loading:false
}

const authStart = (state, action) => {
    return updateObject(state, {error:null,loading:true })

}

const authSuccess = (state, action) => {
    return updateObject(state, {token:action.payload.authData.idToken,
                                userid:action.payload.authData.localId,
                                error:null,
                                loading:false 
                            })
};

const authFail = (state, action) => {
    return updateObject(state, {
        error:action.payload.error,
        loading:false 
    })
} 

const reducer = (state=intialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:  return authFail(state, action);
        default: return state; 
    }
}

export default reducer;