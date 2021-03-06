import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Layout.module.css';

import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';
class Layout extends Component{
    state = {
        showSideDrawer: false,
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return{showSideDrawer:  !this.state.showSideDrawer};
        });
    }
    render(){
        return(
            <Aux>
            {/* <div> Toolbar, SideDrawer, Backdrop</div> */}
            <Toolbar 
            isAuth={this.props.isAuthenticated}
            drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <Sidedrawer 
            isAuth={this.props.isAuthenticated}
            closed={this.sideDrawerClosedHandler}
            open={this.state.showSideDrawer}/>
            <main className={styles.Content}>
                {this.props.children}
            </main>
        </Aux>
    
        );
    }
} 
const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.auth.token !== null,
    };
}
export default connect(mapStateToProps)(Layout);