import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axiosInstance from '../../axios-orders';

export function* purchaseBurgerSaga(action){
    try{
        yield put(actions.purchaseBurgerStart());
        const response = yield axiosInstance.post('/orders.json?auth=' + action.payload.token, action.payload.orderData)
        yield put (actions.purchaseBurgerSucess(response.data.name, action.payload.orderData));
    }
    catch(error){
        yield put (actions.purchaseBurgerFail())
    }
 
}

export function* fetchOrdersSaga(action){
    try{
        const response = yield axiosInstance.get('/orders.json?auth=' + action.payload.token +'&orderBy="userId"&equalTo="' + action.payload.userId + '"')
        const fetchOrders = [];
        for( let key in response.data){
            fetchOrders.push({
                ...response.data[key],
                id: key
            });
        }
        yield put  (actions.fetchOrderSuccess(fetchOrders));
    }
    catch(error){
        yield put (actions.fetchOrderFail(error));
    }
}