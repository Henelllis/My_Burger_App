import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../Checkout/ConctactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component{
    
    checkoutContinueHandler = () =>{
        this.props.history.replace('/Checkout/Contact-data');
    }

    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinue={this.checkoutContinueHandler}/>
                    <Route path={this.props.match.url + '/Contact-data'}
                            component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    };
}


export default connect(mapStateToProps)(Checkout);