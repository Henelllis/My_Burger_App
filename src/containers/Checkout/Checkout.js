import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../Checkout/ConctactData/ContactData';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';

class Checkout extends Component{

    componentDidMount () {
    }
    
    checkoutContinueHandler = () =>{
        this.props.history.replace('/Checkout/Contact-data');
    }

    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }

    render(){
        let summary = <Redirect to="/"/>
        
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null
            summary = ( 
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinue={this.checkoutContinueHandler}/>
                    <Route 
                        path={this.props.match.url + '/Contact-data'}
                        component={ContactData} />
                </div>)
        }
        return(
            <div>
                    {summary}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        purchased: state.order.purchased
    };
}




export default connect(mapStateToProps)(Checkout);