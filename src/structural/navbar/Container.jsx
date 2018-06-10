// @flow

import React from "react";

import { getLoginStatus, toggleLoginModalStatus, logout } from "../../models/local/login_modal";
import NavBarComponent from "./Component";
import { graphql, compose } from "react-apollo";

export default compose(
    graphql(toggleLoginModalStatus, {
        name: "toggleLoginModal"
    }),

    graphql(getLoginStatus, {
        props: ({data: { loginStatus: {statusCode} }}) => ({
            statusCode
        })
    }),

    graphql(logout, {
        name: "logout"
    })
)(NavBarComponent);
