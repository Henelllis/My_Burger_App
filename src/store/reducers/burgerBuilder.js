import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

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
    building:false
};

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient );
    const updatedState = {
        ingredients:updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName],
        building: true
    };
    return updateObject(state,updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIngredient = {[action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient );
    const updatedState = {
        ingredients:updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName],
        building: true
    };
    return updateObject(state,updatedState);
};

const setIngredients = (state,action) => {
    return updateObject(state, {
        ingredients : action.payload.ingredients,
        error:false,
        totalPrice:4.00,
        building: false
    });
}

const reducer = (state = intialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state,action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state,action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error:true});
        default:
                return state;
    }
};

export default reducer;