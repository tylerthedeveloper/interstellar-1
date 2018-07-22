import {
    AppBar,
    Avatar,
    Button,
    createStyles,
    Tab,
    Tabs, Typography, WithStyles, withStyles,
} from "@material-ui/core";
import * as React from "react";
import ActionBar from "./action_bar/Component";
import MainContent from "./ProfileContentComponent";

/****  TYPES ******/
interface IComponentProps extends WithStyles<typeof styles> {
    userID: string;
    editable: boolean;
}

/****  COMPONENT ******/
class Component extends React.PureComponent<IComponentProps> {
    public render() {

        const {userID, classes, editable} = this.props;

        return (
            <div className={classes.container}>
                <div className={classes.header}>
                    <Avatar className={classes.avatar}>{editable ? "Edit!" : "NO"}</Avatar>
                    <div>
                        <Typography variant={"display2"}>
                            Name {userID}
                        </Typography>
                        {editable ?
                            <ActionBar/>
                            :
                            <ActionBar
                                website={true}
                                report={true}
                                contact={true}
                            />
                        }
                    </div>
                </div>
                <MainContent id={userID} editable={editable}/>
            </div>
        );
    }
}

/****  STYLES ******/
const styles = createStyles({
    header: {
        display: "flex",
        marginBottom: "30px",
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
