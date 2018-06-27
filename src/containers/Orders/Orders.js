import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axiosInstance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{
    

    componentDidMount(){
        this.props.onOrderFetch();
    }

    render(){
        console.log('[ORDER]',this.props.orders)
        let orderSummary = <Spinner/>

        if(!this.props.loading){
            orderSummary = ( <div>
                {this.props.orders.map( order => 
                    <Order key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    />
                )}
            </div>)
        }
        return(
            <div>
            {orderSummary}
            </div>
        );
    };

};

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderFetch : () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps,mapDispatchToProps )(withErrorHandler(Orders, axiosInstance));