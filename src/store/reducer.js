import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat:1.3
}

const intialState = {
    ingredients:{
        salad:0,
        bacon:0,
        meat:0,
        cheese:0
    } ,
    totalPrice: 4,
};

const reducer = (state = intialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
                return {
                    ...state,
                   ingredients:{ //deep cloning
                        ...state.ingredients,
                        [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
                   },
                   totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName]
                };
        case actionTypes.REMOVE_INGREDIENT:
                return {
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1
                    },
                    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName]
                };
        default:
                return state;
    }
};

export default reducer;