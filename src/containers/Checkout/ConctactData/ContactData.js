import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosInstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    
    state = {
        orderForm:{
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest' },
                        {value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: ''
            },
        },
        loading:false,
    }

    orderHandler = (event) => {
        console.log('shaking feeling the price is not there' + this.props.price);
        event.preventDefault();
        this.setState( {loading: true} );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        }

        axiosInstance.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render(){
        let form = (
            <form>
                <Input  elementType="..." elementConfig="..." value="..."/>
                <Input inputtype="input" type="email" name="email" placeholder="Your Email" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" name="zip" placeholder="Zip Code" />
                <Button buttonType="Success" clicked={this.orderHandler}> ORDER </Button>
            </form>
        );


        if(this.state.loading){
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}> 
                <h4> Enter you contact Data </h4>
                {form}
            </div>
        );
    }

}

export default ContactData;