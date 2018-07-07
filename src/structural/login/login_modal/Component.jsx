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
    CircularProgress
} from "@material-ui/core";
import injectSheet from "react-jss";
import { observer, inject } from "mobx-react";

/****  TYPES ******/
type classProp = {
    classes: { [$Keys<typeof styles>]: string }
};

export type LoginModalProps = {
    open: boolean,
    onClose: (event: SyntheticEvent<HTMLButtonElement>) => void,
    onLogin: ({ variables: { key: string } }) => void,
    errorMessage?: string,
    loading: boolean
};

/****  COMPONENT ******/

//TODO remove
//Secret Key (Public Network): SB6ZKPBDEWFQ7CGV7IPV3QUBU6MSR232LWHOIURIHPHICOSWCAPEQDSC
//Secret Key (Test Network): SAKRB7EE6H23EF733WFU76RPIYOPEWVOMBBUXDQYQ3OF4NF6ZY6B6VLW

@inject("ui")
@inject("account")
@observer
class LoginModal extends React.Component<any, any> {
    render() {
        const { classes, ui, account } = this.props;

        return (
            <Dialog
                open={ui.loginModalOpen}
                onBackdropClick={ui.closeLoginModal}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth={"sm"}
                classes={{ paperWidthSm: classes.modalPaper }}
            >
                <DialogTitle id="form-dialog-title">
                    {" "}
                    Login or Sign Up with your Stellar Secret Key
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="private-key-log-in"
                        label="Secret Key"
                        type="password"
                        onChange={account.setKeyFromInputEvent}
                        value={account.secretKey}
                        fullWidth
                        error={Boolean(ui.loginModalErrorMessage)}
                        InputProps={{
                            endAdornment: ui.loginModaLoading && (
                                <CircularProgress />
                            )
                        }}
                    />
                    {ui.loginModalErrorMessage && (
                        <DialogContentText className={classes.errorText}>
                            {ui.loginModalErrorMessage}
                        </DialogContentText>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={ui.closeLoginModal}
                        color="primary"
                        variant={"outlined"}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => account.login()}
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
export default (injectSheet(styles)(LoginModal): ComponentType<any>);
