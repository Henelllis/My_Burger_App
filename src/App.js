import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';

import * as actions from './store/actions/index';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render() {

    let routes = (
      <Switch>
        <Route path='/Auth'      component={Auth}/>
        <Route path='/'   component={BurgerBuilder}/>
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuthenticated){
      routes = (      
      <Switch>
        <Route path='/Checkout'   component={Checkout}/>
        <Route path='/Orders'     component={Orders}/>  
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
