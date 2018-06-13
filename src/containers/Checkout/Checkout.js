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
    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        console.log('QUERIES ' + query);
        const ingredients = {};
        for (let param of query.entries()){
            // ['salad', '1']
            console.log('as' + param[0]  , +param[1]);
            ingredients[param[0]] = +param[1];
        }
        console.log('WHAT DIS LOOK LIKE  ' + ingredients);
        this.setState({ingredients: ingredients});
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