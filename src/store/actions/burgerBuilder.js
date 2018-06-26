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
    return dispatch => {
        axiosInstance.get('https://react-my-burger-6433e.firebaseio.com/ingredients.json')
        .then(response => {
            console.log('INSIDE DISTPATCH CONNECT PORTAL',response.data)
            dispatch(setIngredients(response.data))
        } )
        .catch(error =>{ 
            console.log('SHIEEEEEEEEEEEEEET')
            dispatch(fetchIngredientsFailed())
        });
    };
};