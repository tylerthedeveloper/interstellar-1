// @flow

import React from "react";
import { graphql, compose} from "react-apollo";

import {
    getLoginModalOpenStatus,
    toggleLoginModalStatus,
    login,
    getLoginStatus,
    StatusSymbols
} from "../../../models/local/login_modal";
import LoginModalComponent from "./Component";

export default compose(
    graphql(getLoginModalOpenStatus, {
        props: ({data: {loginModalOpen}}) => ({
            open: loginModalOpen
        })
    }),

    graphql(toggleLoginModalStatus, {
        name: "onClose"
    }),

    graphql(login, {
        name: "onLogin",
        options: {
            update : (cache, { data: {login: data}}) => {

                //update the login status
                cache.writeQuery({query: getLoginStatus, data });

                //close the login modal if necessary
                if(data.loginStatus.statusCode === StatusSymbols.LOGGED_IN){
                    cache.writeQuery({query: getLoginModalOpenStatus, data: {loginModalOpen: false}})
                }
            }
        }
    }),

    graphql(getLoginStatus, {
        props: ({data: { loginStatus: {statusCode} }}) => ({
            statusCode
        })
    })

)(LoginModalComponent);
