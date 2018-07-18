import {
    AppBar,
    Avatar,
    Button,
    createStyles,
    Tab,
    Tabs, Typography, WithStyles, withStyles,
} from "@material-ui/core";
import * as React from "react";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";

import MainContent from "./ProfileContentComponent";

/****  TYPES ******/
import { ButtonProps } from "@material-ui/core/Button";
interface IComponentProps extends WithStyles<typeof styles> {
    id: string;
}

/****  COMPONENT ******/
class Component extends React.PureComponent<IComponentProps> {
    public render() {

        const {id, classes} = this.props;
        const name = "Jack Langston";

        return (
            <div className={classes.container}>
                <div className={classes.header}>
                    <Avatar className={classes.avatar}>OP</Avatar>
                    <div>
                        <Typography variant={"display2"}>
                            Name {id}
                        </Typography>
                        <div className={classes.actionRow}>
                            <LocalButton className={classes.action}>
                                Contact
                            </LocalButton>
                            <LocalButton className={classes.action}>
                                Website
                            </LocalButton>
                            <LocalButton
                                className={classes.action}
                                color={"secondary"}
                            >
                                Report
                            </LocalButton>
                        </div>
                    </div>
                </div>
                <MainContent id={id}/>
            </div>
        );
    }
}

const LocalButton = (props: ButtonProps) => {
    return <Button variant={"raised"} {...props} />;
};

/****  STYLES ******/
const styles = createStyles({
    header: {
        display: "flex",
        marginBottom: "30px",
    },

    actionRow: {
        paddingTop: "20px",
        display: "flex",
    },
    action: {
        marginRight: "20px",
    },

    avatar: {
        width: "150px",
        height: "150px",
        marginRight: "30px",
    },

    container: {
        padding: "20px 250px 0",
    },

});

/****  EXPORT ******/
export default withStyles(styles)(Component);
