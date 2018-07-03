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
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axiosInstance.post('/orders.json?auth=' + token, orderData)
        .then(response => {
            dispatch(purchaseBurgerSucess(response.data.name, orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error));
        });
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
    return dispatch => {
        axiosInstance.get('/orders.json?auth=' + token +'&orderBy="userId"&equalTo="' + userId + '"')
        .then( res =>{
            const fetchOrders = [];
            for( let key in res.data){
                fetchOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
           dispatch(fetchOrderSuccess(fetchOrders));
        })
        .catch(err => {
            dispatch(fetchOrderFail(err));
        });
    }
}
