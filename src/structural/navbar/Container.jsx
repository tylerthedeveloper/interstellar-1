import React from 'react';
import { Mutation } from 'react-apollo';

import {toggleLoginModalStatus} from "../../models/login_modal";
import NavBarComponent from './Component';


const NavBar = () => {

    return (
        <Mutation mutation={toggleLoginModalStatus}>
            {toggle => (
                <NavBarComponent toggleLoginModal={toggle}/>
            )}
        </Mutation>
    );
};

export default NavBar;