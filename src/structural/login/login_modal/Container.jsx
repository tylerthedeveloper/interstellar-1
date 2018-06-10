// @flow

import React from "react";
import { Mutation, Query } from "react-apollo";

import {
    getLoginModalOpenStatus,
    toggleLoginModalStatus,
    login
} from "../../../models/local/login_modal";

import LoginModalComponent from "./Component";
import type { LoginModalProps } from "./Component";

class LoginModal extends React.PureComponent<{}> {
    render() {
        return (
            <Mutation mutation={toggleLoginModalStatus}>
                {(toggle) => (
                    <Query query={getLoginModalOpenStatus}>
                        {({ data: { loginModalOpen } }) => (
                            <Mutation mutation={login}>
                                {(login, { data, loading }) => {
                                    let props: LoginModalProps = {
                                        open: loginModalOpen,
                                        onClose: toggle,
                                        onLogin: login,
                                        loading: loading
                                    };

                                    //check if the login mutation caused an error
                                    if (data && data.login.error) {
                                        //when the modal closes, clear any error messages
                                        if (!loginModalOpen) {
                                            delete data.login.error;

                                            //otherwise, pass along to the login modal
                                        } else {
                                            props.errorMessage =
                                                data.login.error;
                                        }
                                    }

                                    return <LoginModalComponent {...props} />;
                                }}
                            </Mutation>
                        )}
                    </Query>
                )}
            </Mutation>
        );
    }
}

export default LoginModal;
