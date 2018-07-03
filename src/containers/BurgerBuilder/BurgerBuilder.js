import React,{ Component } from 'react';
import {connect } from 'react-redux';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
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
        if(this.props.isAuthenticated){
            this.setState({purchasing:true})
        }else{
            this.props.onSetAuthRedirectPath('/Checkout');
            this.props.history.push('/Auth');
        }
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
        
        let burger = this.props.err ? <p> Ingredients cant be loaded</p> : <Spinner />
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
                    isAuth={this.props.isAuthenticated}
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
        err: state.burger.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingredient) => dispatch(actions.addIngredient(ingredient)),        
        onIngredientRemoved: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchased: () => dispatch(actions.purchasedInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}



export default connect(mapStateToProps ,mapDispatchToProps )(withErrorHandler(BurgerBuilder ,axiosInstance));