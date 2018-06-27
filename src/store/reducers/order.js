import * as actionTypes from '../actions/actionTypes';

const intialState = {
    orders: [],
    loading: false
};

 const reducer = (state = intialState, action) =>{

    switch(action.type){
        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading:true
            }
        case actionTypes.PURCHASED_BURGER_SUCCESS:

            const newOrder = { 
                ...action.payload.orderData,
                id: action.payload.orderId.name
            };

            console.log('[NEW ORDER] ', newOrder)
            return {
                ...state,
                loading:false,
                orders : state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASED_BURGER_FAIL:
            return{
                ...state,
                loading:false
            };
        default:
            return state
    }

}

export default reducer;