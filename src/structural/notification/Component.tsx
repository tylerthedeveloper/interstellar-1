import {
    createStyles, Snackbar, withStyles,
    WithStyles,

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
        return (
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={ui.notificationOpen}
                onClose={(event, reason) => {
                    if (reason !== "clickaway" ) {
                        ui.closeNotification();
                    }
                }}
                ContentProps={{
                    "aria-describedby": "message-id",
                }}
                message={<span id="message-id">{ui.notificationMessage}</span>}
            />
        );
    }
}

/****  STYLES ******/
const styles = createStyles({
});

/****  EXPORT ******/
export default injectWithTypes("ui", withStyles(styles)(NavBar));
