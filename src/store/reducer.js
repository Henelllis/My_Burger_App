import * as actionTypes from './actions';

const intialState = {
    ingredients:null ,
    totalPrice: 4,
};

const reducer = (state = intialState, action) => {
    switch(action.type){
        case ADD_INGREDIENT:
                return state;
        case REMOVE_INGREDIENT:
                return state;
        default:
                return state;
    }
};

export default reducer;