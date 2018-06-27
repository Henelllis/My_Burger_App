import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-orders';
import order from '../../components/Order/Order';

export const purchaseBurgerSucess = (id, orderData) =>{
    return{
        type:actionTypes.PURCHASED_BURGER_SUCCESS,
        payload:{
            orderId:id,
            orderData:orderData
        }
    }
}

export const purchaseBurgerFail = (error) => {
    return{
        type:actionTypes.PURCHASED_BURGER_FAIL,
        payload:{
            error:error
        }
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        console.log(orderData)
        axiosInstance.post('/orders.json', orderData)
        .then(response => {
            dispatch(purchaseBurgerSucess(response.data.name, orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error));
        });
    }
}