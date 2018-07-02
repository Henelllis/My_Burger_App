import React ,{Component} from 'react';
import {connect } from 'react-redux';
import classes from './Layout.css'
import Aux from '../../hoc/Auxillary';
import ToolBar from '../UI/Navigation/ToolBar/ToolBar';
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {

    state ={
        showSideDrawer:true,
    }

    sideDrawerClosedHander = () =>{
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHander = () =>{
         
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }
    
    render(){
        return(
            <Aux >
                <ToolBar 
                drawerToggleClicked={this.sideDrawerToggleHander} 
                isAuthenticated={this.props.isAuthenticated}/>
                <SideDrawer 
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHander} 
                isAuthenticated={this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
              </Aux >
        );
    }
};

const mapStateToProps = (state) =>{
    return {
        isAuthenticated:state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);