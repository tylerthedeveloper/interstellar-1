import { Button, createStyles, Divider, Typography, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import { ButtonProps } from "@material-ui/core/Button";

/****  TYPES ******/

interface IComponentProps extends WithStyles<typeof styles> {
    website?: boolean;
    report?: boolean;
    contact?: boolean;
}

/****  COMPONENT ******/
class ActionBar extends React.PureComponent<IComponentProps> {
    public render() {
        const { classes, website, report, contact }  = this.props;

        return (
            <div className={classes.actionRow}>
                {contact ? (
                    <LocalButton className={classes.action}>
                        Contact
                    </LocalButton>
                    ) : null
                }
                {website ? (
                    <LocalButton className={classes.action}>
                        Website
                    </LocalButton>
                ) : null
                }
                {report ? (
                    <LocalButton className={classes.action} color={"secondary"}>
                        Report
                    </LocalButton>
                ) : null
                }
            </div>
        );
    }
}
const LocalButton = (props: ButtonProps) => {
    return <Button variant={"raised"} {...props} />;
};

/****  STYLES ******/
const styles = createStyles({
    actionRow: {
        paddingTop: "20px",
        display: "flex",
    },
    action: {
        marginRight: "20px",
    },
});

/****  EXPORT ******/
export default withStyles(styles)(ActionBar);
