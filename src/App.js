import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

import * as actions from './store/actions/index';
import Logout from './containers/Auth/Logout/Logout';

const asynchCheckout = asyncComponent( () => {
  return import('./containers/Checkout/Checkout');
});

const asynchOrders = asyncComponent( () => {
  return import('./containers/Orders/Orders');
});

const asynchAuth = asyncComponent( () => {
  return import('./containers/Auth/Auth');
});

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render() {

    let routes = (
      <Switch>
        <Route path='/Auth'      component={asynchAuth}/>
        <Route path='/'   component={BurgerBuilder}/>
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuthenticated){
      routes = (      
      <Switch>
        <Route path='/Checkout'   component={asynchCheckout}/>
        <Route path='/Orders'     component={asynchOrders}/>  
        <Route path='/Auth'      component={asynchAuth}/>
        <Route path='/Logout'      component={Logout}/>
        <Route path='/'   component={BurgerBuilder}/>
        <Redirect to='/' />
      </Switch>);
    }
    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated:state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
