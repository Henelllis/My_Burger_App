import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
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
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/Checkout'   component={Checkout}/>
            <Route path='/Orders'     component={Orders}/>
            <Route path='/Auth'      component={Auth}/>
            <Route path='/Logout'      component={Logout}/>
            <Route path='/'   component={BurgerBuilder}/>
         </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null,mapDispatchToProps)(App));
