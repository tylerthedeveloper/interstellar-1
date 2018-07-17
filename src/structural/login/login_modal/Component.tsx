import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    DialogTitle,
    Button,
    TextField,
    CircularProgress,
    withStyles,
    createStyles,
    WithStyles
} from "@material-ui/core";
import { observer, inject } from "mobx-react";

import UIStore from "Stores/ui";
import AccountStore from "Stores/stellar-account";

/****  TYPES ******/
interface LoginModalProps extends WithStyles<typeof styles>{
    hair: string,
    ui: UIStore,
    account: AccountStore
}

/****  COMPONENT ******/

@inject("ui")
@inject("account")
@observer
class LoginModal extends React.Component<LoginModalProps> {
    render() {
        const { classes, ui, account, hair } = this.props;

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
                    <TextField autoFocus
                        margin="dense"
                        id="private-key-log-in"
                        label="Secret Key"
                        type="password"
                        onChange={(event) => account.secretKey = event.target.value}
                        value={account.secretKey}
                        fullWidth
                        error={Boolean(ui.loginModalErrorMessage)}
                        InputProps={{
                            endAdornment: ui.loginModalLoading && (
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

const styles = createStyles({
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
});


/****  EXPORT ******/
export default withStyles(styles)(LoginModal);


