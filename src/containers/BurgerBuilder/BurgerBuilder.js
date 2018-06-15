import React,{ Component } from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat:1.3
}

class BurgerBuilder extends Component{

    state ={
        ingredients:null ,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading:false,
        error: null,
    }

    componentDidMount(){
        console.log(this.props)
        axiosInstance.get('https://react-my-burger-6433e.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        } )
        .catch(error =>{ this.setState({error: true})});
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

    purchaseConfirmHandler = () =>{

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        
        queryParams.push('price=' + encodeURIComponent(this.state.totalPrice));
        let queryString = queryParams.join('&');

        this.props.history.push(
                {pathname: '/Checkout',
                search:(queryString)});
    }

    render(){

        const disableInfo = {
            ...this.state.ingredients
        };

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;
        

        let burger = this.state.error ? <p> Ingredients cant be loaded</p> : <Spinner />

        if(this.state.ingredients){
            burger = (
                <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}/>
                </Aux>);
                orderSummary = 
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder ,axiosInstance);