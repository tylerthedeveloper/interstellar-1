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

/****  TYPES ******/
type classProp = {
    classes: { [$Keys<typeof styles>]: string }
};

type LoginModalProps = {
    open: boolean,
    onClose: (event: SyntheticEvent<HTMLButtonElement>) => void
};

/****  COMPONENT ******/
class LoginModal extends React.PureComponent<LoginModalProps & classProp> {
    render() {
        const { classes, open, onClose } = this.props;
        console.log("rendering login modal");
        return (
            <Dialog
                open={open}
                onClose={onClose}
                onBackdropClick={onClose}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth={"sm"}
                classes={{ paperWidthSm: classes.modalPaper }}
            >
                <DialogTitle id="form-dialog-title">Log In</DialogTitle>
                <DialogContent>
                    <DialogContentText variant={"title"}>
                        Returning Users
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="private-key-log-in"
                        label="Stellar Wallet Private Key"
                        type="password"
                        fullWidth
                    />
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
                        onClick={onClose}
                        color="primary"
                        variant={"raised"}
                    >
                        Login
                    </Button>
                </DialogActions>

                <Divider className={classes.divider} />

                <DialogContent>
                    <DialogContentText variant={"title"}>
                        New Users
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="private-key-sign-up"
                        label="Stellar Wallet Private Key"
                        type="password"
                        fullWidth
                    />
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
                        onClick={onClose}
                        color="primary"
                        variant={"raised"}
                    >
                        Sign Up
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
    }
};

/****  EXPORT ******/
export default (injectSheet(styles)(LoginModal): ComponentType<
    LoginModalProps
>);
