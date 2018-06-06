import React ,{Component} from 'react';
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
                <ToolBar drawerToggleClicked={this.sideDrawerToggleHander}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHander}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
              </Aux >
        );
    }
};

export default Layout;