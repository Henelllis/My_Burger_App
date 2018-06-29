import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" > BurgerBuilder</NavigationItem>
        <NavigationItem link="/Orders"> Orders </NavigationItem>
        <NavigationItem link="/Auth"> Authenticate </NavigationItem>
    </ul>
);

export default navigationItems;