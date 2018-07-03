import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const intialState = {
    orders: [],
    loading: false,
    purchased : false,
};

 const reducer = (state = intialState, action) =>{

    switch(action.type){
        case actionTypes.PURCHASED_INIT:
            return  updateObject(state, {purchased:false});
        case actionTypes.PURCHASE_BURGER_START:
            return  updateObject(state, {loading:true});
        case actionTypes.PURCHASED_BURGER_SUCCESS:
            const newOrder = updateObject(action.payload.orderData, { id: action.payload.orderId.name} );
            return updateObject(state , { loading:false,
                                            purchased:true,
                                            orders : state.orders.concat(newOrder)
                                        });
        case actionTypes.PURCHASED_BURGER_FAIL:
            return  updateObject(state, {loading:false})
        case actionTypes.FETCH_ORDER_START:
            return  updateObject(state, {loading:true});
        case actionTypes.FETCH_ORDER_SUCCESS:
        return  updateObject(state, { 
                                        orders: action.payload.orders,
                                        loading:false
                                    });
        case actionTypes.FETCH_ORDER_FAIL:
            return  updateObject(state, {loading:false})
        default:
            return state
    }

}

export default reducer;