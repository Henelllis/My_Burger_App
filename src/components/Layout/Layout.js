import React from 'react';
import classes from './Layout.css'
import Aux from '../../hoc/Auxillary';
import ToolBar from '../UI/Navigation/ToolBar/ToolBar'

const layout = ( props ) => (
    <Aux >
        <ToolBar/>
        <main className={classes.Content}>
            {props.children}
        </main>
     </Aux >
);

export default layout;