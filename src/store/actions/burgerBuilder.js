import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-orders';

export const addIngredient = (name) => {
    return{
        type:actionTypes.ADD_INGREDIENT,
        payload:{ingredientName:name}
    }
};

export const removeIngredient = (name) => {
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        payload:{ingredientName:name}
    }
};

export const setIngredients = (ingredients) =>{
    return{
        type:actionTypes.SET_INGREDIENTS,
        payload:{ingredients:ingredients}
    };
};

export const fetchIngredientsFailed = () =>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    };
};
   
export const initIngredients = () => {
    return {
        type:actionTypes.INGREDIENTS_INIT
    };
};