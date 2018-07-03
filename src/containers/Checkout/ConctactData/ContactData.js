import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosInstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as orderAction from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../../shared/utility';


class ContactData extends Component {
    
    state = {
        orderForm:{
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid:false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required: true
                },
                valid:false,
                touched:false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 4,
                    maxLength:4
                },
                valid:false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation:{
                    required: true
                },
                valid:false,
                touched:false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest' },
                        {value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: 'fastest',
                valid: true
            },
        },
        formIsValid: false,
        
    }


    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.ttlprc,
            order: formData,
            userId : this.props.userId
        }

        this.props.onOrderBurger(order,this.props.token);

    }

    inputChangedHandler = (event, inputIdentifier) => {


        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true,
        });

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        }) 

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm:updatedOrderForm , formIsValid:formIsValid});

    }

    render(){

        const formElementsArray = [];

        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button buttonType="Success" disabled={!this.state.formIsValid}> ORDER </Button>
            </form>
        );


        if(this.props.loading){
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

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        ttlprc: state.burger.totalPrice,
        loading: state.order.loading,
        token : state.auth.token,
        userId: state.auth.userid
    };
}

const mapDispatchToProps = dispatch =>{
    return {
        onOrderBurger: (orderData, token) => dispatch(orderAction.purchaseBurger(orderData, token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosInstance));