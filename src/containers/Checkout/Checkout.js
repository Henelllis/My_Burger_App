import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../Checkout/ConctactData/ContactData';
class Checkout extends Component{
    
    state= {
        ingredients:null,
        totalPrice: 0,
    }
    componentWillMount(){

        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;

        for (let param of query.entries()){
            // ['salad', '1']
            if(param[0] === 'price'){
                price = param[1];
            }
            else{
                ingredients[param[0]] = +param[1];
            }
            
        }
        this.setState({ingredients: ingredients, totalPrice : price});
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
                    <Route path={this.props.match.url + '/Contact-data'}  render={ (props) => (<ContactData 
                                                                                                ingredients={this.state.ingredients} 
                                                                                                price={this.state.totalPrice}
                                                                                                {...props}/>
                                                                                          )}/>
            </div>
        );
    }
}

export default Checkout;