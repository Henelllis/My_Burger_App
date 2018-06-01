import React,{ Component } from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat:1.3
}

class BurgerBuilder extends Component{

    // constructor(props){
    //     super(props);
    //     this.state = {...};
    // }
    
    state ={
        ingredients:{
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat:0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    }

    updatePurchasable(ingredients){


        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce( (sum, el) => {
                return sum + el;
            },0);

        this.setState({purchasable : sum > 0 })
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount =  oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const priceAddition =  INGREDIENT_PRICES[type];
        const newPrice = oldPrice + priceAddition
        this.setState({ingredients:updatedIngredients, totalPrice:newPrice})
        this.updatePurchasable(updatedIngredients);

    }

    removeIngredientHandler = (type) =>{
        if(this.state.ingredients[type] > 0){
            const oldCount = this.state.ingredients[type];
            const updatedCount =  oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const oldPrice = this.state.totalPrice;
            const priceRemoval = INGREDIENT_PRICES[type];
            const newPrice = oldPrice - priceRemoval;
            this.setState({ingredients:updatedIngredients, totalPrice:newPrice})
            this.updatePurchasable(updatedIngredients);
        }
    }

    purchaseHandler = () => {
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing: false});
    }

    render(){

        const disableInfo = {
            ...this.state.ingredients
        };

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}/>
            </Aux>
        );
    };
}

export default BurgerBuilder;