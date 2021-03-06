import React,{Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import BurgerBuillder from './containers/BurgerBuilder/BurgerBuillder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

 class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render(){
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/" exact component={BurgerBuillder}></Route>
        <Redirect to='/'></Redirect>
      </Switch>      
    );
    
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
        <Route path="/checkout" component={Checkout}></Route>
        <Route path="/orders" component={Orders}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/" exact component={BurgerBuillder}></Route>
        <Redirect to='/'></Redirect>
        </Switch>
      );
    }
    return (
     <Layout>
       
       {/* <BurgerBuillder/> */}
       {/* <Checkout/> */}
       {routes}
     </Layout>
    
  );}
}
const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignup : () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
