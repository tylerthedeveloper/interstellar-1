import {
    CircularProgress,
    createStyles, Snackbar, SnackbarContent, Theme, withStyles,
    WithStyles

} from "@material-ui/core";
import { observer } from "mobx-react";
import * as React from "react";
import UIStore from "Stores/ui";
import { injectWithTypes } from "TypeUtil";

/****  TYPES ******/

interface IComponentProps extends WithStyles<typeof styles> {
    ui: UIStore;
}

/****  COMPONENT ******/
@observer
class NavBar extends React.Component<IComponentProps> {
    public render() {
        const { classes, ui } = this.props;

        let className;
        switch(ui.notificationType){
            case "error":
                className = classes.error;
                break;
            case "loading":
                className = classes.loading;
                break;
            default:
                className = classes.ok;
        }

        return (
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={ui.notificationOpen}
                className={classes.all}
                onClose={(event, reason) => {
                    if (reason !== "clickaway" ) {
                        ui.closeNotification();
                    }
                }}
                ContentProps={{
                    "aria-describedby": "message-id",
                    "className": className,
                }}
                message={<span id="message-id" >{ui.notificationMessage}</span>}
                action={ui.notificationType === "loading" ?
                    <CircularProgress
                        thickness={8}
                        className={classes.loadingProgress}
                    /> : undefined}
            />
        );
    }
}

/****  STYLES ******/
const styles = (theme: Theme) => createStyles({
    all: {
        width: "80%",
    },
    error: {
        backgroundColor: theme.palette.error.main,
    },
    ok: {
        backgroundColor: "default",
    },
    loading: {
        backgroundColor: theme.palette.primary.light,
    },
    loadingProgress: {
        color: "white",
    },
});

/****  EXPORT ******/
export default injectWithTypes("ui", withStyles(styles)(NavBar));
