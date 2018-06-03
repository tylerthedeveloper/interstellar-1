import React from 'react';
import {Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, Button, TextField, Divider} from '@material-ui/core';
import injectSheet from 'react-jss';

const styles = {
    modalPaper: {
        maxWidth: "1000px",
        padding: "25px"
    },
    divider: {
        margin: "50px 20px"
    }
};


const LoginModal = (props) => {
    const {classes, open, onClose} = props;

    return (
        <Dialog
            open={open}
            onClose={onclose}
            onBackdropClick={onClose}
            aria-labelledby="form-dialog-title"
            fullWidth={true}
            maxWidth={'sm'}
            classes={{paperWidthSm: classes.modalPaper}}
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
                <Button onClick={onClose} color="primary" variant={"outlined"}>
                    Cancel
                </Button>
                <Button onClick={onClose} color="primary" variant={"raised"}>
                    Login
                </Button>
            </DialogActions>

            <Divider className={classes.divider}/>

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
                <Button onClick={onClose} color="primary" variant={"outlined"}>
                    Cancel
                </Button>
                <Button onClick={onClose} color="primary" variant={"raised"}>
                    Sign Up
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default injectSheet(styles)(LoginModal);