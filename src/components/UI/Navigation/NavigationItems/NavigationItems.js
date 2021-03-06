import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" > BurgerBuilder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/Orders"> Orders </NavigationItem> : null}
        {!props.isAuthenticated 
            ? <NavigationItem link="/Auth"> Authenticate </NavigationItem>
            : <NavigationItem link="/Logout"> Logout </NavigationItem>
        }
    </ul>
);

export default navigationItems;