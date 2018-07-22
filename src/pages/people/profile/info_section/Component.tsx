import { createStyles, Divider, Typography, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";

import EditableTextField from "./EditableTextField";
import TextField from "./TextFieldBase";

/****  TYPES ******/

interface IComponentProps extends WithStyles<typeof styles> {
    user: {
        id: string,
        displayName?: string,
        username: string,
        accountCreatedTimestamp: string,
        lastLoginTimestamp: string,
        website?: string,
        email?: string,
        stellarPublicKey: string,
    };
    editable: boolean;
}

/****  COMPONENT ******/
class Component extends React.PureComponent<IComponentProps> {
    public render() {
        const { classes, user, editable }  = this.props;

        // Display Name
        let displayName;
        if (editable) {
            displayName = (
                <EditableTextField
                    label={"Name"}
                    value={user.displayName ? user.displayName : ""}
                    userID={user.id}
                    graphQLField={"displayName"}
                    validationFn={validators.displayName}
                    serverErrorParser={serverErrorParsers.displayName}
                />
            );
        } else if (user.displayName) {
            displayName = (
                <TextField
                    label={"Name"}
                    value={user.displayName}
                />
            );
        }

        // Username
        let username;
        if (editable) {
            username = (
                <EditableTextField
                    label={"Username"}
                    value={user.username ? user.username : ""}
                    userID={user.id}
                    graphQLField={"username"}
                    validationFn={validators.username}
                    serverErrorParser={serverErrorParsers.username}
                />
            );
        } else {
            username = (
                <TextField
                    label={"Username"}
                    value={user.username}
                />
            );
        }

        // Email
        let email;
        if (editable) {
            email = (
                <EditableTextField
                    label={"Email"}
                    value={user.email ? user.email : ""}
                    userID={user.id}
                    graphQLField={"email"}
                    validationFn={validators.email}
                    serverErrorParser={serverErrorParsers.email}
                />
            );
        } else if (user.email) {
            email = (
                <TextField
                    label={"Email"}
                    value={user.email}
                />
            );
        }

        // website
        let website;
        if (editable) {
            website = (
                <EditableTextField
                    label={"Website"}
                    value={user.website ? user.website : ""}
                    userID={user.id}
                    graphQLField={"website"}
                    validationFn={validators.website}
                    serverErrorParser={serverErrorParsers.website}
                />
            );
        } else if (user.website) {
            website = (
                <TextField
                    label={"Website"}
                    value={user.website}
                />
            );
        }

        return (
            <form>
                <Typography variant={"title"}> Basic Info</Typography>
                {displayName}
                {username}
                <TextField
                    label={"Stellar Public Key"}
                    value={user.stellarPublicKey}
                />
                <TextField
                    label={"Account Created At"}
                    value={user.accountCreatedTimestamp}
                />
                <TextField
                    label={"Last Login"}
                    value={user.lastLoginTimestamp}
                />
                <Divider className={classes.divider} />
                <Typography variant={"title"}> Contact Info</Typography>
                {email}
                {website}
            </form>
        );
    }
}
const validators = {
    username: (v: string) => {
        return (/^[a-zA-Z0-9_]+$/).test(v) ?
            null
            :
            "Username must only contain alphanumeric characters and cannot be empty!";
    },
    displayName: (v: string) => {
        return (/^[a-zA-Z_.' ]*$/).test(v) ?
            null
            :
            "Your name must only contain alphabetic and punctuation characters!";
    },
    email: (v: string) => {
        // tslint:disable
        return (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(v) ?
            null
            :
            "Does not look like a valid email address!";
        // tslint:enable
    },
    website: (v: string) => {
        // tslint:disable
        return (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/).test(v) ?
            null
            :
            "Does not look like a valid website!";
        // tslint:enable
    },
};
const serverErrorParsers = {
    username: (err: string, inputVal: string) => {
        if (err.includes("violates unique constraint")) {
            return `${inputVal} already taken! Try another one.`;
        }
        return null;
    },

    displayName: (err: string, inputVal: string) => {
        return null;
    },

    email: (err: string, inputVal: string) => {
        return null;
    },
    website: (err: string, inputVal: string) => {
        return null;
    },
};

/****  STYLES ******/
const styles = createStyles({
    divider: {
        margin: "20px 0",
    },
});

/****  EXPORT ******/
export default withStyles(styles)(Component);
