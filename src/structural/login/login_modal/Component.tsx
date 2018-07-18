import {
    Button,
    CircularProgress,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    withStyles,
    WithStyles,
} from "@material-ui/core";
import { observer } from "mobx-react";
import * as React from "react";
import { ChangeEvent } from "react";
import {injectWithTypes} from "TypeUtil";

import AccountStore from "Stores/stellar-account";
import UIStore from "Stores/ui";

/****  TYPES ******/
interface ILoginModalProps extends WithStyles<typeof styles> {
    ui: UIStore;
    account: AccountStore;
}

/****  COMPONENT ******/

@observer
class LoginModal extends React.Component<ILoginModalProps> {

    public render() {
        const { classes, ui, account } = this.props;
        const updateKey = (event: ChangeEvent<HTMLInputElement>) => { account.secretKey = event.target.value; };

        return (
            <Dialog
                open={ui.loginModalOpen}
                onBackdropClick={ui!.closeLoginModal}
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
                        autoFocus={true}
                        margin="dense"
                        id="private-key-log-in"
                        label="Secret Key"
                        type="password"
                        onChange={updateKey}
                        value={account.secretKey}
                        fullWidth={true}
                        error={Boolean(ui!.loginModalErrorMessage)}
                        InputProps={{
                            endAdornment: ui!.loginModalLoading && (
                                <CircularProgress />
                            ),
                        }}
                    />
                    {ui!.loginModalErrorMessage && (
                        <DialogContentText className={classes.errorText}>
                            {ui!.loginModalErrorMessage}
                        </DialogContentText>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={ui!.closeLoginModal}
                        color="primary"
                        variant={"outlined"}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={account.login}
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
        padding: "25px",
    },
    divider: {
        margin: "50px 20px",
    },
    errorText: {
        color: "red",
        marginTop: "10px",
    },
});

/****  EXPORT ******/
export default injectWithTypes(["account", "ui"], withStyles(styles)(LoginModal));
