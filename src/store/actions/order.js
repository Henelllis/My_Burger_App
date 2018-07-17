import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-orders';

export const purchaseBurgerSucess = (id, orderData) =>{
    return{
        type:actionTypes.PURCHASED_BURGER_SUCCESS,
        payload:{
            orderId:id,
            orderData:orderData
        }
    };
};

export const purchaseBurgerFail = (error) => {
    return{
        type:actionTypes.PURCHASED_BURGER_FAIL,
        payload:{
            error:error
        }
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData, token) => {
    return {
        type:actionTypes.PURCHASE_BURGER_INIT,
        payload: {
            orderData,
            token
        }
    };

};

export const purchasedInit = () => {
    return {
        type:actionTypes.PURCHASED_INIT
    };
};

export const fetchOrderSuccess = (orders) => {
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        payload:{orders: orders}
    };
};

export const fetchOrderFail = (error) => {
    return{
        type:actionTypes.FETCH_ORDER_FAIL,
        payload:{error: error}
    };
};

export const fetchOrderStart = () => {
    return{
        type:actionTypes.FETCH_ORDER_START,
    };
};

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDER_INIT,
        payload: {
            token,
            userId
        }
    }
}
