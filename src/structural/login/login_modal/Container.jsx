import React from 'react';
import { Query, Mutation } from 'react-apollo';

import {getLoginModalOpenStatus, toggleLoginModalStatus} from "../../../models/login_modal";
import LoginModalComponent from './Component';


const LoginModal = () => {

    return (
        <Mutation mutation={toggleLoginModalStatus}>
            {toggle => (
                <Query query={getLoginModalOpenStatus}>
                    {({data}) => (
                        <LoginModalComponent open={data.loginModalOpen} onClose={toggle}/>
                    )}
                </Query>
            )}
        </Mutation>
    );
};

export default LoginModal;