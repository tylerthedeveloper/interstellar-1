// @flow
import React from "react";
import type { ComponentType } from "react";
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    DialogTitle,
    Button,
    TextField,
    Divider
} from "@material-ui/core";
import injectSheet from "react-jss";

import {StatusSymbols} from '../../../models/local/login_modal';

/****  TYPES ******/
type classProp = {
    classes: { [$Keys<typeof styles>]: string }
};

type LoginModalProps = {
    open: boolean,
    onClose: (event: SyntheticEvent<HTMLButtonElement>) => void,
    onLogin: ({variables: {key: string}}) => void,
    statusCode: any
};

/****  COMPONENT ******/

//TODO remove
//Secret Key (Public Network): SB6ZKPBDEWFQ7CGV7IPV3QUBU6MSR232LWHOIURIHPHICOSWCAPEQDSC
//Secret Key (Test Network): SAKRB7EE6H23EF733WFU76RPIYOPEWVOMBBUXDQYQ3OF4NF6ZY6B6VLW

class LoginModal extends React.Component<LoginModalProps & classProp, {key: string}> {

    state = {
        key: ""
    };


    onInput = (event: SyntheticEvent<HTMLInputElement>) => {
        this.setState({
            key: (event.target: any).value
        });
    };

    shouldComponentUpdate = (nextProps, nextState) => {

        //hack to clear the secret key if the modal closes without logging in
        if (this.props.open === true && nextProps.open === false) {
            this.setState({ key: "" });
        }

        return true;
    };


    render() {
        const { classes, open, onClose, onLogin, statusCode } = this.props;
        const invalid = statusCode !== StatusSymbols.LOGGED_IN && statusCode !== StatusSymbols.LOGGED_OUT;

        return (
            <Dialog
                open={open}
                onBackdropClick={onClose}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth={"sm"}
                classes={{ paperWidthSm: classes.modalPaper }}
            >
                <DialogTitle id="form-dialog-title"> Login or Sign Up with your Stellar Secret Key</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="private-key-log-in"
                        label="Secret Key"
                        type="password"
                        onChange={this.onInput}
                        value={this.state.key}
                        fullWidth
                        error = {invalid}
                    />
                    {invalid &&
                    <DialogContentText className={classes.errorText}>
                        {statusCode === StatusSymbols.NO_ACCOUNT && "This secret key does not belong to a public account!"}
                        {statusCode === StatusSymbols.INVALID_KEY_FORMAT && "This does not appear to a valid format for a secret key!"}
                        {statusCode === StatusSymbols.NOT_ABLE_TO_VERIFY && "We weren't able to verify your ownership of this secret key!"}
                    </DialogContentText>
                    }
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={onClose}
                        color="primary"
                        variant={"outlined"}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => onLogin({
                            variables: {key: this.state.key}
                        })}
                        color="primary"
                        variant={"raised"}
                    >
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

/****  STYLES ******/
const styles = {
    modalPaper: {
        maxWidth: "1000px",
        padding: "25px"
    },
    divider: {
        margin: "50px 20px"
    },
    errorText: {
        color: "red",
        marginTop: "10px"
    }
};

/****  EXPORT ******/
export default (injectSheet(styles)(LoginModal): ComponentType<
    LoginModalProps
>);
