import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axiosInstance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{
    

    componentDidMount(){
        this.props.onOrderFetch(this.props.token, this.props.userId);
    }

    render(){
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
        loading: state.order.loading,
        token : state.auth.token,
        userId: state.auth.userid
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderFetch : (token , userId) => dispatch(actions.fetchOrders(token , userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps )(withErrorHandler(Orders, axiosInstance));