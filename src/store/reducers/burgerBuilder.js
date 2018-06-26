import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat:1.3
}

const intialState = {
    ingredients:null,
    totalPrice: 4,
    error: false,
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
        case actionTypes.SET_INGREDIENTS:
            console.log('Inside SET INGREDIENT REDUCER');
            return{
                ...state,
                ingredients : action.payload.ingredients,
                error:false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error:true
            }
        default:
                return state;
    }
};

export default reducer;