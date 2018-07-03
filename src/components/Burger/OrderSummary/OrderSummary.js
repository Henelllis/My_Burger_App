import React, {Component} from 'react';
import Aux from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    //this could be a functional component, doesnt have to be a class


    render(){

        const ingredientSummary = Object.keys(this.props.ingredients)
            .map( igKey => {
                return (<li key={igKey}>
                    <span style ={{textTransform:'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}
                    </li>);
            });

        return(
            <Aux>
                <h3> Your Order</h3>
                <p>A delicious Burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)} </strong></p>
                <p> Continue to Checkout??</p>
                <Button buttonType='Danger'  clicked={this.props.purchaseCancel}>CANCEL</Button>
                {/* <Link to="/Checkout" > */}
                    <Button buttonType='Success' clicked={this.props.purchaseConfirm }>CONFIRM</Button>
                    {/* </Link> */}
            </Aux>
        );
    }
};

export default OrderSummary;