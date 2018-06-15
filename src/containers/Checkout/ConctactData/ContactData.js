import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosInstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {
    
    state = {
        name: '',
        email: '',
        address:{
            street:'',
            ZipCode:''
        },
        loading:false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState( {loading: true} );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name:'Henry',
                address:{
                    street: '29 Plinktetonne ave',
                    zipcode: '1123',
                    country: 'Uninted Emirates supreme'
                },
                email:'HendizzlerInFace@testTESTTESTTES.com'
            },
            deliveryMethod: 'Drone'
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
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="zip" placeholder="Zip Code" />
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