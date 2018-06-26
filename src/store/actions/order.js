import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

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

export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        axiosInstance.post('/orders.json', orderData)
        .then(response => {
            distpatch(purchaseBurgerSucess(response.data, orderData));
        })
        .catch(error => {
            distpatch(purchaseBurgerFail(error));
        });
    }
}