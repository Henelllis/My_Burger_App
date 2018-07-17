import { takeEvery} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

export function* watchAuth(action) {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery( actionTypes.AUTH_USER, authUserSaga);
    
}

export function* watchBurger(action){
    yield takeEvery( actionTypes.INGREDIENTS_INIT, initIngredientsSaga);
}

export function* watchOrder(action){
    yield takeEvery( actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerSaga);
    yield takeEvery ( actionTypes.FETCH_ORDER_INIT, fetchOrdersSaga );
}