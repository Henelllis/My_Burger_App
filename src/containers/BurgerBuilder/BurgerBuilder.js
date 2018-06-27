import React,{ Component } from 'react';
import {connect } from 'react-redux';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';
import axiosInstance from '../../axios-orders';


class BurgerBuilder extends Component{

    state ={
        purchasing: false,
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchasable(ingredients){


        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce( (sum, el) => {
                return sum + el;
            },0);

        return  sum > 0 
    }



    purchaseHandler = () => {
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing: false});
    }

    purchaseConfirmHandler = () =>{
        this.props.onPurchased();
        this.props.history.push('/Checkout');

    }

    render(){

        const disableInfo = {
            ...this.props.ings
        };

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;
        
        console.log('[BURGER BUILDER] : ' + this.props.err)
        let burger = this.props.err ? <p> Ingredients cant be loaded</p> : <Spinner />
        console.log('[BURGER BUILDER] : ' + this.props.ings);
        if(this.props.ings){
            burger = (
                <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disableInfo}
                    purchasable={this.updatePurchasable(this.props.ings)}
                    ordered={this.purchaseHandler}
                    price={this.props.ttlprc}/>
                </Aux>);
                orderSummary = 
                    <OrderSummary 
                    ingredients={this.props.ings}
                    price={this.props.ttlprc}
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseConfirm={this.purchaseConfirmHandler}/>
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        ttlprc: state.burger.totalPrice,
        err: state.burger.error
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingredient) => dispatch(actions.addIngredient(ingredient)),        
        onIngredientRemoved: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchased: () => dispatch(actions.purchasedInit())
    }
}



export default connect(mapStateToProps ,mapDispatchToProps )(withErrorHandler(BurgerBuilder ,axiosInstance));