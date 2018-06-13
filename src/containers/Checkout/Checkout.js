import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{
    
    state= {
        ingredients:{
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
        }
    }

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
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinue={this.checkoutContinueHandler}/>
            </div>
        );
    }
}

export default Checkout;