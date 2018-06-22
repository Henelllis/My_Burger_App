import React,{ Component } from 'react';
import {connect } from 'react-redux';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component{

    state ={
        purchasing: false,
        loading:false,
        error: null,
    }

    componentDidMount(){
        console.log(this.props)
        // axiosInstance.get('https://react-my-burger-6433e.firebaseio.com/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data});
        // } )
        // .catch(error =>{ this.setState({error: true})});
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
        

        let burger = this.state.error ? <p> Ingredients cant be loaded</p> : <Spinner />

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
        if(this.state.loading){
            orderSummary = <Spinner/>;
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
        ings: state.ingredients,
        ttlprc: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingredient) => dispatch({
                        type:actionTypes.ADD_INGREDIENT,
                        payload:{ingredientName:ingredient}}),        
        onIngredientRemoved: (ingredient) => dispatch({
                            type:actionTypes.REMOVE_INGREDIENT,
                            payload:{ingredientName:ingredient}})
    }

}



export default connect(mapStateToProps ,mapDispatchToProps )(withErrorHandler(BurgerBuilder ,axiosInstance));